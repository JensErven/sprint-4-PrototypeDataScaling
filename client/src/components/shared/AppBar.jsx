import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const AppBar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="w-screen  border-t-[1px] border-slate-600 h-[8%] justify-between px-4 items-center flex flex-row  shadow-md shadow-slate-900  bg-[#ffffff] text-stone-800">
      <button
        className=" border-red-100 border-2 flex items-center justify-center p-2"
        onClick={logout}
      >
        Logout
      </button>
      AppBar
    </div>
  );
};

export default AppBar;
