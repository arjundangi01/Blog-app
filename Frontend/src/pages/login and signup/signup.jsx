import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
const Signup = () => {
  const [userObj,setUserObj] = useState({})

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserObj({ ...userObj, [name]: value });
  }
  const onSubmit = async () => {
    // console.log(userObj)
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/signup`, userObj);
      console.log(response);
      if (response.data.message =='Email is Already Registered') {
         return
      }
      Cookies.set('userToken', response.data.token, );

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col gap-y-8 lg:w-[40%] m-auto items-center py-14 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg ">
    
      <h1 className="text-3xl mb-2 ">Join Medium.</h1>
      <div className="flex flex-col gap-y-3 items-center">
        <div>
          <FormControl isRequired >
        
            <FormLabel>Enter Full Name</FormLabel>
            <Input type="text" placeholder="Full Name" onChange={handleChange} name='name' />

            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter Email" onChange={handleChange} name='email'  />
          
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter Password" onChange={handleChange} name='password' />
          
          </FormControl>
        </div>
        <div>
          <button onClick={onSubmit} class=" font-semibold py-2 px-4 rounded-full border border-black  ">
            <span class="ml-2">Sign up</span>
          </button>
        </div>
        <div>
          <a href="http://localhost:8080/auth/google">
            <button class=" font-semibold py-2 px-4 rounded-full border border-black  ">
              <span class="ml-2">Sign up with Google</span>
            </button>
          </a>
        </div>

        <div>
          <p>
            Already have an account?{" "}
            <Link to="/login">
              {" "}
              <span className="text-green-900 font-bold">Sign in</span>{" "}
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
