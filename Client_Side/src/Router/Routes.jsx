import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import SignUp from "../Pages/Authencation/SignUp";
import Signin from "../Pages/Authencation/Signin";
import Dashboard from "../Layout/Dashboard";
import ManegeUsers from "../Pages/Dashboard/Admin/ManegeUsers";
import Profile from "../Pages/Dashboard/Profile";
import AllProducts from "../Pages/Dashboard/Admin/AllProducts";
import SellerProducts from "../Pages/Dashboard/Seller/SellerProducts";
import SellersEditProduct from "../Pages/Dashboard/Seller/SellersEditProduct";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "manage-users",
        element: <ManegeUsers />,
      },
      {
        path: "all-products",
        element: <AllProducts />,
      },
      {
        path: "my-products",
        element: <SellerProducts />,
      },
      { path: "edit-product/:id", element: <SellersEditProduct /> },
    ],
  },
]);
