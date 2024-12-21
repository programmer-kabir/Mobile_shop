import React from "react";

const ShortPrice = ({ setSort }) => {
  return (
   <div>
     <select
      name=""
      id=""
      className="outline-none w-full border border-gray-200 rounded-md p-2"
      onChange={(e) =>setSort(e.target.value)}
    >
      <option value="asc">Low to High</option>
      <option value="desc">High to Low</option>
    </select>
   </div>
  );
};

export default ShortPrice;
