import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Appheader from './shared-component/app-header';
import { Box } from '@mui/material';



const MainLayout = () => {
  const navigate=useNavigate();
  const isAuthenticated = () => {
    return localStorage.getItem("userinfo") !== null;
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
    <Appheader />
    <Box sx={{backgroundColor:'#EAE4DD',height:'90.7vh',width:'80hw'}}>
      <Outlet />
    </Box>
  </div>
  );
};

export default MainLayout;
