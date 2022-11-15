import React from 'react';
import { Card, Tooltip } from 'antd';
import Buttonx from '../components/Buttonx';
import { BiBookmark, BiCurrentLocation } from 'react-icons/bi';
import { MdMapsHomeWork } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import Typox from '../components/Typox';
import styles from '../styles/Job.module.css';
interface IJobCard {
  data: {
    title: string;
    description: string;
    company_name: string;
    location: string;
    is_closed: boolean;
    _id: string;
  };
  isEditable?: boolean;
  href?: string;
}

const DescItem = ({ icon, desc }: any) => (
  <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '5px' }}>
    {icon}
    <Typox content="h4" width="80%">
      {desc}
    </Typox>
  </div>
);

export default function JobCard({ data, isEditable, href }: IJobCard) {
  const { title, description, company_name, location, _id, is_closed } = data;
  const flexStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  return (
    <Card
      style={{
        width: '80%',
      }}
      hoverable
      className={styles.card}
      title={
        <>
          <div style={flexStyle}>
            <Text fontSize="xl" isTruncated style={{ fontFamily: 'ProductSansMedium' }}>
              {title}
            </Text>

            <Tooltip title={is_closed ? 'No Longer Accepting' : 'Job is Live'}>
              <BiBookmark
                style={{ fontSize: '24px' }}
                color={isEditable ? (is_closed ? 'red' : 'green') : 'black'}
              />
            </Tooltip>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              gap: '10px',
            }}
          >
            {company_name && (
              <DescItem
                desc={company_name}
                icon={<MdMapsHomeWork style={{ fontSize: '24px' }} />}
              />
            )}
            {location && (
              <DescItem desc={location} icon={<BiCurrentLocation style={{ fontSize: '24px' }} />} />
            )}

            <br />
          </div>
        </>
      }
    >
      <div>
        <Typox content="h3">Description :</Typox>
        <h3 style={{ fontWeight: '100', fontFamily: 'ProductSansMedium' }}>
          {description.substring(0, 240)}...
        </h3>
      </div>
      <Box
        sx={{
          display: 'flex',
          marginTop: '10px',
          justifyContent: 'center',
          gap: '5px',
          '@media screen and (max-width: 680px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        <Link to={`/job/${_id}`}>
          <Buttonx height="40px" width="150px" style={{ borderRadius: '10px' }}>
            <h2 style={{ color: 'white' }}>Read more</h2>
          </Buttonx>
        </Link>
        {isEditable && (
          <Link to={href!}>
            <Buttonx height="40px" width="150px" style={{ borderRadius: '10px' }}>
              <h2 style={{ color: 'white' }}>Edit</h2>
            </Buttonx>
          </Link>
        )}
        {isEditable && (
          <Link to={`/job-stats/${_id}`}>
            <Buttonx height="40px" width="150px" style={{ borderRadius: '10px' }}>
              <h2 style={{ color: 'white' }}>View Stats</h2>
            </Buttonx>
          </Link>
        )}
      </Box>
    </Card>
  );
}
