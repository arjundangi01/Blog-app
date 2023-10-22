import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Navbar2 from "../../components/navbar/navbar2";
import axios from 'axios';
import Cookies from 'js-cookie';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
const initialObj = {
  title: "",
  content: "",
  category: "",
  likeCounts: 0,
};
const Create = () => {
  const [blogObj, setBlogObj] = useState(initialObj);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Access the cookie by name
    const userToken = Cookies.get('userToken');

    if (userToken) {
      setUserToken(userToken);
      console.log('Value from cookie:', userToken);
    } else {
      console.log('Cookie not found');
    }
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    setBlogObj({ ...blogObj, [name]: value });
  };

  const handleContentChange = (content) => {
    setBlogObj({ ...blogObj, content });
  };

  const onPublish = async () => {
    const headers = {
      'Authorization': `Bearer ${userToken}`,
    };
    try {
      const newBlog = await axios.post('http://localhost:8080/blogs', blogObj, {
        headers: headers
      })
      window.location.assign('/')
    } catch (error) {
      // Handle the error
    }
  };

  return (
    <>
      <Navbar2 onPublish={onPublish} />
      <div className="mt-16 md:w-[80%] lg:w-[70%] m-auto w-[90%] ">
        <div className="flex mb-6 justify-between items-center">
          <input
            name="title"
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
            <option value="">Select Category</option>
            <option value="tech">Tech</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            <option value="economics">Economics</option>
          </select>
        </div>
        <div>
          <ReactQuill
            value={blogObj.content}
            onChange={handleContentChange}
            modules={{
              toolbar: [
                [{ 'header': '1' }, { 'header': '2' }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link'],
                ['clean']
              ],
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Create;
