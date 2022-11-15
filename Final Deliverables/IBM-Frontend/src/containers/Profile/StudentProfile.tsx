import { Box, Divider, Flex, List, ListItem } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import Cardx from '../../components/Cardx';
import Typox from '../../components/Typox';
import { Tstore } from '../../store';
import StudentProfileCard from '../ProfileCard';
import SkillsCard from './StudentProfileComponents/SkillsCard';
import { BiCheckboxChecked } from 'react-icons/bi';
import { nanoid } from 'nanoid';
import EducationCard from './StudentProfileComponents/EducationCard';

function StudentProfile() {
  const { _id, name, mobile_number, location, education, skills, hackerrank_data, leetcode_data } =
    useSelector((state: Tstore) => state.users.data);

  return (
    <Box padding={'20px'}>
      <Typox content="h1">{name}</Typox>
      <Cardx title="Verified Skills">
        <Box>
          {hackerrank_data.certificates && (
            <>
              <Typox content="h2">{'Hackerrank Certificates'}</Typox>
              <br />
              <List spacing={3}>
                {hackerrank_data.certificates.map((certificate: any) => {
                  return (
                    <ListItem key={nanoid()}>
                      <Flex alignItems={'center'}>
                        <BiCheckboxChecked color="green" size="24px" />
                        <br />
                        <a href={certificate.certificate_link} target={'_blank'} rel="noreferrer">
                          {certificate.certificate_name.slice(12)}
                        </a>
                      </Flex>
                    </ListItem>
                  );
                })}
              </List>
            </>
          )}
          {leetcode_data.total_problems_solved && (
            <>
              <Divider />
              <br />
              <Typox content="h2">{'Leetcode Stats'}</Typox>
              <br />
              {
                <Typox content="h4">{`Total Problems Solved : ${leetcode_data.total_problems_solved}`}</Typox>
              }
              {leetcode_data.total_badges && (
                <Typox content="h4">{`No. Of Badges: ${leetcode_data.total_badges}  badges`}</Typox>
              )}
            </>
          )}
        </Box>
      </Cardx>
      <StudentProfileCard
        title="Contact Information"
        _id={_id}
        isStudent
        data={[
          {
            label: 'Mobile Number',
            value: mobile_number,
            key: 'mobile_number',
            type: 'Input',
          },
          {
            label: 'Address',
            value: location,
            key: 'location',
            type: 'TextArea',
          },
        ]}
      />
      <SkillsCard data={skills} />
      <EducationCard education={education} />
    </Box>
  );
}

export default StudentProfile;
