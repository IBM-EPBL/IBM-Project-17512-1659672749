import { Box, Center, Flex } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React from 'react';
import ReactJoyride from 'react-joyride';
import { useSelector } from 'react-redux';
import QuizCard from '../../components/QuizCard';
import Typox from '../../components/Typox';
import { studentSteps } from '../../data/onBoarding';
import { quizzes } from '../../data/quiz';
import { Tstore } from '../../store';
import JobCard from '../JobCard';
import { isOnBoardingFinished, setOnBoarding } from '../../utils/checkOnBoarding';

function StudentDashboard() {
  const { name, recommended_jobs, skills } = useSelector((state: Tstore) => state.users.data);

  return (
    <Box padding="20px">
      <Typox content="h1">{`Howdy ${name}`}</Typox>
      <br />
      <Box id="recommended-jobs">
        <Typox content="h2" color="gray">
          {'Recommended jobs based on your skills'}
        </Typox>
        <br />
        <Center flexDirection={'column'}>
          {recommended_jobs.map((job: any) => {
            const jobData = {
              title: job.title as string,
              description: job.description as string,
              company_name: job.posted_by.company_name as string,
              location: job.location as string,
              _id: job._id as string,
              is_closed: job.is_closed as boolean,
            };
            return <JobCard key={nanoid()} data={jobData} />;
          })}
        </Center>
      </Box>
      <br />
      <Typox content="h2" color="gray">
        {'Recommended Assessments based on your skills'}
      </Typox>
      <br />
      <Flex justifyContent={'center'} wrap="wrap">
        {skills.map(({ skill }: any) => {
          try {
            const _result = quizzes.filter((quiz) =>
              quiz.label
                .replace(/[.,-?;:!\s]/g, '')
                .toLowerCase()
                .match(new RegExp(skill.replace(/[.,-?;:!\s]/g, '').toLowerCase(), 'i')),
            );
            if (_result.length > 0 && !_result[0].isBeta) {
              return <QuizCard key={nanoid()} data={_result[0]} />;
            } else {
              return <React.Fragment key={nanoid()}></React.Fragment>;
            }
          } catch (err) {
            return <React.Fragment key={nanoid()}></React.Fragment>;
          }
        })}
      </Flex>
      <ReactJoyride
        steps={studentSteps}
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
    </Box>
  );
}

export default StudentDashboard;
