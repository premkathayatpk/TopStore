import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import icone from "../assets/icone.png";
import { TbLogin2, TbLogout2 } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { BiRegistered } from "react-icons/bi";
import { TbClipboardList } from "react-icons/tb";
import { MdOutlineShoppingCart } from "react-icons/md";

import { useCart } from "../context/CartProvider";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Navbar = () => {
  const { cart } = useCart();
  const { user } = useContext(AuthContext);
  console.log(user);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-1 transition-all duration-300 px-3 py-1 rounded-md ${
      isActive
        ? "text-blue-600 bg-blue-50 font-bold"
        : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md flex justify-between py-3 px-8 items-center shadow-sm border-b border-gray-100">
      <div className="flex items-center">
        <img
          src={icone}
          alt="logo"
          className="h-15 w-auto hover:scale-105 transition-transform cursor-pointer"
        />
      </div>

      <nav className="flex  items-center gap-x-2 text-base font-medium">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="products" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="about" className={linkClass}>
          About
        </NavLink>
        <NavLink to="contact" className={linkClass}>
          Contact
        </NavLink>
      </nav>
      <div className="flex gap-5">
        {user && (
          <NavLink to="cart" className={linkClass}>
            <MdOutlineShoppingCart size={25} />
            <sup className="text-white bg-orange-500  rounded-full py-2 px-1 ">
              {cart.length}
            </sup>
          </NavLink>
        )}

        <div className="group relative py-2 flex">
          <div className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition-colors">
            {user && user.profileImg ? (
              <div>
                <img
                  src={`http://localhost:5000/uploads/avatars/${user.profileImg}`}
                  alt="profileImg"
                  className="h-10 rounded-full
                   object-cover"
                />
              </div>
            ) : (
              <FaUserCircle size={35} className="text-gray-700" />
            )}
            <span className="text-sm font-medium text-gray-600 hidden sm:block">
              {user ? <p>{user.name}</p> : <p>Account</p>}
            </span>
          </div>

          <div className="absolute right-0 top-full pt-2 w-48 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
            <div className="bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden py-2 px-1">
              {!user ? (
                <div>
                  <NavLink to="login" className={linkClass}>
                    <TbLogin2 className="text-lg" />
                    <span>Login</span>
                  </NavLink>
                  <NavLink to="register" className={linkClass}>
                    <BiRegistered className="text-lg" />

                    <span>Register</span>
                  </NavLink>
                </div>
              ) : (
                <div>
                  <NavLink to="order" className={linkClass}>
                    <TbClipboardList className="text-lg" />
                    <span>Order</span>
                  </NavLink>
                  <NavLink to="profile" className={linkClass}>
                    <FaUserCircle className="text-lg" />
                    <span>Profile</span>
                  </NavLink>
                  <NavLink to="logout" className={linkClass}>
                    <TbLogout2 className="text-lg" />
                    <span>Logout</span>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
