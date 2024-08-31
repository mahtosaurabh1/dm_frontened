// src/RegisterPage.tsx
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAccount } from '../../redux/features/auth.slice';

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
   const [userInfo,setUserInfo]=useState<FormValues>({
    email: "",
    password: "",
   })

  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleSubmit = () => {
    console.log(userInfo);
    const data={
      userInfo,
      successCallback:()=>{

      }
    }
    dispatch(loginAccount(data))
    // Handle registration logic here, e.g., API call
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGotoRegister=()=>{
    navigate('/register')
  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form"  sx={{ mt: 1 }}>
          <TextField
                label="Email Address"
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={handleChange}
                name="email"
                value={userInfo.email}
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
              onClick={handleGotoRegister}
            >
              Register
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
