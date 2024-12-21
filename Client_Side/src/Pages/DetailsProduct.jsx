import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import useProducts from "../Utils/Hooks/useProducts";
import useAuth from "../Utils/Hooks/useAuth";
import useAllUsers from "../Utils/Hooks/useAllUsers";

const DetailsProduct = () => {
    const {user} = useAuth()
    const [users,loading] = useAllUsers()
    
    const currentUser = users.find(loggedUser =>loggedUser.email==user.email)
  const data = useLoaderData();
const handleWishlist = id =>{
    
}
  return (
    <div className="pt-16">
      <div className="max-w-xl border border-gray-200 mx-auto">
        <div className="w-full first-line:flex items-center justify-center">
          <img src={data.image} alt="" />
        </div>
        {/* Seller Details */}
        <div className="flex items-center justify-between border-t px-5 py-3 ">
          <div className="flex items-center justify-center gap-3">
            <img
              className="w-12 h-12 rounded-full"
              src={data.sellerDetails[0].photo}
              alt=""
            />
            <h6>{data.sellerDetails[0].name}</h6>
          </div>
          <div>
            <h6>{data.sellerDetails[0].email}</h6>
          </div>
        </div>
        {/* Dentals */}
        <div className="px-5 py-3">
          <h2 className="text-3xl font-semibold">{data?.name}</h2>
          <p className="font-medium">Price: ${data.price}</p>
          <div className="flex items-center  gap-4 pt-3">
            <p className="font-normal">Brand: {data.brand}</p>
            <p className="font-normal">Category: {data.category}</p>
          </div>
          <p className="font-normal">
            Stock available: <span className="font-medium">{data.stock}</span>
          </p>
          <p className="font-normal pt-3">
            <span className="font-medium">Description:</span> {data.description}
          </p>
          
         <button className="block w-full mt-7 rounded bg-[#f50963] px-4 py-3  font-medium text-gray-50 transition hover:scale-105">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsProduct;
