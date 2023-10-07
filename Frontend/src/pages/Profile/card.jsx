import React from "react";
import tech from "../../assets/tech Blog.jpg";
import { BsBookmark } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
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
  Portal,
} from "@chakra-ui/react";
const Card = ({ author, category, content, title, createdAt, _id }) => {
  const date = new Date(createdAt);

  // Get the day and month names
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  return (
    <div className=" border-b-2 border-gray-100 mt-8 pb-4">
      <div className="flex gap-4   ">
        <p>{day + " " + month}</p>
      </div>
      <Link to="blog/1">
        <div className="flex items-start gap-3 mt-3 mb-3  justify-between">
          <div>
            <p className="font-bold text-lg ">{title}</p>
            <div className="hidden lg:block  line-clamp-3  ">
              <p className="line-clamp-3">{content}</p>
            </div>
          </div>
          <img src={tech} alt="" className="w-1/4" />
        </div>
      </Link>
      <div className="flex items-center justify-between ">
        <div className="flex gap-2">
          <p className="rounded-lg bg-slate-100  py-0 px-2 ">{category}</p>
          <p>7 min read</p>
        </div>
        <div className="flex items-center gap-3">
          <p>
            {" "}
            <BsBookmark />{" "}
          </p>
          <div className="relative " >
            <Popover placement="top-start" className="w-4">
              <PopoverTrigger>
                <BsThreeDots />
              </PopoverTrigger>
              <PopoverContent className="w-4" >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody className="flex items-center gap-2 w-4">
                  <Link to={`/update/${_id}`} ><p className="cursor-pointer" >Edit</p></Link>
                  
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;