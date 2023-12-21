import React from "react";
import { GiCampCookingPot } from "react-icons/gi";

const FilterProduct = ({category,onClick,isActive}) => {
  return (
    <div onClick={onClick}>
      <div className={`text-3xl p-5 transition ease-in-out delay-50 hover:scale-110 rounded-full cursor-pointer ${isActive ? "bg-blue-600 text-white" : "bg-green-500"}`}>
        <GiCampCookingPot />
      </div>
      <p className="text-center font-medium my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;