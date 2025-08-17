import { Alert, Snackbar } from "@mui/material";
import React from "react";
import useGlobalStore from "../store/globalStore";

const SnackBar = () => {
  const { snackbar } = useGlobalStore();
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={() => useGlobalStore.getState().hideSnackbar()}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
