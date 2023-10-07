import React from "react";
import { Route, Routes } from "react-router-dom";
import Create from "../pages/create page/create";
import Home from "../pages/homepage/home";
import Read from "../pages/read page/read";
import Signup from "../pages/login and signup/signup";
import Login from "../pages/login and signup/login";
import Update from "../pages/update page/update";
import Profile from "../pages/Profile/profile";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/create" element={<Create />}>
        {" "}
      </Route>
      <Route path="/update/:blogID" element={<Update />}>
        {" "}
      </Route>
      <Route path="/blog/:blogID" element={<Read />}>
        {" "}
      </Route>
      <Route path="/signup" element={<Signup />}>
        {" "}
      </Route>
      <Route path="/login" element={<Login />}>
        {" "}
      </Route>
      <Route path="/profile" element={<Profile />}>
        {" "}
      </Route>
    </Routes>
  );
};

export default Allroutes;
