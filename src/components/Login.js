import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";

import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/Redux/userSlice";

const Login = () => {
  const [form, setForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleForm = () => {
    setForm(!form);
  };

  const displayName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return; // if message !== null i.e No error , then sign-up/in ⬇️

    if (!form) {
      //if form is Not true i.e sign-in
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            //update Profile
            displayName: displayName.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/77275400?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
    // Sign-in Logic
    else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // sign-in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          setErrorMessage(errorCode + "User not found");
        });
    }
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

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-4/12 p-16 bg-black bg-opacity-90 my-32 mx-auto right-0 left-0 text-white rounded-md"
      >
        <h1 className="text-3xl font-semibold my-4">
          {form ? "Sign In" : "Sign Up"}
        </h1>

        {!form && (
          <input
            ref={displayName}
            type="text"
            placeholder="Full Name"
            className="p-3 my-4 w-full  bg-gray-600 bg-opacity-80  rounded-sm"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email or phone number"
          className="p-3 my-4 w-full bg-gray-600 bg-opacity-80 rounded-sm"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3 my-4 w-full  bg-gray-600 bg-opacity-80  rounded-sm"
        />

        <p className="p-1 text-red-800 font-semibold text-md">{errorMessage}</p>

        <button
          onClick={handleButtonClick}
          className="p-3 mt-6 bg-red-700 text-white font-semibold rounded-sm w-full cursor-pointer"
        >
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
