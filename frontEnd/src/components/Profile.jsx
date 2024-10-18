import React, { useContext, useState } from "react";
import avatarImg from "/images/avatar.jpg";
import { Link, useNavigate } from "react-router-dom";
import NavbarChild from "./NavbarChild";

const Profile = ({ user }) => {
  // const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // logout
  // const handleLogout = () => {
  //   logOut()
  //     .then(() => {
  //       // Sign-out successful.
  //       navigate("/")
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div>
      <div className="hidden md:btn-ghost md:btn-circle md:avatar w-10 rounded-full">
        {user.photoURL ? (
          <img alt="" src={user.photoURL} />
        ) : (
          <img alt="" src={avatarImg} />
        )}
      </div>
      <div className="drawer md:z-50 md:hidden">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img alt="" src={user.photoURL} />
              ) : (
                <img alt="" src={avatarImg} />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu p-4 w-30 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <NavbarChild />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
