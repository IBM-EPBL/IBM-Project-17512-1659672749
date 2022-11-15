import { Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CorporateStep from '../../containers/Steps/CorporateStep';
import ResumeStep from '../../containers/Steps/StudentSteps/ResumeStep';
import StudentsForm from '../../containers/Steps/StudentSteps/StudentsForm';
import SkillsStep from '../../containers/Steps/StudentSteps/SkillsStep';
import { Tstore } from '../../store';
import SocialSteps from '../../containers/Steps/StudentSteps/SocialSteps';

type Itype = 'student' | 'corporate';

function GetStarted() {
  const navigate = useNavigate();
  const {
    type,
    email,
    is_steps_completed,
  }: { type: Itype; email: string; is_steps_completed: boolean } = useSelector(
    (state: Tstore) => state.users.data,
  );
  const [steps, setSteps] = useState<JSX.Element[]>([<Empty />]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const nextStep = (index: number) => {
    setCurrentStep(index);
  };

  useEffect(() => {
    if (is_steps_completed) {
      navigate('/');
    } else if (type === 'student') {
      setSteps([
        <ResumeStep key="resume" onNext={nextStep} />,
        <StudentsForm key="personal" onNext={nextStep} />,
        <SkillsStep key="skills" onNext={nextStep} />,
        <SocialSteps key="social" onNext={nextStep} />,
      ]);
    } else if (type === 'corporate') {
      setSteps([<CorporateStep email={email} />]);
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      {steps[currentStep]}
    </div>
  );
}

export default GetStarted;
