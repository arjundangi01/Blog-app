import React from "react";
import logo from "../../assets/logo.png";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-1 sm:px-2 py-2 fixed bg-white  border-b-2  top-0  w-full border-grey-400">
      <div className="flex items-center md:gap-4 gap-2 ">
        <img src="https://miro.medium.com/v2/resize:fill:48:48/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"alt="" className="w-6  sm:w-8 border border-grey-500" />
        <input
          type="text"
          placeholder="Search"
          className="sm:w-80 lg:w-96 sm:py-2 border border-grey-700 rounded-md py-1 px-1 w-28"
        />
      </div>
      <div className="flex gap-3 md:gap-7 ">
        <Link to='/create' className="flex  items-center" >
        <h5 className="flex  items-center md:text-lg md:gap-2 cursor-pointer">
          {" "}
          <span>
            <BsPencilSquare />
          </span>{" "}
          Write
        </h5>
       </Link>
        <button className="border border-grey-500 py-1 sm:py-2 sm:px-2 px-1 rounded-lg bg-blue-500 text-white" >Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;
