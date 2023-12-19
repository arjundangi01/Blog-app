import React, { useEffect, useRef, useState } from "react";
import Navbar2 from "../../components/navbar/navbar2";
import axios from "axios";
import Cookies from "js-cookie";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import CreateComponent from "./createComponent";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const initialObj = {
  content: "",
  category: "",
  title: "",
};
const Create = () => {
  const [blogObj, setBlogObj] = useState(initialObj);
  const [bannerImage, setBannerImg] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [userToken, setUserToken] = useState(null);
  const tempBlogObj = useRef(blogObj);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    // Access the cookie by name
    const userToken = Cookies.get("userToken");

    if (userToken) {
      setUserToken(userToken);
      console.log("Value from cookie:", userToken);
    } else {
      console.log("Cookie not found");
    }
  }, []);
  const toastFunction = () => {
    toast({
      title: "Error.",
      description: "Please Fill all required Filled.",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  const onPublish = async () => {
    setIsLoading(true);
    // console.log("onp", blogObj,bannerImage);
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    const newObj = { ...blogObj, bannerImage };
    console.log("new", newObj);
    if (
      blogObj.category == "" ||
      blogObj.title == "" ||
      blogObj.content == ""
    ) {
      toastFunction();
      setIsLoading(false);

      return;
    }
    try {
      const newBlog = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/blogs`,
        newObj,
        {
          headers: headers,
        }
      );
      setIsLoading(false);

      navigate("/");
    } catch (error) {
      setIsLoading(false);

      // Handle the error
    }
  };

  return (
    <>
      <Navbar2 onPublish={onPublish} isLoading={isLoading} />
      <CreateComponent
        blogObj={blogObj}
        setBlogObj={setBlogObj}
        bannerImage={bannerImage}
        setBannerImg={setBannerImg}
        editorState={editorState}
        setEditorState={setEditorState}
      />
    </>
  );
};

export default Create;
