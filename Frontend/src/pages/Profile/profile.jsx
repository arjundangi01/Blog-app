import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "./card";
import Cookies from "js-cookie";

import axios from "axios";
import { Box, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const Profile = () => {
  const [userDetailObj, setUserDetailObj] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const { userID } = useParams();
  console.log(userID);

  useEffect(() => {
    fetchUserBlog(userID);
  }, []);

  console.log("first");

  const fetchUserBlog = async (userID) => {
    const userToken = Cookies.get("userToken");

    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    try {
      const userResponse = await axios.get("http://localhost:8080/user", {
        headers: headers,
      });
      const blogResponse = await axios.get(
        `http://localhost:8080/blogs?user=${userID}`
      );
      console.log(blogResponse.data);
      setUserDetailObj(userResponse.data);
      setUserBlogs(blogResponse.data);
      console.log(userResponse.data);


      // setBlog(response.data[0]);
      // const date = new Date(response.data[0].createdAt);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const onLogout = () => {
    setUserDetailObj(null);
    setUserDetailObj([]);
    document.cookie = `userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    navigate('/')
  }

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
        {!userDetailObj ? (
          <div className="px-4 py-6 w-[85%]">
            <Box padding="6" boxShadow="lg" bg="white">
              <SkeletonCircle size="10" />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
          </div>
        ) : (
          <div className="px-4 py-6 w-[85%]  ">
            <div className="flex items-center gap-4">
              <img
                className="w-8 ml-2 rounded-3xl"
                src={userDetailObj?.picture}
                alt=""
              />
              <h2 className="text-lg font-bold">{userDetailObj?.name}</h2>
              <h2 className="text-lg font-bold" > Followers {userDetailObj?.follower}</h2>
              <button onClick={onLogout} class="border border-black rounded-2xl bg-white text-black font-bold py-1 px-3">
                Logout
              </button>
            </div>
            <div className="border-b-2 flex  py-4 gap-3 ">
              <p className="border-b-2">All Blogs</p>
            </div>
            {userBlogs?.length == 0 ? (
              <h1>No blog</h1>
            ) : (
              userBlogs?.map((ele) => <Card key={ele._id} {...ele} />)
            )}
          </div>
        )}

        <div className="w-1/2 border-l-2 hidden lg:block border-gray-200 pl-12  ">
          {/* <Sidebar /> */}
        </div>
      </div>
    </>
  );
};

export default Profile;
