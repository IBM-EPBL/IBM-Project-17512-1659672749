import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { SERVER_URL, SINGLE_JOB } from '../../data/constants';
import { useParams } from 'react-router-dom';
import { Center } from '@chakra-ui/react';
import NavBar from '../../components/NavBar';
import ContentBoardForm from '../../containers/JobForm';
import Backdrop from '../../components/Backdrop';
import { useSelector } from 'react-redux';
import { Tstore } from '../../store';
import Typox from '../../components/Typox';

function ManageJob() {
  const { type } = useSelector((state: Tstore) => state.users.data);
  const param = useParams();
  const id = param.id;
  const fetcher = () => axios.get(`${SERVER_URL}/job${SINGLE_JOB}${id}`).then((res) => res.data);
  const { data } = useSWR(
    type === 'corporate' ? `${SERVER_URL}/job${SINGLE_JOB}${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      refreshWhenHidden: false,
    },
  );

  if (type === 'corporate') {
    return (
      <>
        <NavBar />
        <main>
          <Center>
            {data && data['title'] ? (
              <ContentBoardForm isEditMode={true} data={data} />
            ) : (
              <Backdrop loading={true} text="Generating editor...." />
            )}
          </Center>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Center>
          <Typox content="h2" color="red">
            You Are Not Authorized For This Page
          </Typox>
        </Center>
      </>
    );
  }
}

export default ManageJob;
