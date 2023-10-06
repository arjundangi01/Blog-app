import React from "react";
import tech from "../../assets/tech Blog.jpg";
import { BsBookmark } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";

const Card = () => {
  return (
    <div className=" border-b-2 border-gray-100 mt-8 pb-4" >
      <div className="flex gap-4   ">
        <img
          src="https://cdn-icons-png.flaticon.com/512/8344/8344923.png"
          className="w-6"
          alt=""
        />
        <p>Arjun Dangi</p>
        <p>Sep 4</p>
      </div>
      <div className="flex items-start gap-3 mt-3 mb-3  justify-between">
        <p className="font-bold">
          The nine best Hustles You Can Start Earning With In 2023
        </p>
        <img src={tech} alt="" className="w-1/4" />
      </div>
      <div className="flex items-center justify-between ">
        <div className="flex gap-2">
          <p className="rounded-lg bg-slate-100  py-0 px-2 ">Tech</p>
          <p>7 min read</p>
        </div>
        <div className="flex items-center gap-3" >
          <p>
            {" "}
            <BsBookmark />{" "}
          </p>
          <p>
            {" "}
            <BsThreeDots />{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
