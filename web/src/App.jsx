import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Pages
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Doctors from './pages/Doctors';
import Pharmacy from './pages/Pharmacy';
import LabTests from './pages/LabTests';
import AIExpert from './pages/AIExpert';
import Camps from './pages/Camps';
import DietPlan from './pages/DietPlan';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ROUTES: App Dashboard Layout */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="pharmacy" element={<Pharmacy />} />
          <Route path="lab-tests" element={<LabTests />} />
          <Route path="ai-expert" element={<AIExpert />} />
          <Route path="camps" element={<Camps />} />
          <Route path="diet-plan" element={<DietPlan />} />
        </Route>

        {/* CATCH-ALL */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
