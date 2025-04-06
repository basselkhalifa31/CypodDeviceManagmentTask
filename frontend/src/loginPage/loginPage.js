import {
  Avatar,
  Box,
  Container,
  FormControlLabel,
  Paper,
  TextField,
  Typography,
  Checkbox,
  InputAdornment,
  IconButton,
  Button
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleusernameChange = (event) => {
    setusername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:3030/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.message === "Login successful") {
          localStorage.setItem("token", data.token);
          navigate("/home");
        }
      } else {
        setErrorMessage(data.message || "An error occurred.");
      }
    } catch (error) {
      setErrorMessage("An error occurred, please try again later.");
    }
  };


  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "#89CFF0",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={10} sx={{ width: 400, padding: 2 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            mb: 1,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            placeholder="Enter username"
            fullWidth
            required
            autoFocus
            sx={{ mb: 2 }}
            onChange={handleusernameChange}
          />
          <TextField
            placeholder="Enter password"
            fullWidth
            required
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={handlePasswordChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Typography color="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>

  );
};

export default LoginPage;