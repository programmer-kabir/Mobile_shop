import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useBuyer = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: isBuyer, isLoading: isBuyerLoading } = useQuery({
    queryKey: ["isBuyer", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/buyers/${user?.email}`);
      return res.data.Buyers;
    },
  });
  return [isBuyer, isBuyerLoading];
};
export default useBuyer;
