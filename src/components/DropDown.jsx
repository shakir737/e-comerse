import React from "react";
import { useNavigate } from "react-router-dom";

const DropDown = ({ categoriesData, setDropDown, setSelected }) => {
  const navigate = useNavigate();

  const submitHandle = (i) => {
    navigate(`menu?category=${i.title}`);
    setDropDown(false);
    setSelected("Products");
  };
  return (
    <div className=" md:border md:w-[170px] md:bg-[#fff] md:absolute ">
      {categoriesData &&
        categoriesData.map((i, index) => (
          <>
            <div
              key={index}
              className="flex items-center "
              onClick={() => submitHandle(i)}
            >
              {/* <img
              src={i.image_Url}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
              alt=""
            /> */}
              <h3 className="m-3 cursor-pointer select-none ">{i.title}</h3>
            </div>
            <hr />
          </>
        ))}
    </div>
  );
};

export default DropDown;
