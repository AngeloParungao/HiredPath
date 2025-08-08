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
import useNotificationStore from "../store/notificationStore";

const TopBar = ({ header }) => {
  const { theme, setTheme } = useGlobalStore();
  const { notifications } = useNotificationStore();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

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
            display: "flex",
            flexDirection: "column",
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

          <Box
            sx={{
              mt: 2,
              overflowY: "auto",
              flexGrow: 1,
              scrollbarWidth: "thin",
            }}
          >
            <List sx={{ mt: 2 }}>
              {notifications
                .sort((a, b) =>
                  a.is_read === b.is_read ? 0 : a.is_read ? 1 : -1
                )
                .map((notification, index) => (
                  <Box
                    key={notification.id}
                    sx={{
                      backgroundColor: notification.is_read
                        ? "transparent"
                        : "gray.900",
                      cursor: "pointer",
                    }}
                  >
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={notification.heading}
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              {notification.message}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
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
        </Box>
      </Drawer>
    </>
  );
};

export default TopBar;
