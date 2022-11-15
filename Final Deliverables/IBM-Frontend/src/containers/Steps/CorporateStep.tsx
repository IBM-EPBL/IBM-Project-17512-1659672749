import { Card, message } from 'antd';
import axios from 'axios';
import {
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  validate,
} from 'class-validator';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Buttonx from '../../components/Buttonx';
import Inputx from '../../components/Inputx';
import TextAreax from '../../components/TextAreax';
import { CORPORATE_UPDATE, SERVER_URL } from '../../data/constants';
import { setUserData } from '../../redux/User/UserDetail';
import { useSelector } from 'react-redux';
import { Tstore } from '../../store';

class Values {
  @IsMobilePhone()
  @IsNotEmpty()
  mobile_number!: string;

  @IsUrl()
  @IsNotEmpty()
  company_website!: string;

  @IsUrl()
  @IsOptional()
  company_logo!: string;

  @IsString()
  @IsNotEmpty()
  company_address!: string;

  @IsString()
  @IsNotEmpty()
  about!: string;

  @IsString()
  @IsNotEmpty()
  why!: string;

  @IsNumber()
  @IsNotEmpty()
  minEmployees!: number | undefined;

  @IsNumber()
  @IsNotEmpty()
  maxEmployees!: number | undefined;
}

function CorporateStep({ email }: { email: string }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { company_name } = useSelector((state: Tstore) => state.users.data);
  const [mobile, setMobile] = useState<string>('');
  const [web, setWeb] = useState<string>('');
  const [logo, setLogo] = useState<string>('');
  const [about, setAbout] = useState<string>('');
  const [why, setWhy] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [minEmployees, setMinEmployees] = useState<number>();
  const [maxEmployees, setMaxEmployees] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);

  const submitHandller = async () => {
    const obj = new Values();
    obj.mobile_number = mobile.replace(/[-\s]/g, '');
    obj.company_address = address;
    obj.company_logo = logo;
    obj.company_website = web;
    obj.about = about;
    obj.why = why;
    obj.minEmployees = minEmployees;
    obj.maxEmployees = maxEmployees;

    const isError = await validate(obj);
    if (isError.length > 0) {
      message.error('Invalid Inputs');
    } else {
      setLoading(true);
      axios
        .put(
          `${SERVER_URL}/corporate${CORPORATE_UPDATE}`,
          {
            email: email,
            mobile_number: obj.mobile_number,
            company_address: obj.company_address,
            company_logo: obj.company_logo,
            company_website: obj.company_website,
            about: obj.about,
            why_us: obj.why,
            employees: `${obj.minEmployees} - ${obj.maxEmployees}`,
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('_token'),
            },
          },
        )
        .then((response: any) => {
          if (response.statusText === 'OK') {
            message.success('Login Process Successfully Completed');
            setLoading(false);
            dispatch(setUserData({ data: { ...response.data.data, type: 'corporate' } }));
            navigate('/');
          }
        })
        .catch((error) => {
          message.error('Something Wrong. Try Again');
          setLoading(false);
        });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card hoverable title={`Tell More About ${company_name}`}>
        <p>Company Mobile Number</p>
        <Inputx
          type="text"
          width="50vw"
          placeholder="+91xxxxxxxxxx"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        ></Inputx>
        <p>Company Website</p>
        <Inputx
          width={'50vw'}
          placeholder="https://example.com"
          value={web}
          onChange={(e) => setWeb(e.target.value)}
        />
        <p>Company Logo</p>
        <Inputx
          width={'50vw'}
          placeholder="https://example.com/assets/logo.png"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
        />
        <p>Company Address</p>
        <TextAreax
          width={'50vw'}
          placeholder="company address"
          rows={5}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <p>{`About Your Company`}</p>
        <TextAreax
          width={'50vw'}
          placeholder="About you company and what you are doing..."
          rows={5}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <p>Why To Choose Us?</p>
        <TextAreax
          width={'50vw'}
          placeholder="Why candidates should choose your comapny.."
          rows={5}
          value={why}
          onChange={(e) => setWhy(e.target.value)}
        />
        <br />
        <p>Total Employees</p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Inputx
            width={'50%'}
            placeholder="100"
            type={'number'}
            min={0}
            value={minEmployees}
            onChange={(e) => setMinEmployees(parseInt(e.target.value))}
          />
          <p> - </p>
          <Inputx
            width={'50%'}
            placeholder="350"
            type="number"
            min={1}
            value={maxEmployees}
            onChange={(e) => setMaxEmployees(parseInt(e.target.value))}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <Buttonx onClick={submitHandller} loading={loading} disabled={loading}>
            Complete Process
          </Buttonx>
        </div>
      </Card>
    </div>
  );
}

export default CorporateStep;
