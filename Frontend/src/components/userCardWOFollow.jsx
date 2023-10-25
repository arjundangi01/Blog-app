import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
// import { getUserDetailAction } from "../../Redux/user_reducer/user.action";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const UserProfileCardWOFollow = ({ _id, email, name, picture, follower, isFollow }) => {
  const dispatch = useDispatch();
  const [isLoadingState, setIsLoadingState] = useState(false);
  const { isAuthenticated,isLoading, userId, userFollowersCount } = useSelector(
    (store) => store.userReducer
  );
  const toast = useToast();
  const toastFunction = () => {
    toast({
      title: "Login First.",
      description: "You are not logged In.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };
  // console.log(isAuthenticated)
  const doFollow = async () => {
    const userToken = Cookies.get("userToken");

    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    try {
      if (!isAuthenticated) {
        toastFunction();
        return;
      }
      setIsLoadingState(true);
      if (!isFollow) {
        // console.log(headers)

        const userResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/user/follow`,
          { followTo: _id },
          {
            headers: headers,
          }
        );
      } else {
        console.log(headers);
        const userResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/user/unfollow`,
          { unFollowTo: _id },
          {
            headers: headers,
          }
        );
        console.log(userResponse);
      }
    //   dispatch(getUserDetailAction());
      setIsLoadingState(false);
    } catch (error) {
      console.log(error);
      setIsLoadingState(false);
    }
  };
  return (
    <div className="flex justify-between w-[100%] mb-2 cursor-pointer">
      <div>
        <Link to={`/profile/${_id}`}>
          <img className="w-7 rounded-2xl " src={picture} alt="" />
        </Link>
      </div>
      <div>
        <p>{name}</p>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default UserProfileCardWOFollow;
