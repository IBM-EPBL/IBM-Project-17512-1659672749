import React from 'react';
import { Card } from 'antd';
import Buttonx from './Buttonx';
import styles from '../styles/Comp.module.css';
import Inputx from './Inputx';
const DescItem = ({ title, onChange }: any) => {
  return (
    <div className={styles.filterCard}>
      <h2>{title}</h2>
      <Inputx width={'100%'} onChange={onChange} />
    </div>
  );
};
export default function Filter({ setLocation, setName, fetchData }: any) {
  return (
    <Card
      title="Filter By"
      style={{ boxShadow: ' rgba(0, 0, 0, 0.24) 0px 1px 4px', margin: '50px', height: '380px' }}
    >
      <DescItem title="Company Name" onChange={(e: any) => setName(e.target.value)} />
      <DescItem title="Location" onChange={(e: any) => setLocation(e.target.value)} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Buttonx height="40px" width="150px" style={{ borderRadius: '10px' }} onClick={fetchData}>
          <h2 style={{ color: 'white' }}>Search</h2>
        </Buttonx>
      </div>
    </Card>
  );
}
