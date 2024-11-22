import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/common/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth?.account.role === undefined && auth?.loading !== false) {
    if (location.pathname.startsWith("/employee")) {
      return <Navigate to="/employee/auth" />;
    } else {
      return <Navigate to="/auth" />;
    }
  } else if (auth?.account.role === "CLIENT") {
    console.log("entered");
    if (location.pathname.startsWith("/auth")) {
      return <Navigate to="/" />;
    }
    if (location.pathname.startsWith("/employee")) {
      return <Navigate to="/" />;
    }
  } else if (auth?.account.role === "EMPLOYEE") {
    if (location.pathname.startsWith("/employee/auth")) {
      return <Navigate to="/employee" />;
    }
    if (!location.pathname.startsWith("/employee")) {
      return <Navigate to="/employee" />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
