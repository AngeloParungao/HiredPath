import {
  Box,
  Switch,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = ({ mode, setMode, onClose }) => {
  return (
    <Box sx={{ width: 230 }} role="presentation" onClick={onClose}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <img
          src="./assets/images/HiredPathLogo.png"
          alt="HiredPath"
          height={50}
        />
        <Typography variant="h5">HiredPath</Typography>
      </Box>
      <Divider />
      <List sx={{ flexDirection: "column" }}>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/application">
            <ListItemText primary="Application" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/notification">
            <ListItemText primary="Notification" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/profile">
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/logout">
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
      <Switch
        checked={mode === "dark" ? true : false}
        onChange={() => setMode()}
      />
    </Box>
  );
};

export default Sidebar;
