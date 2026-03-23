import { call, put, takeLatest } from "redux-saga/effects";

import { authActions } from "#/features/auth/authSlice.js";
import { authApi } from "#/services/api/authApi.js";

const getErrorMessage = (error, fallbackMessage) => {
  return error.response?.data?.message || error.message || fallbackMessage;
};

function* bootstrapSessionFlow() {
  try {
    const response = yield call(authApi.refreshSession);

    yield put(
      authActions.bootstrapSucceeded({
        accessToken: response.accessToken,
        user: response.user
      })
    );
  } catch {
    yield put(authActions.bootstrapFailed());
  }
}

function* loginFlow(action) {
  try {
    const response = yield call(authApi.login, action.payload);

    yield put(
      authActions.loginSucceeded({
        accessToken: response.accessToken,
        user: response.safeUser
      })
    );
  } catch (error) {
    yield put(
      authActions.loginFailed(
        getErrorMessage(error, "Unable to sign in with those credentials.")
      )
    );
  }
}

function* logoutFlow() {
  try {
    yield call(authApi.logout);
  } finally {
    yield put(authActions.logoutSucceeded());
  }
}

export default function* authSaga() {
  yield takeLatest(authActions.bootstrapRequested.type, bootstrapSessionFlow);
  yield takeLatest(authActions.loginRequested.type, loginFlow);
  yield takeLatest(authActions.logoutRequested.type, logoutFlow);
}
