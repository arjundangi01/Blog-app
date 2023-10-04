import React from "react";
import Navbar from "../../components/navbar/navbar";
import Navbar2 from "../../components/navbar/navbar2";

const Create = () => {
  return (
    <>
      <Navbar2 />
      <div className="mt-16 lg:w-1/2 m-auto  ">
        <div >
          <input type="text" placeholder="heading" />
        </div>
        <div>
          <textarea className="border " ></textarea>
        </div>
      </div>
    </>
  );
};

export default Create;
