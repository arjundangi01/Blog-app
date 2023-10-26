import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import DOMPurify from "dompurify";
import BlogREadLoader from "../../components/blogreadLoader";
import LikeShare from "./likeShare";

const Read = () => {
  // ... (existing code)
  const [blog, setBlog] = useState();
  const [time, setTime] = useState({});
  const [isLoadingState, setIsLoadingState] = useState(false);

  const { blogID } = useParams();
  useEffect(() => {
    fetchBlog();
  }, []);
  // console.log(id)
  const fetchBlog = async () => {
    setIsLoadingState(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/blogs?q=${blogID}`
      );
      // console.log(response.data[0]);
      setBlog(response.data[0]);
      const date = new Date(response.data[0].createdAt);

      // Get the day and month names
      const day = date.getDate();
      const month = date.toLocaleString("en-US", { month: "short" });
      setTime({ day, month });
      setIsLoadingState(false);
    } catch (error) {
      console.log(error);
      setIsLoadingState(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-[5rem] w-[90%] m-auto md:w-[60%] lg:w-[40%] relative">
        <div>
          <h1 className="text-3xl font-bold">{blog?.title}</h1>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <img
            className="w-11 ml-2 rounded-3xl"
            src={blog?.author.picture}
            alt=""
          />
          <div>
            <h2>{blog?.author.authorName}</h2>
            <p>3 min read {time?.day + " " + time?.month}</p>
          </div>
        </div>

        <LikeShare blogId={blogID} commentsCount={blog?.commentsCount} />

        <div>
          <img src="" alt="" />
        </div>
        <div>
          <div className=" ">
            {isLoadingState ? (
              <BlogREadLoader />
            ) : (
              <ReactMarkdown
                className="text-base w-full lg:text-lg font-medium tracking-[0.02em] prose-p:text-red-400 text-lightGray"
                children={blog?.content}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                // linkTarget="_blank"
              />
            )}
          </div>
        </div>
        <LikeShare blogId={blogID} commentsCount={blog?.commentsCount} />


        {/* suggestions */}
        <div></div>
      </div>
    </>
  );
};

export default Read;
