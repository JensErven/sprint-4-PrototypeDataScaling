import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faPaperPlane,
  faPlaneCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import plants_background from "../assets/plants.jpg";
import "../styles/welcome.css";

const Welcome = () => {
  return (
    <div className="bg-[#11493e] relative flex items-center flex-col text-left justify-between h-screen">
      <div>
        {" "}
        <div class="parent">
          <img src={plants_background} alt="Your Image" class="image" />
        </div>
        <div className="p-4 flex flex-col gap-4">
          <h1 className="">Keep your plants alive</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt,
            nihil? Esse tempore blanditiis autem ea. Deserunt aspernatur
            dolore...
          </p>
        </div>
      </div>

      <button className="w-screen absolute bottom-0 border-t-[1px] border-slate-600 h-[8%] justify-center items-center flex flex-row  gap-2 rounded-t-3xl bg-[#ffffff] text-stone-800">
        <p className="text-[#010001] font-extrabold">Ga Verder</p>
        <FontAwesomeIcon
          icon={faArrowRight}
          fontSize={25}
          className="text-[#010001]"
        />
      </button>
    </div>
  );
};

export default Welcome;
