import React from "react";
import Sidebar from "../components/admin/Sidebar";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
