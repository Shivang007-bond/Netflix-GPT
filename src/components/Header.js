import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/Redux/userSlice";
import { useEffect } from "react";
import { Supported_lang, logo } from "../utils/constants";
import { toggleGptSearchView } from "../utils/Redux/gptSlice";
import { languageChange } from "../utils/Redux/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, fullname, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            fullname: fullname,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // navigate("/");
        dispatch(removeUser());
      })
      .catch((error) => {
        navigate("/Error");
      });
  };

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLangChange = (e) => {
    dispatch(languageChange(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-1 bg-gradient-to-b from-black z-50 flex flex-col  md:flex-row justify-between cursor-pointer">
      <img className="w-48 mx-auto md:mx-0" src={logo} alt="netflix-logo" />
      {user && (
        <div className="flex p-2 m-2 justify-between">
          {showGptSearch && (
            <select
              className="rounded-md font-semibold p-2 m-2 bg-red-800 text-white"
              onChange={handleLangChange}
            >
              {Supported_lang.map((lang) => (
                <option className="font-semibold" key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="h-10 cursor-pointer bg-red-800 px-3 rounded-md text-white font-semibold my-2 md:mx-4 hover:bg-red-900"
            onClick={handleGptSearch}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            src={user.photoURL}
            alt="user-icon"
            className="hidden md:block w-12 h-12 rounded-md"
          />
          <button
            className="cursor-pointer text-white font-extrabold mx-1 md:mx-4"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
