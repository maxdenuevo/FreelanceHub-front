import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbardash from '@/components/layout/Navbardash';
import Sidebar from '@/components/layout/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbardash />
      
      <div className="flex flex-1">
        <Sidebar />
        
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 