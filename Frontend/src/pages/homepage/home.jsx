import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Card from "./card";
import Sidebar from "./sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useToast,
} from "@chakra-ui/react";
import HomeLoader from "./homeloader";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const toast = useToast()
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    // If the filter changes, reset the page and clear the blogs array
    if (filter) {
      setPage(1);
      setBlogs([]);
    }
    fetchBlogs(filter, page);
  }, [filter, page]);

  const fetchBlogs = async (filter, page) => {
    setIsLoading(true)
    try {
      let url = `${process.env.REACT_APP_BASE_URL}/blogs?page=${page}`;
      if (filter) {
        url += `&filter=${filter}`;
      }
      const response = await axios.get(url);

      if (page === 1 && !filter) {
        // If it's the first page and no filter is applied, reset the blogs array
        setBlogs(response.data);
      } else {
        // Append data to existing blogs array
        setBlogs((prevBlogs) => [...prevBlogs, ...response.data]);
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)

    }
  };

  const pageChangeInfinite = () => {
    setPage(page + 1);
  };

  const onFilter = (value) => {
    setFilter(value);
  };
  // console.log(blogs);
  return (
    <>
      <Navbar />
      <div className="w-full relative lg:w-11/12 xl:w-9/12 md:w-9/12 m-auto flex gap-20 mt-16">
        <div className="px-4 w-[90%] lg:w-[60%] ">
          <div className="border-b-2 flex  py-4 gap-3 cursor-pointer">
            <p
              onClick={() => setFilter("")}
              className={` ${filter ? "" : "border-b-2"} `}
            >
              For you
            </p>
            <p
              onClick={() => onFilter("business")}
              className={` ${filter == "business" ? "border-b-2" : ""} `}
            >
              Business
            </p>
            <p
              onClick={() => onFilter("tech")}
              className={` ${filter == "tech" ? "border-b-2" : ""} `}
            >
              Tech
            </p>
            <p
              onClick={() => onFilter("sports")}
              className={` ${filter == "sports" ? "border-b-2" : ""} `}
            >
              Sports
            </p>
            <p
              onClick={() => onFilter("economics")}
              className={` ${filter == "economics" ? "border-b-2" : ""} `}
            >
              Economics
            </p>
          </div>
          {blogs.length == 0 ? (
            <>
              <HomeLoader />
              <HomeLoader />
              <HomeLoader />
              <HomeLoader />
              <HomeLoader />
              <HomeLoader />
            </>
          ) : (
            <InfiniteScroll
              dataLength={blogs.length}
              next={pageChangeInfinite}
              hasMore={true}
            >
              {blogs?.map((ele) => (
                <Card key={ele._id} {...ele} />
              ))}
            </InfiniteScroll>
          )}
        </div>
        <div className="w-[32%] fixed right-20 bg-white border-l-2 hidden lg:block border-gray-200 pl-12  ">
          <Sidebar />
         
        </div>
      </div>
    </>
  );
};

export default Home;
