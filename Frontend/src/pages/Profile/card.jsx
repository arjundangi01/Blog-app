import React from "react";
import tech from "../../assets/tech Blog.jpg";
import { BsBookmark } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
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
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
import HomeLoader from "../homepage/homeloader";
const Card = ({ author, category, content, title, createdAt, _id,bannerImage ,fetchUserDetail}) => {
  const date = new Date(createdAt);
  const { isAuthenticated, userDetail,  userId } = useSelector(
    (store) => store.userReducer
  );

  // Get the day and month names
  // Get the day and month names
  // Get the day and month names
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const onDelete = async () => {
    const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/blogs/${_id}`);
    fetchUserDetail(author?.authorId)
  };
  const { userID } = useParams();
// 
  console.log('idss', userID, userId)
  const sanitizedContent = DOMPurify.sanitize(content, {
    FORBID_TAGS: ["img"],
  });
 
  return (
    <div className=" border-b-2 border-gray-100 mt-8 pb-4">
      <div className="flex gap-4   ">
        <p>{day + " " + month}</p>
      </div>
      <Link to={`/blog/${_id}`}>
        <div className="flex items-start gap-3 mt-3 mb-3  justify-between">
          <div>
            <p className="font-bold text-lg ">{title}</p>
            <div className="hidden lg:block  line-clamp-3  ">
              {/* <p className="line-clamp-3">{content}</p> */}
              <ReactMarkdown
                className="text-base line-clamp-3"
                children={sanitizedContent}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              />
            </div>
          </div>
          <img src={bannerImage} alt="" className="w-1/4" />
        </div>
      </Link>
      <div className="flex items-center justify-between ">
        <div className="flex gap-2">
          <p className="rounded-lg bg-slate-100  py-0 px-2 ">{category}</p>
          <p>7 min read</p>
        </div>
        <div className="flex items-center gap-3">
          <p>
            {" "}
            <BsBookmark />{" "}
          </p>
          <div className="relative ">
            <Popover placement="top-start"  >
              <PopoverTrigger>
                <BsThreeDots />
              </PopoverTrigger>
              <PopoverContent w='100px'>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <div className="flex-col  cursor-pointer">
                    
                    {userId != userID ? (
                      <Link to={`/blog/${_id}`} className="cursor-pointer my-2 ">view</Link>
                    ) : (
                      <>
                        <Link to={`/update/${_id}`}>
                          <p className="cursor-pointer my-2 ">Edit</p>
                          </Link>
                          <hr />
                        <p onClick={onDelete} className="my-2">
                          Delete
                        </p>
                      </>
                    )}
                  </div>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
