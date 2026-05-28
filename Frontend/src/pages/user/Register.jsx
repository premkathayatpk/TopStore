import React, { useState } from "react";
import { IoIosPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [initialData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    profileImg: null,
  });

  const [formData, setFormData] = useState(initialData);
  const [error, setError] = useState({});

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profileImg: e.target.files[0],
    }));
  };

  const validateForm = () => {
    const localErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) localErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      localErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      localErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      localErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      localErrors.password = "Password must be at least 6 characters long";
    }
    if (!formData.phone.trim()) localErrors.phone = "Phone number is required";
    if (!formData.address.trim()) localErrors.address = "Address is required";

    setErrors(localErrors);
    return Object.keys(localErrors).length === 0;
  };

  const registerUser = async () => {
    try {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("email", formData.email);
      dataToSend.append("password", formData.password);
      dataToSend.append("phone", formData.phone);
      dataToSend.append("address", formData.address);

      if (formData.profileImg) {
        dataToSend.append("profileImg", formData.profileImg);
      }

      const res = await fetch("http://localhost:5000/api/user/register", {
        method: "POST",
        body: dataToSend,
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Unable to connect to the server. Please check your connection.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange-100">
        {/* Header Block Matching Login */}
        <div className="bg-orange-500 py-5 text-center">
          <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
            <IoIosPersonAdd size={28} />
            TopStore
          </h1>
          <p className="text-orange-100 mt-2">
            Create an account to get started
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Full Name Input */}
          <div className="flex flex-col w-full">
            <label
              className="text-sm font-semibold text-gray-700 ml-1"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleFormData}
              className="border-2 w-full py-1 px-4 text-xl rounded-md hover:border-blue-700 focus:outline-none focus:border-blue-700"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col w-full">
            <label
              className="text-sm font-semibold text-gray-700 ml-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email Address"
              value={formData.email}
              onChange={handleFormData}
              className="border-2 w-full py-1 px-4 text-xl rounded-md hover:border-blue-700 focus:outline-none focus:border-blue-700"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col w-full">
            <label
              className="text-sm font-semibold text-gray-700 ml-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleFormData}
              className="border-2 w-full py-1 px-4 text-xl rounded-md hover:border-blue-700 focus:outline-none focus:border-blue-700"
            />
          </div>

          {/* Phone Input */}
          <div className="flex flex-col w-full">
            <label
              className="text-sm font-semibold text-gray-700 ml-1"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your mobile number"
              value={formData.phone}
              onChange={handleFormData}
              className="border-2 w-full py-1 px-4 text-xl rounded-md hover:border-blue-700 focus:outline-none focus:border-blue-700"
            />
          </div>

          {/* Address Input */}
          <div className="flex flex-col w-full">
            <label
              className="text-sm font-semibold text-gray-700 ml-1"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter your street address"
              value={formData.address}
              onChange={handleFormData}
              className="border-2 w-full py-1 px-4 text-xl rounded-md hover:border-blue-700 focus:outline-none focus:border-blue-700"
            />
          </div>

          {/* Profile Image File Upload */}
          <div className="flex flex-col w-full">
            <label
              className="text-sm font-semibold text-gray-700 ml-1"
              htmlFor="profileImg"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="profileImg"
              name="profileImg"
              accept="image/*"
              onChange={handleFileChange}
              className="border-2 w-full py-1 px-2 text-base rounded-md hover:border-blue-700 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
            />
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="bg-green-600 text-white text-xl font-bold py-2 w-full rounded-xl cursor-pointer hover:bg-green-500 mt-2 transition-colors duration-200"
          >
            Register
          </button>

          {/* Navigation Helper Link */}
          <p className="text-sm text-center text-gray-600 mt-2">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-600 font-semibold cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
