import { Outlet } from "react-router-dom";
import { getTheme } from "../theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "../components/Sidebar";
import InternetChecker from "../components/InternetChecker";
import useGlobalStore from "../store/globalStore";

const Layout = () => {
  const { theme } = useGlobalStore();
  const mode = getTheme(theme);

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
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: 0,
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Layout;
