import React, { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { GET_ALL_JOBS, SERVER_URL } from '../../data/constants';
import { Center } from '@chakra-ui/react';
import JobCard from '../JobCard';
import { nanoid } from 'nanoid';
import Typox from '../../components/Typox';
import Filter from '../../components/Filter';
import { Collapse } from 'antd';
import styles from '../../styles/Job.module.css';
import Backdrop from '../../components/Backdrop';
function StudentJobs() {
  const [data, setData] = useState<any>();
  const toast = useToast();
  const { Panel } = Collapse;
  useEffect(() => {
    const fetchData = async () => {
      const Data = await axios
        .get(`${SERVER_URL}/job${GET_ALL_JOBS}`)
        .then((response) => response.data);
      setData(Data);
    };
    fetchData();
  }, []);
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const fetchData = async () => {
    const jobData = await axios
      .get(`${SERVER_URL}/job/filter?name=${name}&location=${location}`)
      .then((response) => response.data);
    if (jobData.length < 1) {
      toast({
        title: `No Jobs`,
        position: 'top-right',
        isClosable: true,
        variant: 'subtle',
      });
      const Data = await axios
        .get(`${SERVER_URL}/job${GET_ALL_JOBS}`)
        .then((response) => response.data);
      setData(Data);
    } else {
      setData(jobData);
    }
  };
  return (
    <div className={styles.stJobMain}>
      <div className={styles.xlFilter}>
        <Filter setLocation={setLocation} setName={setName} fetchData={fetchData} />
      </div>

      <Center flexDirection={'column'}>
        <Typox content="h1" style={{ margin: '20px 0' }}>
          Jobs
        </Typox>
        <div className={styles.xsFilter}>
          <Collapse defaultActiveKey={['0']} ghost>
            <Panel header={<Typox content="h3">Filter</Typox>} key="1">
              <div style={{ width: '100%' }}>
                <Filter setLocation={setLocation} setName={setName} fetchData={fetchData} />
              </div>
            </Panel>
          </Collapse>
        </div>

        {data && data.length > 0 ? (
          data.map((job: any) => {
            const { posted_by, ...rest } = job;
            const jobData = { ...rest, company_name: posted_by.company_name };
            return <JobCard key={nanoid()} data={jobData} />;
          })
        ) : (
          <Backdrop loading={true} text="Loading jobs..." />
        )}
        <br />
        <br />
      </Center>
    </div>
  );
}

export default StudentJobs;
