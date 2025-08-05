import { useState } from "react";
import { Outlet } from "react-router-dom";
import { getTheme } from "../theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../components/Sidebar";
import InternetChecker from "../components/InternetChecker";

const Layout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [mode, setMode] = useState("dark");
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <InternetChecker />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
            minHeight: "100vh",
            position: "relative",
          }}
        >
          <IconButton
            onClick={() => setOpenSidebar(true)}
            sx={{
              position: "fixed",
              top: 16,
              left: 16,
              zIndex: 100,
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Sidebar Drawer */}
          <Drawer open={openSidebar} onClose={() => setOpenSidebar(false)}>
            <Sidebar
              mode={mode}
              setMode={() =>
                setMode((prev) => (prev === "light" ? "dark" : "light"))
              }
              onClose={() => setOpenSidebar(false)}
            />
          </Drawer>

          {/* Main content */}
          <Box>
            <Outlet />
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Layout;
