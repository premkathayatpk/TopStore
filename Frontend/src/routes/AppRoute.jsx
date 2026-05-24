import React from "react";
import Home from "../pages/Home";
import About from "../pages/About";
import Product from "../pages/Product";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";

import ProductDetail from "../pages/ProductDetail";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Order from "../pages/Order";
import Logout from "../pages/Logout";
import Payment from "../pages/Payment";

//Admin pages & Layouts

import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminProfile from "../pages/admin/AdminProfile";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AdminRoute from "./AdminRoute";

const AppRoute = () => {
  const { user } = useAuth();

  const router = createBrowserRouter([
    // Client routes (Main Layout)
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "products",
          element: <Product />,
        },
        {
          path: "contact",
          element: <Contact />,
        },

        {
          path: "products/:id",
          element: <ProductDetail />,
        },
        {
          path: "login",
          element: <Login />,
        },

        {
          path: "register",
          element: <Register />,
        },

        //authenticated user routes (ProtectedRoute)
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "order",
              element: <Order />,
            },

            {
              path: "payment",
              element: <Payment />,
            },
            {
              path: "cart",
              element: <Cart />,
            },
            {
              path: "logout",
              element: <Logout />,
            },
          ],
        },
      ],
    },

    // Admin routes (AdminRouter)
    {
      path: "/admin",
      element: <AdminRoute />,
      children: [
        {
          element: <AdminLayout />,
          children: [
            {
              index: true,
              element: <AdminDashboard />,
            },
            {
              path: "users",
              element: <AdminUsers />,
            },
            {
              path: "products",
              element: <AdminProducts />,
            },
            {
              path: "orders",
              element: <AdminOrders />,
            },
            {
              path: "profile",
              element: <AdminProfile />,
            },
          ],
        },
      ],
    },
    // Fallback route for 404 Not Found

    { path: "*", element: <h1>Page Not Found</h1> },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoute;
