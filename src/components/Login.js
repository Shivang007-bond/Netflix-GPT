import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [form, setForm] = useState(true);

  const toggleForm = () => {
    setForm(!form);
  };

  return (
    <div className="">
      <Header />

      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/7fb62e44-31fd-4e1f-b6ad-0b5c8c2a20ef/IN-en-20231009-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
        />
      </div>

      <form className="absolute w-4/12 p-16 bg-black bg-opacity-90 my-32 mx-auto right-0 left-0 text-white rounded-md">
        <h1 className="text-3xl font-semibold my-4">
          {form ? "Sign In" : "Sign Up"}
        </h1>
        {!form && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 my-4 w-full  bg-gray-600 bg-opacity-80  rounded-sm"
          />
        )}
        <input
          type="text"
          placeholder="Email or phone number"
          className="p-3 my-4 w-full bg-gray-600 bg-opacity-80 rounded-sm"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 my-4 w-full  bg-gray-600 bg-opacity-80  rounded-sm"
        />

        <button className="p-3 mt-6 bg-red-700 text-white font-semibold rounded-sm w-full cursor-pointer">
          {form ? "Sign In" : "Sign Up"}
        </button>

        <p className=" text-white opacity-70 text-sm text-end cursor-pointer">
          Need help?
        </p>
        <p
          onClick={toggleForm}
          className=" text-white text-md my-8 cursor-pointer"
        >
          {form
            ? "New to Netflix ? Sign up now"
            : "Already a User ? Sign in now"}
          {/* {form && "New to Netflix ? Sign up now"} */}
        </p>

        <p className=" text-white opacity-60 text-sm cursor-pointer">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </form>
    </div>
  );
};

export default Login;
