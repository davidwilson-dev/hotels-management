import { alpha, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0d5c63",
      light: "#78aeb0",
      dark: "#083e42",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#d98f4e",
      light: "#f3c99c",
      dark: "#b86d31",
      contrastText: "#ffffff"
    },
    success: {
      main: "#3b7a57"
    },
    warning: {
      main: "#cc7a29"
    },
    error: {
      main: "#b44c43"
    },
    info: {
      main: "#2f6988"
    },
    background: {
      default: "#f5f1ea",
      paper: "#fffaf4"
    },
    text: {
      primary: "#203038",
      secondary: "#5d6b75"
    },
    divider: alpha("#0d5c63", 0.1)
  },
  shape: {
    borderRadius: 20
  },
  typography: {
    fontFamily: '"Poppins", "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontSize: "clamp(2.6rem, 3.6vw, 4.5rem)",
      lineHeight: 1.05,
      fontWeight: 700
    },
    h2: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontSize: "clamp(2rem, 2.7vw, 3.2rem)",
      lineHeight: 1.08,
      fontWeight: 700
    },
    h3: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontSize: "clamp(1.7rem, 2vw, 2.5rem)",
      lineHeight: 1.15,
      fontWeight: 700
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 700
    },
    h5: {
      fontSize: "1.1rem",
      fontWeight: 700
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 700
    },
    button: {
      fontWeight: 600
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background:
            "radial-gradient(circle at top center, rgba(217, 143, 78, 0.08), transparent 28%), linear-gradient(180deg, #f8f3ec 0%, #f1ebe2 100%)"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: `1px solid ${alpha("#0d5c63", 0.08)}`
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          boxShadow: `0 24px 50px ${alpha("#0d5c63", 0.08)}`
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 999,
          paddingInline: 18
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        variant: "outlined"
      }
    }
  }
});

export default theme;
