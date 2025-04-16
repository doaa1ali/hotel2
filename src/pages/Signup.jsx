import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper, IconButton, InputAdornment, Grid } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import loginImage from "../assets/images/Login_image.png";
import logo from "../assets/images/logo.png";

const Signup = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    national_id: "",
    mobile: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrors({}); 
    
    const { first_name, last_name, username, national_id, mobile, email, password } = formData;
  
    if (!first_name || !last_name || !username || !national_id || !mobile || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
  
    if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters long." }));
      return;
    }
  
    try {
      const response = await fetch("https://royal-hotel-backend.onrender.com/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name, last_name, username, national_id, mobile, email, password })
      });
  
      const data = await response.json();
      //console.log("Response data:", data);
  
      if (response.ok) {
        alert("Account created successfully! Please log in.");
        navigate("/");
      } else {
        if (data) {
          setErrors(data); 
          //console.log("Validation errors:", data);
        } else {
          setErrors({ general: data.message || "Registration failed" }); // خطأ عام
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrors({ general: "Something went wrong. Please try again later." });
    }
  };
  
  

  return (
    <Box height="100%" display="flex" justifyContent="center" alignItems="center" bgcolor="#f4f4f4" p={5} sx={{ }}>
      <Paper elevation={3} sx={{ padding: 3, width: "90%", borderRadius: 3 , height: "100%",}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6} display="flex" flexDirection="column" justifyContent="center" marginTop={"-20px"}>
            <Box display="flex" alignItems="center" justifyContent="flex-start" mb={1} mt={1}>
              <img src={logo} alt="Group Icon" style={{ width: "217px", height: "44px", objectFit: "contain",  marginBottom: "20px"}} />
            </Box>
            <Typography variant="h5" fontWeight="bold" color="#333" textAlign="center" mb={1} fontSize="40px">
              Welcome back!
            </Typography>

            <Typography fontSize="1rem" color="#4D4D4D" textAlign="center" mb={3}>
            Sign up now to start your journey!
            </Typography>

            <form onSubmit={handleSignUp}>
              <TextField label="First Name" name="first_name" variant="outlined" fullWidth margin="dense" value={formData.first_name} onChange={handleChange} error={!!errors.first_name}  helperText={errors.first_name || ""} required />
              <TextField label="Last Name" name="last_name" variant="outlined" fullWidth margin="dense" value={formData.last_name} onChange={handleChange} error={!!errors.last_name} helperText={errors.last_name || ""}  required />
              <TextField label="Username" name="username" variant="outlined" fullWidth margin="dense" value={formData.username} onChange={handleChange} error={!!errors.username} helperText={errors.username || ""} required />
              <TextField label="National ID" name="national_id" type="number" variant="outlined" fullWidth margin="dense" value={formData.national_id} onChange={handleChange}  error={!!errors.national_id} helperText={errors.national_id || ""} required />
              <TextField label="Mobile" name="mobile" type="tel" variant="outlined" fullWidth margin="dense" value={formData.mobile} onChange={handleChange} error={!!errors.mobile} helperText={errors.mobile || ""}required />
              <TextField label="Email" name="email" type="email" variant="outlined" fullWidth margin="dense" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email || ""} required />

              <TextField label="Password" name="password" type={showPassword ? "text" : "password"} variant="outlined" fullWidth margin="dense" value={formData.password} onChange={handleChange}  error={!!errors.password} helperText={errors.password || ""} required
                InputProps={{ endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ) }}
              />
              {errors.general && (
                <Typography color="error" textAlign="center" mt={1}>
                  {errors.general}
                </Typography>
              )}

              <Button variant="contained" fullWidth type="submit" sx={{ backgroundColor: "#182775", py: 1.2, mt: 2 , textTransform: "none", "&:hover": { backgroundColor: "#354AB6" } }}>
                Sign Up
              </Button>
            </form>

            <Typography mt={2} align="center">
              Already have an account? <Link to="/">Login</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <img src={loginImage} alt="Login Illustration" style={{ width: "100%", maxWidth: "600px", borderRadius: "10px", height: "800px", paddingLeft: "20px" }} />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Signup;