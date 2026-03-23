import AuthLayout from "#/layouts/AuthLayout.jsx";
import DashboardLayout from "#/layouts/DashboardLayout.jsx";
import DashboardPage from "#/pages/DashboardPage.jsx";
import LoginPage from "#/pages/LoginPage.jsx";
import AppShell from "#/routes/AppShell.jsx";
import ProtectedRoute from "#/routes/ProtectedRoute.jsx";
import PublicOnlyRoute from "#/routes/PublicOnlyRoute.jsx";
import SessionRedirect from "#/routes/SessionRedirect.jsx";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <SessionRedirect />
      },
      {
        element: <PublicOnlyRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              {
                path: "login",
                element: <LoginPage />
              }
            ]
          }
        ]
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <DashboardLayout />,
            children: [
              {
                path: "dashboard",
                element: <DashboardPage />
              }
            ]
          }
        ]
      },
      {
        path: "*",
        element: <SessionRedirect />
      }
    ]
  }
]);
