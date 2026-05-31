import React from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

const AdminRoute = () => {
  const { user, loading } = useContext(AuthContext);
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
