import React, { useContext, useEffect, useState } from "react";
// import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUpdateCartMutation } from "../../state/user/userapi";
import { useDeleteCartMutation } from "../../state/user/userapi";
import CartSingle from "./CartSingle";

const CartPage = () => {
  const { users } = useSelector((state) => state.users);
  const [GrandTotal, setGrandTotal] = useState(1);
  const [number, setNumber] = useState(0);
  const [cartItems, setCartItems] = useState(users && users.getaUser.cart);
  const [updateCart, { isSuccess, isError, data }] = useUpdateCartMutation();
  const [deleteCart, { isSuccess: issuccess, isError: iserror, data: Data }] =
    useDeleteCartMutation();
  const Navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items to display per page

  useEffect(() => {
    // calculate Total Price
    if (users) {
      let productTotal = 0;
      users.getaUser.cart.map((i, index) => {
        i.cartDetail.map((j, index) => {
          const result = j.orderQuantity * j.price;
          productTotal = productTotal + result;
          setGrandTotal(productTotal);
        });
      });
    }
    if (users && cartItems.length > 0) {
      const slice = sliceData(
        users && users.getaUser.cart,
        currentPage,
        itemsPerPage
      );
      setCartItems(slice);
    }
  }, []);
  const sliceData = (data, page, rowsPerPage) => {
    setNumber((page - 1) * rowsPerPage);
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  };

  useEffect(() => {
    if (users && cartItems.length > 0) {
      const slice = sliceData(
        users && users.getaUser.cart,
        currentPage,
        itemsPerPage
      );
      setCartItems(slice);
    }
  }, [currentPage]);
  useEffect(() => {
    if (users) {
      let productTotal = 0;

      users.getaUser.cart.map((i, index) => {
        i.cartDetail.map((j, index) => {
          const result = j.orderQuantity * j.price;
          productTotal = productTotal + result;
          setGrandTotal(productTotal);
        });
      });
    }
  }, [isSuccess]);

  return (
    <>
      <div className="container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
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

        {/* cart table */}

        {users && cartItems.length > 0 ? (
          <div>
            <div className="">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead className="bg-green text-white rounded-sm">
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Category</th>
                      <th>Model</th>
                      <th>Item Name</th>
                      <th>color</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total Price</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users &&
                      cartItems.map((item, index) =>
                        item.cartDetail.map((i, inde) => (
                          <CartSingle
                            index={index}
                            product={item.product}
                            item={item}
                            price={i.price}
                            count={i.orderQuantity}
                            color={i.color}
                            quantity={i.quantity}
                            updateCart={updateCart}
                            deleteCart={deleteCart}
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                          />
                        ))
                      )}
                  </tbody>
                  {/* foot */}
                </table>
              </div>
            </div>
            <hr />

            {/* Pagination */}
            <div className="flex justify-center my-8 flex-wrap gap-2">
              {Array.from({
                length: Math.ceil(users.getaUser.cart.length / itemsPerPage),
              }).map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`mx-1 px-3 py-1 rounded-full ${
                    currentPage === index + 1
                      ? "bg-green text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <hr />
            <div className="flex flex-col md:flex-row justify-between my-8 gap-80">
              <div className="md:w-1/2 space-y-3 ">
                <h3 className="text-lg font-semibold">Customer Details</h3>
                <p>
                  Name:{" "}
                  {(users &&
                    users.getaUser?.firstname + users.getaUser?.lastname) ||
                    "None"}
                </p>
                <p>Email: {users && users.getaUser?.email}</p>
                <p>
                  User_id:{" "}
                  <span className="text-sm">
                    {users && users.getaUser?._id}
                  </span>
                </p>
              </div>
              <div className="md:w-1/2 space-y-3 right-0 ">
                <h3 className="text-lg font-semibold">Shopping Details</h3>
                <p>Total Items: {users && users.getaUser.cart.length}</p>
                <p>
                  Total Price:${GrandTotal}/-
                  {/* <span id="total-price">${orderTotal.toFixed(2)}</span> */}
                </p>
                <button
                  className="btn btn-md bg-green text-white px-8 py-1"
                  onClick={() => Navigate("/checkOut")}
                >
                  Procceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center mt-20">
            <p>Cart is empty. Please add products.</p>
            <Link to="/menu">
              <button className="btn bg-green text-white mt-3">
                Back to Menu
              </button>
            </Link>
          </div>
        )}
      </div>
      <hr />
    </>
  );
};

export default CartPage;
