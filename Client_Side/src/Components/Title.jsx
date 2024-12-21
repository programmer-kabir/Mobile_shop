import React from "react";

const Title = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <p className="text-sm font-medium uppercase text-gray-500">{title}</p>
      <p className="text-[#F50963] text-xl font-bold">
{subtitle}
      </p>
      <div className="flex items-center justify-center">
        <hr className="half-red-half-white h-1 w-96 " />
      </div>
    </div>
  );
};

export default Title;