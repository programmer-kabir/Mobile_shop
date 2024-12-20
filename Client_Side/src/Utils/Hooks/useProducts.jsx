import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useProducts = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: products, isLoading: isProductsLoading } = useQuery({
    queryKey: ["products",],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      console.log(res.data);
      return res.data;
    },
  });
  return [products, isProductsLoading];
};
export default useProducts;
