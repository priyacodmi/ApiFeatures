import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "Redux/AuthReducer/action";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MCQ Test website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const theme = createTheme();

export default function LogIn() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const { email, password } = loginData;
  const navigate = useNavigate();
  const dispatch=useDispatch();

  // email validation
  const emailValidation = () => {
    // const regex="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/";
    const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
    if (!email) {
      setEmailError("Please enter your email");
    } else if (!email.match(regex)) {
      setEmailError("Please enter a valid emal address");
    } else {
      setEmailError("");
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailValidation();
    if (password === "") {
      setPassError("Please enter your password");
    }
    if (email !== "" && password !== "") {
    
        dispatch(login(email,password))
        .then((response) => {
          console.log(response);
          if (response.payload.data.user.role === "admin" || response.payload.data.user.role === "Admin") {
            navigate("/admin", { replace:true});
          }else if (response.payload.data.user.role === "user" || response.payload.data.user.role === "User") {
            navigate("/question", { replace:true});
          }else if (response.payload.data.user.role === "client" || response.payload.data.user.role === "Client") {
            navigate("/client", { replace:true});
          }

          if(response.payload.response.status === 401){
            setPassError("Email or password is incorrect, please enter your right credentials!");
          }
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={loginData.email}
              required
              style={{width:"380px"}}
              onBlur={() => setEmailError("")}
              onChange={handleChange}
              onKeyUp={emailValidation}
              autoComplete="email"
              autoFocus
            />
            <p style={{ color: "red" }}>
              {emailError && <span>{emailError}</span>}
            </p>
            <TextField
              margin="normal"
              required={true}
              fullWidth
              name="password"
              label="Password"
              value={loginData.password}
              onChange={handleChange}
              onKeyUp={() => setPassError("")}
              onBlur={() => setPassError("")}
              type="password"
              id="password"
              autoComplete="current-password"
              className="input-field"
            />
            <p style={{ color: "red" }}>
              {passError && <span>{passError}</span>}
            </p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
             
              <Grid item>
                <Link href="/registration" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
