import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import logo from "../../assets/logo.png";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailAction } from "../../Redux/user_reducer/user.action";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
} from "@chakra-ui/react";
import PopoverComponent from "./popover";
const Navbar = () => {
  const [userDetailObj, setUserDetailObj] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    // Access the cookie by name
    const userToken = Cookies.get("userToken");

    if (userToken) {
      setUserToken(userToken);
      dispatch(getUserDetailAction());
      // console.log('Value from cookie:', userToken);
    } else {
      console.log("Cookie not found");
    }
  }, []);

  const { isAuthenticated, userDetail, isLoading } = useSelector(
    (store) => store.userReducer
  );
  // let timeId;
  // const handleSearch = (q) => {
  //   if (timeId) {
  //     clearTimeout(timeId);
  //   }
  //   // console.log(q)
  //   timeId = setTimeout(() => {
  //     console.log(q);
  //   }, 500);
  // };

  return (
    <nav className="flex justify-between items-center px-3 lg:px-10 sm:px-2 py-2 fixed bg-white z-10  border-b-2  top-0  w-full border-grey-400">
      <div className="flex items-center md:gap-4 gap-2    w-[60%] sm:w-[40%] ">
        <Link to="/">
          <img
            src="https://miro.medium.com/v2/resize:fill:48:48/1*sHhtYhaCe2Uc3IU0IgKwIQ.png"
            alt=""
            className="w-6  sm:w-8 border border-grey-500"
          />
        </Link>
        <div className="relative lg:w-[70%] xl:w-[50%] xl:max-w-[50%] w-50%  hidden  md:block ">
          <PopoverComponent  />
        </div>
      </div>
      <div className="flex gap-3 md:gap-7 ">
        {isAuthenticated ? (
          <Link to="/create" className="flex  items-center">
            <p className="flex  items-center md:text-lg md:gap-2 cursor-pointer">
              {" "}
              <span>
                <BsPencilSquare />
              </span>{" "}
              Write
            </p>
            <Link to={`/profile/${userDetail?._id}`}>
              <img
                className="w-8 ml-2 rounded-3xl"
                src={userDetail?.picture}
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
