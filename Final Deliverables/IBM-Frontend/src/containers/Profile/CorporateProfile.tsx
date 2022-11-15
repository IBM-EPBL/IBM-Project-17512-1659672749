import { Avatar, Box } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { Tstore } from '../../store';
import CorporateDetailsCard from '../ProfileCard';

function CorporateProfile() {
  const {
    _id,
    company_name,
    company_logo,
    company_website,
    mobile_number,
    about,
    company_address,
    why_us,
    employees,
  } = useSelector((state: Tstore) => state.users.data);

  return (
    <Box
      sx={{
        padding: '30px',
      }}
    >
      <Avatar size={'2xl'} src={company_logo} />
      <h1
        style={{
          margin: '16px 0',
          fontSize: '32px',
        }}
      >
        {company_name}
      </h1>

      <CorporateDetailsCard
        title="Contact Information"
        _id={_id}
        data={[
          {
            label: 'Company Website',
            value: company_website,
            type: 'Input',
            key: 'company_website',
          },
          {
            label: 'Company Logo',
            value: company_logo,
            type: 'Input',
            key: 'company_logo',
          },
          {
            label: 'Contact Number',
            value: mobile_number,
            type: 'Input',
            key: 'mobile_number',
          },
          {
            label: 'Address',
            value: company_address,
            type: 'TextArea',
            key: 'company_address',
          },
        ]}
      />
      <CorporateDetailsCard
        title="Additional Inforrmation"
        _id={_id}
        data={[
          {
            label: 'About Company',
            value: about,
            type: 'TextArea',
            key: 'about',
          },
          {
            label: `Why ${company_name}`,
            value: why_us,
            type: 'TextArea',
            key: 'why_us',
          },
          {
            label: 'Total Employees',
            value: employees,
            type: 'Input',
            key: 'employees',
          },
        ]}
      />
    </Box>
  );
}

export default CorporateProfile;
