import { Center } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr/immutable';
import Backdrop from '../../components/Backdrop';
import Typox from '../../components/Typox';
import QuizForm from '../../containers/QuizForm';
import { SERVER_URL } from '../../data/constants';
import { Tstore } from '../../store';

function Test() {
  const [query] = useSearchParams();
  const test_id = query.get('test-id');
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const { _id } = useSelector((state: Tstore) => state.users.data);

  const fetcher = () =>
    axios.get(`${SERVER_URL}/quiz/get-quiz?topic=${test_id}&id=${_id}`).then((res) => res.data);

  const { data, error } = useSWR(`${SERVER_URL}/quiz/`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateIfStale: false,
    refreshWhenHidden: false,
  });

  useEffect(() => {
    // eslint-disable-next-line
    const timer = setTimeout(() => {
      setIsExpired(true);
    }, 900000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, []);

  if (error) {
    return (
      <Center flexDirection={'column'} padding="20px">
        <Typox content="h1" color="orange">
          {'Broken URL'}
        </Typox>
      </Center>
    );
  }

  return (
    <>
      {data ? (
        <QuizForm isExpired={isExpired} data={data} />
      ) : (
        <Backdrop loading={true} text={'Generating Test Board....'} />
      )}
    </>
  );
}

export default Test;
