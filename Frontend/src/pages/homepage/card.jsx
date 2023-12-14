import React from "react";
import tech from "../../assets/tech Blog.jpg";
import { BsBookmark } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import DOMPurify from "dompurify";
import { FaRegComment } from "react-icons/fa";

const Card = ({
  author,
  category,
  content,
  title,
  createdAt,
  _id,
  bannerImage,
  commentsCount,
}) => {
  // Create a Date object from the timestamp
  // console.log("author", author);
  const date = new Date(createdAt);

  // Get the day and month names
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const sanitizedContent = DOMPurify.sanitize(content, {
    FORBID_TAGS: ["img"],
  });
  return (
    <div className=" border-b-2 border-gray-100 mt-8 pb-4">
      <div className="flex gap-4   ">
        <Link to={`/profile/${author?.authorId}`}>
          <img src={author.picture} className="w-6 rounded-2xl " alt="" />
        </Link>
        <p>{author.authorName}</p>

        <p>{day + " " + month}</p>
      </div>
      <Link to={`/blog/${_id}`}>
        <div className="flex   mt-3 mb-3  justify-between">
          <div>
            <p className="font-bold text-lg ">{title}</p>
            <div className="hidden lg:block text-sm line-clamp-3  ">
              <ReactMarkdown
                className="text-base line-clamp-3"
                children={sanitizedContent}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              />
              {/* <p className="line-clamp-3">{content}</p> */}
            </div>
          </div>
          <div className="max-w-[150px] w-[40%] h-[100%] max-h-[100%] min-w-[100px] md:min-w-[220px]">
            <img src={bannerImage} alt="" className="w-['100%'] object-cover" />
          </div>
          {/* <img src={bannerImage} alt="" className="w-1/4 mh-[50%] min-h-[50%] " /> */}
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
            <BsBookmark />
          </p>
          <p className="flex items-center gap-1" >
            {" "}
            <FaRegComment />{commentsCount}
          </p>
          
          <p>
            {" "}
            <BsThreeDots />{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
