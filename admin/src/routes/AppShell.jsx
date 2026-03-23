import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { authActions } from "#/features/auth/authSlice.js";

export default function AppShell() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(authActions.bootstrapRequested());
    }
  }, [dispatch, status]);

  return <Outlet />;
}
