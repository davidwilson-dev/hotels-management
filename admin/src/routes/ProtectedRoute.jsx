import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import AppLoader from "#/components/AppLoader.jsx";

export default function ProtectedRoute() {
  const status = useSelector((state) => state.auth.status);
  const location = useLocation();

  if (status === "idle" || status === "checking") {
    return <AppLoader message="Restoring your secure operations session..." />;
  }

  if (status !== "authenticated") {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  return <Outlet />;
}
