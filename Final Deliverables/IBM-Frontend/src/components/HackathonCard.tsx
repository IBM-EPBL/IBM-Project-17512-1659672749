import React from 'react';
import { Box, Center, Tag, Flex } from '@chakra-ui/react';
import Typox from './Typox';
import Buttonx from './Buttonx';
export default function HackathonCard({ data }: any) {
  return (
    <Box
      padding="20px"
      margin="20px"
      width="340px"
      height="330px"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      style={{ position: 'relative' }}
    >
      <Flex justify="space-between" flexDirection={'column'}>
        <Flex align={'center'} style={{ gap: '10px' }}>
          <img src={data.image} alt={data.title} style={{ height: '80px', width: '100px' }} />
          <Typox content="h3">{data.title}</Typox>
        </Flex>
        <Flex
          justify="flex-end"
          flexDirection={'column'}
          style={{ margin: '10px 0px', gap: '5px' }}
        >
          <h2 style={{ fontSize: '15px', fontFamily: 'ProductSansMedium' }}>{data.company}</h2>
          <h2 style={{ fontSize: '15px', color: '#4d4c4c', fontFamily: 'ProductSansMedium' }}>
            {data.date}
          </h2>
          <Flex wrap={'wrap'} justifyContent="center">
            {data &&
              data.tags.map((item: any, index: number) => (
                <Tag
                  key={index}
                  style={{ margin: '5px', backgroundColor: '#ebebeb', padding: '5px' }}
                >
                  <h2
                    style={{ fontSize: '15px', color: '#4d4c4c', fontFamily: 'ProductSansMedium' }}
                  >
                    {item}
                  </h2>
                </Tag>
              ))}
          </Flex>
        </Flex>
      </Flex>
      <Center style={{ position: 'absolute', bottom: '20px', left: '25%' }}>
        <a href={data.link} target="_blank" rel="noreferrer">
          <Buttonx height="40px" width="150px" style={{ borderRadius: '10px' }}>
            <h2 style={{ color: 'white' }}>Apply</h2>
          </Buttonx>
        </a>
      </Center>
    </Box>
  );
}
