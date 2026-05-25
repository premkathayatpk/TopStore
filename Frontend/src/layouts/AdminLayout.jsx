import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h2 className="text-xl font-bold tracking-wider">TopStore Admin</h2>
        <nav className="flex flex-col space-y-2">
          <Link
            to="/admin/dashboard"
            className="px-3 py-2 rounded hover:bg-gray-800"
          >
            Dashboard
          </Link>
          <Link to="/admin/products" className="hover:bg-gray-800 p-2 rounded">
            Manage Products
          </Link>
          <Link to="/admin/orders" className="hover:bg-gray-800 p-2 rounded">
            Manage Orders
          </Link>
          <Link
            to="/"
            className="text-gray-400 hover:text-white p-2 text-sm mt-10"
          >
            ← Back to Store
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
