import { Box, Center, Tag } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';
import Buttonx from './Buttonx';
import Typox from './Typox';

type TData = {
  label: string;
  key: string;
  isBeta: boolean;
  icon: IconType;
};

interface IProps {
  data: TData;
  isCompleted?: boolean;
  score?: number;
}

function QuizCard({ data, isCompleted, score }: IProps) {
  const fullScreenHandller = () => {
    document.documentElement.requestFullscreen();
  };

  return (
    <Box
      padding="20px"
      margin="20px"
      width="300px"
      height="280px"
      borderRadius="5px"
      boxShadow="2px 2px 10px 2px #bcaccf"
      borderTop={
        data.isBeta
          ? '6px solid #A0AEC0'
          : isCompleted
          ? score! > 65
            ? '6px solid #48BB78'
            : '6px solid red'
          : '6px solid #79589f'
      }
    >
      <Center flexDirection={'column'}>
        <data.icon size="38px" color="#79589f" />
        <br />
        <Typox content="h3">{data.label}</Typox>
        <br />
        <p>Total Questions : 10</p>
        {isCompleted ? <p>Your Score : {score!}%</p> : <p>Pass Percentage: 65%</p>}
        <br />
        {data.isBeta ? (
          <Tag size={'lg'}>Beta</Tag>
        ) : isCompleted ? (
          <Tag bg={score! > 65 ? 'green.100' : 'red.100'} padding="10px">
            {score! > 65 ? 'Passed' : 'Failed'}
          </Tag>
        ) : (
          <Link to={`/assessment/test-board?test-id=${data.key}`}>
            <Buttonx onClick={fullScreenHandller}>Take Test</Buttonx>
          </Link>
        )}
      </Center>
    </Box>
  );
}

export default QuizCard;
