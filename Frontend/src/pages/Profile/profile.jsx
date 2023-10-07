import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { Link } from "react-router-dom";
import Card from "./card";

const Profile = () => {
  const [userDetailObj, setUserDetailObj] = useState(null);
  const getUserDetail = (user) => {
    setUserDetailObj(user);
    console.log(user);
  };
  return (
    <>
      <Navbar getUserDetail={getUserDetail} />
      <div className="w-full lg:w-11/12 xl:w-9/12 md:w-9/12 m-auto flex gap-20 mt-16">
        <div className="px-4 py-6  ">
          <div className="flex items-center gap-4">
            <img
              className="w-8 ml-2 rounded-3xl"
              src={userDetailObj?.picture}
              alt=""
            />
            <h2 className="text-lg font-bold">{userDetailObj?.name}</h2>
          </div>
          <div className="border-b-2 flex  py-4 gap-3 ">
            <p className="border-b-2" >All Blogs</p>
          </div>
          <Link to="blog/1">
            {" "}
            <Card />{" "}
          </Link>
        </div>
        <div className="w-1/2 border-l-2 hidden lg:block border-gray-200 pl-12  ">
          {/* <Sidebar /> */}
        </div>
      </div>
    </>
  );
};

export default Profile;
