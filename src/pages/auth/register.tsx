// src/RegisterPage.tsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { log } from "console";
import { useDispatch } from "react-redux";
import { createAccount } from "../../redux/features/auth.slice";

interface FormValues {
  email: string;
  password: string;
  fullname: string;
}

const RegisterPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<FormValues>({
    email: "",
    password: "",
    fullname: "",
  });
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleSubmit = () => {
    console.log(userInfo);
    const data={
      userInfo,
      successCallback:()=>{

      }
    }
    dispatch(createAccount(data))
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;    
    setUserInfo({...userInfo,[name]: value});
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            label="Full Name"
            variant="outlined"
            margin="normal"
            name="fullname"
            fullWidth
            onChange={handleChange}
            value={userInfo.fullname}
          />
          <TextField
            label="Email Address"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
            value={userInfo.email}
            name="email"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleChange}
            value={userInfo.password}
            name="password"
          />
          <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              Register
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleGoToLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
