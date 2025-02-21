import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import MyLayout from './components/Layout'; 
//导入路由pages
import HomePage from './pages/HomePage';  
import DeviceManagement from './pages/deviceSafety/DeviceManagement';
import CheckItemManagement from './pages/deviceSafety/CheckItemManagement';
import DeviceSafetyMonitoring from './pages/deviceSafety/DeviceSafetyMonitoring';
import RiskManagement from './pages/RiskManagement';
import HazardInspection from './pages/HazardInspection';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyLayout />}>
            <Route index element={<Navigate to="/HomePage" replace />} />
            <Route path="/HomePage" element={<HomePage/>} />
            <Route path="device-safety">
              <Route path="devices" element={<DeviceManagement />} />
              <Route path="check-items" element={<CheckItemManagement />} />
              <Route path="monitoring" element={<DeviceSafetyMonitoring />} />
            </Route>
            <Route path="/risks" element={<RiskManagement />} />
            <Route path="/hazards" element={<HazardInspection />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
