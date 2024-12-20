import { Navigate, useLocation } from "react-router";
import useAdmin from "../Utils/Hooks/useAdmin";
import Loader from "../Pages/Loader";
import useAuth from "../Utils/Hooks/useAuth";

const BuyerRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <Loader />;
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default BuyerRoutes;
