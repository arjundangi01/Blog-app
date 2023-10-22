import React, { useEffect, useState } from "react";
import Sidebar_card from "./sidebar_card";
import UserProfileCard from "./userProfilecard";
import axios from "axios";

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    console.log("sidebar", process.env.REACT_APP_BASE_URL);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/all`
      );
      console.log("sidebar", response);
      setUsers(response.data);
    } catch (error) {}
  };
  return (
    <div className="mt-10">
      <div className="mb-5">
        <h1 className="mb-4 font-medium ">Staff Picks</h1>
        <Sidebar_card />
        <Sidebar_card />
        <Sidebar_card />
      </div>
      <div>
        <h1 className="mb-4 font-medium ">Who to Follow</h1>
        {users.map((ele) => (
          <UserProfileCard {...ele} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
