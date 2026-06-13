import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import icone from "../../assets/icone.png";
import { AuthContext } from "../../context/AuthProvider";

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const activePage =
    location.pathname === "/"
      ? "dashboard"
      : location.pathname.split("/").filter(Boolean).pop();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 p-1.5 border border-gray-300">
            <img
              src={icone}
              alt="Admin Panel Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <span> Admin Panel</span>
        </div>

        <div className="flex flex-col text-center">
          <h1 className="text-lg font-bold text-gray-900 capitalize leading-none">
            {activePage?.replace("-", " ")}
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-medium">
            System Control Panel
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => {
              navigate("/admin/profile");
            }}
          >
            <div className="">
              <img
                src={`http://localhost:5000/uploads/avatars/${user?.profileImg}`}
                alt="AD"
                className="h-10 w-10 rounded-full "
              />
            </div>

            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors leading-none">
                {user?.name || "Admin"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
