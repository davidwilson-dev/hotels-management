import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: null,
  status: "idle",
  isLoggingIn: false,
  isLoggingOut: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    bootstrapRequested(state) {
      state.status = "checking";
      state.error = null;
    },
    bootstrapSucceeded(state, action) {
      state.status = "authenticated";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isLoggingIn = false;
      state.isLoggingOut = false;
      state.error = null;
    },
    bootstrapFailed(state) {
      state.status = "guest";
      state.accessToken = null;
      state.user = null;
      state.isLoggingIn = false;
      state.isLoggingOut = false;
      state.error = null;
    },
    loginRequested(state) {
      state.isLoggingIn = true;
      state.error = null;
    },
    loginSucceeded(state, action) {
      state.status = "authenticated";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isLoggingIn = false;
      state.error = null;
    },
    loginFailed(state, action) {
      state.status = "guest";
      state.isLoggingIn = false;
      state.error = action.payload;
    },
    refreshSucceeded(state, action) {
      state.status = "authenticated";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.error = null;
    },
    sessionExpired(state, action) {
      state.status = "guest";
      state.accessToken = null;
      state.user = null;
      state.isLoggingIn = false;
      state.isLoggingOut = false;
      state.error = action.payload ?? null;
    },
    logoutRequested(state) {
      state.isLoggingOut = true;
      state.error = null;
    },
    logoutSucceeded() {
      return {
        ...initialState,
        status: "guest"
      };
    },
    clearAuthError(state) {
      state.error = null;
    }
  }
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
