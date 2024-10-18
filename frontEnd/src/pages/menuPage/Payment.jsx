import { Elements } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

// outside of a component’s render to avoid
const stripePromise = loadStripe("pk_test_51OsgHYRxvBLvZ1fRXIQmLP7CCKbbnTnuOjyOhuamsVJIWGJOUz98jUcQ2bsze73jOzNEBlBmKjHIbXkLwQzVlrEv00tbm6VFIr");

const Payment = () => {
  const { users } = useSelector((state) => state.users);
  const [GrandTotal, setGrandTotal] = useState(0);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    // calculate Total Price 
    if(users ){
      let productTotal = 0;
      users.getaUser.cart.map((i,index) => {
       i.cartDetail.map((j, index) =>{
         const result = j.orderQuantity * j.price;
         productTotal = productTotal + result;
         setGrandTotal(productTotal);
       })
      })
     const Cart = users.getaUser.cart;
     setCart(Cart);


    }
  }, []);

   // Calculate the cart price
  //  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  //  const totalPrice = parseFloat(cartTotal.toFixed(2));
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-28">
    { GrandTotal > 0 && (
      <Elements stripe={stripePromise}>
        <CheckoutForm price={GrandTotal} cart={cart} users={users} />
      </Elements>
     ) }
     
    </div>
  );
};

export default Payment;
