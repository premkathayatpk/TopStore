import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

        <nav className="flex flex-col gap-4">
          <Link to="/admin" className="hover:bg-gray-700 px-3 py-2 rounded">
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            Users
          </Link>

          <Link
            to="/admin/products"
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            Products
          </Link>

          <Link
            to="/admin/orders"
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            Orders
          </Link>

          <Link
            to="/admin/profile"
            className="hover:bg-gray-700 px-3 py-2 rounded"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded mt-5"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <div className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>

          <div>
            <p className="font-medium">Welcome Admin</p>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
