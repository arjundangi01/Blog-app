import React from "react";
import PlaceholderLoading from "react-placeholder-loading";

const ProfileLoader = () => {
  return (
    <>
      <div className="flex gap-2 items-center mb-1">
         <PlaceholderLoading shape="circle" width={30} height={30} />
         <PlaceholderLoading shape="rect" width={50} height={10} />
         <PlaceholderLoading shape="rect" width={50} height={10} />
      </div>
    </>
  );
};

export default ProfileLoader;
