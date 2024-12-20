import React from "react";
import Container from "../Components/Container/Container";
import SearchBar from "../Components/SearchBar";
import ShortPrice from "../Components/ShortPrice";
import FilterBar from "../Components/Products/FilterBar";
import useProducts from "../Utils/Hooks/useProducts";
import Loader from "./Loader";
import { FaExclamation } from "react-icons/fa6";
import ProductsCard from "../Components/Products/ProductsCard";

const Products = () => {
  const [products, isProductsLoading] = useProducts();
  return (
    <Container>
      <div className="pt-16">
        <h2 className=" text-2xl md:text-3xl  font-semibold text-center my-5">
          All Products
        </h2>
        {/* Search and price */}
        <div className="flex items-center justify-between border border-gray-200 py-4 px-5">
          <SearchBar />
          <ShortPrice />
        </div>
        {/* Content */}
        <div className="grid grid-cols-12 pt-7 border-r gap-7">
          <div className="col-span-3 px-2 h-screen">
            <FilterBar />
          </div>
          <div className="col-span-9">
            {isProductsLoading ? (
              <Loader />
            ) : (
              <>
                {products?.length === 0 ? (
                  <div className="flex justify-center py-5">
                    <div className="inline-flex items-center gap-1 border border-gray-700 rounded-md px-4 py-2">
                      <FaExclamation />
                      No Products Found..
                    </div>
                  </div>
                ) : (
                  <div className="min-h-screen grid grid-cols-3 gap-4">
                    {products.map((product) => (
                      <ProductsCard key={product._id} product={product} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Products;
