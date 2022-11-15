import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Tstore } from '../../store';
import CompanyDashboard from '../../containers/Dashboard/CorporateDashboard';
import NavBar from '../../components/NavBar';
import StudentDashboard from '../../containers/Dashboard/StudentDashboard';

function Dashboard() {
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
          <CompanyDashboard />
        ) : (
          <>
            <StudentDashboard />
          </>
        )}
      </main>
    </>
  );
}

export default Dashboard;
