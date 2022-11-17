import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ISLOGGEDIN, SERVER_URL } from '../data/constants';
import { setUserData } from '../redux/User/UserDetail';
import { useDispatch } from 'react-redux';
import { decoding } from '../utils/encoding';
import { Navigate, Outlet } from 'react-router-dom';
import { Box, Center } from '@chakra-ui/react';
import Lottie from 'react-lottie-player';
import auth from '../data/auth.json';

function Auth() {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const LoginHandller = async (user: string) => {
    try {
      const response = await axios.get(`${SERVER_URL}/${user}${ISLOGGEDIN}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('_token'),
        },
      });
      if (response.statusText === 'OK') {
        if (response.data) {
          dispatch(setUserData({ data: { ...response.data, type: user } }));
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } else {
        setIsAuth(false);
      }
    } catch (err) {
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
  return isAuth === true ? (
    <Outlet />
  ) : isAuth === false ? (
    <Navigate to="/login" />
  ) : (
    <Box
      sx={{
        position: 'fixed',
        display: 'block',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: '#ffffff',
        zIndex: 2,
        cursor: 'wait',
      }}
    >
      <Center
        flexDirection={'column'}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <Lottie
          loop
          animationData={auth}
          play
          style={{ width: 250, height: 250, margin: 'auto' }}
        />
        <h2
          style={{
            color: '#fff',
            fontSize: '18px',
            marginTop: '10px',
          }}
        >
          {'Identifying who you are...'}
        </h2>
      </Center>
    </Box>
  );
}

export default Auth;
