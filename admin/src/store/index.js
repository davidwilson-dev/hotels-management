import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import authReducer from "#/features/auth/authSlice.js";
import dashboardReducer from "#/features/dashboard/dashboardSlice.js";
import { attachStore } from "#/services/api/apiClient.js";
import rootSaga from "#/store/rootSaga.js";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false
    }).concat(sagaMiddleware)
});

attachStore(store);
sagaMiddleware.run(rootSaga);
