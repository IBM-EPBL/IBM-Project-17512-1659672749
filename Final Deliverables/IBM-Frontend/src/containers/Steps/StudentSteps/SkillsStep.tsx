import { Card, Divider } from 'antd';
import { Select } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tstore } from '../../../store';
import { nanoid } from 'nanoid';
import Inputx from '../../../components/Inputx';
import {
  addSkill,
  deleteSkill,
  setSkillName,
  setSkillLevel,
} from '../../../redux/StudentData/StudentData';
import Buttonx from '../../../components/Buttonx';
import { DeleteOutlined, FileAddOutlined } from '@ant-design/icons';

interface IProps {
  onNext: (index: number) => void;
}

function SkillsStep({ onNext }: IProps) {
  const dispatch = useDispatch();
  const { skills } = useSelector((state: Tstore) => state.studentData);
  return (
    <div>
      <Card title="Skills" hoverable>
        {skills?.map((skill, index) => {
          return (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Inputx
                placeholder="skill"
                onChange={(e) => dispatch(setSkillName({ index, data: e.target.value }))}
                value={skill?.skill}
              />
              <Select
                onChange={(value) => {
                  dispatch(setSkillLevel({ index: index, data: value.target.value as any }));
                }}
                focusBorderColor="#79589f"
                placeholder="Select Option"
                value={skill?.level}
                sx={{
                  marginRight: '10px',
                }}
              >
                <option key={nanoid()} value="Beginner">
                  Beginner
                </option>
                <option key={nanoid()} value="Intermediate">
                  Intermediate
                </option>
                <option key={nanoid()} value="Expert">
                  Expert
                </option>
              </Select>
              <div style={{ width: '10px' }}></div>
              <Buttonx
                shape="circle"
                style={{ marginLeft: '10px' }}
                icon={<DeleteOutlined />}
                onClick={() => dispatch(deleteSkill(index))}
              />
            </div>
          );
        })}
        <Buttonx shape="round" icon={<FileAddOutlined />} onClick={() => dispatch(addSkill(0))}>
          Add New Skill
        </Buttonx>
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Buttonx onClick={() => onNext(1)}>Back</Buttonx>
          <Buttonx onClick={() => onNext(3)}>Next</Buttonx>
        </div>
      </Card>
    </div>
  );
}

export default SkillsStep;
