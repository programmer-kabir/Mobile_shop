import { Navigate, useLocation } from "react-router";
import useAdmin from "../Utils/Hooks/useAdmin";
import Loader from "../Pages/Loader";
import useAuth from "../Utils/Hooks/useAuth";
import useBuyer from "../Utils/Hooks/useBuyer";

const BuyerRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const [isBuyer, isBuyerLoading] = useBuyer();
  const location = useLocation();

  if (loading || isBuyerLoading) {
    return <Loader />;
  }

  if (user && isBuyerLoading) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default BuyerRoutes;
