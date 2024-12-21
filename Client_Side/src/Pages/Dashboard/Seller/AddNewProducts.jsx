import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Utils/Hooks/useAuth";
import useAllUsers from "../../../Utils/Hooks/useAllUsers";
import { toast } from "react-toastify";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const AddNewProducts = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [users] = useAllUsers();
  const currentUser = users.find(
    (loggedUser) => loggedUser.email == user.email
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    if (!category) {
      toast.error("Select One Category");
      return;
    }
    if (!brand) {
      toast.error("Select One Brand");
      return;
    }
    setLoading(true);
    const imagePreview = data?.image[0];
    const formData = new FormData();
    formData.append("image", imagePreview);
    fetch(import.meta.env.VITE_IMAGEURL, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((image) => {
        const photo = image?.data?.display_url;
        console.log(photo);
        const finalData = {
          brand,
          name: data?.name,
          description: data?.description,
          price: Number(data?.price),
          category,
          stock: data?.stock,
          image: photo,
          sellerDetails: [
            {
              name: currentUser?.name,
              photo: currentUser?.photoURL,
              email: currentUser?.email,
            },
          ],
        };
        axios
          .post(`${import.meta.env.VITE_LOCALHOST_KEY}/products`, finalData)
          .then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              setLoading(false);
              toast.success("Product is Added success");
              navigate("/dashboard/my-products");
            }
          })
          .catch((error) => {
            setLoading(false);
            toast.error(error.message);
          });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <div className="max-w-xl mx-auto border">
      <h2 className="md:text-3xl text-2xl font-semibold text-center py-5">
        AddNewProducts
      </h2>
      <form className="px-5 space-y-5 pb-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Product Name */}
        <div className="space-y-2">
          <label for="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your Product Name"
            {...register("name", {
              required: " Product Name is required",
            })}
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
            <label
              for="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Category
            </label>
            <select
              name=""
              id=""
              className="outline-none w-full border border-gray-200 rounded-md p-2"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled selected>
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
            <label
              for="name"
              className="block text-sm font-medium text-gray-700"
            >
              Brands
            </label>
            <select
              name=""
              id=""
              className="outline-none w-full border border-gray-200 rounded-md p-2"
              onChange={(e) => setBrand(e.target.value)}
            >
              <option disabled selected>
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
        <div className="flex items-center gap-2">
          {/* Product Stock */}
          <div className="space-y-2 w-full">
            <label
              for="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Product Stock
            </label>
            <input
              type="text"
              id="stock"
              name="stock"
              placeholder="Enter your Product Stock"
              {...register("stock", {
                required: " Product stock is required",
              })}
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
            />
            {errors.stock && (
              <span role="alert" className="text-red-500 text-xs">
                {errors.stock.message}
              </span>
            )}
          </div>
          {/* Product price */}
          <div className="space-y-2 w-full">
            <label
              for="price"
              className="block text-sm font-medium text-gray-700"
            >
              Product Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter your Product price"
              {...register("price", {
                required: " Product price is required",
              })}
              className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
            />
            {errors.price && (
              <span role="alert" className="text-red-500 text-xs">
                {errors.price.message}
              </span>
            )}
          </div>
        </div>
        {/* Product description */}
        <div className="space-y-2">
          <label
            for="description"
            className="block text-sm font-medium text-gray-700"
          >
            Product description
          </label>
          <textarea
            rows={5}
            id="description"
            name="description"
            placeholder="Enter your Product description"
            {...register("description", {
              required: " Product description is required",
            })}
            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
          />
          {errors.description && (
            <span role="alert" className="text-red-500 text-xs">
              {errors.description.message}
            </span>
          )}
        </div>
        {/* Product Image */}
        <div className="space-y-2">
          <label
            for="image"
            className="block text-sm font-medium text-gray-700"
          >
            Product Image
          </label>
          <input
            type="file"
            rows={5}
            id="image"
            name="image"
            placeholder="Enter your Product image"
            {...register("image", {
              required: " Product image is required",
            })}
            className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
          />
          {errors.image && (
            <span role="alert" className="text-red-500 text-xs">
              {errors.image.message}
            </span>
          )}
        </div>
        <button className="block w-full rounded bg-[#f50963] px-4 py-3  font-medium text-gray-50 transition hover:scale-105">
          {loading ? (
            <FaSpinner className="m-auto animate-spin" size={24} />
          ) : (
            "Add New Product"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddNewProducts;
