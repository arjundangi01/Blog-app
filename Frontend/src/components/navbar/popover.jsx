import React, { useRef, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
} from "@chakra-ui/react";
import ProfileLoader from "../profileLoader";
import axios from "axios";
import UserProfileCard from "../../pages/homepage/userProfilecard";
import UserProfileCardWOFollow from "../../components/userCardWOFollow";
const PopoverComponent = () => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [userDataForPopover, setUserDataForPopover] = useState([]);
  const [isLoadingState, setIsLoadingState] = useState(false);

  const inputRef = useRef(null);
  let timerId;
  const handleInputChange = (e) => {
    setPopoverOpen(true);
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fetchUserForPopover(e.target.value);
    }, 500);
  };
  const handleInputBlur = (e) => {
    setTimeout(() => {
      setPopoverOpen(false);
    }, 200);
  };

  const fetchUserForPopover = async (q) => {
    setIsLoadingState(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/all?q=${q}`
      );
      console.log(response);
      setUserDataForPopover(response.data);
      setIsLoadingState(false);
    } catch (error) {
      console.log(error);
      setIsLoadingState(false);
    }
  };
  return (
    <Popover placement="bottom-start" isOpen={isPopoverOpen} autoFocus={false}>
      <PopoverTrigger>
        <input
          type="text"
          ref={inputRef}
          placeholder="Search"
          className="sm:py-2 border border-grey-700 rounded-2xl bg-gray-50 py-1 px-2 w-full"
          onClick={handleInputChange}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight="semibold">People</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <div>
            {isLoadingState ? (
              <>
                <ProfileLoader />
                <ProfileLoader />
                <ProfileLoader />
              </>
            ) : (
              userDataForPopover.map((ele) => (
                <UserProfileCardWOFollow {...ele} />
              ))
            )}
          </div>
        </PopoverBody>
        {/* -------- */}
        {/* <PopoverHeader fontWeight="semibold">Topics</PopoverHeader>
        <PopoverArrow />

        <PopoverBody>
          <div>
            <ProfileLoader />
            <ProfileLoader />
            <ProfileLoader />
          </div>
        </PopoverBody> */}
      </PopoverContent>
    </Popover>
  );
};

export default PopoverComponent;
