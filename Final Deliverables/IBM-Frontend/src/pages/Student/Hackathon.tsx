import React from 'react';
import useSWR from 'swr';
import Typox from '../../components/Typox';
import HackathonCard from '../../components/HackathonCard';
import Backdrop from '../../components/Backdrop';
import NavBar from '../../components/NavBar';
import { Box, Center, Flex } from '@chakra-ui/react';
import axios from 'axios';
export default function Hackathon() {
  const fetcher = () =>
    axios.get(`http://localhost:8000/hackathon/get-hackathon`).then((res) => res.data);
  const { data } = useSWR('quiz-data', fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateIfStale: false,
    refreshWhenHidden: false,
  });
  return (
    <Box>
      <NavBar />
      <main>
        <Center flexDirection={'column'}>
          <br />
          <Typox content="h2">Hackathons</Typox>
          <br />
          <Flex wrap={'wrap'} justifyContent="center">
            {data ? (
              data.map((data: any, index: number) =>
                data.title != '' ? <HackathonCard data={data} key={index} /> : null,
              )
            ) : (
              <Backdrop loading={true} text="Finding your quiz data..." />
            )}
          </Flex>
        </Center>
      </main>
    </Box>
  );
}
