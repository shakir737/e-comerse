import React, { useEffect, useState, useRef } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsCartFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { useCartMutation } from "../state/user/userapi";
import { useDeleteCartMutation } from "../state/user/userapi";
import { useSearchParams } from "react-router-dom";
import { redirect } from "react-router-dom";
import toast from "react-hot-toast";

const ProductDetailsCard = ({ setOpen, open }) => {
  const productState = useSelector((state) => state.product.products);
  const { users } = useSelector((state) => state.users);
  const [cart, { isError, isSuccess, data, error }] = useCartMutation();
  const [deleteCart, { isSuccess: issuccess, isError: iserror, data: Data }] =
    useDeleteCartMutation();
  const [searchparams] = useSearchParams();
  const detail = searchparams.get("id");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [productInfo, setProductInfo] = useState();
  const [detil, setDetail] = useState([
    { product: "", color: "", quantity: 0, price: 0, orderQuantity: 0 },
  ]);
  const [click, setClick] = useState(false);
  const [cartInfo, setCartInfo] = useState();
  const [Cart, setCart] = useState(false);
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState([
    {
      message: "",
    },
  ]);

  //   const [select, setSelect] = useState(false);
  useEffect(() => {
    if (detail !== undefined) {
      setOpen(true);
      productDetail(detail);
      cartDetail(users);
    }
  }, [detail, users, isSuccess]);

  useEffect(() => {
    if (detail !== undefined) {
      setOpen(true);
      productDetail(detail);
      cartDetail(users);
    }
  }, []);

  const productDetail = (id) => {
    const filterProduct = productState.filter((product) => product._id === id);
    if (filterProduct) {
      setProductInfo(filterProduct);
    }
  };

  const cartDetail = (users) => {
    if (users) {
      if (users.getaUser.cart.length > 0) {
        users.getaUser.cart.map((i, index) => {
          const result = productState.filter(
            (product) => product._id === i.product
          );
          const result1 = result.filter((product) => product._id === detail);
          if (result1.length > 0) {
            setCart(true);
          }
        });
      } else {
        setCart(false);
      }
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = (quantity) => {};
  const handleChange = (e, link, quantity) => {
    if (e.target.value != "") {
      const { value } = e.target;

      if (active) {
        setActive(false);
      }
      const productDetail = [...detil];
      productDetail[link].orderQuantity = parseInt(value);
      productDetail[link].price = productInfo[0].productDetail[link].price;
      productDetail[link].color = productInfo[0].productDetail[link].color;
      productDetail[link].quantity =
        productInfo[0].productDetail[link].quantity;
      if (!detil[link + 1]) {
        setDetail([
          ...detil,
          { color: "", price: 0, quantity: 0, orderQuantity: 0 },
        ]);
      }
    }
  };
  const handleChangeMessage = (e) => {
    const data = e.target.value;
    setMessage(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { message, detail };

    const result = await dispatch(chat(data));
    setProductInfo(result.payload);
    setMessage("");
  };
  // const isItemExists = cart && cart.find((i) => i._id === id)
  const addToCart = async (_id, userID, Detail) => {
    // const { color, price, orderQuantity } = order[0];
    // if ((color === "") & (price === 0) & (orderQuantity === 0)) {
    //   return alert("Please Enter Values of Order Quantity");
    // }
    // const cartDetail = order.filter((product) => product.orderQuantity != 0);
    const cartDetail = productInfo[0].productDetail;
    const Cart = { _id, userID, cartDetail };

    const result = await cart(Cart);
    if (result) {
      toast.success("Items Are Successfully Added In Cart");
      setCart(true);
    }
  };
  const removeFromCart = async (productID) => {
    const data = { productID };
    const result = await deleteCart(data);
    const { getaUser } = result.data;
    if (result) {
      toast.success("Items Remove From Cart");
      setCart(false);
    }
  };

  const wishlistfilter = () => {
    const data = users.getaUser.wishlist.filter(
      (product) => product === detail
    );
    return data;
  };

  const removeFromWishlistHandler = async (id, userID) => {
    const latest = dispatch(removeWishlist(id));
  };

  const addToWishlistHandler = async (id, userID) => {
    const latest = await dispatch(wishlist(id));
  };
  const closeCard = () => {
    navigate("/");
  };
  return (
    <div className="drawer z-50 bg-[#fff]">
      <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
        <div className="w-[90%] 800px:w-[95%] h-[80vh] overflow-y-scroll 800px:h-[80vh] bg-white rounded-md shadow-sm relative p-4">
          <button onClick={closeCard}>
            <RxCross1 size={30} className="absolute right-3 top-3 z-50" />
          </button>

          <div className=" w-full md:flex lg:flex xl:flex">
            <div className="w-full 800px:w-[50%] items-center">
              {productInfo && !imageUrl ? (
                <img
                  src={`${productInfo[0].imageUrls[0]}`}
                  alt=""
                  className="w-[400px] h-[420px] ml-10"
                />
              ) : (
                <img
                  src={`${imageUrl}`}
                  alt=""
                  className="w-[500px] h-[480px]"
                />
              )}
              <div className="flex mt-4">
                {productInfo
                  ? productInfo[0].imageUrls.map((product) => (
                      <div
                        onClick={() => setImageUrl(product)}
                        className="flex"
                      >
                        <img
                          src={`${product}`}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full mr-2"
                        />
                      </div>
                    ))
                  : null}
                <div>
                  {/* <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3> */}
                </div>
              </div>
              <div className="border-[8px] shadow rounded-md mt-4">
                {/* <div className="flex items-center justify-center">
                  <span className="items-center"> Messages</span>
                </div>
                {productInfo
                  ? productInfo[0].message.map((message) => (
                      <div
                      // className={`${styles.button} border mt-4 rounded-[4px] `}
                      >
                        {message.message}
                      </div>
                    ))
                  : null} */}

                {/* <div className="w-[100%] relative">
                  <form onSubmit={handleSubmit}>
                    <div className="flex">
                      <input
                        type="text"
                        className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                        id="message"
                        name="message"
                        placeholder="Chat with Sealer"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                      />
                      <button
                        type="submit"
                        className={`absolute right-0 h-[38px] mt-[1px] rounded-full cursor-pointer ${styles.button}`}
                      >
                        submit
                      </button>
                    </div>
                  </form>
                </div> */}
              </div>
            </div>

            <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
              <h1 className={`${styles.productTitle} text-[20px]`}>
                {productInfo ? productInfo[0].title : null}
              </h1>
              {productInfo ? productInfo[0].description : null}
              <div>
                Please Enter Correct Quantity on Correct Color which You Want To
                Buy
              </div>
              {productInfo
                ? productInfo[0].productDetail.map((product, link) => (
                    <div>
                      - Color: {product.color}, Price: $ {product.price} , In
                      Stock: {product.quantity} Nos, <br />
                      {/* <span> Order Quantity: </span>
                      <input
                        type="number"
                        readOnly={false}
                        id="orderQuantity"
                        name="orderQuantity"
                        placeholder=" Quantity"
                        className="border p-3 w-13 rounded-lg dark:bg-[#031156] "
                        value={product.orderQuantity}
                        onChange={(e) =>
                          handleChange(e, link, product.quantity)
                        }
                      /> */}
                    </div>
                  ))
                : null}

              <div
                className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
              >
                {users ? (
                  Cart ? (
                    <span className="text-[#008000] flex items-center">
                      Remove From Cart
                      <BsCartFill
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromCart(detail)}
                        title="Remove from Cart"
                      />
                    </span>
                  ) : (
                    <div
                      onClick={() =>
                        addToCart(detail, users.getaUser._id, detil)
                      }
                    >
                      <span className="text-[#008000] flex items-center">
                        Add To Cart{" "}
                        <AiOutlineShoppingCart
                          size={30}
                          className="cursor-pointer"
                          title="Add To Cart"
                        />
                      </span>
                    </div>
                  )
                ) : (
                  <span className="text-[#008000] flex items-center">
                    Login First To Add In Cart
                  </span>
                )}
              </div>
              <div
                className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
              >
                {users ? (
                  click ? (
                    <span className="text-[#008000] flex items-center">
                      Remove From Wishlist
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() =>
                          removeFromWishlistHandler(detail, users.getaUser._id)
                        }
                        title="Add To Wishlist"
                      />
                    </span>
                  ) : (
                    <span className="text-[#008000] flex items-center">
                      Add To Wishlist
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() =>
                          addToWishlistHandler(detail, users.getaUser._id)
                        }
                        title="Add To Wishlist"
                      />
                    </span>
                  )
                ) : (
                  <span className="text-[#008000] flex items-center">
                    Login First To Add In Wishlist
                  </span>
                )}
              </div>
              <div>
                <h5 className="text-[16px] text-[red] mt-5">
                  {productInfo && !productInfo[0].sold === null
                    ? productInfo[0].sold
                    : 0}{" "}
                  Items Sold Out
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
