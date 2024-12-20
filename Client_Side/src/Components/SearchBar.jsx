import React from 'react'
import { IoSearchSharp } from "react-icons/io5";

const SearchBar = ({handleSearch}) => {
  return (
    <form
    className="flex flex-col sm:flex-row items-center justify-center border border-gray-600 px-2 py-2 rounded-md gap-3"
    onSubmit={handleSearch}
  >
    <input
      type="text"
      name="search"
      id=""
      className="outline-none px-2 w-full sm:w-auto"
      placeholder="Search products"
    />
    <button
      className="flex gap-1 items-center justify-center bg-[#f50963] p-2 px-3 rounded text-white w-full sm:w-auto"
    >
      <IoSearchSharp />
      Search
    </button>
  </form>
  
  )
}

export default SearchBar