import {
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Badge,
} from "@mui/material";
import SunnyIcon from "@mui/icons-material/Sunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useGlobalStore from "../store/globalStore";
import { useState } from "react";

const TopBar = ({ header }) => {
  const { theme, setTheme } = useGlobalStore();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New Schedule Added",
      message: "Your schedule for CS101 has been approved.",
      time: "2 mins ago",
      read: true,
    },
    {
      id: 2,
      title: "Room Change",
      message: "Room for IT302 has been changed to Rm 204.",
      time: "30 mins ago",
      read: false,
    },
    {
      id: 3,
      title: "Reminder",
      message: "Faculty meeting at 3 PM today.",
      time: "1 hour ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Typography
          variant="h4"
          sx={(theme) => ({ fontWeight: 550, color: theme.palette.gray[600] })}
        >
          {header}
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton aria-label="switch theme" onClick={setTheme}>
            {theme === "dark" ? <SunnyIcon /> : <BedtimeIcon />}
          </IconButton>
          <IconButton onClick={() => setIsOpenDrawer(true)}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
      >
        <Box
          sx={(theme) => ({
            width: 300,
            padding: 2,
            backgroundColor:
              theme.palette.mode === "dark" ? theme.palette.gray[800] : "#fff",
            height: "100%",
          })}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 550,
              color: theme === "dark" ? "white" : "black",
            }}
          >
            Notifications
          </Typography>

          <List sx={{ mt: 2 }}>
            {notifications.map((notification, index) => (
              <Box
                key={notification.id}
                sx={{
                  backgroundColor: notification.read
                    ? "transparent"
                    : "gray.900",
                  cursor: "pointer",
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={notification.title}
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {notification.time}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default TopBar;
