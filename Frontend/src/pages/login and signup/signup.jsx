import React from "react";
import Navbar from "../../components/navbar/navbar";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="flex flex-col gap-y-8 lg:w-[40%] m-auto items-center py-36 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg ">
      <div>
        {/* <RxCross1 /> */}
      </div>
      <h1 className="text-3xl mb-12 ">Join Medium.</h1>
      <div className="flex flex-col gap-y-3 items-center">
        <div>
          <a href="https://github.com/login/oauth/authorize?client_id=8d7d6fd6c9ff670edfd4">
          <button class=" font-semibold py-2 px-4 rounded-full border border-black  ">
            <span class="ml-2">Sign up with Google</span>
          </button>
          </a>
        
        </div>
        <div>
          {/* <button class=" font-semibold py-2 px-4 rounded-full border border-black  ">
            <span class="ml-2">Sign in with F</span>
          </button> */}
        </div>
        <div>
          {/* <button class=" font-semibold py-2 px-4 rounded-full border border-black  ">
            <span class="ml-2">Sign in with Google</span>
          </button> */}
        </div>
        <div>
          <p>
            Already have an account?{" "}
            <Link to='/login' > <span className="text-green-900 font-bold">Sign in</span> </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
