import React from "react";
import Sidebar from "../components/admin/Sidebar";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="flex ">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
