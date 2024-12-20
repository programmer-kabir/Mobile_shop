import { Navigate, useLocation } from "react-router";
import Loader from "../Pages/Loader";
import useAuth from "../Utils/Hooks/useAuth";
import useSeller from "../Utils/Hooks/useSeller";

const SellerRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const [isSeller, isSellerLoading] = useSeller();
  const location = useLocation();

  if (loading || isSellerLoading) {
    return <Loader />;
  }

  if (user && isSeller) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default SellerRoutes;
