import { DeleteOutlined, EditFilled, FileAddOutlined } from '@ant-design/icons';
import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Buttonx from '../../../components/Buttonx';
import Cardx from '../../../components/Cardx';
import Inputx from '../../../components/Inputx';
import { SERVER_URL } from '../../../data/constants';
import { Tstore } from '../../../store';

function EducationCard({ education }: any) {
  const { _id } = useSelector((state: Tstore) => state.users.data);
  const [editable, setEditable] = useState<boolean>(false);
  const [data, setData] = useState<any>([...education]);

  const onCancel = () => {
    setEditable(false);
    setData([...education]);
  };

  const onUpdate = async () => {
    const res = await axios.put(
      `${SERVER_URL}/student/update-education`,
      {
        _id: _id,
        education: data,
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
      title="Education Details"
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
      {data.map((data: any, index: number) => {
        return (
          <div key={index} style={{ display: 'flex' }}>
            <Inputx
              placeholder="Stream"
              value={data.stream}
              isReadOnly={!editable}
              border={editable ? 'solid' : 'hidden'}
              width={'30%'}
              onChange={(e) =>
                setData((prev: any) => {
                  prev[index] = {
                    stream: e.target.value,
                    institution: prev[index].institution,
                    grade: prev[index].grade,
                  };
                  return [...prev];
                })
              }
            />
            <Inputx
              placeholder="Institution"
              isReadOnly={!editable}
              border={editable ? 'solid' : 'hidden'}
              value={data.institution}
              width={'30%'}
              onChange={(e) =>
                setData((prev: any) => {
                  prev[index] = {
                    stream: prev[index].stream,
                    institution: e.target.value,
                    grade: prev[index].grade,
                  };
                  return [...prev];
                })
              }
            />
            <Inputx
              placeholder="Grade/CGPA"
              isReadOnly={!editable}
              border={editable ? 'solid' : 'hidden'}
              value={data.grade}
              width={'30%'}
              onChange={(e) =>
                setData((prev: any) => {
                  prev[index] = {
                    stream: prev[index].stream,
                    institution: prev[index].institution,
                    grade: e.target.value,
                  };
                  return [...prev];
                })
              }
            />
            {editable && (
              <Buttonx
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={(e) =>
                  setData((prev: any) => {
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
          onClick={() => setData([...data, { stream: '', institution: '', grade: '' }])}
        >
          Add Another Education Field
        </Buttonx>
      )}
    </Cardx>
  );
}

export default EducationCard;
