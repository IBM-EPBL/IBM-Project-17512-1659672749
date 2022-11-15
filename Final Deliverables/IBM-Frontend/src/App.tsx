import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/Shared/Auth';
import AuthX from './components/Auth';
import Dashboard from './pages/Shared/Dashboard';
import GetStarted from './pages/Shared/GetStarted';
import Jobs from './pages/Shared/Jobs';
import SinglePageJobs from './pages/Shared/SinglePageJob';
import Profile from './pages/Shared/Profile';
import ManageJob from './pages/Corporate/ManageJob';
import Assessment from './pages/Student/Assessment';
import Test from './pages/Student/Test';
import JobStats from './pages/Corporate/JobStats';
import Hackathon from './pages/Student/Hackathon'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route element={<AuthX />}>
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:id" element={<SinglePageJobs />} />
          <Route path="/manage-job/:id" element={<ManageJob />} />
          <Route path="/job-stats/:id" element={<JobStats />} />
          <Route path="/assessments" element={<Assessment />} />
          <Route path="/assessment/test-board" element={<Test />} />
          <Route path="/hackathon" element={<Hackathon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
