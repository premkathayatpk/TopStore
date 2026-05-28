import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <img src="" alt="logo" />
      <nav className="flex flex-col gap-3  text-white font-bold text-xl  p-4">
        <NavLink to="/admin">Dashboard</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/products">Products</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
