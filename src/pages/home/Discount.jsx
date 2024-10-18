/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useGetProductMutation } from "../../state/products/productsApi";
import ProductSlider from "../../components/Slider";
import { useSelector } from "react-redux";

const DiscountProducts = () => {
  const [Product, setProduct] = useState([]);
  const { products } = useSelector((state) => state.product)
  const [getProduct,{data:Products, isSuccess, isLoading}] = useGetProductMutation();

  useEffect( () => {
    if(!products) {
      getProduct();
    }
    else {
      setProduct(products);
    }
   }, []);
 useEffect( () => {
     if(Products){
       setProduct(Products);
     }
   }, [Products]);

  return (
     <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-10 relative">
       <div className='text-left'>
             <p className='subtitle'>Products On Discount</p>
             <h2 className='title'>Products On Discount</h2>
        </div>
    
      <ProductSlider Product={Product} />
    </div>
  );
};

export default DiscountProducts;
