import { Card, Divider, message } from 'antd';
import axios from 'axios';
import { IsOptional, IsUrl, validate } from 'class-validator';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '../../../components/Backdrop';
import Buttonx from '../../../components/Buttonx';
import Inputx from '../../../components/Inputx';
import { GET_STARTED, SERVER_URL } from '../../../data/constants';
import { useNavigate } from 'react-router-dom';
import { Tstore } from '../../../store';
import { setUserData } from '../../../redux/User/UserDetail';

interface IProps {
  onNext: (index: number) => void;
}

class Links {
  @IsUrl()
  @IsOptional()
  github!: string;

  @IsUrl()
  @IsOptional()
  linkedin!: string;

  @IsUrl()
  @IsOptional()
  hackerrank!: string;

  @IsUrl()
  @IsOptional()
  leetcode!: string;

  @IsUrl()
  @IsOptional()
  portfolio!: string;
}

function SocialSteps({ onNext }: IProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [github, setGithub] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');
  const [hackerrank, setHackerrank] = useState<string>('');
  const [leetcode, setLeetcode] = useState<string>('');
  const [portfolio, setPortfolio] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const { email, address, mobile_number, name, skills, stream, year_of_experience } = useSelector(
    (state: Tstore) => state.studentData,
  );

  const submitHandller = async () => {
    const obj = new Links();
    if (github.length > 0) obj.github = github;
    if (hackerrank.length > 0) obj.hackerrank = hackerrank;
    if (linkedin.length > 0) obj.linkedin = linkedin;
    if (leetcode.length > 0) obj.leetcode = leetcode;
    if (portfolio.length > 0) obj.portfolio = portfolio;

    const isError = await validate(obj);
    if (isError.length > 0) {
      message.error('Invalid URLS');
    } else {
      setLoading(true);
      const socials = [];
      if (github.length > 0) socials.push(github);
      if (hackerrank.length > 0) socials.push(hackerrank);
      if (linkedin.length > 0) socials.push(linkedin);
      if (leetcode.length > 0) socials.push(leetcode);
      if (portfolio.length > 0) socials.push(portfolio);
      const data = {
        email: email,
        name: name,
        location: address,
        mobile_number: mobile_number,
        skills: skills,
        experience_level: year_of_experience,
        education: stream,
        profile: socials,
      };
      axios
        .put(`${SERVER_URL}/student${GET_STARTED}`, data, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('_token'),
          },
        })
        .then((response) => {
          if (response.statusText === 'OK') {
            dispatch(setUserData({ data: { ...response.data, type: 'student' } }));
            setLoading(false);
            navigate('/');
          }
        })
        .catch((error) => {
          message.error('Something Happened Wrong. Try Again');
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <Backdrop loading={loading} text={'Processing your data...'} />
      <Card title="Social Links" hoverable>
        <Inputx
          width="100%"
          placeholder="github url"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
        <Inputx
          width="100%"
          placeholder="linkedin url"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />
        <Inputx
          width="100%"
          placeholder="hackerrank url"
          value={hackerrank}
          onChange={(e) => setHackerrank(e.target.value)}
        />
        <Inputx
          width="100%"
          placeholder="leetcode url"
          value={leetcode}
          onChange={(e) => setLeetcode(e.target.value)}
        />
        <Inputx
          width="100%"
          placeholder="portfolio url"
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
        />
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Buttonx onClick={() => onNext(2)}>Back</Buttonx>
          <Buttonx onClick={submitHandller}>Finish Process</Buttonx>
        </div>
      </Card>
    </div>
  );
}

export default SocialSteps;
