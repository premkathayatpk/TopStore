import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { user, loading } = useAuth();
  // console.log(user);

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return user && user.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" />
  );
};

export default AdminRoute;
