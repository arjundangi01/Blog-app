import axios from "axios";
import React, { useEffect } from "react";
import Cookies from "js-cookie";

const UserProfileCard = ({ _id, email, name, picture, follower }) => {
  const doFollow = async () => {
    const userToken = Cookies.get("userToken");

    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    try {
      const userResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/follow`,{followTo:_id},
        {
          headers: headers,
        }
      );
    } catch (error) {}
  };
  return (
    <div className="flex justify-between sm:w-[60%] lg:w-[65%]  xl:w-[55%] mb-2">
      <div>
        <img className="w-6 rounded-2xl " src={picture} alt="" />
      </div>
      <div>
        <p>{name}</p>
      </div>
      <div>
        <button
          onClick={doFollow}
          class="border border-black rounded-2xl bg-white text-black  px-2"
        >
          Follow
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;
