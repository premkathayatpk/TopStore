import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const AdminRoute = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return user && user.role === "Admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
