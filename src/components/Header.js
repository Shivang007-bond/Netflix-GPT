import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/Redux/userSlice";
import { useEffect } from "react";
import { logo } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

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

  return (
    <div className="absolute w-screen px-8 py-1 bg-gradient-to-b from-black z-50 flex justify-between">
      <img className="w-48" src={logo} alt="netflix-logo" />
      {user && (
        <div className="flex p-2 m-2">
          <img
            src={user.photoURL}
            alt="user-icon"
            className="w-12 h-12 rounded-md"
          />
          <button
            className="cursor-pointer text-white font-extrabold mx-4"
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
