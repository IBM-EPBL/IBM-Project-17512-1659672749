import React from 'react';
import Lottie from 'react-lottie-player';
import Scanner from '../data/Scanner.json';
import Loading from '../data/loader.json';
import { Box, Center } from '@chakra-ui/react';

type IBack = {
  loading: boolean;
  text: string;
  isResume?: boolean;
};
function Backdrop(props: IBack) {
  return (
    <Box
      sx={{
        position: 'fixed',
        display: props.loading ? 'block' : 'none',
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
          animationData={props.isResume ? Scanner : Loading}
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
          {props.text}
        </h2>
      </Center>
    </Box>
  );
}

export default Backdrop;
