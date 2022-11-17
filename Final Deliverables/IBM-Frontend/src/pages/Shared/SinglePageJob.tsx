import React from 'react';
import JobCard from '../../containers/Job';
import { useParams } from 'react-router-dom';
import Backdrop from '../../components/Backdrop';
import NavBar from '../../components/NavBar';
import useSWR from 'swr';
import axios from 'axios';
import { SERVER_URL, SINGLE_JOB } from '../../data/constants';

export default function SinglePageJob() {
  const params = useParams();
  const id = params.id;

  const fetcher = () => axios.get(`${SERVER_URL}/job${SINGLE_JOB}${id}`).then((res) => res.data);

  const { data } = useSWR('single-job', fetcher, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateIfStale: false,
    refreshWhenHidden: false,
  });

  return data === undefined ? (
    <Backdrop loading={true} text={'Finding job details....'} />
  ) : (
    <main>
      <NavBar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100%',
        }}
      >
        <JobCard data={data} />
      </div>
    </main>
  );
}
