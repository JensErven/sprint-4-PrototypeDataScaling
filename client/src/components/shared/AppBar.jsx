import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faSearch,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";

const AppBar = () => {
  const [profileClicked, setProfileClicked] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();

  const handleProfileClicked = async () => {
    setProfileClicked(!profileClicked);
  };

  const isPlantDetailsPage = location.pathname.includes("/plantdetails");

  return (
    <div className="w-full  mt-4 mb-20  text-stone-800  flex flex-row items-center justify-center ">
      <div className="justify-between  items-start flex flex-row  w-[80%]  h-full  ">
        {isPlantDetailsPage ? (
          <div className="flex flex-row gap-2 justify-center items-center">
            {" "}
            <Link
              to="/"
              className="flex items-center bg-stone-200  w-12 h-12 rounded-full justify-center"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-stone-500 " />
            </Link>
            <p className="text-stone-500">Go back</p>
          </div>
        ) : (
          <h1
            style={{
              textAlign: "left",
              color: "#267641",
              fontFamily: "'Londrina Solid', sans-serif",
              fontWeight: "300",
              fontSize: "2.5em",
            }}
          >
            Welcome<span className="text-stone-900">, {user.username}</span>
          </h1>
        )}

        <div
          className={`w-12 h-12 flex items-center justify-center bg-stone-200  relative ${
            profileClicked
              ? "rounded-t-full rounded-bl-full rounded-br-lg"
              : "rounded-full "
          }`}
        >
          <button onClick={handleProfileClicked}>
            <FontAwesomeIcon icon={faUser} className="text-stone-500 " />
          </button>
          {profileClicked && (
            <>
              {" "}
              <div className="absolute bg-stone-200 rounded-l-full rounded-br-full rounded-tr-lg top-14 right-0">
                <button
                  className="  border-2 flex items-center justify-center p-2 rounded-l-full rounded-br-full rounded-tr-lg  gap-2 "
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
