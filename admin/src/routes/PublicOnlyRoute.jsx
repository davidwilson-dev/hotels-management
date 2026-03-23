import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import AppLoader from "#/components/AppLoader.jsx";

export default function PublicOnlyRoute() {
  const status = useSelector((state) => state.auth.status);

  if (status === "idle" || status === "checking") {
    return <AppLoader message="Checking whether a saved secure session is available..." />;
  }

  if (status === "authenticated") {
    return <Navigate replace to="/dashboard" />;
  }

  return <Outlet />;
}
