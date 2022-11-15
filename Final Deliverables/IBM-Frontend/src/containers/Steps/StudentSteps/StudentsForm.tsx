import { Card, message } from 'antd';
import {
  IsArray,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsString,
  validate,
} from 'class-validator';
import React from 'react';
import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Buttonx from '../../../components/Buttonx';
import Inputx from '../../../components/Inputx';
import TextAreax from '../../../components/TextAreax';
import {
  setEmail,
  setName,
  setYearsOfExperience,
  setAddress,
  setMobile,
  setStreamName,
  setStreamInstitutiion,
  setStreamGrade,
  addStream,
  deleteStream,
} from '../../../redux/StudentData/StudentData';
import { Tstore } from '../../../store';

interface IProps {
  onNext: (index: number) => void;
}

class Values {
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsMobilePhone()
  @IsNotEmpty()
  mobile_number?: string;

  @IsNumber()
  @IsNotEmpty()
  year_of_experience?: number;

  @IsArray()
  @IsNotEmpty()
  stream?: any[];

  @IsString()
  @IsNotEmpty()
  address?: string;
}

function StudentsForm({ onNext }: IProps) {
  const dispatch = useDispatch();
  const { name, mobile_number, address, stream, year_of_experience } = useSelector(
    (state: Tstore) => state.studentData,
  );

  const { email } = useSelector((state: Tstore) => state.users.data);

  const next = (fn: (index: number) => void) => {
    fn(2);
  };

  const handleNext = async () => {
    const obj = new Values();
    obj.address = address;
    obj.email = email;
    obj.mobile_number = mobile_number;
    obj.name = name;
    obj.stream = stream;
    obj.year_of_experience = year_of_experience;
    const isError = await validate(obj);
    if (isError.length > 0) {
      message.error('Invalid Inputs');
    } else {
      next(onNext);
    }
  };

  return (
    <>
      <Card title="Personal Details" hoverable style={{ margin: '20px 0' }}>
        <p style={{ color: '#808080', margin: '10px' }}>Email (same as account)</p>
        <Inputx
          placeholder="email"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
        <p style={{ color: '#808080', margin: '10px' }}>Name</p>
        <Inputx
          placeholder="name"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
        />
        <p style={{ color: '#808080', margin: '10px' }}>Education</p>
        {stream?.map((stream: any, key: number) => {
          return (
            <div key={key} style={{ display: 'flex' }}>
              <Inputx
                placeholder="Stream"
                value={stream.stream}
                width={'30%'}
                onChange={(e) => dispatch(setStreamName({ index: key, data: e.target.value }))}
              />
              <Inputx
                placeholder="Institution"
                value={stream.institution}
                width={'30%'}
                onChange={(e) =>
                  dispatch(setStreamInstitutiion({ index: key, data: e.target.value }))
                }
              />
              <Inputx
                placeholder="Grade/CGPA"
                value={stream.grade}
                width={'20%'}
                onChange={(e) => dispatch(setStreamGrade({ index: key, data: e.target.value }))}
              />
              <Buttonx
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => dispatch(deleteStream(key))}
              />
            </div>
          );
        })}
        <Buttonx shape="round" icon={<FileAddOutlined />} onClick={() => dispatch(addStream(0))}>
          Add Another Education Field
        </Buttonx>
        <p style={{ color: '#808080', margin: '10px' }}>Experience</p>
        <Inputx
          placeholder="year of experience"
          type="number"
          min={0}
          value={year_of_experience}
          onChange={(e) => dispatch(setYearsOfExperience(parseInt(e.target.value)))}
        />
        <p style={{ color: '#808080', margin: '10px' }}>Mobile Number</p>
        <Inputx
          placeholder="+91xxxxxxxxxx"
          value={mobile_number}
          onChange={(e) => dispatch(setMobile(e.target.value))}
        />
        <p style={{ color: '#808080', margin: '10px' }}>Current Address</p>
        <TextAreax
          placeholder="Address"
          rows={5}
          value={address}
          onChange={(e) => dispatch(setAddress(e.target.value))}
        />
        <br />
        <Buttonx onClick={handleNext}>Next</Buttonx>
      </Card>
    </>
  );
}

export default StudentsForm;
