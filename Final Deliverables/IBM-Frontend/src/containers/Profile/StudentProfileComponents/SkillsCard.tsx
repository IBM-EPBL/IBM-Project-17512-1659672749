import { DeleteOutlined, EditFilled, FileAddOutlined } from '@ant-design/icons';
import { Select } from '@chakra-ui/react';
import { message } from 'antd';
import axios from 'axios';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Buttonx from '../../../components/Buttonx';
import Cardx from '../../../components/Cardx';
import Inputx from '../../../components/Inputx';
import { SERVER_URL } from '../../../data/constants';
import { Tstore } from '../../../store';

function SkillsCard({ data }: any) {
  const { _id } = useSelector((state: Tstore) => state.users.data);
  const [editable, setEditable] = useState<boolean>(false);
  const [skills, setSkills] = useState<any>([...data]);

  const onCancel = () => {
    setSkills([...data]);
    setEditable(false);
  };

  const onUpdate = async () => {
    const res = await axios.put(
      `${SERVER_URL}/student/update-skills`,
      {
        _id: _id,
        skills: skills,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('_token'),
        },
      },
    );
    if (res.data.success) {
      setEditable(false);
      message.success('Updated Successfully');
    } else {
      message.error('Something Went Wrong, Try Again');
      setEditable(false);
    }
  };
  return (
    <Cardx
      title="Skills"
      hoverable
      extra={
        editable ? (
          <>
            <Buttonx onClick={onCancel}>Cancel</Buttonx>
            <Buttonx onClick={onUpdate}>Save</Buttonx>
          </>
        ) : (
          <Buttonx icon={<EditFilled />} onClick={() => setEditable(true)}>
            Edit
          </Buttonx>
        )
      }
    >
      {skills?.map((skill: any, index: number) => {
        return (
          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <Inputx
              placeholder="skill"
              isReadOnly={!editable}
              border={editable ? 'solid' : 'hidden'}
              onChange={(e) =>
                setSkills((prev: any) => {
                  prev[index] = { skill: e.target.value, level: skills[index].level };
                  return [...prev];
                })
              }
              value={skill.skill}
            />
            <Select
              onChange={(e) =>
                setSkills((prev: any) => {
                  prev[index] = { skill: skills[index].skill, level: e.target.value };
                  return [...prev];
                })
              }
              disabled={!editable}
              border={editable ? 'solid' : 'hidden'}
              focusBorderColor="#79589f"
              value={skill.level}
              sx={{
                marginRight: '10px',
              }}
            >
              <option key={nanoid()} value="beginner">
                beginner
              </option>
              <option key={nanoid()} value="Intermediate">
                Intermediate
              </option>
              <option key={nanoid()} value="Expert">
                Expert
              </option>
            </Select>
            <div style={{ width: '10px' }}></div>
            {editable && (
              <Buttonx
                shape="circle"
                style={{ marginLeft: '10px' }}
                icon={<DeleteOutlined />}
                onClick={() =>
                  setSkills((prev: any) => {
                    prev.splice(index, 1);
                    return [...prev];
                  })
                }
              />
            )}
          </div>
        );
      })}
      {editable && (
        <Buttonx
          shape="round"
          icon={<FileAddOutlined />}
          onClick={() => setSkills([...skills, { skill: '', level: 'beginner' }])}
        >
          Add New Skill
        </Buttonx>
      )}
    </Cardx>
  );
}

export default SkillsCard;
