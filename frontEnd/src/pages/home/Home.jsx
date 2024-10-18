import React, { Suspense, lazy } from 'react'
const  Banner = lazy(() => import('../../components/Banner'))
import Catagories from './Catagories'
import Testimonials from './Testimonials'
const  OurServices = lazy(() => import('./OurServices')) 
const  PopularProducts = lazy(() => import( './Popular' ))
const DiscountProducts = lazy(() => import( './Discount' ))
const OffersProducts = lazy(() => import( './Offer' ))
import  { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
const  ProductDetailsCard = lazy(() => import('../../components/productDetail' ))
import { useSearchParams } from "react-router-dom";
const Home = () => {
  const [searchparams] = useSearchParams();
  const [isSticky, setSticky] = useState(false);
  const [open,setOpen] = useState(false);
  const [id, setID] = useState();

  const product = searchparams.get("id");
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if(product){  
    setOpen(true);
    setID(product);
    }
    else{
    }
  }, [product])
  return (
    <>
     { product && (
      <ProductDetailsCard open={open} setOpen={setOpen} detail={id} setID={setID}/>
    ) } 
    <div>
       <Suspense fallback={<p>This Is Loading...</p>} >
       <Banner/>
       </Suspense>
       <PopularProducts/>
      {
        isSticky && (
          <>
          <DiscountProducts/>
          <OffersProducts/>
          <OurServices/>
          </> 
        )
      } 
      
       
    </div>

    </>
   
  )
}

export default Home