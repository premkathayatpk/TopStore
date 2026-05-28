import { createBrowserRouter, RouterProvider } from "react-router-dom";

//User pages
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Product from "../pages/user/Product";
import Contact from "../pages/user/Contact";
import Cart from "../pages/user/Cart";
import ProductDetail from "../pages/user/ProductDetail";
import Register from "../pages/user/Register";
import Login from "../pages/user/Login";
import Profile from "../pages/user/Profile";
import Order from "../pages/user/Order";
import Logout from "../pages/user/Logout";
import Payment from "../pages/user/Payment";

//Admin pages
import AdminDashboard from "../pages/admin/AdminDashboard";

//layouts
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

//protected routes
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminProfile from "../pages/admin/AdminProfile";

const AppRoute = () => {
  const router = createBrowserRouter([
    // User Routes
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

        // ProtectedRoute user routes
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

    // Admin login

    {
      path: "admin/login",
      element: <AdminLogin />,
    },

    //Admin routes
    {
      path: "admin/",
      element: <AdminLayout />,
      children: [
        {
          element: <AdminRoute />,
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

    // 404 page

    { path: "*", element: <h1>Page Not Found</h1> },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoute;
