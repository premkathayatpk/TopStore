import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const API_BASE = "http://localhost:5000";

  const getAllUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/user/getAllUsers`, {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error("Users fail to fetch", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/user/deleteUser/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // console.log("User deleted successfully");
        getAllUsers();
      } else {
        console.error("Failed to delete user on server");
      }
    } catch (error) {
      console.error("Unable to delete user", error);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Admin Users
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            A list of all administrative users in the system.
          </p>
        </div>
      </div>

      {users && users.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">
                  User
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">
                  Role
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">
                  Contact
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900">
                  Address
                </th>
                <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-900 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* User Identity Column */}
                  <td className="whitespace-nowrap px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-12 w-12 rounded-full object-cover bg-gray-100 ring-2 ring-gray-100"
                        src={
                          user.profileImg
                            ? `${API_BASE}/uploads/avatars/${user.profileImg}`
                            : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"
                        }
                        alt={user.name}
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80";
                        }}
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role Column with Badge */}
                  <td className="whitespace-nowrap px-4 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {user.role}
                    </span>
                  </td>

                  {/* Contact Column */}
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                    {user.phone || "N/A"}
                  </td>

                  {/* Address Column */}
                  <td
                    className="max-w-xs truncate px-4 py-4 text-gray-600"
                    title={user.address}
                  >
                    {user.address}
                  </td>

                  {/* Action Column */}
                  <td className="whitespace-nowrap px-4 py-4 text-center">
                    {/* FIX 1: Wrapped the click handler in an anonymous function arrow */}
                    <button
                      type="button"
                      className="text-red-500 transition-colors hover:text-red-700 inline-flex items-center justify-center p-1 rounded-full hover:bg-red-50"
                      onClick={() => handleDeleteUser(user._id)}
                      title="Delete User"
                    >
                      <MdDeleteForever size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            No users found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating a new admin user.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
