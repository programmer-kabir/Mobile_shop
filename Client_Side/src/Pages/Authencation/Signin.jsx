import React, { useState } from 'react'
import Container from '../../Components/Container/Container'
import image from "../../assets/Authencation/Image.svg";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaSpinner } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom';

const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
    };
      const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
      } = useForm();
    const onSubmit = data =>{
      console.log(data);
    }
  return (
    <Container>
      <section className="flex flex-row-reverse mt-2 p-2 border rounded-md">
{/* Left Side */}
<div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
          <div className="max-w-md text-center">
            <img src={image} alt="" />
          </div>
        </div>
        {/* <!-- Right Side --> */}
        <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
          <div className="max-w-xl w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              Sign In Your Account
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              Welcome! Please Sign In Your Account
            </h1>
            <div className="mt-4">
              
                <button
                  type="button"
                  // onClick={handleGoogleSignIn}
                  className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
                >
                  <FcGoogle size={20} />
                  Sign Up with Google{" "}
                </button>
              </div>
             
         

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              {/* Email */}
              <div>
                <label
                  for="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
                {errors.email && (
                  <span role="alert" className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },

                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*\W).+$/,
                        message:
                          "Password must contain at least one capital letter and one special character",
                      },
                    })}
                    className="p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-2.5 text-gray-500 focus:outline-none"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <span role="alert" className="text-red-500 text-xs">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary font-medium text-white p-2 rounded-md hover:bg-gray-800   transition-colors duration-300"
                >
                     {loading ? (
            <FaSpinner className="m-auto animate-spin" size={24} />
          ) : (
            "Sign In"
          )}
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Create a new account?{" "}
                <Link to="/signup" className="text-black hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  )
}

export default Signin