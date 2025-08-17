import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
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

const Auth = () => {
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
        backgroundImage: "url(./assets/images/HIREDPATH.png)",
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

        {tabValue === 0 ? <LoginForm /> : <RegisterForm />}

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
            OR
          </Typography>
        </Divider>

        <Button
          variant="text"
          startIcon={<Google />}
          fullWidth
          size="large"
          sx={{
            py: 1.5,
          }}
        >
          Continue with Google
        </Button>
      </Paper>
    </Box>
  );
};

export default Auth;
