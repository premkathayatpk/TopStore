import React from "react";
import Sidebar from "../components/admin/Sidebar";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-gray-50 overflow-hidden">
      <AdminNavbar />

      <div className="flex flex-1 w-full overflow-hidden">
        <aside className=" bg-white border-r border-gray-200 h-full  ">
          <Sidebar />
        </aside>

        <main className=" w-4/5 p-6 h-full overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
