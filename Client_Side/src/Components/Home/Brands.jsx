import React, { useEffect, useMemo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import Container from "../Container/Container";
import Title from "../Title";
import useProducts from "../../Utils/Hooks/useProducts";

const Brands = () => {
  const [products] = useProducts();
  const [activeTab, setActiveTab] = useState("Apple");
  const tabs = ["Apple", "Samsung", "Redmi", "Realme"];

  const handleTabChange = (event) => {
    setActiveTab(event.target.value);
  };
  console.log(products);
  const currentData = products.filter((product) => product.brand == activeTab);

  return (
    <Container>
      <Title title="brands" subtitle="For Your Choose Brands" />
      <div>
        {/* Mobile View */}
        <div className="sm:hidden ">
          <label htmlFor="Tab" className="sr-only">
            Tab
          </label>
          <select
            id="Tab"
            className="w-full rounded-md border-gray-200"
            value={activeTab}
            onChange={handleTabChange}
          >
            {tabs.map((tab) => (
              <option key={tab} value={tab}>
                {tab}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop View */}
        <div className="hidden sm:block  w-full mx-auto text-center pt-10">
          <nav
            className="flex gap-6 items-center justify-center"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-lg p-2 text-sm font-medium ${
                  activeTab === tab
                    ? "bg-sky-100 text-sky-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                }`}
                aria-current={activeTab === tab ? "page" : undefined}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="mt-4">
          <Swiper
            breakpoints={{
              // When the viewport width is >= 640px
              640: {
                slidesPerView: 4, // 4 slides per view on larger screens
              },
              // When the viewport width is < 640px
              0: {
                slidesPerView: 1, // 1 slide per view on small screens
              },
            }}
            spaceBetween={10}
            modules={[Pagination]}
            className="mySwiper mt-5"
          >
            {currentData.map((product) => (
              <SwiperSlide key={product._id}>
                 <div className="group relative block overflow-hidden border border-gray-100 rounded-md">
      <img
        src={product?.image}
        alt=""
        className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-48"
      />

      <div className="relative border border-gray-100 bg-white p-4">
        <p className="text-gray-700">${product?.price}</p>

        <h3 className="mt-1.5 text-lg font-medium text-gray-900">
          {product?.name}
        </h3>
        <h3 className="mt-1.5  text-gray-800">
          {product?.category}
        </h3>

        <h3 className="mt-1.5 text-base font-medium text-gray-900">
          Stock: {product?.stock}
        </h3>
        <p className="mt-1.5 line-clamp-3 text-gray-700 mb-5">
          {product.description}
        </p>

     
    
       
      </div>
    </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Container>
  );
};

export default Brands;
