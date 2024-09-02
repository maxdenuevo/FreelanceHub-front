import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function Dashboardpage() {
  return (
    <div className="dashboard-container d-flex">
      <Sidebar />
      <div className="content mt-5">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboardpage;