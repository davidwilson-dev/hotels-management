import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import { store } from "#/store/index.js";
import theme from "#/theme/theme.js";

export default function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
