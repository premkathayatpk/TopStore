import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Profile = () => {
  const { user, isLoading, isError } = useContext(AuthContext);
  const navigate = useNavigate();
  // const [userData, setUserData] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-gray-600">Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-600">
          Error fetching user data. Please{" "}
          <span
            className="text-blue-500 border-b-2 cursor-pointer hover:text-blue-600 "
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
          .
        </h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-600">
          User Cannot Login, Please{" "}
          <span
            className="text-blue-500 border-b-2 cursor-pointer hover:text-blue-600 "
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
          .
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        <div className="md:w-1/3 bg-blue-600  p-8 flex flex-col items-center justify-center text-white">
          <div className="relative">
            <img
              src={`http://localhost:5000/uploads/avatars/${user.profileImg}`}
              alt="profile"
              className="h-40 w-40 rounded-full object-cover border-4 border-white/30 shadow-2xl"
            />
            <span className="absolute bottom-2 right-2 bg-green-500 h-5 w-5 rounded-full border-4 border-blue-700"></span>
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-wide">{user.name}</h2>
          <p className="text-blue-100  uppercase text-xs tracking-widest font-semibold">
            {user.role || "User"}
          </p>
        </div>

        <div className="md:w-2/3 p-8 md:p-12 bg-white">
          <h3 className="text-gray-800 text-xl font-bold mb-6 pb-2 border-b">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoField label="Full Name" value={user.name} />
            <InfoField label="Email Address" value={user.email} />
            <InfoField
              label="Phone Number"
              value={user.phone || "Not provided"}
            />
            <InfoField
              label="Address"
              value={user.address || "No address set"}
            />
          </div>

          <div className="mt-10 flex gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md shadow-blue-200">
              Edit Profile
            </button>
            <button
              onClick={() => {
                navigate("/logout");
              }}
              className="px-6 py-2 border border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable component
const InfoField = ({ label, value }) => (
  <div>
    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
      {label}
    </p>
    <p className="text-gray-700 font-medium">{value}</p>
  </div>
);

export default Profile;
