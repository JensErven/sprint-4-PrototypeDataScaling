import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
const AppBar = () => {
  const [profileClicked, setProfileClicked] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleProfileClicked = async () => {
    setProfileClicked(!profileClicked);
  };
  return (
    <div className="w-full  mt-4 mb-20  text-stone-800  flex flex-row items-center justify-center">
      <div className="justify-between  items-start flex flex-row  w-[80%]  h-full  ">
        <h1
          style={{
            textAlign: "left",
            color: "#f9cdc9",
            fontFamily: "'Londrina Solid', sans-serif",
            fontWeight: "300",

            fontSize: "2.5em",
          }}
        >
          Welcome <span className="text-stone-900"> , Jens Erven</span>
        </h1>

        <div
          className={`w-12 h-12 flex items-center justify-center bg-stone-200  relative ${
            profileClicked ? "rounded-t-md" : "rounded-md"
          }`}
        >
          <button onClick={handleProfileClicked}>
            <FontAwesomeIcon icon={faUser} className="text-stone-500" />
          </button>
          {profileClicked && (
            <>
              {" "}
              <div className="absolute bg-stone-200 rounded-md top-12 right-0">
                <button
                  className="  border-2 flex items-center justify-center p-2 rounded-b-md rounded-tl-md gap-2 "
                  onClick={logout}
                >
                  Logout
                  <FontAwesomeIcon icon={faSignOut} className="text-red-500" />
                </button>{" "}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppBar;
