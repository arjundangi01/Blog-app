import React, { useEffect, useState } from "react";
import Sidebar_card from "./sidebar_card";
import UserProfileCard from "./userProfilecard";
import axios from "axios";
import { useSelector } from "react-redux";
import ProfileLoader from "../../components/profileLoader";

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isAuthenticated,
    userDetail,
  
    userBlogs,
    userId,
    userFollowsTo,
  } = useSelector((store) => store.userReducer);

  useEffect(() => {
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    setIsLoading(true)
    console.log("sidebar", process.env.REACT_APP_BASE_URL);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/all`
      );
      console.log("sidebar", response);
      setUsers(response.data);
    setIsLoading(false)

    } catch (error) {
    setIsLoading(false)

    }
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
        {isLoading ? (
          <>
          <ProfileLoader />
          <ProfileLoader />
          <ProfileLoader />
          </>
          
        ) : (
          users.map((ele) => {
            // Check if ele.id is not equal to 1, and only render the UserProfileCard in that case
            if (ele._id !== userId) {
              if (userFollowsTo.includes(ele._id)) {  
                return <UserProfileCard {...ele} isFollow={true} />;
              } else {
                return <UserProfileCard {...ele} isFollow={false} />;
              }
            }
            return null; // Return null for users with ele.id equal to 1 (or any other condition you want to handle)
          })
        )}
      </div>
    </div>
  );
};

export default Sidebar;
