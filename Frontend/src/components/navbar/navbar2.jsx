import React from "react";
import logo from "../../assets/logo.png";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
const Navbar2 = ({ onPublish }) => {
  


  
  return (
    <nav className="flex justify-between items-center px-1  sm:px-2 py-2  bg-white    top-0 w-full  lg:w-8/12  m-auto ">
      <div className="flex items-center md:gap-4 gap-2 ">
        <Link to='/' >
          <img
            src="https://miro.medium.com/v2/resize:fill:48:48/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"
            alt=""
            className="w-6  sm:w-8 border border-grey-500"
          />
        </Link>
        <p>Draft in arjundangi</p>
      </div>
      <div className="flex gap-3 md:gap-7 ">
        <button onClick={()=>{onPublish()}} className="border border-grey-500 py-1 sm:py-1 sm:px-2 px-1 rounded-lg bg-green-500 text-white">
          publish
        </button>
      </div>
    </nav>
  );
};

export default Navbar2;
