import React from 'react'
import { Link } from "react-router-dom";
import Sidebar from './Sidebar'
const Products = () => {
  return (
    <>
     <div className="w-full lg:w-full flex flex-row container mx-auto w- bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
     <div className="mt-20 w-64"> <Sidebar /> </div>
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
        {/* banner */}
        <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
          <div className="py-28 flex flex-col items-center justify-center">
            {/* content */}
            <div className=" text-center px-4 space-y-7">
              <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                Items Added to The<span className="text-green"> Cart</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="text-center mt-20">
            <p>Cart is empty. Please add products.</p>
            <Link to="/menu"><button className="btn bg-green text-white mt-3">Back to Menu</button></Link>
          </div>
          </div>

          </div>
        </>
    
  )
}

export default Products
