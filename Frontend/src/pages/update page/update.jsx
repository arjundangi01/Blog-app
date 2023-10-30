import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Navbar2 from "../../components/navbar/navbar2";
import axios from 'axios'
import Cookies from 'js-cookie';
import { useParams } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromHTML,
   convertFromRaw ,
} from "draft-js";
import { useToast } from "@chakra-ui/react";
const initialObj = {
  title: "",
  content: "",
  category: "",
  likeCounts: 0,
};
const Update = () => {
  const [blogObj, setBlogObj] = useState(initialObj);
  const [userToken, setUserToken] = useState(null)
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [bannerImage, setBannerImg] = useState("");
  const [previousContentState, setPreviousContentState] = useState(null);
  const { blogID } = useParams();
  const toast = useToast();
  useEffect(  () => {
    // Access the cookie by name
    fetchBlog();
  toastFunction();

   
  }, []);
  const toastFunction = () => {
    toast({
      title: "Error.",
      description: "Cannot update Blog Please Try after some time.",
      status: "error",
      duration: 10000,
      isClosable: true,
    });
  };
  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/blogs?q=${blogID}`
      );
      // console.log(response.data[0]);
      setBlogObj(response.data[0]);

      // Convert the HTML content to Draft.js content state
      initializeEditorWithHTML(response.data[0].content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
   
    const { value, name } = event.target;
    setBlogObj({ ...blogObj, [name]: value });
  };

  const handleContentChange = (editorState) => {
    // toastFunction();
    return
    setEditorState(editorState);
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setBlogObj({ ...blogObj, content: html });
  };

  const initializeEditorWithHTML = (htmlContent) => {
    const blocksFromHtml = convertFromHTML(htmlContent);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHtml.contentBlocks,
      blocksFromHtml.entityMap
    );
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
  };

  const handleImageUploadFromRichTextEditor = (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "one");
      formData.append("cloud_name", "cloud");

      axios
        .post(
          "https://api.cloudinary.com/v1_1/cloud/image/upload",
          formData
        )
        .then((response) => {
          console.log("Image upload response:", response);
          if (response.data && response.data.url) {
            const imageUrl = response.data.url;
            resolve({ data: { link: imageUrl } });
            if (!bannerImage) {
              setBannerImg(imageUrl);
            }
          } else {
            console.error("Invalid image upload response:", response);
            reject("Image upload failed");
          }
        })
        .catch((error) => {
          console.error("Image upload error:", error);
          reject("Image upload failed");
        });
    });
  };

  const onPublish = async() => {
    // console.log(blogObj)
    // await axios
    toastFunction();
    return;
    // const headers = {
    //   'Authorization': `Bearer ${userToken}`,
    // };
    // try {
    //   const newBlog = await axios.patch(`http://localhost:8080/blogs/${blogID}`, blogObj, {
    //    headers: headers
    //  })
    //     window.location.assign('/')
      
    //   console.log(newBlog)
    // } catch (error) {
      
    // }
  };

  return (
    <>
      <Navbar2 onPublish={onPublish} />
      <div className="mt-16 md:w-[80%] lg:w-[70%] m-auto w-[90%] ">
        <div className="flex mb-6 justify-between items-center">
          <input
            name="title"
            type="text"
            value={blogObj.title}
            placeholder="Enter Title"
            className="focus:border-transparent focus:outline-none font-bold tracking-wider"
            onChange={handleChange}
          />
          <select
            name="category"
            id=""
            value={blogObj.category}
            className="border-transparent "
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="tech">Tech</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            <option value="economics">Economics</option>
          </select>
        </div>
        <div>
          <Editor
            editorState={editorState}
            onEditorStateChange={handleContentChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class "
            toolbar={{
              image: {
                uploadCallback: handleImageUploadFromRichTextEditor,
                alt: { present: true, mandatory: false },
              },
              inline: {
                inDropdown: false,
                options: ["bold", "italic", "underline"],
              },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              history: { inDropdown: true },
            }}
            toolbarClassName="toolbar-class"
          />
        </div>
      </div>
    </>
  );
};

export default Update;

