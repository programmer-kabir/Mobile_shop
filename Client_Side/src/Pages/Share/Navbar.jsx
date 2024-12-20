import React, { useEffect, useState } from "react";
import Container from "../../Components/Container/Container";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/mobile-shop.png";
import { LuUser } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { MdArrowForwardIos } from "react-icons/md";
import useAuth from "../../Utils/Hooks/useAuth";
import { MdDashboard } from "react-icons/md";
import ImageDropdown from "../../Components/ImageDropdown";
const Navbar = () => {
  const { user } = useAuth();
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/" && window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);
  return (
    <div className="bg-white">
      <nav
        className={`w-[100%] fixed bg-white  border-b  z-50 mx-auto ${
          location.pathname === "/" ? (scrolled ? "shadow-sm" : "") : "shadow"
        } text-black`}
      >
        <Container>
          <div className="z-50  bg-white  py-3  md:py-1 flex justify-between items-center text-black">
            {/* Logo */}
            <Link>
              <img className="md:w-1/3 w-[100px]" src={logo} alt="" />
            </Link>
            {/* Imports Link */}
            <div className="md:flex hidden items-center space-x-5 font-medium">
              <NavLink to='/'>Home</NavLink>
              <NavLink to='/product'>Products</NavLink>
              <NavLink>About</NavLink>
              <NavLink>Contact </NavLink>
            </div>
            {/* User And Admin Dashobard Button */}
            <div className="md:flex hidden items-center justify-center gap-3">
              {user ? (
                <>
                  {user[0]?.role === "admin" ? (
                    <Link to="admin/dashboard">
                      <div className="secondaryColor">
                        <MdDashboard size={22} />
                      </div>
                    </Link>
                  ) : (
                    <>
                      <Link to="user/dashboard">
                        <div className="secondaryColor">
                          <MdDashboard size={22} />
                        </div>
                      </Link>
                    </>
                  )}

                  <ImageDropdown />
                </>
              ) : (
                <>
                  <Link to={"/signin"}>
                    <button className="primaryButton flex  items-center justify-center gap-1">
                      <LuUser size={18} />
                      <p className="font-semibold uppercase text-[15px]">
                        Sign in
                      </p>
                    </button>
                  </Link>
                </>
              )}
            </div>
            {/* Mobile Device */}
            <div onClick={handleNav} className="block  md:hidden">
              {nav ? (
                <p />
              ) : (
                <div className="flex items-center gap-2 font-semibold">
                  <HiOutlineMenuAlt3
                    size={30}
                    className="text-black cursor-pointer"
                  />
                </div>
              )}
            </div>
            {/*  */}
            <div
              className={
                nav
                  ? "fixed right-0  top-0 w-full overflow-auto  py-3 h-full text-center md:hidden bg-white  border-r-gray-900 ease-in-out duration-500"
                  : "ease-in-out duration-500 w-full h-full top-0 fixed overflow-auto right-[-100%]"
              }
            >
              <div className="px-5 text-left pb-16">
                <div className="flex items-center justify-between ">
                  <Link to="/" className="">
                    <img className="w-1/3 " src={logo} alt="" />
                    {/* <h2 className="text-2xl text-black font-semibold ">MernShop</h2> */}
                  </Link>
                  <button onClick={handleNav}>
                    <RxCross2
                      size={40}
                      className="primaryColor cursor-pointer hover:text-white border p-2 transition-background transition-text  duration-300 ease-in-out  hover:bg-[#F62977] rounded-full "
                    />
                  </button>
                </div>
                <div className=" pt-10 font-medium ">
                  <div className="flex  items-center justify-center gap-3 border-b w-full pb-2">
                    {user ? (
                      <>
                        {user[0]?.role === "admin" ? (
                          <Link to="admin/dashboard">
                            <div className="secondaryColor">
                              <MdDashboard size={22} />
                            </div>
                          </Link>
                        ) : (
                          <>
                            <Link to="user/dashboard">
                              <div className="secondaryColor">
                                <MdDashboard size={22} />
                              </div>
                            </Link>
                          </>
                        )}

                        <ImageDropdown />
                      </>
                    ) : (
                      <>
                        <Link to={"/signin"}>
                          <button className="primaryButton flex  items-center justify-center gap-1">
                            <LuUser size={18} />
                            <p className="font-semibold uppercase text-[15px]">
                              Sign in
                            </p>
                          </button>
                        </Link>
                      </>
                    )}
                  </div>

                  <NavLink className="border-b py-2 flex flex-col justify-center items-center w-full ">
                    Home
                  </NavLink>
                  <NavLink className="border-b py-2 flex flex-col justify-center items-center w-full ">
                    Products
                  </NavLink>
                  <NavLink className="border-b py-2 flex flex-col justify-center items-center w-full">
                    About
                  </NavLink>
                  <NavLink className="border-b py-2 flex flex-col justify-center items-center w-full">
                    Contact{" "}
                  </NavLink>
                </div>
                <button className="bg-[#F50963] mt-8 flex gap-2 items-center px-5 py-3">
                  <p className=" font-medium">Getting Started </p>
                  <MdArrowForwardIos size={20} />
                </button>
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </div>
  );
};

export default Navbar;
