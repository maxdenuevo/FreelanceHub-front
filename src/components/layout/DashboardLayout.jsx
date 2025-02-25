import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbardash from './Navbardash';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbardash />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-4 md:p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 