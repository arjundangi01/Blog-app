import React from "react";
import logo from "../../assets/logo.png";
import { BsPencilSquare } from "react-icons/bs";
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-28 border-b-2 fixed w-full border-grey-400">
      <div className="flex items-center gap-4">
        <img src={logo} alt="" className="w-20" />
        <input
          type="text"
          placeholder="Search"
          className="border border-grey-500 rounded-md py-2 px-1 "
        />
      </div>
      <div className="flex gap-4">
        <h5 className="flex  items-center">
          {" "}
          <span>
            <BsPencilSquare />
          </span>{" "}
          Write
        </h5>
        <button className="border border-grey-500 py-2 px-1 rounded-lg bg-blue-500 text-white" >Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;
