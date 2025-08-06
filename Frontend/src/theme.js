import { createTheme } from "@mui/material";

export const getTheme = (mode) => {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,

      primary: {
        light: "#949ec2ff",
        main: "#262840",
        dark: "#002366",
        contrastText: "#ffffff",
      },

      secondary: {
        light: "#FFB6A6",
        main: "#FF6F61",
        dark: "#C13B30",
        contrastText: "#ffffff",
      },

      neutral: {
        light: "#e5e5e5ff",
        main: "#cccccc",
        dark: "#9e9e9e",
        contrastText: isDark ? "#000" : "#fff",
      },

      gray: isDark
        ? {
            50: "#f5f5f5",
            100: "#e5e5e5",
            200: "#cccccc",
            300: "#b3b3b3",
            400: "#9e9e9e",
            500: "#757575",
            600: "#616161",
            700: "#424242",
            800: "#212121",
            900: "#181818ff",
          }
        : {
            50: "#000000",
            100: "#212121",
            200: "#424242",
            300: "#616161",
            400: "#757575",
            500: "#9e9e9e",
            600: "#b3b3b3",
            700: "#cccccc",
            800: "#e5e5e5",
            900: "#f5f5f5",
          },

      background: {
        default: isDark ? "#121212" : "#ffffffff",
        paper: isDark ? "#1e1e1e" : "#fafafaff",
      },
      text: {
        primary: isDark ? "#ffffff" : "#000000ff",
        secondary: isDark ? "#aaaaaa" : "#555555",
      },
    },

    typography: {
      fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
      fontSize: 14,
    },

    shape: {
      borderRadius: 10,
    },
  });
};
