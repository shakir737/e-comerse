import React, { useContext, useEffect, useState } from "react";

import Profile from "./Profile";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login";
import { useUserMutation } from "../state/user/userapi";
import { productCategory } from "./../static/data";
import DropDown from "./DropDown";
import NavbarChild from "./NavbarChild";
import Signup from "./Signup";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [selected, setSelected] = useState("Home");
  const [user, { isSuccess }] = useUserMutation();
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
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
    if (token) {
      user();
    }
  }, [token]);

  return (
    <header
      className={`max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out`}
    >
      {openLogin ? (
        <Login
          openLogin={openLogin}
          setOpenLogin={setOpenLogin}
          setOpenSignup={setOpenSignup}
        />
      ) : (
        <></>
      )}
      {openSignup ? (
        <Signup setOpenLogin={setOpenLogin} setOpenSignup={setOpenSignup} />
      ) : (
        <></>
      )}
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out"
            : ""
        }`}
      >
        <div className="navbar-start">
          <Link>
            <img
              src="/logo.png"
              loading="lazy"
              decoding="async"
              fetchpriority="high"
              alt="Foodi"
              style={{ height: "auto", width: "auto" }}
            />
          </Link>
          <div className="dropdown justify-between">
            <label tabIndex={0} className="btn btn-ghost lg:hidden"></label>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-4 z-[2] p-2 shadow bg-base-100 rounded-box w-64 space-y-6"
            >
              <NavbarChild />
            </ul>
          </div>
        </div>

        {/* categories */}
        <div>
          <div className=" hidden lg:flex">
            <NavbarChild />
          </div>
        </div>
        <div className="navbar-end ">
          <button className="btn btn-ghost btn-circle hidden lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* shopping cart */}
          <Link to="/cart-page">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle  lg:flex items-center justify-center mr-3"
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="absolute mb-8 rounded-full bg-black w-4 h-4  text-white font-mono text-[14px] leading-tight text-center">
                  {" "}
                  {users && users.getaUser.cart.length}
                </span>
                {/* <span className="badge badge-sm indicator-item">{cart.length || 0}</span> */}
              </div>
            </label>
          </Link>

          {/* login button */}

          {users ? (
            <>
              {/* <Profile user={users.getaUser} /> */}
              <div className="">
                <Profile user={users.getaUser} />
                {/* <button className="btn flex items-center gap-2 rounded-full px-6 bg-green text-white hover:text-[#0000FF]">
                  Log out
                </button> */}
              </div>
            </>
          ) : (
            <button
              onClick={() => setOpenLogin(true)}
              className="btn flex items-center gap-2 rounded-full px-6 bg-green text-white hover:text-[#0000FF]"
            >
              Login
            </button>
          )}
        </div>
      </div>
      <hr />
    </header>
  );
};

export default Navbar;
