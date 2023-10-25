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
const initialObj = {
  content: "",
  category: "",
  title: "",
  bannerImage: "",
};
const CreateComponent = ({
  blogObj,
  setBlogObj,
  editorState,
  setEditorState,
    setBannerImg,
    bannerImage
}) => {
  const [userToken, setUserToken] = useState(null);
  const tempBlogObj = useRef(blogObj);

  useEffect(() => {
    // Access the cookie by name
    const userToken = Cookies.get("userToken");

    if (userToken) {
      setUserToken(userToken);
     
    } else {
      console.log("Cookie not found");
    }
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    setBlogObj({ ...blogObj, [name]: value });
  };

  const handleImageUploadFromRichTextEditor = (file) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "mediumclone");
      formData.append("cloud_name", "arjundangicloud");

      axios
        .post(
          "https://api.cloudinary.com/v1_1/arjundangicloud/image/upload",
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

  const handleContentChange = (editorState) => {
    setEditorState(editorState);
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setBlogObj({ ...blogObj, content: html });
  };

  return (
    <>
      <div className="mt-16 md:w-[80%] lg:w-[70%] m-auto w-[90%] ">
        <div className="flex mb-6 justify-between items-center">
          <input
            name="title"
            value={blogObj.title}
            type="text"
            placeholder="Enter Title"
            className="focus:border-transparent focus:outline-none font-bold tracking-wider"
            onChange={handleChange}
          />
          <select
            name="category"
            id=""
            className="border-transparent"
            onChange={handleChange}
          >
            <option value={blogObj.category}>Select Category</option>
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

export default CreateComponent;
