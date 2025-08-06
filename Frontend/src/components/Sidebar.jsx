import {
  Box,
  Switch,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

const Sidebar = () => {
  const [hovered, setHovered] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: <DashboardIcon />, to: "/" },
    { label: "Application", icon: <WorkIcon />, to: "/application" },
    { label: "Notification", icon: <NotificationsIcon />, to: "/notification" },
  ];

  const userItems = [
    { label: "Profile", icon: <PersonIcon />, to: "/profile" },
    { label: "Logout", icon: <LogoutIcon />, to: "/logout" },
  ];

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        width: hovered ? 200 : 60,
        transition: "width 0.3s",
        overflowX: "hidden",
        height: "100vh",
        backgroundColor: "background.paper",
        boxShadow: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: hovered ? "flex-start" : "center",
          }}
        >
          <img
            src="./assets/images/HiredPathLogo.png"
            alt="HiredPath"
            height={40}
          />
          {hovered && <Typography variant="h6">HiredPath</Typography>}
        </Box>
        <Divider />

        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <Tooltip title={!hovered ? item.label : ""} placement="right">
                <ListItemButton component={Link} to={item.to}>
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  {hovered && <ListItemText primary={item.label} />}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          {userItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <Tooltip title={!hovered ? item.label : ""} placement="right">
                <ListItemButton component={Link} to={item.to}>
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  {hovered && <ListItemText primary={item.label} />}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
