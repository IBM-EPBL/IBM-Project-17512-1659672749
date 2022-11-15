import { message } from 'antd';
import axios from 'axios';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  validate,
} from 'class-validator';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Buttonx from '../components/Buttonx';
import Inputx from '../components/Inputx';
import { SERVER_URL, SIGNIN, SIGNUP } from '../data/constants';
import { setUserData } from '../redux/User/UserDetail';
import { encoding } from '../utils/encoding';
import { getFBToken } from '../utils/firebaseInit';
interface IProps {
  type: 'signup' | 'signin';
  user: 'student' | 'corporate';
}

class SignIn {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

class SignUp {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsString()
  @IsNotEmpty()
  confirm_password!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsOptional()
  @IsMobilePhone()
  mobile_number!: string;
}

function AuthForm({ type, user }: IProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const signup = async () => {
    const obj = new SignUp();
    obj.email = (document.getElementById(`signup-${user}-email`) as HTMLInputElement).value;
    obj.name = (document.getElementById(`signup-${user}-name`) as HTMLInputElement).value;
    obj.password = (document.getElementById(`signup-${user}-password`) as HTMLInputElement).value;
    obj.confirm_password = (
      document.getElementById(`signup-${user}-confirm-password`) as HTMLInputElement
    ).value;
    if (user === 'student')
      obj.mobile_number = (
        document.getElementById(`signup-${user}-mobile`) as HTMLInputElement
      ).value;
    const isError = await validate(obj);
    if (isError.length > 0) message.error('check your inputs');
    else {
      if (obj.confirm_password === obj.password) {
        setLoading(true);
        const data: any = {};
        if (user === 'student') {
          data['email'] = obj.email;
          data['mobile_number'] = obj.mobile_number;
          data['name'] = obj.name;
          data['password'] = encoding(obj.password);
          data['device_id'] = await getFBToken();
        } else {
          data['email'] = obj.email;
          data['company_name'] = obj.name;
          data['password'] = encoding(obj.password);
        }
        axios
          .post(`${SERVER_URL}/${user}${SIGNUP}`, data)
          .then((response) => {
            if (response.statusText === 'Created') {
              (document.getElementById(`signup-${user}-email`) as HTMLInputElement).value = '';
              (document.getElementById(`signup-${user}-name`) as HTMLInputElement).value = '';
              (document.getElementById(`signup-${user}-password`) as HTMLInputElement).value = '';
              (
                document.getElementById(`signup-${user}-confirm-password`) as HTMLInputElement
              ).value = '';
              if (user === 'student')
                (document.getElementById(`signup-${user}-mobile`) as HTMLInputElement).value = '';
              localStorage.setItem('_token', response.data.token);
              localStorage.setItem('_type', encoding(user));
              dispatch(setUserData({ data: { ...response.data.data, type: user } }));
              setLoading(false);
              navigate('/get-started');
            }
          })
          .catch((error) => {
            message.error('Something happened wrong. Try Again');
            (document.getElementById(`signup-${user}-email`) as HTMLInputElement).value = '';
            (document.getElementById(`signup-${user}-name`) as HTMLInputElement).value = '';
            (document.getElementById(`signup-${user}-password`) as HTMLInputElement).value = '';
            (document.getElementById(`signup-${user}-confirm-password`) as HTMLInputElement).value =
              '';
            if (user === 'student')
              (document.getElementById(`signup-${user}-mobile`) as HTMLInputElement).value = '';
            setLoading(false);
          });
      } else {
        message.error('Password does not match');
      }
    }
  };

  const signin = async () => {
    const value = new SignIn();
    value.email = (document.getElementById(`signin-${user}-email`) as HTMLInputElement).value;
    value.password = (document.getElementById(`signin-${user}-password`) as HTMLInputElement).value;
    const isError = await validate(value);
    if (isError.length > 0) {
      message.error('Check your inputs');
    } else {
      setLoading(true);
      axios
        .get(
          `${SERVER_URL}/${user}${SIGNIN}?email=${value.email}&password=${encoding(
            value.password,
          )}`,
        )
        .catch((error) => {
          if (error.response.status === 403) {
            message.error('Credential not matched');
          } else if (error.response.status === 404) {
            message.error('Trying to signup?');
          } else {
            message.error('Something happened wrong...');
          }
          setLoading(false);
          (document.getElementById(`signin-${user}-email`) as HTMLInputElement).value = '';
          (document.getElementById(`signin-${user}-password`) as HTMLInputElement).value = '';
        })
        .then((response: any) => {
          if (response && response.statusText === 'OK') {
            localStorage.setItem('_token', response.data.token);
            localStorage.setItem('_type', encoding(user));
            dispatch(setUserData({ data: { ...response.data.data, type: user } }));
            setLoading(false);
            (document.getElementById(`signin-${user}-email`) as HTMLInputElement).value = '';
            (document.getElementById(`signin-${user}-password`) as HTMLInputElement).value = '';
            if (response.data.data.is_steps_completed) {
              navigate('/');
            } else {
              navigate('/get-started');
            }
          }
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
        padding: '10px',
      }}
    >
      {type === 'signup' ? (
        user === 'student' ? (
          <>
            <Inputx width={'60%'} id="signup-student-name" placeholder="name" />
            <Inputx
              width={'60%'}
              id="signup-student-email"
              placeholder="expample@institution.edu"
              type={'email'}
            />
            <Inputx
              width={'60%'}
              id="signup-student-password"
              placeholder="password"
              type={'password'}
            />
            <Inputx
              width={'60%'}
              id="signup-student-confirm-password"
              placeholder="confirm password"
              type={'password'}
            />
            <Inputx
              width={'60%'}
              id="signup-student-mobile"
              placeholder="+91xxxxxxxxxx"
              type={'text'}
            />
            <Buttonx type="default" onClick={() => signup()} loading={loading} disabled={loading}>
              Create Account
            </Buttonx>
          </>
        ) : (
          <>
            <Inputx width={'60%'} id="signup-corporate-name" placeholder="company name" />
            <Inputx
              width={'60%'}
              id="signup-corporate-email"
              placeholder="expample@company.com"
              type={'email'}
            />
            <Inputx
              width={'60%'}
              id="signup-corporate-password"
              placeholder="password"
              type={'password'}
            />
            <Inputx
              width={'60%'}
              id="signup-corporate-confirm-password"
              placeholder="confirm password"
              type={'password'}
            />
            <Buttonx type="default" onClick={() => signup()} loading={loading} disabled={loading}>
              Create Account
            </Buttonx>
          </>
        )
      ) : user === 'student' ? (
        <>
          <Inputx
            id="signin-student-email"
            placeholder="expample@institution.edu"
            type={'email'}
            focusBorderColor="#bcaccf"
          />
          <Inputx id="signin-student-password" placeholder="password" type={'password'} />
          <Buttonx type="default" onClick={() => signin()} loading={loading} disabled={loading}>
            Sign In
          </Buttonx>
        </>
      ) : (
        <>
          <Inputx
            width={'60%'}
            id="signin-corporate-email"
            placeholder="expample@company.com"
            type={'email'}
          />
          <Inputx
            width={'60%'}
            id="signin-corporate-password"
            placeholder="password"
            type={'password'}
          />
          <Buttonx type="default" onClick={() => signin()} loading={loading} disabled={loading}>
            Sign In
          </Buttonx>
        </>
      )}
    </div>
  );
}

export default AuthForm;
