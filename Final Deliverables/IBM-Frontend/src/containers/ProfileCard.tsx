import { EditFilled } from '@ant-design/icons';
import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Backdrop from '../components/Backdrop';
import Buttonx from '../components/Buttonx';
import Cardx from '../components/Cardx';
import Inputx from '../components/Inputx';
import TextAreax from '../components/TextAreax';
import { SERVER_URL, UPDATE_CONTACT_DETAILS, UPDATE_PROFILE } from '../data/constants';

type Data = {
  label: string;
  value: string;
  type: 'Input' | 'TextArea';
  key: string;
};

interface IProps {
  data: Data[];
  title: string;
  _id: string;
  isStudent?: boolean;
}

function ProfileCard(props: IProps) {
  const [editable, setEditable] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const editValues: any = {};
  props.data.forEach((data: Data, index: number) => {
    editValues[`id-${props.title}-${data.key}-${index}`] = data.value;
  });
  useEffect(() => {
    props.data.forEach((data: Data, index: number) => {
      const inputRef = document.getElementById(
        `id-${props.title}-${data.key}-${index}`,
      ) as HTMLInputElement;
      inputRef.value = data.value;
    });
    // eslint-disable-next-line
  }, []);

  const onCancel = () => {
    props.data.forEach((data: Data, index: number) => {
      const inputRef = document.getElementById(
        `id-${props.title}-${data.key}-${index}`,
      ) as HTMLInputElement;
      inputRef.value = data.value;
      editValues[`id-${props.title}-${data.key}-${index}`] = data.value;
    });
    setEditable(false);
  };

  const onChange = (id: string, value: string) => {
    editValues[id] = value;
  };

  const onUpdate = async () => {
    const body: any = {
      _id: props._id,
    };
    Object.keys(editValues).forEach((keys: string) => {
      const key = keys.split('-', 3)[2];
      body[key] = editValues[keys];
    });
    setIsLoading(true);
    if (props.isStudent) {
      const res = await axios.put(`${SERVER_URL}/student${UPDATE_CONTACT_DETAILS}`, body, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('_token'),
        },
      });
      if (res.data.success) {
        setIsLoading(false);
        setEditable(false);
        message.success('Updated Successfully');
      } else {
        setIsLoading(false);
        message.error('Something Went Wrong, Try Again');
        onCancel();
      }
    } else {
      const res = await axios.put(`${SERVER_URL}/corporate${UPDATE_PROFILE}`, body, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('_token'),
        },
      });
      if (res.data.success) {
        setIsLoading(false);
        setEditable(false);
        message.success('Updated Successfully');
      } else {
        setIsLoading(false);
        message.error('Something Went Wrong, Try Again');
        onCancel();
      }
    }
  };

  return (
    <>
      <Cardx
        title={props.title}
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
        {props.data.map((data: Data, index: number) => {
          return (
            <React.Fragment key={index}>
              <p>{data.label}</p>
              {data.type === 'Input' ? (
                <Inputx
                  id={`id-${props.title}-${data.key}-${index}`}
                  isReadOnly={!editable}
                  border={editable ? 'solid' : 'hidden'}
                  onChange={(e) =>
                    onChange(`id-${props.title}-${data.key}-${index}`, e.target.value)
                  }
                />
              ) : (
                <TextAreax
                  id={`id-${props.title}-${data.key}-${index}`}
                  isReadOnly={!editable}
                  border={editable ? 'solid' : 'hidden'}
                  onChange={(e) =>
                    onChange(`id-${props.title}-${data.key}-${index}`, e.target.value)
                  }
                  rows={8}
                />
              )}
            </React.Fragment>
          );
        })}
      </Cardx>
      <Backdrop loading={isLoading} text={'Updating your data....'} />
    </>
  );
}

export default ProfileCard;
