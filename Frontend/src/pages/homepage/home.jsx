import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Card from "./card";
import Sidebar from "./sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';

const Home = () => {
 
  return (
    <>
      <Navbar />
      <div className="w-full lg:w-11/12 xl:w-9/12 md:w-9/12 m-auto flex gap-20 mt-16">
        <div className="px-4 lg:w-[70%] ">
          <div className="border-b-2 flex  py-4 gap-3 ">
            <p>For you</p>
            <p>Business</p>
            <p>Tech</p>
            <p>Sports</p>
            <p>Economics</p>
          </div>
          <Link to="blog/1">
            {" "}
            <Card />{" "}
          </Link>
          <Link to="blog/1">
            {" "}
            <Card />{" "}
          </Link>
          <Link to="blog/1">
            {" "}
            <Card />{" "}
          </Link>
          <Link to="blog/1">
            {" "}
            <Card />{" "}
          </Link>
          <Link to="blog/1">
            {" "}
            <Card />{" "}
          </Link>
          <Link to="blog/1">
            {" "}
            <Card />{" "}
          </Link>
          <Link to="blog/1">
            {" "}
            <Card />{" "}
          </Link>
          <Link to="blog/1">
            {" "}
            <Card />{" "}
          </Link>
        </div>
        <div className="w-[40%] border-l-2 hidden lg:block border-gray-200 pl-12  ">
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default Home;
