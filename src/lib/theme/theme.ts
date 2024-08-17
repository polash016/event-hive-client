import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1596FD",
    },
    secondary: {
      main: "#666f73",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #f857a6 0%, #ff5858 100%)", // replace with your gradient
          color: "white",
        },
      },
      defaultProps: {
        variant: "contained",
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
  },

  typography: {
    body1: {
      color: "#0B1134CC",
    },
  },
});

theme.shadows[1] = "0px 5px 22px lightgrey";
