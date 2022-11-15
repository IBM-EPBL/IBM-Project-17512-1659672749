import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { SERVER_URL } from '../../data/constants';
import { useParams } from 'react-router-dom';
import {
  Box,
  Center,
  Divider,
  Flex,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import NavBar from '../../components/NavBar';
import Backdrop from '../../components/Backdrop';
import { useSelector } from 'react-redux';
import { Tstore } from '../../store';
import Typox from '../../components/Typox';
import { nanoid } from 'nanoid';
import { GiClick } from 'react-icons/gi';
import { BiCheckboxChecked } from 'react-icons/bi';

function JobStats() {
  const { type, _id } = useSelector((state: Tstore) => state.users.data);
  const param = useParams();
  const id = param.id;
  const fetcher = () =>
    axios.get(`${SERVER_URL}/job/getJobByIdStats?id=${id}`).then((res) => res.data);
  const { data } = useSWR(
    type === 'corporate' ? `${SERVER_URL}/job/getJobByIdStats?id=${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: true,
      revalidateIfStale: false,
      refreshWhenHidden: false,
    },
  );

  const [leaderBoard, setLeaderBoard] = useState<any>([]);
  const [modelData, setModelData] = useState<any>({
    isOpen: false,
    data: 0,
  });

  const sortLeaderBoard = () => {
    const scoreData: any[] = data.applied_candidates.map((candidate: any) => {
      const { hackerrank_data, leetcode_data, completed_quizzes } = candidate;
      const totalBadges = hackerrank_data.badges ? hackerrank_data.badges.length : 0;
      const totalCertificates = hackerrank_data.certificates
        ? hackerrank_data.certificates.length * 4
        : 0;
      const leetcodePoints = leetcode_data.total_pints ? leetcode_data.total_pints / 2 : 0;
      const quizScores = completed_quizzes.reduce(
        (total: number, quiz: any) => total + quiz.score,
        0,
      );
      const TOTALSCORE = totalBadges + totalCertificates + leetcodePoints + quizScores;
      return { ...candidate, totalScore: TOTALSCORE };
    });
    scoreData.sort((a: any, b: any) => b.totalScore - a.totalScore);
    setLeaderBoard(scoreData);
  };

  useEffect(() => {
    if (data && data['title']) sortLeaderBoard();
    // eslint-disable-next-line
  }, [data]);

  if (type === 'corporate') {
    return (
      <>
        <NavBar />
        <main>
          <Center>
            {data && data['title'] && data.posted_by._id === _id ? (
              <Box padding="20px">
                <Typox content="h2">{data.title}</Typox>
                <br />
                <Center>
                  <Typox color="gray" content="h4">{`Posted on :  ${new Date(
                    data.date_posted,
                  ).toLocaleDateString()}`}</Typox>
                </Center>
                <br />
                <Typox content="h2">{'Cadidates showed intreset / applied to this job '}</Typox>
                <br />
                <Divider />
                <br />
                <Table>
                  <TableCaption>Applied Candidates</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Rank</Th>
                      <Th>Name</Th>
                      <Th>Score</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {leaderBoard.map((candidate: any, index: number) => {
                      return (
                        <Tr key={nanoid()}>
                          <Td>{index + 1}</Td>
                          <Td
                            style={{
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              setModelData({
                                isOpen: true,
                                data: index,
                              });
                            }}
                          >
                            <Flex alignItems={'center'}>
                              {candidate.name}
                              <GiClick style={{ marginLeft: '5px' }} />
                            </Flex>
                          </Td>
                          <Td>{candidate.totalScore}</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
                <br />
                <Divider />
                <Modal
                  isOpen={modelData.isOpen}
                  onClose={() => setModelData({ isOpen: false, data: 0 })}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>{`${
                      modelData.isOpen && data.applied_candidates[modelData.data].name
                    } Details`}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Typox content="h4">{'Hackerrank Verified Skills (Certificates)'}</Typox>
                      <List spacing={3}>
                        {modelData.isOpen &&
                          data.applied_candidates[modelData.data].hackerrank_data.certificates &&
                          data.applied_candidates[modelData.data].hackerrank_data.certificates.map(
                            (certificate: any) => {
                              return (
                                <ListItem key={nanoid()}>
                                  <Flex alignItems={'center'}>
                                    <BiCheckboxChecked color="green" size="24px" />
                                    <br />
                                    <a
                                      href={certificate.certificate_link}
                                      target={'_blank'}
                                      rel="noreferrer"
                                    >
                                      {certificate.certificate_name.slice(12)}
                                    </a>
                                  </Flex>
                                </ListItem>
                              );
                            },
                          )}
                      </List>
                      {modelData.isOpen &&
                        data.applied_candidates[modelData.data].leetcode_data
                          .total_problems_solved && (
                          <>
                            <Divider />
                            <br />
                            <Typox content="h4">{'Leetcode Stats'}</Typox>
                            {
                              <Typox color="#808080" content="h4">{`Total Problems Solved : ${
                                data.applied_candidates[modelData.data].leetcode_data
                                  .total_problems_solved
                              }`}</Typox>
                            }
                            {data.applied_candidates[modelData.data].leetcode_data.total_badges && (
                              <Typox color="#808080" content="h4">{`No. Of Badges: ${
                                data.applied_candidates[modelData.data].leetcode_data.total_badges
                              }  badges`}</Typox>
                            )}
                          </>
                        )}
                      <Divider />
                      <br />
                      <Typox content="h4">{'Verified Skills (Assessments)'}</Typox>
                      <List spacing={3}>
                        {modelData.isOpen &&
                          data.applied_candidates[modelData.data].completed_quizzes &&
                          data.applied_candidates[modelData.data].completed_quizzes.map(
                            (quiz: any) => {
                              if (quiz.score >= 7) {
                                return (
                                  <ListItem key={nanoid()}>
                                    <Flex alignItems={'center'}>
                                      <BiCheckboxChecked color="green" size="24px" />
                                      <br />
                                      <p>{quiz.topic}</p>
                                    </Flex>
                                  </ListItem>
                                );
                              } else {
                                return <React.Fragment key={nanoid()}></React.Fragment>;
                              }
                            },
                          )}
                      </List>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
            ) : (
              <Backdrop loading={true} text="Generating job status" />
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

export default JobStats;
