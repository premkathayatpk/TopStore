import React, { useState } from "react";
import { user } from "../../data/user.js";
import { IoIosLogIn } from "react-icons/io";
import { CiMail, CiLock } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider.jsx";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    } else {
      const isSuccess = await loginUser(email, password);
      if (isSuccess) {
        navigate("/");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange-100">
        {/* Branding Header Banner */}
        <div className="bg-orange-500 py-6 text-center">
          <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-2 tracking-wide">
            <IoIosLogIn size={32} />
            TopStore
          </h1>
          <p className="text-orange-100 text-sm mt-2 font-medium px-4">
            Welcome back! Please login to your account
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Email Form Field */}
          <div className="flex flex-col w-full">
            <label
              className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5 ml-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400">
                <CiMail size={22} />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="border-2 border-gray-200 w-full py-2.5 pl-10 pr-4 text-base rounded-xl transition-all duration-200 hover:border-orange-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                required
              />
            </div>
          </div>

          {/* Password Form Field */}
          <div className="flex flex-col w-full">
            <label
              className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5 ml-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-gray-400">
                <CiLock size={22} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="border-2 border-gray-200 w-full py-2.5 pl-10 pr-10 text-base rounded-xl transition-all duration-200 hover:border-orange-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                required
              />
              {/* Show/Hide Password Toggle Action button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-gray-600 cursor-pointer focus:outline-none"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IoEyeOffOutline size={20} />
                ) : (
                  <IoEyeOutline size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Action Login Trigger */}
          <button
            type="submit"
            className="bg-green-600 text-white text-lg font-bold py-3 w-full rounded-xl cursor-pointer hover:bg-green-500 shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99] mt-2"
          >
            Sign In
          </button>

          {/* Navigation Route Alternative */}
          <p className="text-sm text-center text-gray-500 pt-2">
            Don't have an account yet?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-orange-600 font-bold cursor-pointer hover:underline hover:text-orange-500 transition-colors"
            >
              Register here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
