import React, { useState } from 'react';
import { Divider } from 'antd';
import Typox from '../components/Typox';
import Buttonx from '../components/Buttonx';
import { BiBookmark } from 'react-icons/bi';
import styles from '../styles/Job.module.css';
import { MdMapsHomeWork } from 'react-icons/md';
import { Tag } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import Backdrop from '../components/Backdrop';
import axios from 'axios';
import { SERVER_URL } from '../data/constants';
import { useSelector } from 'react-redux';
import { Tstore } from '../store';

const DescItem = ({ title, desc }: any) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typox
        content="h2"
        style={{
          marginBottom: '5px',
        }}
      >
        {title}
      </Typox>
      <p style={{ fontFamily: 'product_sansregular', opacity: '0.9', fontSize: '16px' }}>{desc}</p>
    </div>
  );
};
const IconItem = ({ icon, desc }: any) => (
  <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '5px' }}>
    {icon}
    <Typox content="h3" width="80%">
      {desc}
    </Typox>
  </div>
);
export default function Job({ data }: any) {
  const {
    _id,
    title,
    description,
    key_qualifiations,
    salary,
    application_url,
    location,
    date_posted,
    posted_by,
    educational_requirements,
    additional_requirements,
    _required_skills,
  } = data;
  const { mobile_number, company_name, company_address, about, why_us, company_website } =
    posted_by;

  const flexStyle = { display: 'flex', justifyContent: 'space-between' };

  const [isApplying, setIsApplying] = useState<boolean>(false);
  const student_data = useSelector((state: Tstore) => state.users.data);

  const applyHandller = async () => {
    setIsApplying(true);
    await axios.put(`${SERVER_URL}/job/add-candidate`, {
      job_id: _id,
      candidate_id: student_data._id,
    });
    setIsApplying(false);
    window.location.href = application_url;
  };

  return (
    <div className={styles.sJob_main}>
      <Backdrop
        loading={isApplying}
        text={`Navigating To Application form given by ${company_name}`}
      />
      <div style={flexStyle}>
        <Typox content="h2">{title}</Typox>
        <BiBookmark className={styles.sJob_font} />
      </div>
      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '10px',
        }}
      >
        {company_name && (
          <IconItem
            desc={
              <a href={company_website} target="_blank" rel="noreferrer">
                <Typox content="h3">{company_name}</Typox>
              </a>
            }
            icon={<MdMapsHomeWork style={{ fontSize: '24px' }} />}
          />
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typox content="h3">{`Posted On : ${new Date(date_posted).toLocaleDateString()}`}</Typox>
        {student_data.type === 'student' && (
          <Buttonx height="40px" width="110px" onClick={applyHandller}>
            <h3 style={{ color: 'white' }}>Apply</h3>
          </Buttonx>
        )}
      </div>
      <br />
      <div className={styles.sJob_container}>
        <div style={{ flex: '0.75', textAlign: 'justify' }}>
          <DescItem title="Prerequisite" desc={key_qualifiations} />
          <br />
          <DescItem title="Description" desc={description} />
          <br />
          {additional_requirements.length > 2 && (
            <>
              <DescItem title="Additional Requirements" desc={additional_requirements} />
              <br />
            </>
          )}

          <DescItem title={`About ${company_name}`} desc={about} />
          <br />
          <DescItem title={`Why To Join With ${company_name}`} desc={why_us} />
        </div>
        <Divider
          type="vertical"
          style={{ backgroundColor: '#706e6e', opacity: '0.6', height: '100%' }}
        />
        <div style={{ flex: '0.2' }}>
          <DescItem title="Salary" desc={salary} />
          <br />
          <DescItem title="Location" desc={location} />
          <br />
          <DescItem title="Educational Requirements" desc={educational_requirements} />
          <br />
          <DescItem title="Company Address" desc={company_address} />
          <br />
          {mobile_number && <DescItem title="Contact Number" desc={mobile_number} />}
          <br />
          {company_website && <DescItem title="Website" desc={company_website} />}
          <br />
          <Typox content="h2">{'Suggested Skills'}</Typox>
          <p
            style={{
              color: '#706e6e',
            }}
          >
            {_required_skills.map((skill: string) => (
              <Tag key={nanoid()} style={{ margin: '5px', backgroundColor: '#ebebeb' }}>
                {skill}
              </Tag>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
