import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbardash from './Navbardash';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-background">
      <div className="fixed inset-y-0 left-0 z-50 w-64 transform transition duration-200 ease-in-out md:relative md:translate-x-0">
        <Sidebar />
      </div>
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbardash />
        
        <main className="flex-1 overflow-y-auto bg-secondary/10 p-4 md:p-6">
          <div className="animate-fade-in mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 