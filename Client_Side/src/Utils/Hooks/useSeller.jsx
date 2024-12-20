import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useSeller = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: isSeller, isLoading: isSellerLoading } = useQuery({
    queryKey: ["isSeller", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/sellers/${user?.email}`);
      return res.data.Sellers;
    },
  });
  return [isSeller, isSellerLoading];
};
export default useSeller;
