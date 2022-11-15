import { Upload, message } from 'antd';
import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import Backdrop from '../../../components/Backdrop';
import axios from 'axios';
import { RESUME_PARSE, SERVER_URL } from '../../../data/constants';
import { useDispatch } from 'react-redux';
import { setStudentResumeData } from '../../../redux/StudentData/StudentData';

interface IProps {
  onNext: (index: number) => void;
}

function ResumeStep({ onNext }: IProps) {
  const dispatch = useDispatch();
  const [file, setFile] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const uploadFile = async (data: string, filename: string) => {
    setLoading(true);
    await axios
      .post(
        `${SERVER_URL}/student${RESUME_PARSE}`,
        {
          file_name: filename.replace(/\s/g, ''),
          data_url: data,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('_token'),
          },
        },
      )
      .then((response) => {
        dispatch(setStudentResumeData({ data: response.data.parse_data }));
        setLoading(false);
        onNext(1);
      })
      .catch((error) => {
        setLoading(false);
        message.error('Time Limit Exceeded. Try Again');
      });
  };

  const props = {
    maxCount: 1,
    accept: '.pdf',
    onDrop(e: any) {},
    beforeUpload: (file: any) => {
      if (file.type === 'application/pdf') {
        const mb = file.size / 1024 / 1024;
        if (mb > 1) {
          message.error('File is large than 1 MB');
        } else {
          setFile([file]);
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.addEventListener('load', () => {
            const blob: string | undefined = reader.result?.toString();
            uploadFile(blob!.split(',')[1], file['name']);
          });
        }
      } else {
        message.error('Unsupported Format');
      }
      return false;
    },
    fileList: file,
  };
  return (
    <div>
      <Backdrop
        loading={loading}
        isResume
        text="We make some math and science to process your resume..."
      />
      <Upload.Dragger {...props} style={{ padding: '20px' }}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined style={{ color: '#79589f' }} />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support only pdf files with max of 1 MB</p>
      </Upload.Dragger>
    </div>
  );
}

export default ResumeStep;
