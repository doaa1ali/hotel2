import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper, IconButton, InputAdornment, Grid,} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import loginImage from "../assets/images/Login_image.png";
import logo from "../assets/images/logo.png";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    setErrors({}); 
  
    if (!username.trim() || !password.trim()) {
      setErrors({
        username: !username.trim() ? "Username is required." : "",
        password: !password.trim() ? "Password is required." : "",
      });
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post("https://royal-hotel-backend.onrender.com/api/login/", {
        username,
        password,
      });
  
      const { access, refresh, user } = response.data;
  
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user", JSON.stringify(user));
  
      navigate("/dashboard");
  
    } catch (error) {
      console.error("Login error:", error);
  
      if (error.response) {
        const { data } = error.response;
  
        if (data) {
          setErrors(data); 
          console.log("Validation errors:", data);
        } else if (data.detail) {
          setErrors({ password: data.detail }); 
          setErrors({ password: "Something went wrong. Please try again." });
        }
      } else {
        setErrors({ password: "Network error. Please check your connection." });
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center" bgcolor="#f4f4f4" p={4}>
      <Paper elevation={3} sx={{ padding: 3, width: "90%", maxWidth: 1100, borderRadius: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" justifyContent="flex-start" mb={1} mt={-5}>
              <img src={logo} alt="Group Icon" style={{ width: "217px", height: "44px", objectFit: "contain",  marginBottom: "20px"}} />
            </Box>
            <Typography variant="h5" fontWeight="bold" color="#333" textAlign="center" mb={1} fontSize="40px">
              Welcome Back!
            </Typography>
            <Typography  color="#4D4D4D" textAlign="center" mb={3}  fontSize="20px"> 
              Log in to Royal Hostel Management System
            </Typography>

            <form onSubmit={handleLogin}>
              <Typography fontWeight="bold" fontSize="1rem" mb={1}>
                Username
              </Typography>
              <TextField
                label="Username"
                type="text"
                variant="outlined"
                fullWidth
                margin="dense"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />


              <Typography fontWeight="bold" fontSize="1rem" mt={2} mb={1}>
                Password
              </Typography>
              <TextField
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="dense"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.non_field_errors}
                helperText={errors.non_field_errors || ""}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff/>}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />


              <Box textAlign="right" mt={1} mb={2}>
                <Link to="/forgot-password" style={{ textDecoration: "none", color: "#182775", fontSize: "0.9rem" }}>
                  Forgot Password?
                </Link>
              </Box>

              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{ backgroundColor: "#182775", py: 1.2 , textTransform: "none", "&:hover": { backgroundColor: "#354AB6" } }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>

            <Typography mt={2} align="center">
              Don't have an account? <Link to="/signup">Register Now</Link>
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <img
              src={loginImage}
              alt="Login Illustration"
              style={{ width: "100%", maxWidth: "600px", borderRadius: "10px", height: "600px", paddingLeft: "20px" }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
