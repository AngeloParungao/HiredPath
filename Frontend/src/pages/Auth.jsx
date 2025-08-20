import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Tab,
  Tabs,
  Divider,
  Paper,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { GoogleLogin } from "@react-oauth/google";
import useAuthStore from "../store/authStore";

const Auth = () => {
  const { handleGoogleLogin } = useAuthStore();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0aff", // solid color behind
        backgroundImage: "url(./assets/images/HIREDPATH.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={5}
        sx={{
          width: "100%",
          maxWidth: 600,
          maxHeight: "95vh",
          padding: 4,
          borderRadius: 5,
          overflow: "auto",
          background: "white",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box textAlign="center" mb={2} height="100%" overflow="auto">
          <Box>
            <img
              src="./assets/images/HiredPathLogo.png"
              alt="HiredPath"
              height={40}
            />
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#217cc5",
                mb: 1,
              }}
            >
              Welcome
            </Typography>
          </Box>
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

        {tabValue === 0 ? <LoginForm /> : <RegisterForm />}

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
            OR
          </Typography>
        </Divider>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              handleGoogleLogin(credentialResponse)
            }
            onError={() => console.error("Google Sign In Failed")}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Auth;
