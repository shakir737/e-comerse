import React, { useContext, useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCartMutation } from "../state/user/userapi";
import { useDeleteCartMutation } from "../state/user/userapi";
import axios from "axios";
import toast from "react-hot-toast";
const Cards = ({ item }) => {
  const { users } = useSelector((state) => state.users);
  const { products } = useSelector((state) => state.product);
  const [cart, { isError, isSuccess, data, error }] = useCartMutation();
  const [deleteCart, { isSuccess: issuccess, isError: iserror, data: Data }] =
    useDeleteCartMutation();
  const [inCart, setInCart] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(item)
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [imageUrl, setImageUrl] = useState(item.imageUrls[0]);
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  useEffect(() => {
    cartDetail();
  }, []);

  useEffect(() => {
    setInCart(false);
    cartDetail();
  }, [users]);

  useEffect(() => {
    setImageUrl(item.imageUrls[0]);
  }, [item]);

  useEffect(() => {
    if (isSuccess) {
      //cartDetail()
    }
    if (error) {
      toast.error("Error In Item Adding !");
    }
  }, [users, isSuccess, error]);
  const cartDetail = () => {
    if (users) {
      if (users.getaUser.cart.length > 0) {
        users.getaUser.cart.map((i, index) => {
          if (i.product === item._id) {
            setInCart(true);
          }
        });
      } else {
        setInCart(false);
      }
    }
  };
  const detail = () => {
    if (users) {
      if (users.getaUser.cart.length > 0) {
        users.getaUser.cart.map((i, index) => {
          if (i.product === item._id) {
            console.log(i.product);
            setInCart(true);
          } else {
            setInCart(false);
          }
        });
      } else {
        setInCart(false);
      }
    }
  };
  // add to cart handler
  const handleAddToCart = async (item) => {
    if (users) {
      const cartDetail = item.productDetail;
      const { _id } = item;
      const userID = users.getaUser._id;
      const Cart = { _id, userID, cartDetail };
      const result = await cart(Cart);
      if (result) {
        toast.success("Items Are Added In Cart");
        setInCart(true);
      }
    } else {
      toast.error("Please Login First To Add Items In Cart");
    }
  };
  const handleRemoveFromCart = async (item) => {
    if (users) {
      const { _id: productID } = item;
      const data = { productID };
      const result = await deleteCart(data);
      const { getaUser } = result.data;
      if (result) {
        toast.success("Items Remove From Cart");
        setInCart(false);
      }
    } else {
      toast.error("Please Login First To Add Items In Cart");
    }
  };

  return (
    <div
      to={`/?id=${item._id}`}
      className="card shadow-xl relative mr-5 md:my-5"
    >
      <div
        className={`rating gap-0 absolute right-0 top-0 p-5 w-[60px] heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/?id=${item._id}`}>
        <div className="h-full w-full">
          <img
            src={imageUrl}
            alt="Shoes"
            className="hover:scale-105 transition-all duration-300 md:h-72"
          />
        </div>
      </Link>
      <div className="card-body">
        <div className="flex mx-auto max-h-full">
          {item
            ? item.imageUrls.map((product) => (
                <div onClick={() => setImageUrl(product)} className="flex px-2">
                  <img
                    src={`${product}`}
                    alt=""
                    className="w-[30px] h-[30px] rounded-full mr-1"
                  />
                </div>
              ))
            : null}
        </div>
        <Link to={`/?id=${item._id}`}>
          <spain className="font-bold">{item.title}</spain>
        </Link>
        <p>{item.description}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$ </span>{" "}
            {item.productDetail[0].price}
          </h5>
          {inCart ? (
            <button
              onClick={() => handleRemoveFromCart(item)}
              className="btn bg-red text-white"
            >
              Remove From Cart{" "}
            </button>
          ) : (
            <button
              onClick={() => handleAddToCart(item)}
              className="btn bg-green text-white"
            >
              Add to Cart{" "}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
