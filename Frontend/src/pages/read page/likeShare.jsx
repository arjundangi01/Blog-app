import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
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
  Toast,
  useToast,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { BiSolidLike } from "react-icons/bi";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

import axios from "axios";
import { useRef } from "react";

const LikeShare = ({ blogId, commentsCount, fetchBlog, likesCount, likes }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const { isAuthenticated, userId, userFollowersCount } = useSelector(
    (store) => store.userReducer
  );
  console.log("first", likes);
  const toast = useToast();
  const [commentText, setCommentText] = useState("");
  const toastFunction = () => {
    toast({
      title: "Login First.",
      description: "You are not logged In.",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };
  const onChange = (e) => {
    setCommentText(e.target.value);
  };
  const onAddComment = async () => {
    if (!isAuthenticated) {
      toastFunction();
      setPopoverOpen(false);
      return;
    }
    const userToken = Cookies.get("userToken");
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    if (!commentText) {
      setPopoverOpen(false);
      return;
    }
    setIsCommentLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/comment`,
        { text: commentText, blogId },
        {
          headers: headers,
        }
      );
      fetchBlog(blogId);
      setIsCommentLoading(false);
      setPopoverOpen(false);
      setCommentText("");
    } catch (error) {
      setIsCommentLoading(false);

      console.log(error);
    }
  };
  const onLike = async () => {
    try {
      if (!isAuthenticated) {
        toastFunction();
        return;
      }
      const userToken = Cookies.get("userToken");
      const headers = {
        Authorization: `Bearer ${userToken}`,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/like/add/${blogId}`,
        {},
        { headers: headers }
      );
      console.log(res);
      fetchBlog(blogId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border-b-2 border-t-2 flex py-3 my-6 px-3 items-center justify-between mt-4 relative">
      <div className="relative">
        <Popover placement="top-start" isOpen={popoverOpen}>
          <PopoverTrigger>
            <HStack spacing="10px">
              <FaRegComment
                onClick={() => setPopoverOpen(true)}
                className="text-2xl"
              />
              <Text>{commentsCount}</Text>
              <BiSolidLike
                onClick={onLike}
                className={`${
                  likes.includes(userId) ? "text-green-500" : ""
                } text-2xl`}
              />
              <Text>{likesCount}</Text>
            </HStack>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverHeader fontWeight="semibold">Add Comment</PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton onClick={() => setPopoverOpen(false)} />
            <PopoverBody className="flex items-center gap-2">
              <input
                type="text"
                placeholder="write comment"
                className="border ps-2 "
                onChange={onChange}
                value={commentText}
              />
              <Button
                isLoading={isCommentLoading}
                disabled={isCommentLoading}
                onClick={onAddComment}
              >
                ADD
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex gap-6 items-center">
        <BsBookmark className="text-xl" />
        <FiShare className="text-xl" />
        <BsThreeDots className="text-xl" />
      </div>
    </div>
  );
};

export default LikeShare;
