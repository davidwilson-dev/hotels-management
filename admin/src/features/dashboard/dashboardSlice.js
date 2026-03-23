import { createSlice } from "@reduxjs/toolkit";

import { authActions } from "#/features/auth/authSlice.js";

const initialState = {
  users: [],
  pagination: null,
  status: "idle",
  error: null,
  lastUpdated: null
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    fetchOverviewRequested(state) {
      state.status = "loading";
      state.error = null;
    },
    fetchOverviewSucceeded(state, action) {
      state.status = "succeeded";
      state.users = action.payload.users ?? [];
      state.pagination = action.payload.pagination ?? null;
      state.lastUpdated = new Date().toISOString();
    },
    fetchOverviewFailed(state, action) {
      state.status = "failed";
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authActions.logoutSucceeded, () => initialState);
    builder.addCase(authActions.sessionExpired, () => initialState);
  }
});

export const dashboardActions = dashboardSlice.actions;

export default dashboardSlice.reducer;
