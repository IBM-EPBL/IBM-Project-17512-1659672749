import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { GET_JOBS_BY_COMPANY, SERVER_URL } from '../../data/constants';
import { useSelector } from 'react-redux';
import { Tstore } from '../../store';
import { Center } from '@chakra-ui/react';
import JobCard from '../JobCard';
import { nanoid } from 'nanoid';
import Typox from '../../components/Typox';

function CorporateJobs() {
  const { _id } = useSelector((state: Tstore) => state.users.data);

  const fetcher = () =>
    axios.get(`${SERVER_URL}/job${GET_JOBS_BY_COMPANY}?id=${_id}`).then((res) => res.data);
  const { data } = useSWR('new-job-added', fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateIfStale: false,
    refreshWhenHidden: false,
  });

  return (
    <Center flexDirection={'column'}>
      <Typox content="h1" style={{ margin: '20px 0' }}>
        Your Jobs
      </Typox>
      {data && data.length > 0 ? (
        data.map((job: any) => {
          return (
            <JobCard key={nanoid()} data={job} isEditable={true} href={`/manage-job/${job._id}`} />
          );
        })
      ) : (
        <h1>Loading...</h1>
      )}
    </Center>
  );
}

export default CorporateJobs;
