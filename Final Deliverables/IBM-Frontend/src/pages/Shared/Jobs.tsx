import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Tstore } from '../../store';
import NavBar from '../../components/NavBar';
import CorporateJobs from '../../containers/Jobs/CorporateJobs';
import StudentJobs from '../../containers/Jobs/StudentJobs';

function Jobs() {
  const navigate = useNavigate();
  const { is_steps_completed, type } = useSelector((state: Tstore) => state.users.data);

  useEffect(() => {
    window.scrollTo(0, 0);
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
          <CorporateJobs />
        ) : (
          <>
            <StudentJobs />
          </>
        )}
      </main>
    </>
  );
}

export default Jobs;
