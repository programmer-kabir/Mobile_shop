import React, { useEffect, useState } from "react";
import useAllUsers from "../../../Utils/Hooks/useAllUsers";
import axios from "axios";
import useAuth from "../../../Utils/Hooks/useAuth";
import { FaExclamation } from "react-icons/fa6";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  useEffect(() => {
    const fetchWishlist = async () => {
      await axios
        .get(
          `${import.meta.env.VITE_LOCALHOST_KEY}/wishlist?email=${user?.email}`
        )
        .then((res) => {
          setWishlist(res.data[0]);
        });
    };
    if (user?.email) {
      fetchWishlist();
    }
  }, [user?.email]);
  const removeWishlist = productId =>{

axios
    .delete(`${import.meta.env.VITE_LOCALHOST_KEY}/wishlist`, {
      data: { email:user?.email, productId }, 
    })
    .then((res) => {
      console.log(res.data);
      toast.success(res.data.message);
    })
    .catch((error) => {
      console.error(error.message);
      toast.error("Failed to remove the product from the wishlist.");
    });
  }
  return (
    <div className="py-2">
      <h2 className="text-2xl text-center md:text-3xl font-semibold ">
        My Cart Data
      </h2>
      <div className="grid grid-cols-3 gap-5">
        {wishlist?.products?.length > 0 ? (
          wishlist?.products.map((data, index) => (
            <div className=" " key={index}>
              <div className="group relative block overflow-hidden border border-gray-100 rounded-md">
                <img
                  src={data?.image}
                  alt=""
                  className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-52"
                />

                <div className="relative border border-gray-100 bg-white p-4">
                  <p className="text-gray-700">${data?.price}</p>

                  <h3 className="mt-1.5 text-lg font-medium text-gray-900">
                    {data?.name}
                  </h3>
                  <h3 className="mt-1.5  text-gray-800">{data?.brand}</h3>

                  <h3 className="mt-1.5 text-base font-medium text-gray-900">
                    Stock: {data?.stock}
                  </h3>
                  <p className="mt-1.5 line-clamp-3 text-gray-700 mb-5">
                    {data.description}
                  </p>

                  <button onClick={()=>removeWishlist(data.productId)} className="block w-full rounded bg-[#f50963] px-4 py-3  font-medium text-gray-50 transition hover:scale-105">
                    Remove Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center py-5">
            <div className="inline-flex items-center gap-1 border border-gray-700 rounded-md px-4 py-2">
              <FaExclamation />
              No items in your wishlist.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
