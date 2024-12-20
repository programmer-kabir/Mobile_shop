import React from "react";
import {
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiOutlineProduct } from "react-icons/ai";

const Sidebar = ({ isSideNavVisible }) => {
  return (
    <div className="flex flex-wrap shadow h-screen border-r">
      <div
        className={`p-2 bg-white w-full flex flex-col ${
          isSideNavVisible ? "" : "hidden md:flex"
        }`}
      >
        <nav>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `block text-gray-800 py-2.5 px-4 mt-4 rounded transition duration-200 ${
                isActive ? "bg-[#f50963] text-white" : "hover:bg-[#f50963] hover:text-white"
              }`
            }
          >
            <CgProfile className="mr-2 inline" size={24} />
            My Profile
          </NavLink>
          <NavLink
            to="manage-users"
            className={({ isActive }) =>
              `block text-gray-800 py-2.5 px-4 my-3 rounded transition duration-200 ${
                isActive ? "bg-[#f50963] text-white" : "hover:bg-[#f50963] hover:text-white"
              }`
            }
          >
            <FaUsers className="mr-2 inline" />
            Manage Users
          </NavLink>
          <NavLink
            to="all-products"
            className={({ isActive }) =>
              `block text-gray-800 py-2.5 px-4 rounded transition duration-200 ${
                isActive ? "bg-[#f50963] text-white" : "hover:bg-[#f50963] hover:text-white"
              }`
            }
          >
            <AiOutlineProduct className="mr-2 inline" />
            Show All Products
          </NavLink>
        </nav>
        <a
          href="#"
          className="block text-gray-500 py-2.5 px-4 my-2 rounded transition duration-200 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-cyan-500 hover:text-white mt-auto"
        >
          <FaSignOutAlt className="mr-2 inline" />
          Cerrar sesión
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
