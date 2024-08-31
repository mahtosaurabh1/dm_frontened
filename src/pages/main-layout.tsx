import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Appheader from './shared-component/app-header';



const MainLayout = () => {
  return (
    <div>
    <Appheader />
    <main className="main-content">
      <Outlet />
    </main>
  </div>
  );
};

export default MainLayout;
