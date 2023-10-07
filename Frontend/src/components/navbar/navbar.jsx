import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import logo from "../../assets/logo.png";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
const Navbar = ({getUserDetail}) => {
  const [userDetailObj,setUserDetailObj] = useState(null)
  const [userToken,setUserToken] = useState(null)
  useEffect(  () => {
    // Access the cookie by name
    const userToken = Cookies.get('userToken');
 
    if (userToken) {
      setUserToken(userToken)
      fetchUser(userToken)
      // console.log('Value from cookie:', userToken);
    } else {
      console.log('Cookie not found');
    }
  }, []);
  const fetchUser = async (userToken) => {
    
    const headers = {
      'Authorization': `Bearer ${userToken}`, 
       
    };
    try {
      const user = await axios.get('http://localhost:8080/user', {
        headers: headers,
      })
      // console.log(user.data)
      setUserDetailObj(user.data)
      getUserDetail(user.data)
    } catch (error) {
      console.log(error)
      
    }
  }

 
  return (
    <nav className="flex justify-between items-center px-1 sm:px-2 py-2 fixed bg-white  border-b-2  top-0  w-full border-grey-400">
      <div className="flex items-center md:gap-4 gap-2 ">
        <Link to='/' >
        <img
          src="https://miro.medium.com/v2/resize:fill:48:48/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"
          alt=""
          className="w-6  sm:w-8 border border-grey-500"
        />
        </Link>
        <input
          type="text"
          placeholder="Search"
          className="sm:w-80 lg:w-96 sm:py-2 border border-grey-700 rounded-md py-1 px-1 w-28"
        />
      </div>
      <div className="flex gap-3 md:gap-7 ">
        {userDetailObj ? (
          <Link to="/create" className="flex  items-center">
            <p className="flex  items-center md:text-lg md:gap-2 cursor-pointer">
              {" "}
              <span>
                <BsPencilSquare />
              </span>{" "}
              Write
            </p>
            <Link to='profile' >
              <img
                className="w-8 ml-2 rounded-3xl"
                src={userDetailObj?.picture}
                alt=""
              />
            </Link>
          </Link>
        ) : (
          <Link to="/signup">
            <button className="border border-grey-500 py-1 sm:py-2 sm:px-2 px-1 rounded-lg bg-blue-500 text-white">
              Get Started
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
