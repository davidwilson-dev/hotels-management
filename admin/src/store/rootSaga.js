import { all, fork } from "redux-saga/effects";

import authSaga from "#/features/auth/authSaga.js";
import dashboardSaga from "#/features/dashboard/dashboardSaga.js";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(dashboardSaga)]);
}
