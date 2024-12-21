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
import PrivateRoute from "./PrivetRoute";
import AdminRoute from "./AdminRoutes";
import SellerRoutes from "./SellerRoutes";
import AddNewProducts from "../Pages/Dashboard/Seller/AddNewProducts";
import Products from "../Pages/Products";
import DetailsProduct from "../Pages/DetailsProduct";

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
        path: "/product",
        element: <Products />,
      },
      {
        path: "/product/detailsProduct/:id",
        element: <DetailsProduct />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_LOCALHOST_KEY}/product/${params.id}`),
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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManegeUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <AdminRoute>
            <AllProducts />
          </AdminRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <SellerRoutes>
            <SellerProducts />
          </SellerRoutes>
        ),
      },
      {
        path: "edit-product/:id",
        element: (
          <SellerRoutes>
            <SellersEditProduct />
          </SellerRoutes>
        ),
      },
      {
        path: "add-products",
        element: (
          <SellerRoutes>
            <AddNewProducts />
          </SellerRoutes>
        ),
      },
    ],
  },
]);
