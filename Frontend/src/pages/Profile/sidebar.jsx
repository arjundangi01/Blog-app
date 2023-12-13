import React from "react";

const Sidebar = ({ userDetailState, userFollowsToState, userBlogs }) => {
  return (
    <main>
      <div className="mt-2">
        <div className="flex justify-between ">
          <p>Profile</p>
          <button className="bg-green-500  text-white rounded-xl px-2 py-1" >Edit Profile</button>
        </div>
        <div className="w-[40%] m-auto text-center">
          <img className="w-[100%]" src={userDetailState?.picture} alt="" />
          <p className="font-bold text-lg">{userDetailState?.name}</p>
        </div>
        <div className="flex justify-between mt-5 cursor-pointer">
          <p> Followers {userDetailState?.follower} </p>
          <p> Following {userFollowsToState?.length} </p>
          <p> Total Blogs {userBlogs?.length}</p>
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
