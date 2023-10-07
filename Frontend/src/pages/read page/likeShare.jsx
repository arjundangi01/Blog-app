import React from "react";
import { FaRegComment } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
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
  Portal,
} from "@chakra-ui/react";

const LikeShare = () => {
  return (
    <div className="border-b-2 border-t-2 flex py-3 px-3 items-center justify-between mt-4 relative">
      <div className="relative">
        <Popover placement="top-start">
          <PopoverTrigger>
            <FaRegComment className="text-2xl" />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader fontWeight="semibold">
              Add Comment
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore.
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex gap-6 items-center">
        <BsBookmark className="text-2xl" />
        <FiShare className="text-2xl" />
        <BsThreeDots className="text-2xl" />
      </div>
    </div>
  );
};

export default LikeShare;
