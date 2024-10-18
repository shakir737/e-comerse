import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
const CartSingle = ({
  updateCart,
  deleteCart,
  index,
  product,
  item,
  price,
  color,
  quantity,
  count,
  currentPage,
  itemsPerPage,
}) => {
  const { products } = useSelector((state) => state.product);
  const productDetail = products.find((products) => products._id === product);
  const [value, setValue] = useState();

  const [productTotal, setProductTotal] = useState();

  useEffect(() => {
    setValue(count);
    setProductTotal(price * count);
  }, [
    index,
    product,
    price,
    color,
    quantity,
    count,
    currentPage,
    itemsPerPage,
  ]);
  useEffect(() => {
    setValue(count);
    setProductTotal(price * count);
  }, []);
  // Handle quantity increase
  const handleIncrease = async (val) => {
    if (val < quantity) {
      setValue(value + 1);
      const current = value + 1;
      const prodTotal = price * current;
      setProductTotal(prodTotal);
      const data = { current, id: product, color };
      updateCart(data);
    }
  };
  // Handle quantity decrease
  const handleDecrease = async (val) => {
    if (val > 0) {
      setValue(value - 1);
      const current = value - 1;
      const prodTotal = price * current;
      setProductTotal(prodTotal);
      const data = { current, id: product, color };
      updateCart(data);
    }
  };
  const handleDelete = async (itemID, productID) => {
    const data = { itemID, productID };
    deleteCart(data);
  };
  return (
    <>
      <tr key={index}>
        <td>{index + (currentPage - 1) * itemsPerPage + 1}</td>

        <td>
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img
                src={`${productDetail.imageUrls[0]}`}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
        </td>
        <td className="font-medium">{productDetail.category}</td>
        <td className="font-medium">{productDetail.brand}</td>
        <td className="font-medium">{productDetail.title}</td>
        <td className="font-medium">{color}</td>

        <td>
          <button className="btn btn-xs" onClick={() => handleDecrease(value)}>
            -
          </button>
          <input
            type="number"
            value={value}
            onChange={() => console.log(count)}
            className="w-10 mx-2 text-center overflow-hidden appearance-none"
          />
          <button className="btn btn-xs" onClick={() => handleIncrease(value)}>
            +
          </button>
        </td>
        <td className="font-medium">${price}/-</td>
        <td>${productTotal}</td>
        <td>
          <button
            className="btn btn-sm border-none text-green bg-transparent"
            onClick={() => handleDelete(item._id, product)}
          >
            <FaTrash />
          </button>
        </td>
      </tr>
    </>
  );
};
export default CartSingle;
