import { Box, HStack, Center, Divider } from '@chakra-ui/react';
import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Cardx from '../../components/Cardx';
import Typox from '../../components/Typox';
import { Tstore } from '../../store';
import ContentBoardForm from '../JobForm';
import { SERVER_URL, TOTAL_JOBS_BY_COMPANY } from '../../data/constants';
import JoyRide from 'react-joyride';
import { corporateSteps } from '../../data/onBoarding';
import { isOnBoardingFinished, setOnBoarding } from '../../utils/checkOnBoarding';

function CorporateDashboard() {
  const { company_name, _id } = useSelector((state: Tstore) => state.users.data);
  const fetcher = () =>
    axios.get(`${SERVER_URL}/job${TOTAL_JOBS_BY_COMPANY}${_id}`).then((res) => res.data);

  const { data } = useSWR(`get-total-count`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateIfStale: false,
    refreshWhenHidden: false,
  });

  return (
    <>
      <Box padding={['20px']}>
        <Typox content="h1">{`Welcome ${company_name}`}</Typox>
        <Center>
          <HStack
            spacing={'8px'}
            sx={{
              '@media screen and (max-width:820px)': {
                flexDirection: 'column',
              },
            }}
          >
            <Cardx
              style={{
                borderTop: '5px solid #553e6f',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
              }}
            >
              <Center flexDirection={'column'}>
                <Typox content="subtitle">Total Jobs Posted</Typox>
                {data && data.success ? (
                  <Typox content="h1">{data.total_jobs}</Typox>
                ) : (
                  <Typox content="body">Counting...</Typox>
                )}
              </Center>
            </Cardx>
            <Cardx
              style={{
                borderTop: '5px solid green',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
              }}
            >
              <Center flexDirection={'column'}>
                <Typox content="subtitle">Total Jobs Active</Typox>
                {data && data.success ? (
                  <Typox content="h1">{data.active_jobs}</Typox>
                ) : (
                  <Typox content="body">Counting...</Typox>
                )}
              </Center>
            </Cardx>
            <Cardx
              style={{
                borderTop: '5px solid red',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
              }}
            >
              <Center flexDirection={'column'}>
                <Typox content="subtitle">Total Jobs Closed</Typox>
                {data && data.success ? (
                  <Typox content="h1">{data.closed_jobs}</Typox>
                ) : (
                  <Typox content="body">Counting...</Typox>
                )}
              </Center>
            </Cardx>
          </HStack>
        </Center>
        <Divider />
        <Center>
          <ContentBoardForm />
        </Center>
      </Box>
      <JoyRide
        steps={corporateSteps}
        showSkipButton
        continuous
        showProgress
        callback={(data) => data.index > 0 && setOnBoarding()}
        run={isOnBoardingFinished()}
        locale={{
          last: 'End tour',
          skip: 'Close tour',
        }}
      />
    </>
  );
}

export default CorporateDashboard;
