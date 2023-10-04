import React from "react";
import { Route, Routes } from "react-router-dom";
import Create from "../pages/create page/create";
import Home from "../pages/homepage/home";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}  ></Route>
      <Route path="/create" element={<Create/>}  >  </Route>
      <Route path=""></Route>
    </Routes>
  );
};

export default Allroutes;
