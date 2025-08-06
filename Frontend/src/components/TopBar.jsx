import { Box, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { getTheme } from "../theme";
import SunnyIcon from "@mui/icons-material/Sunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import useGlobalStore from "../store/globalStore";

const TopBar = ({ header }) => {
  const { theme, setTheme } = useGlobalStore();
  return (
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
      <Box display="flex" alignItems="center">
        <IconButton aria-label="switch theme" onClick={setTheme}>
          {theme === "dark" ? <SunnyIcon /> : <BedtimeIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default TopBar;
