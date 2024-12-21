import React, { useEffect, useState } from "react";
import Container from "../Components/Container/Container";
import SearchBar from "../Components/SearchBar";
import ShortPrice from "../Components/ShortPrice";
import FilterBar from "../Components/Products/FilterBar";
import Loader from "./Loader";
import { FaExclamation } from "react-icons/fa6";
import ProductsCard from "../Components/Products/ProductsCard";
import axios from "axios";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [uniqueBrand, setUniqueBrand] = useState([]);
  const [uniqueCategory, setUniqueCategory] = useState([]);
  const [page,setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  console.log(brand);
  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      axios
        .get(
          `${
            import.meta.env.VITE_LOCALHOST_KEY
          }/products?name=${search}&sort=${sort}&page=${page}&limit=${9}&brand=${brand}&category=${category}`
        )
        .then((res) => {
          console.log(res.data);
          setProducts(res.data.products);
          setUniqueBrand(res.data.brands)
          setUniqueCategory(res.data.categories)
          setTotalPages(Math.ceil(res.data.totalProducts / 9))
          setLoading(false);
        });
    };

    fetch();
  }, [search,sort,brand,category,page]);
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
    e.target.search.value = "";
  };
  const handleReset = () => {
    setSearch("");
    setBrand("");
    setCategory("");
    setSort("asc");
    window.location.reload();
  };
  const handlePageChange = (newPage) =>{
    console.log(newPage);
if(newPage>0&& newPage <= totalPages){
  setPage(newPage)
  window.scrollTo({top:0, behavior:"smooth"})
}
  }
  return (
    <Container>
      <div className="pt-16">
        <h2 className=" text-2xl md:text-3xl  font-semibold text-center my-5">
          All Products
        </h2>
        {/* Search and price */}
        <div className="md:flex items-center justify-between border border-gray-200 py-4 px-5 space-y-5 md:space-y-0">
          <SearchBar handleSearch={handleSearch} />
          <ShortPrice setSort={setSort} />
        </div>
        {/* Content */}
        <div className="grid grid-cols-12 pt-7 border-r gap-7">
          <div className="md:col-span-3 col-span-12 px-2 md:h-screen">
            <FilterBar
              setCategory={setCategory}
              setBrand={setBrand}
              handleReset={handleReset}
              uniqueBrand={uniqueBrand}
              uniqueCategory={uniqueCategory}
            />
          </div>
          <div className="md:col-span-9 col-span-12">
            {loading ? (
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
                  <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                      <ProductsCard key={product._id} product={product} />
                    ))}
                  </div>
                )}
              </>
            )}
          <div class=" flex items-center justify-center">
    <div class="max-w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-sm">

        <div class="flex justify-center">
            <nav class="flex space-x-2" aria-label="Pagination">
            <button 
  onClick={() => handlePageChange(page - 1)} 
  disabled={page === 1} 
  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10
    ${page === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#f50963] text-white hover:border-violet-100 cursor-pointer border-[#f50963]'}`}
>
  <MdKeyboardDoubleArrowLeft size={20} />
</button>

{Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
      <button 
        key={pageNumber} 
        onClick={() => handlePageChange(pageNumber)} 
        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10
          ${page === pageNumber ? 'bg-[#f50963] text-white border-[#f50963]' : 'text-gray-700 bg-white border border-fuchsia-100 hover:bg-fuchsia-200 cursor-pointer'}`}
      >
        {pageNumber}
      </button>
    ))}
                <button 
      disabled={page === totalPages} 
      onClick={() => handlePageChange(page + 1)} 
      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold leading-5 rounded-md transition duration-150 ease-in-out focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10
        ${page === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#f50963] text-white hover:border-violet-100 cursor-pointer border-[#f50963]'}`}
    >
      <MdKeyboardDoubleArrowLeft size={20} className="rotate-180" />
    </button>
            </nav>
        </div>

    </div>
</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Products;
