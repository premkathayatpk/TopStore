import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const ProtectedRoute = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
