import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Tstore } from '../../store';
import NavBar from '../../components/NavBar';
import CorporateProfile from '../../containers/Profile/CorporateProfile';
import StudentProfile from '../../containers/Profile/StudentProfile';

function Profile() {
  const navigate = useNavigate();
  const { is_steps_completed, type } = useSelector((state: Tstore) => state.users.data);

  useEffect(() => {
    if (!is_steps_completed) {
      navigate('/get-started');
    }
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <NavBar />
      <main>
        {type === 'corporate' ? (
          <CorporateProfile />
        ) : (
          <>
            <StudentProfile />
          </>
        )}
      </main>
    </>
  );
}

export default Profile;
