import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "./card";
import Cookies from "js-cookie";

import axios from "axios";
import { Box, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../../Redux/user_reducer/user.action";
import HomeLoader from "../homepage/homeloader";
import ProfileLoader from "../../components/profileLoader";

const Profile = () => {
  const [userDetailState, setUserDetailState] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const [userFollowersState, setUserFollowersState] = useState([]);
  const [userFollowsToState, setUserFollowsToState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userID } = useParams();
  const dispatch = useDispatch();
  // console.log(userID);
  const { isAuthenticated, userId, userFollowersCount } = useSelector(
    (store) => store.userReducer
  );

  useEffect(() => {
    fetchUserDetail(userID);
  }, [userID]);
  const fetchUserDetail = async (userId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/one/${userId}`
      );

      setUserDetailState(response.data.userDetail);
      setUserBlogs(response.data.userBlogs);
      setUserFollowersState(response.data.userFollowers);
      setUserFollowsToState(response.data.userFollowsTo);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  const onLogout = () => {
    dispatch(userLogoutAction());
    document.cookie = `userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    navigate("/");
  };

  // fetchUserBlog();
  // if (!userDetailObj) {
  //   return (
  //     <Box padding="6" boxShadow="lg" bg="white">
  //       <SkeletonCircle size="10" />
  //       <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
  //     </Box>
  //   );
  // }

  return (
    <>
      <Navbar />

      <div className="w-full lg:w-11/12 xl:w-9/12 md:w-9/12 m-auto flex gap-20 mt-16">
        <div className="px-4 py-6 w-[85%]  ">
          <div className="flex items-center gap-4">
            {
              isLoading ? (<ProfileLoader/>) : (
                <>
                <img
              className="w-8 ml-2 rounded-3xl"
              src={userDetailState?.picture}
              alt=""
            />
            <h2 className="text-lg font-bold">{userDetailState?.name}</h2>
            <h2 className="text-lg font-bold">
              {" "}
              Followers {userFollowersState.length}
            </h2>
            {userId != userID ? (
              ""
            ) : (
              <button
                onClick={onLogout}
                class="border border-black rounded-2xl bg-white text-black font-bold py-1 px-3"
              >
                Logout
                      </button>
                    
                  )}
                  </>
              )
            }
            
          </div>
          <div className="border-b-2 flex  py-4 gap-3 ">
            <p className="border-b-2">All Blogs</p>
          </div>
          {isLoading ? (
            <>
              <HomeLoader />
              <HomeLoader />
              <HomeLoader />
            </>
          ) : userBlogs?.length == 0 ? (
            <h1>No blog</h1>
          ) : (
            userBlogs?.map((ele) => <Card key={ele._id} {...ele} />)
          )}
        </div>

        <div className="w-1/2 border-l-2 hidden lg:block border-gray-200 pl-12  ">
          {/* <Sidebar /> */}
        </div>
      </div>
    </>
  );
};

export default Profile;
