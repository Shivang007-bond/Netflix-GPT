import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/Redux/userSlice";

const Header = () => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        dispatch(removeUser());
      })
      .catch((error) => {
        navigate("/Error");
      });
  };

  return (
    <div className="absolute w-screen px-8 py-1 bg-gradient-to-b from-black z-50 flex justify-between">
      <img
        className="w-48"
        src="
https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="netflix-logo"
      />
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
