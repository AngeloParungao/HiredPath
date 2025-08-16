import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Tab,
  Tabs,
  IconButton,
  Divider,
  Paper,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Google,
  Facebook,
} from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextInput from "../components/TextInput";
import LoginForm from "../components/LoginForm";

const signupSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const Auth = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  };

  const handleSignup = (values, { setSubmitting, setFieldError }) => {
    // Simulate API call
    setTimeout(() => {
      console.log("Signup values:", values);
      // Simulate validation error
      if (values.email === "test@exists.com") {
        setFieldError("email", "Email already exists");
      } else {
        alert("Signup successful! Check console for form data.");
      }
      setSubmitting(false);
    }, 1000);
  };

  const SignupForm = () => (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={signupSchema}
      onSubmit={handleSignup}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextInput
                name="firstName"
                label="First Name"
                startIcon={<Person />}
              />
              <TextInput
                name="lastName"
                label="Last Name"
                startIcon={<Person />}
              />
            </Box>

            <TextInput
              name="email"
              type="email"
              label="Email Address"
              startIcon={<Email />}
            />

            <TextInput
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              startIcon={<Lock />}
              endIcon={
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
            />

            <TextInput
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              startIcon={<Lock />}
              endIcon={
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{
                mt: 1,
                py: 1.5,
                background: "linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)",
                boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
              }}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: "100%",
          maxWidth: 500,
          maxHeight: "90vh",
          borderRadius: 3,
          overflow: "auto",
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <Card sx={{ height: "100%", boxShadow: "none" }}>
          <CardContent sx={{ p: 4, height: "100%", overflow: "auto" }}>
            <Box textAlign="center" mb={3}>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1,
                }}
              >
                Welcome
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {tabValue === 0
                  ? "Sign in to your account"
                  : "Create a new account"}
              </Typography>
            </Box>

            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                mb: 3,
                "& .MuiTabs-indicator": {
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  height: 3,
                  borderRadius: "3px 3px 0 0",
                },
              }}
            >
              <Tab
                label="Sign In"
                sx={{
                  fontWeight: "bold",
                  "&.Mui-selected": {
                    color: "#667eea",
                  },
                }}
              />
              <Tab
                label="Sign Up"
                sx={{
                  fontWeight: "bold",
                  "&.Mui-selected": {
                    color: "#764ba2",
                  },
                }}
              />
            </Tabs>

            {tabValue === 0 ? <LoginForm /> : <SignupForm />}

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                OR
              </Typography>
            </Divider>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Button
                variant="outlined"
                startIcon={<Google />}
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  borderColor: "#db4437",
                  color: "#db4437",
                  "&:hover": {
                    borderColor: "#db4437",
                    backgroundColor: "rgba(219, 68, 55, 0.04)",
                  },
                }}
              >
                Continue with Google
              </Button>
              <Button
                variant="outlined"
                startIcon={<Facebook />}
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  borderColor: "#4267B2",
                  color: "#4267B2",
                  "&:hover": {
                    borderColor: "#4267B2",
                    backgroundColor: "rgba(66, 103, 178, 0.04)",
                  },
                }}
              >
                Continue with Facebook
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
};

export default Auth;
