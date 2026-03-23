import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import AppLoader from "#/components/AppLoader.jsx";

export default function SessionRedirect() {
  const status = useSelector((state) => state.auth.status);

  if (status === "idle" || status === "checking") {
    return <AppLoader message="Preparing your hotel operations console..." />;
  }

  return (
    <Navigate
      replace
      to={status === "authenticated" ? "/dashboard" : "/login"}
    />
  );
}
