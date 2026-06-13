import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navLinks = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/orders", label: "Orders" },
    { to: "/admin/message", label: "Message" },
  ];

  return (
    <aside className="sticky top-0 left-0 h-screen w-64 border-r border-gray-200 bg-white p-4 flex flex-col justify-between font-sans">
      <div className="space-y-6">
        <div className="px-3 py-2 flex items-center justify-between">
          <span className="text-sm font-black tracking-wider text-indigo-600 uppercase">
            Management Core
          </span>
        </div>

        <nav className="space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/admin"} //
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100/50"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
