import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetOrdersMutation } from "../../state/order/ordersApi";
import { Link, useNavigate } from "react-router-dom";
const OrderPage = () => {
  const { users } = useSelector((state) => state.users);
  const { orders } = useSelector((state) => state.orders);
  const [getOrders, { data, isError, isLoading }] = useGetOrdersMutation();
  useEffect(() => {
    if (users) {
      console.log(users.getaUser._id);
      getOrders(users.getaUser._id);
    }
  }, []);
  return (
    <div className="container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Your Successfull Orders<span className="text-green"> Page</span>
            </h2>
          </div>
        </div>
        {users && orders ? (
          <div>
            <div className="">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead className="bg-green text-white rounded-sm">
                    <tr>
                      <th>#</th>
                      <th>Email</th>
                      <th>Transaction ID</th>
                      <th>Total Price</th>
                      <th>Total Quantity</th>
                      <th>Status</th>
                      <th>Order By</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.email}</td>
                        <td>{item.transitionId}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.status}</td>
                        <td>{item.orderby}</td>
                        <td>{item.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                  {/* foot */}
                </table>
              </div>
            </div>
            <hr />

            {/* Pagination  */}
            <div className="flex justify-center my-8 flex-wrap gap-2"></div>
          </div>
        ) : (
          <div className="text-center mt-20">
            <p> Please Add Products In Your Cart.</p>
            <Link to="/">
              <button className="btn bg-green text-white mt-3">
                Back to Home
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
