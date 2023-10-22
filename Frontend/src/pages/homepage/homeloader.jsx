import React from "react";
import PlaceholderLoading from "react-placeholder-loading";
// import { Placeholder } from "react-placeholder";
const HomeLoader = () => {
  return (
    <>
      <div className="flex justify-between gap-0 sm:gap-2 my-3 ">
        <div className="w-[100%] md:w-[80%] ">
          <PlaceholderLoading shape="rect" width="100%" height={60} />
          <div className="flex flex-col gap-1 my-2">
            <PlaceholderLoading shape="rect" width="100%" height={10} />
            <PlaceholderLoading shape="rect" width="100%" height={10} />
            <PlaceholderLoading shape="rect" width="100%" height={10} />
            <PlaceholderLoading shape="rect" width="100%" height={10} />
            <PlaceholderLoading shape="rect" width="100%" height={10} />
          </div>
       
        </div>

        <div className="flex justify-end items-center">
          <PlaceholderLoading shape="rect" width={"80%"} height={"90%"} />
        </div>
      </div>
    </>
  );
};

export default HomeLoader;
