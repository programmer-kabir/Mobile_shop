import React from "react";
import { RiResetLeftLine } from "react-icons/ri";
const FilterBar = ({
  setCategory,
  setBrand,
  handleReset,
  uniqueBrand,
  uniqueCategory,
}) => {
    console.log(uniqueBrand);
  return (
    <div>
      <div className="w-full space-y-4">
        <select
          className="outline-none w-full border border-gray-200 rounded-md p-2"
          onChange={(e) => setBrand(e.target.value)}
        >
          <option value="">Brands</option>
          {uniqueBrand.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
         ))}
        </select>
        <select
          name=""
          id=""
          className="outline-none w-full border border-gray-200 rounded-md p-2"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled selected>
            Category
          </option>
          {uniqueCategory.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
         ))}
        </select>
        <button
          onClick={handleReset}
          className="primaryButton w-full flex items-center justify-center gap-2"
        >
          <RiResetLeftLine size={20} />
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
