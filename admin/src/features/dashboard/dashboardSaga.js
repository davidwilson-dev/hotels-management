import { call, put, takeLatest } from "redux-saga/effects";

import { dashboardActions } from "#/features/dashboard/dashboardSlice.js";
import { adminApi } from "#/services/api/adminApi.js";

const getErrorMessage = (error) => {
  return (
    error.response?.data?.message ||
    error.message ||
    "Unable to load the latest hotel operations snapshot."
  );
};

function* fetchOverviewFlow() {
  try {
    const response = yield call(adminApi.getUsers, {
      page: 1,
      limit: 8
    });

    yield put(dashboardActions.fetchOverviewSucceeded(response));
  } catch (error) {
    yield put(dashboardActions.fetchOverviewFailed(getErrorMessage(error)));
  }
}

export default function* dashboardSaga() {
  yield takeLatest(
    dashboardActions.fetchOverviewRequested.type,
    fetchOverviewFlow
  );
}
