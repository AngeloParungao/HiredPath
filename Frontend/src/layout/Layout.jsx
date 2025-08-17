import { Outlet } from "react-router-dom";
import { getTheme } from "../theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
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

  useEffect(() => {
    fetchApplications(user?.id);
  }, []);

  useEffect(() => {
    fetchNotifications(user?.id);
  }, [applications]);

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
