import { Box } from '@chakra-ui/react';
import { Tabs } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Typox from '../../components/Typox';
import AuthForm from '../../containers/AuthForm';
import { ISLOGGEDIN, SERVER_URL } from '../../data/constants';
import { setUserData } from '../../redux/User/UserDetail';
import { decoding } from '../../utils/encoding';

function Auth() {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const LoginHandller = async (user: string) => {
    const response = await axios.get(`${SERVER_URL}/${user}${ISLOGGEDIN}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('_token'),
      },
    });
    if (response.statusText === 'OK') {
      if (response.data.is_steps_completed) {
        dispatch(setUserData({ data: { ...response.data, type: user } }));
        setIsAuth(true);
      } else setIsAuth(false);
    } else {
      setIsAuth(false);
    }
  };

  useEffect(() => {
    const type = localStorage.getItem('_type');
    if (type) {
      const value = decoding(type);
      if (value === 'student') {
        LoginHandller('student');
      } else if (value === 'corporate') {
        LoginHandller('corporate');
      } else {
        setIsAuth(false);
      }
    } else {
      setIsAuth(false);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isAuth && <Navigate to="/" />}
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typox content="body">{'Welcome To FIJO Portal'}</Typox>
        <br />
        <Box
          sx={{
            width: '50vw',
            '@media screen and (max-width: 700px)': {
              width: '100vw',
              padding: '20px',
            },
          }}
        >
          <Tabs defaultActiveKey="1" tabPosition="bottom" centered>
            <Tabs.TabPane id="signup" tab="Sign Up" key="2">
              <Tabs defaultActiveKey="1" centered>
                <Tabs.TabPane key="1" tab="Student">
                  <AuthForm key="signup-student" type="signup" user="student" />
                </Tabs.TabPane>
                <Tabs.TabPane key="2" tab="Corporate">
                  <AuthForm key="signup-corporate" type="signup" user="corporate" />
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Sign In" key="1">
              <Tabs defaultActiveKey="1" centered>
                <Tabs.TabPane key="1" tab="Student">
                  <AuthForm key="signin-student" type="signin" user="student" />
                </Tabs.TabPane>
                <Tabs.TabPane key="2" tab="Corporate">
                  <AuthForm key="signin-corporate" type="signin" user="corporate" />
                </Tabs.TabPane>
              </Tabs>
            </Tabs.TabPane>
          </Tabs>
        </Box>
      </Box>
    </>
  );
}

export default Auth;
