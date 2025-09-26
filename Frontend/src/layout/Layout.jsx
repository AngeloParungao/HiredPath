import { Outlet } from "react-router-dom";
import { getTheme } from "../theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Sidebar from "../components/Sidebar";
import InternetChecker from "../components/InternetChecker";
import useGlobalStore from "../store/globalStore";
import { useEffect } from "react";
import useApplicationStore from "../store/applicationStore";
import useNotificationStore from "../store/notificationStore";
import useAuthStore from "../store/authStore";

const Layout = () => {
  const { theme } = useGlobalStore();
  const { user } = useAuthStore();
  const { applications, fetchApplications } = useApplicationStore();
  const { fetchNotifications } = useNotificationStore();
  const mode = getTheme(theme);

  const isSmallScreen = useMediaQuery("(max-width: 950px)");

  useEffect(() => {
    fetchApplications(user?.id);
  }, []);

  useEffect(() => {
    fetchNotifications(user?.id);
  }, [applications]);

  if (isSmallScreen) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          bgcolor: "black",
          color: "white",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography variant="h5">
          This application is available on desktop or large screens only.
        </Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={mode}>
      <CssBaseline />
      <InternetChecker />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            display: "flex",
            bgcolor: "background.default",
            color: "text.primary",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <Sidebar />
          <Box component="main" width="100%" pl="4rem">
            <Outlet />
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Layout;
