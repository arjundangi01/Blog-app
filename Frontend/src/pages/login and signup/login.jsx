import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
const Login = () => {
  const [userObj, setUserObj] = useState({});
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserObj({ ...userObj, [name]: value });
  };
  const onSubmit = async () => {
    // console.log(userObj)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`,
        userObj
      );
      console.log(response);
      if (response.data.message == "Email is not Registered") {
        toastFunction("Email is not Registered")

        return;
      }
      if (response.data.message == "Entered Wrong Detail") {
        toastFunction("Entered Wrong Detail")
        return;
      }
      Cookies.set("userToken", response.data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const toastFunction = (msg) => {
    toast({
      title: "Error.",
      description: msg,
      status: "error",
      duration: 10000,
      isClosable: true,
    });
  };
  return (
    <div className="flex flex-col  w-[100%] sm:w-[80%]  gap-y-8 lg:w-[40%] m-auto items-center py-14 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg ">
      <h1 className="text-3xl mb-2 ">Welcome Back.</h1>
      <div className="flex flex-col gap-y-3 items-center">
        <div>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter Email"
              onChange={handleChange}
              name="email"
            />

            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter Password"
              onChange={handleChange}
              name="password"
            />
          </FormControl>
        </div>
        <div>
          <button
            onClick={onSubmit}
            class=" font-semibold py-2 px-4 rounded-full border border-black  "
          >
            <span class="ml-2">Login</span>
          </button>
        </div>
        <div>
          <a href="http://localhost:8080/auth/google">
            <button class=" font-semibold py-2 px-4 rounded-full border border-black  ">
              <span class="ml-2">Sign in with Google</span>
            </button>
          </a>
        </div>

        <div>
          <p>
            No Account?{" "}
            <Link to="/signup">
              {" "}
              <span className="text-green-900 font-bold">Create One</span>{" "}
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
