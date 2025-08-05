import { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import useGlobalStore from "../store/globalStore";

const InternetChecker = () => {
  const { online, setOnline } = useGlobalStore();

  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    setOnline(navigator.onLine); // initial check

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <Snackbar
      open={!online}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="error" sx={{ width: "100%" }}>
        You are offline. Some features may not work.
      </Alert>
    </Snackbar>
  );
};

export default InternetChecker;
