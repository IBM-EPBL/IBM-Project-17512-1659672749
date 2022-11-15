import { Box, Center, Flex } from '@chakra-ui/react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import React from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';
import Backdrop from '../../components/Backdrop';
import NavBar from '../../components/NavBar';
import QuizCard from '../../components/QuizCard';
import Typox from '../../components/Typox';
import { SERVER_URL } from '../../data/constants';
import { quizzes } from '../../data/quiz';
import { Tstore } from '../../store';

function Assessment() {
  const { _id } = useSelector((state: Tstore) => state.users.data);

  const fetcher = () =>
    axios.get(`${SERVER_URL}/student/quiz-data?id=${_id}`).then((res) => res.data);
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
          <Typox content="h2">Assessments Library</Typox>
          <br />
          <Flex wrap={'wrap'} justifyContent="center">
            {data ? (
              quizzes.map((quiz) => {
                const result = data.completed_quizzes.filter(
                  (_quiz: any) => _quiz.topic === quiz.key,
                );
                const isCompleted = result.length === 1;
                return (
                  <QuizCard
                    key={nanoid()}
                    data={quiz}
                    isCompleted={isCompleted}
                    score={isCompleted ? (result[0].score / 10) * 100 : 0}
                  />
                );
              })
            ) : (
              <Backdrop loading={true} text="Finding your quiz data..." />
            )}
          </Flex>
        </Center>
      </main>
    </Box>
  );
}

export default Assessment;
