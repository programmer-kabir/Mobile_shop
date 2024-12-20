import React, { useState } from "react";
import Container from "../../Components/Container/Container";
import image from "../../assets/Authencation/Image.svg";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaSpinner } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { PiCloudArrowDownBold } from "react-icons/pi";
import {Link, useLocation, useNavigate} from 'react-router-dom'
import {toast } from 'react-toastify';
import useAuth from "../../Utils/Hooks/useAuth";
import { SaveUser } from "../../Utils/Apis/SaveUser";
import { IoIosArrowDown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
const SignUp = () => {
  const { RegisterUser, updateUserProfile, signInWithGoogle } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Select Status");
     const [isStatusOpen, setIsStatusOpen] = useState(false);  
      const toggleStatus = () => {
        setIsStatusOpen(!isStatusOpen);
      };
      
      const handleChange = (e) => {
        setSelectedStatus(e.target.innerText); 
        setIsStatusOpen(false); 
      }
      const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
      };
      const [fileName, setFileName] = useState("");
        const [imagePreview, setImagePreview] = useState(null);
        const [loading, setLoading] = useState(false);
        const handleFileChange = (event) => {
          const file = event.target.files[0];
          if (file) {
            setFileName(file.name);
            setImagePreview(file);
          } else {
            setFileName("");
            setImagePreview(null);
          }
        };
        const {
          register,
          handleSubmit,
          formState: { errors },
          watch,
        } = useForm();
        const navigate = useNavigate();
        const location = useLocation();
        const from = location.state?.from?.pathname || "/";
         const onSubmit = data =>{
          if(!selectedStatus){
            toast.error("Select Your Status")
          }
          if (!imagePreview ) {
            toast.error("Image Not Find");
            return;
          }
         
          setLoading(true);
          const formData = new FormData();
          formData.append("image", imagePreview);
          fetch(import.meta.env.VITE_IMAGEURL, {
            method: "POST",
            body: formData,
          })
          .then((res) => res.json())
          .then((image) => {
            const photo = image?.data?.display_url;
            RegisterUser(data.email, data.password)
            .then(result =>{
              const loggedUser = result.user;
              updateUserProfile(data.name, photo)
              .then((result) => {
                SaveUser(loggedUser,selectedStatus);
                setLoading(false);
                toast.success("User Create Successfully");
                navigate('/')
              })
              .catch((error) => {
                setLoading(false);
                toast.error(error.message);
              });
            })
            .catch((error) =>{
              setLoading(false);
                  toast.error(error.message);
            })
          })
      
        }
      
        const handleGoogleSignIn = () => {     
          setLoading(true);
          signInWithGoogle()
            .then((result) => {
              setLoading(false);
              toast.success("User login successfully")
              SaveUser(result.user,selectedStatus)
              navigate(from, { replace: true });
            })
            .catch((err) => {
              setLoading(false)
              // console.log(err.message);
              toast.error(err.message);
            });
         
        };
       
        
        return (
    <Container>
    <section className="pt-16">
    <div className="flex  p-2  border rounded-md">
       {/* Left Side */}
       <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
         <div className="max-w-md text-center">
           <img src={image} alt="" />
         </div>
       </div>
       {/* Right Side */}
       <div className="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
         <div className="max-w-xl w-full p-6">
           <h1 className="text-3xl font-semibold mb-6 text-black text-center">
             Sign Up
           </h1>
           <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
             Join to Our Community with all time access and free{" "}
           </h1>
           <div className="mt-4">
           
               <button
                 type="button"
                 onClick={handleGoogleSignIn}
                 className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
               >
                 <FcGoogle size={20} />
                 Sign Up with Google{" "}
               </button>
           
           </div>

           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
             {/* Name */}
             <div>
               <label
                 for="name"
                 className="block text-sm font-medium text-gray-700"
               >
                 Name
               </label>
               <input
                 type="text"
                 id="name"
                 name="name"
                 {...register("name", { required: "Name is required" })}
                 placeholder="Enter your full name"
                 className="mt-1 p-2 outline-none w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
               />
               {errors.name && (
                 <span role="alert" className="text-red-500 text-xs">
                   {errors.name.message}
                 </span>
               )}
             </div>
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
                       value: 8,
                       message: "Password must be at least 8 characters long",
                     },

                     pattern: {
                       value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                       message:
                       "Password must include uppercase, lowercase, a number, and a special character",                      },
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
             {/* Role Set */}
             <div className="relative inline-block text-left w-full">
     <div>
       <button
         type="button"
         className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
         id="options-menu"
         aria-expanded={isStatusOpen ? "true" : "false"} // Dynamically set aria-expanded
         aria-haspopup="true"
         onClick={toggleStatus}  // Toggle dropdown on button click
       >
         {selectedStatus}
         <svg
           className="-mr-1 ml-2 h-5 w-5"
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 20 20"
           fill="currentColor"
           aria-hidden="true"
         >
           <path
             fillRule="evenodd"
             d="M5.23 7.53a.75.75 0 011.06 0L10 11.084l3.71-3.554a.75.75 0 111.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 010-1.08z"
             clipRule="evenodd"
           />
         </svg>
       </button>
     </div>

     {/* Dropdown menu */}
     {isStatusOpen && (
       <div
         className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
         role="menu"
         aria-orientation="vertical"
         aria-labelledby="options-menu"
       >
         <div className="py-1" role="none">
           <button
             onClick={handleChange}
             className="text-gray-700 block px-4 py-2 text-sm"
             role="menuitem"
           >
             Buyers
           </button>
           <button
             onClick={handleChange}
             className="text-gray-700 block px-4 py-2 text-sm"
             role="menuitem"
           >
             Sellers
           </button>
          
         </div>
       </div>
     )}
   </div>
             {/* Image */}

             <div>
               <label
                 htmlFor="photo-dropbox"
                 className="flex cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-3 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
               >
                 {fileName ? (
                   <p className="mt-2 text-sm text-gray-700">
                     Uploaded file:{" "}
                     <span className="font-medium">{fileName}</span>
                     <input
                       id="photo-dropbox"
                       type="file"
                       className="sr-only"
                       onChange={handleFileChange}
                     />
                   </p>
                 ) : (
                   <>
                     <span className="flex items-center space-x-2">
                       <PiCloudArrowDownBold size={22} />
                       <span className="text-xs font-medium text-gray-600">
                         Drop files to Attach, or{" "}
                         <span className="text-[#F50963] underline">
                           browse
                         </span>
                       </span>
                     </span>
                     <input
                       id="photo-dropbox"
                       type="file"
                       className="sr-only"
                       onChange={handleFileChange}
                     />
                   </>
                 )}
               </label>
             </div>
             <div>
               <button
                 type="submit"
                 className="w-full bg-primary font-medium text-white p-2 rounded-md hover:bg-gray-800   transition-colors duration-300"
               >
                 {loading ? (
                   <FaSpinner className="m-auto animate-spin" size={24} />
                 ) : (
                   "Sign Up"
                 )}
               </button>
             </div>
           </form>
  <div className="mt-4 text-sm text-gray-600 text-center">
             <p>
               Already have an account?{" "}
               <Link to="/signin" className="text-black hover:underline">
                 Signin here
               </Link>
             </p>
           </div>

             </div>
         </div>
 
       
     </div>
    </section>
   </Container>
  )
}

export default SignUp;