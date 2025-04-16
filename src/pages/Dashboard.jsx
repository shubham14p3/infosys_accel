// src/components/Dashboard.jsx
import { Routes, Route } from 'react-router-dom';
import PageSkeleton from './PageSkeleton';
import GenerateEventsPage from './GenerateEventsPage';
import ExecutePage from './ExecutePage';
import HistoryPage from './HistoryPage';
import DashboardWelcome from './DashboardWelcome';
import DashboardWelcome2 from './DashboardWelcome2';

const Dashboard = () => {
  return (
    <PageSkeleton>
      <Routes>
        <Route path="home2" element={<DashboardWelcome />} /> 
        <Route path="" element={<DashboardWelcome2 />} /> {/* Default route */}
        <Route path="generate-events" element={<GenerateEventsPage />} />
        <Route path="execute" element={<ExecutePage />} />
        <Route path="history" element={<HistoryPage />} />
      </Routes>
    </PageSkeleton>
  );
};

export default Dashboard;
