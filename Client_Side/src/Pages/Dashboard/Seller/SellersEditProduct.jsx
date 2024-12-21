import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios'
const SellersEditProduct = () => {
  const editProduct = useLoaderData();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(editProduct?.category || "");
  const [brand, setBrand] = useState(editProduct?.brand || "");
const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = (data) => {
    if (data.price) {
      data.price = parseFloat(data.price);
      if (isNaN(data.price)) {
        toast.error("Price must be a valid number");
        return;
      }
    }
    const updatedFields = {
      ...Object.keys(data).reduce((acc, key) => {
        if (data[key] !== editProduct[key]) {
          acc[key] = data[key];
        }
        return acc;
      }, {}),
      ...(category !== editProduct?.category ? { category } : {}),
      ...(brand !== editProduct?.brand ? { brand } : {}),
    };

    if (Object.keys(updatedFields).length === 0) {
      toast.error("No changes detected");
      return;
    }

    console.log("Updated Fields:", updatedFields);
   axios.patch(`${import.meta.env.VITE_LOCALHOST_KEY}/product/${editProduct._id}`,updatedFields)
   .then(res=>{
    // console.log(res.data);
    toast.success(res.data.message)
    navigate('/dashboard/my-products')
   })
  };

  return (
    <div>
      <form className="px-5 space-y-5 pb-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Product Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            defaultValue={editProduct?.name}
            placeholder="Enter your Product Name"
            {...register("name", { required: "Product Name is required" })}
            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
          />
          {errors.name && (
            <span role="alert" className="text-red-500 text-xs">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Category */}
          <div className="space-y-2 w-full">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Product Category
            </label>
            <select
              value={category}
              className="outline-none w-full border border-gray-200 rounded-md p-2"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled value="">
                Category
              </option>
              <option>smartphone</option>
              <option>headphone</option>
              <option>smartWatch</option>
              <option>powerBank</option>
            </select>
          </div>

          {/* Brand */}
          <div className="space-y-2 w-full">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
              Brands
            </label>
            <select
              value={brand}
              className="outline-none w-full border border-gray-200 rounded-md p-2"
              onChange={(e) => setBrand(e.target.value)}
            >
              <option disabled value="">
                Brands
              </option>
              <option>Samsung</option>
              <option>Apple</option>
              <option>Garmin</option>
              <option>Redmi</option>
              <option>Realme</option>
              <option>Fitbit</option>
            </select>
          </div>
        </div>

        {/* Product Stock */}
        <div className="flex items-center gap-2">
          <div className="space-y-2 w-full">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Product Stock
            </label>
            <input
              type="text"
              id="stock"
              defaultValue={editProduct?.stock}
              placeholder="Enter your Product Stock"
              {...register("stock", { required: "Product stock is required" })}
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
            />
            {errors.stock && (
              <span role="alert" className="text-red-500 text-xs">
                {errors.stock.message}
              </span>
            )}
          </div>

          {/* Product Price */}
          <div className="space-y-2 w-full">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Product Price
            </label>
            <input
              type="number"
              id="price"
              defaultValue={editProduct?.price}
              placeholder="Enter your Product price"
              {...register("price", { required: "Product price is required" })}
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
            />
            {errors.price && (
              <span role="alert" className="text-red-500 text-xs">
                {errors.price.message}
              </span>
            )}
          </div>
        </div>

        {/* Product Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Product Description
          </label>
          <textarea
            rows={5}
            defaultValue={editProduct?.description}
            id="description"
            placeholder="Enter your Product description"
            {...register("description", { required: "Product description is required" })}
            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
          />
          {errors.description && (
            <span role="alert" className="text-red-500 text-xs">
              {errors.description.message}
            </span>
          )}
        </div>

        <button className="block w-full rounded bg-[#f50963] px-4 py-3 font-medium text-gray-50 transition hover:scale-105">
          {loading ? <FaSpinner className="m-auto animate-spin" size={24} /> : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default SellersEditProduct;
