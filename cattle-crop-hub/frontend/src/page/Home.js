import React, { useEffect, useRef, useState } from "react";
import  FarmerAnimated from '../assest/farmer-animated.gif';
import  CattleAnimated from '../assest/cattle-animated.gif';
import  CardFeature from '../component/CardFeature';
import { useSelector } from 'react-redux';
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";
import { Link } from 'react-router-dom';


const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartList = productData.slice(0,4)
  const homeProductCartListSpecial = productData.filter(
    (el) => el.category === "special",
    []
  );
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4 bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"
            />
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Daily Fresh Cattle Products in{" "}
            <span className="text-blue-600 text-">Your Home</span>
          </h2>
          
          <button className="font-bold transition ease-in-out delay-50 hover:scale-110 bg-blue-500 text-slate-200 px-4 py-2 rounded-md">
            Order Now
          </button>
        </div>
        
        <div className="md:w-1/2 h-140 w-200 flex flex-wrap gap-5 p-4">
          <Link to="/menu/656b5c572fb1c21aa5c5b259">
            <img src={FarmerAnimated} className="h-60 w-100 bg-contain cursor-pointer" alt="Farmer" />
          </Link>
          <Link to="/menu/656eed196cb9544491d1cba7">
            <img src={CattleAnimated} className="h-60 w-100 bg-auto cursor-pointer" alt="Cattle" />
          </Link>
        </div>
      </div>

      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Special Items
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 transition ease-in-out delay-50 hover:scale-110 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 transition ease-in-out delay-50 hover:scale-110 hover:bg-slate-400 text-lg p-1 rounded "
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-7 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListSpecial[0]
            ? homeProductCartListSpecial.map((el) => {
                return (
                  <CardFeature
                    key={el._id+"special"}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el,index) => (
                <CardFeature loading="Loading..." key={index+"cartLoading"} />
              ))}
        </div>
      </div>
      
      <AllProduct heading={"Your Product"}/>
    </div>
  );
};

export default Home;