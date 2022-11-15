import { Box, Flex, useRadioGroup } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Backdrop from '../components/Backdrop';
import Buttonx from '../components/Buttonx';
import RadioCard from '../components/RadioCard';
import Typox from '../components/Typox';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { message } from 'antd';
import axios from 'axios';
import { SERVER_URL } from '../data/constants';
import { Tstore } from '../store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type TQuiz = {
  _id: string;
  type: string;
  topic: string;
  question: string;
  options: string[];
  language: string;
};

interface IProps {
  isExpired: boolean;
  data: TQuiz[];
}

function QuizForm(props: IProps) {
  const navigate = useNavigate();
  const { _id } = useSelector((state: Tstore) => state.users.data);
  const [timer, setTimer] = useState<number>(15);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<{}[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const saveAnswer = (answer: string) => {
    if (answers[currentQuestion] !== undefined) {
      setAnswers((prev: any[]) => {
        prev.splice(currentQuestion, 1);
        return [
          ...prev,
          {
            question: props.data[currentQuestion].question,
            answer: answer,
          },
        ];
      });
    } else {
      setAnswers((prev: any) => [
        ...prev,
        {
          question: props.data[currentQuestion].question,
          answer: answer,
        },
      ]);
    }
  };

  const nextHandller = () => {
    if (currentQuestion + 1 === answers.length) {
      setCurrentQuestion((prev: number) => prev + 1);
    } else {
      message.info('Please select an option');
    }
  };

  const submitTest = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${SERVER_URL}/quiz/validate-answers`, answers);
      const score = res.data.score;
      const result = await axios.put(`${SERVER_URL}/student/add-quiz-result`, {
        _id: _id,
        quiz_data: {
          topic: props.data[0].topic,
          score: score,
          taken_at: new Date(),
        },
      });
      if (result.data.success) {
        setIsSubmitting(false);
        message.success('Successfully Submitted');
        navigate('/assessments');
      }
    } catch (err) {
      message.error('Something Went Wrong, Try Again');
      setIsSubmitting(false);
    }
  };

  const { getRadioProps } = useRadioGroup({
    name: 'quiz',
    onChange: saveAnswer,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimer((prev: number) => prev - 1);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (props.isExpired) {
      submitTest();
    }
    // eslint-disable-next-line
  }, [props.isExpired]);

  return (
    <Box padding={'20px'}>
      <Backdrop loading={props.isExpired} text={'Test Autosubmitting....'} />
      <Backdrop loading={isSubmitting} text="Test Submitted. You score is calculating..." />
      <Box
        sx={{
          width: '100%',
          height: '50px',
          borderBottom: '1px solid gray',
        }}
      >
        <Flex justifyContent={'space-between'} alignItems="center">
          <Typox content="h4">{`Current Question : ${currentQuestion + 1}/10`}</Typox>
          <Typox content="h4">{`${timer} minutes left`}</Typox>
          <Buttonx onClick={submitTest}>Submit Test</Buttonx>
        </Flex>
      </Box>
      <Box padding={'20px'}>
        <br />
        {props.data[currentQuestion].type === 'mcq' ? (
          <Typox content="h2">{props.data[currentQuestion].question}</Typox>
        ) : (
          <SyntaxHighlighter
            style={vscDarkPlus}
            language={props.data[currentQuestion].language}
            showLineNumbers
          >
            {props.data[currentQuestion].question}
          </SyntaxHighlighter>
        )}
        <br />
        {props.data[currentQuestion].options.map((option: string) => {
          const radio = getRadioProps({ value: option });
          return (
            <RadioCard key={option} {...radio}>
              {option}
            </RadioCard>
          );
        })}
      </Box>
      <br />
      <Flex alignItems={'center'} justifyContent="space-between">
        <Buttonx disabled={currentQuestion === 9} onClick={nextHandller}>
          Next
        </Buttonx>
        <Typox content="h3">{`Saved answers : ${answers.length}`}</Typox>
      </Flex>
    </Box>
  );
}

export default QuizForm;
