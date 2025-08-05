import { useState } from "react";
import { getTheme } from "./theme";
import "./index.css";
import { Box, Button, ThemeProvider, Drawer } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Application from "./pages/Application";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/application" element={<Application />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
