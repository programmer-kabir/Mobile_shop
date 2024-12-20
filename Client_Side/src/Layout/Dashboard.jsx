import React, { useState } from "react";
import { FaBars, FaBell, FaUser } from "react-icons/fa";
import Sidebar from "../Components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import Container from "../Components/Container/Container";
import logo from "../assets/Logo/mobile-shop.png";
import ImageDropdown from "../Components/ImageDropdown";
import useAuth from "../Utils/Hooks/useAuth";
const Dashboard = () => {
  const { user } = useAuth();
  console.log(user?.photoURL);
  const [isSideNavVisible, setSideNavVisible] = useState(false);
  const [imageError, setImageError] = useState(false);

  const toggleSideNav = () => {
    setSideNavVisible(!isSideNavVisible);
  };

  return (
    <div className="bg-gray-100">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-md border-b w-full ">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center py-3">
              <img src={logo} alt="Logo" className="md:w-1/3 w-[100px]" />
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={toggleSideNav}>
                <FaBars className="text-gray-500 text-lg" />
              </button>
            </div>
            <div className="space-x-5">
             <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center ">
                         {user?.photoURL && !imageError ? (
                           <img
                             src={user.photoURL}
                             alt="User Avatar"
                             className="w-full h-full object-cover"
                             onError={() => setImageError(true)} // Handle image load failure
                           />
                         ) : (
                           <FaRegUserCircle className="w-8 h-8 " />
                         )}
                       </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Sidebar */}
      <div className="md:grid md:grid-cols-12 w-full h-full">
        <div className="md:col-span-3 w-full">
          <Sidebar isSideNavVisible={isSideNavVisible} />
        </div>
        <div className="lg:col-span-9 w-full p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
