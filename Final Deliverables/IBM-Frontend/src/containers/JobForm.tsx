import { Switch } from '@chakra-ui/react';
import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { mutate } from 'swr';
import Buttonx from '../components/Buttonx';
import Cardx from '../components/Cardx';
import Inputx from '../components/Inputx';
import TextAreax from '../components/TextAreax';
import { ADD_JOB, SERVER_URL, UPDATE_JOB } from '../data/constants';
import { Tstore } from '../store';

type JobData = {
  _id: string;
  title: string;
  description: string;
  salary: string;
  key_qualifiations: string;
  educational_requirements: string;
  additional_requirements: string;
  application_url: string;
  location: string;
  is_closed: boolean;
};

interface Iprops {
  isEditMode?: boolean;
  data?: JobData;
}

function JobForm(props: Iprops) {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(props.isEditMode ? props.data?.title! : '');
  const [desc, setDesc] = useState<string>(props.isEditMode ? props.data?.description! : '');
  const [qual, setQual] = useState<string>(props.isEditMode ? props.data?.key_qualifiations! : '');
  const [edu, setEdu] = useState<string>(
    props.isEditMode ? props.data?.educational_requirements! : '',
  );
  const [add, setAdd] = useState<string>(
    props.isEditMode ? props.data?.additional_requirements! : '',
  );
  const [link, setLink] = useState<string>(props.isEditMode ? props.data?.application_url! : '');
  const [salary, setSalary] = useState<string>(props.isEditMode ? props.data?.salary! : '');
  const [loc, setLoc] = useState<string>(props.isEditMode ? props.data?.location! : '');
  const [loading, setLoading] = useState<boolean>(false);
  const [isClosed, setIsClosed] = useState<boolean>(
    props.isEditMode ? props.data?.is_closed! : false,
  );

  const { _id } = useSelector((state: Tstore) => state.users.data);

  const postJobHandller = async () => {
    setLoading(true);
    axios
      .post(
        `${SERVER_URL}/job${ADD_JOB}`,
        {
          posted_by: _id,
          title: title,
          description: desc,
          salary: salary,
          key_qualifiations: qual,
          educational_requirements: edu,
          additional_requirements: add,
          application_url: link,
          location: loc,
          date_posted: new Date(),
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('_token'),
          },
        },
      )
      .then((response) => {
        if (response.statusText === 'Created') {
          mutate('get-total-count');
          setLoading(false);
          setAdd('');
          setTitle('');
          setDesc('');
          setQual('');
          setEdu('');
          setLink('');
          setLoc('');
          setSalary('');
          message.success('Job Posted Successfully');
          message.info('We Suggest some candidates based on our evalvation for this job');
        }
      })
      .catch((err) => {
        message.error('Something went wrong');
        message.info('All Fields Are Required One');
        setLoading(false);
      });
  };

  const updateJobHandller = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`${SERVER_URL}/job${UPDATE_JOB}`, {
        _id: props.data?._id,
        title: title,
        description: desc,
        salary: salary,
        key_qualifiations: qual,
        educational_requirements: edu,
        additional_requirements: add,
        application_url: link,
        location: loc,
        is_closed: isClosed,
      });
      if (res.data.success) {
        setLoading(false);
        message.success('Job Updated Successfully');
        navigate('/jobs');
      } else {
        setLoading(false);
        message.error('Something Happened Wrong. Try Again');
      }
    } catch (err) {
      setLoading(false);
      message.error('Something Happened Wrong. Try Again');
    }
  };

  return (
    <>
      <Cardx
        style={{ width: '80%', margin: '30px 0' }}
        title={props.isEditMode ? 'Edit Your Job' : 'Add New Job'}
        bordered={true}
        hoverable
        id={!props.isEditMode ? 'new-job' : ''}
      >
        <p>Job Title</p>
        <Inputx
          width={'100%'}
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></Inputx>
        <p>Job Description</p>
        <TextAreax
          width={'100%'}
          rows={6}
          placeholder="Job Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></TextAreax>
        <p>Key Qualifications</p>
        <TextAreax
          width={'100%'}
          rows={6}
          placeholder="Key Qualifications"
          value={qual}
          onChange={(e) => setQual(e.target.value)}
        ></TextAreax>
        <p>Educational Requirements</p>
        <TextAreax
          width={'100%'}
          rows={6}
          placeholder="Education & Requirements"
          value={edu}
          onChange={(e) => setEdu(e.target.value)}
        ></TextAreax>
        <p>Additional Requirements</p>
        <TextAreax
          width={'100%'}
          rows={4}
          placeholder="Additional Requirements"
          value={add}
          onChange={(e) => setAdd(e.target.value)}
        ></TextAreax>
        <p>Application URL (for applying)</p>
        <Inputx
          width={'100%'}
          placeholder="Application URL"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        ></Inputx>
        <p>Approximation Salary</p>
        <Inputx
          width={'100%'}
          placeholder="Approx. Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        ></Inputx>
        <p>Job Location</p>
        <Inputx
          width={'100%'}
          placeholder="Job Location"
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
        ></Inputx>
        {props.isEditMode && (
          <>
            <p>Is Job Closed</p>
            <Switch
              size={'lg'}
              isChecked={isClosed}
              colorScheme="gray"
              sx={{
                margin: '10px',
              }}
              onChange={(e) => setIsClosed(e.target.checked)}
            />
          </>
        )}
        <br />
        <Buttonx loading={loading} onClick={props.isEditMode ? updateJobHandller : postJobHandller}>
          {props.isEditMode ? 'Update Job' : 'Post Job'}
        </Buttonx>
        {props.isEditMode && <Buttonx onClick={() => navigate('/jobs')}>Cancel</Buttonx>}
      </Cardx>
    </>
  );
}

export default JobForm;
