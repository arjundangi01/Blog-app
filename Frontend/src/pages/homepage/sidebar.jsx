import React from "react";
import Sidebar_card from "./sidebar_card";

const Sidebar = () => {
  return (
    <div className="mt-10">
      <div>
        <h1 className="mb-4 font-medium ">Staff Picks</h1>
       <Sidebar_card/>
       <Sidebar_card/>
       <Sidebar_card/>
      </div>
      <div></div>
    </div>
  );
};

export default Sidebar;
