import { Box, Paper } from "@mui/material";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { DashboardHeader } from "./dashoard-header";

export const Layout = () => {
  const [isExpend, setIsExpend] = useState<boolean>(false);
  return (
    <Box sx={{ display: "flex", position: "relative",mt:'.2rem' }}>
      <Paper sx={{display:'flex',flexDirection:'column',height:'27rem',width:'12rem'}}>
          <NavLink to={"/dashboard"} style={{width:'200px',textAlign:'center',textDecoration:'none',color:'rgba(0,0,0,0.8)',fontSize:'1.2rem',marginBottom:'1rem'}}>Dashboard</NavLink>
          <NavLink to={"/product"} style={{width:'200px',textAlign:'center',textDecoration:'none',color:'rgba(0,0,0,0.8)',fontSize:'1.2rem',marginBottom:'1rem'}}>Product</NavLink>
          <NavLink to={"/tbuysell"} style={{width:'200px',textAlign:'center',textDecoration:'none',color:'rgba(0,0,0,0.8)',fontSize:'1.2rem',marginBottom:'1rem'}}>Total Buy/Sell</NavLink>
      </Paper>
      <Box>
        <DashboardHeader/>
        <Outlet />
      </Box>
    </Box>
  );
};
