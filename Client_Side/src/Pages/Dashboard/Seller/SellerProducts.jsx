import React, { useState } from "react";
import axios from "axios";
import useProducts from "../../../Utils/Hooks/useProducts";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaExclamation } from "react-icons/fa6";
import { RiDeleteBin2Line } from "react-icons/ri";
import useAuth from "../../../Utils/Hooks/useAuth";
import Loader from "../../Loader";
import { BiEditAlt } from "react-icons/bi";
const SellerProducts = () => {
  const {user} = useAuth()
  const [products,isProductsLoading] = useProducts();
  const sellerProducts = products?.filter(product=>product?.sellerDetails[0].email==user?.email)
  console.log(sellerProducts);
  return (
    <div className="">
       {sellerProducts?.length === 0 ? (
            <div className="flex justify-center py-5">
            <div className="inline-flex items-center gap-1 border border-gray-700 rounded-md px-4 py-2">
              <FaExclamation />
              No Products Found
            </div>
          </div>
          
           ) : (
            <>
            {
              isProductsLoading? <Loader />: <div className="relative flex flex-col w-full h-full overflow-scroll text-black bg-white shadow-md rounded-lg bg-clip-border">
              <table className="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    <th className="p-4 border-b border-slate-600 bg-white">
                      <p className=" text-sm leading-none text-gray-900 font-semibold">
                        Image
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-600 bg-white">
                      <p className=" text-sm leading-none text-gray-900 font-semibold">
                        Name
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-600 bg-white">
                      <p className="text-sm  leading-none text-gray-900 font-semibold">
                        Seller Email
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-600 bg-white">
                      <p className="text-sm  leading-none text-gray-900 font-semibold">
                        stock
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-600 bg-white">
                      <p className="text-sm  leading-none text-gray-900 font-semibold">
                        Price
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-600 bg-white">
                      <p className="text-sm  leading-none text-gray-900 font-semibold">
                        Brand
                      </p>
                    </th>
                    <th className="p-4 border-b border-slate-600 bg-white">
                      <p className="text-sm  leading-none text-gray-900 font-semibold">
                        Action
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sellerProducts?.map((product) => (
                    <tr key={product._id} className="hover:bg-slate-200">
                      <td className="p-4 border-b border-slate-700">
                        <img
                          className="w-10 h-10 rounded-full"
                          alt={product?.name}
                          src={product?.image}
                        />
                      </td>
                      <td className="p-4 border-b border-slate-700">
                        <p className="text-sm text-black font-medium">{product?.name}</p>
                      </td>
                      <td className="p-4 border-b border-slate-700">
                        <p className="text-sm text-black">{product?.sellerDetails[0].email}</p>
                      </td>
                      <td className="p-4 border-b border-slate-700">
                        <p className="text-sm text-black">{product?.stock}</p>
                      </td>
                      <td className="p-4 border-b border-slate-700">
                        <p className="text-sm text-black">{product?.price}</p>
                      </td>
                      <td className="p-4 border-b border-slate-700">
                        <p className="text-sm text-black">{product?.brand}</p>
                      </td>
                     
                      <td className="p-4 border-b border-slate-700 flex items-center justify-center gap-1">
                       <Link to={`/dashboard/edit-product/${product._id}`}>
                       <button className="flex items-center justify-center gap-1 text-white bg-[#f50963] py-2 px-2 rounded-md">
                          <BiEditAlt size={20} />
                          <p>Edit</p>
                        </button></Link>
                        <button className="flex items-center justify-center gap-1 text-white bg-[#f50963] py-2 px-2 rounded-md">
                          <RiDeleteBin2Line size={20} />
                          <p>Delete</p>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            }</>
           )}
    </div>
  );
};

export default SellerProducts;
