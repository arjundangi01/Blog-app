import React, { useState } from "react";
import { uploadImage } from "../../config/firebase";
import axios from "axios";
import Cookies from "js-cookie";
import { Spinner } from "@chakra-ui/react";

const Sidebar = ({
  userDetailState,
  userFollowsToState,
  userBlogs,
  userId,
  userID,
  fetchUserDetail,
}) => {
  const [isImageUploadLoading, setImageUploadLoading] = useState(false);

  const handleImageChange = (e) => {
    setImageUploadLoading(true);
    // let image = e.target.files[0];
    uploadImage(e.target.files[0])
      .then((downloadURL) => {
        setImageUploadLoading(false);
        updateProfile(downloadURL);
      })
      .catch((err) => {
        console.log(err);
      });
    // setImageUrl(url);
  };
  const updateProfile = async (url) => {
    try {
      const userToken = Cookies.get("userToken");

      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      const res = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/user/profile`,
        { picture: url },
        {
          headers: headers,
        }
      );
      console.log(res);
      fetchUserDetail(userID);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main>
      <div className="mt-2">
        <div className="flex justify-between ">
          <p className="font-semibold ">Your Profile</p>
          {isImageUploadLoading && (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="sm"
            />
          )}
          {userID === userId ? (
            <>
              <label
                for="file-upload"
                className="relative bg-green-500  text-white 
            rounded-xl px-2 py-1 cursor-pointer 
            font-semibold focus-within:outline-none focus-within:ring-2
              hover:bg-green-400"
              >
                <span>Edit Picture</span>
              </label>
              <input
                onChange={handleImageChange}
                id="file-upload"
                name="file-upload"
                type="file"
                class="sr-only"
              />
            </>
          ) : (
            ""
          )}
        </div>
        <div className="w-[40%] m-auto text-center">
          <img
            className="w-[100%] rounded-[50%] object-cover min-w-[100%] "
            src={userDetailState?.picture}
            alt=""
          />
          <p className="font-bold text-lg mt-2">{userDetailState?.name}</p>
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
