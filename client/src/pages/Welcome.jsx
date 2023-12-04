import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

import {
  faArrowLeft,
  faArrowRight,
  faPaperPlane,
  faPlaneCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import plants_background from "../assets/plants.jpg";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };
  const buttonAnimation = {
    hidden: { y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 1, type: "spring" },
    },
  };

  return (
    <div className="bg-[#11493e] relative flex items-center flex-col text-left justify-between h-screen">
      <div className="h-screen">
        {" "}
        <img
          src={plants_background}
          alt="Description"
          className="w-screen  object-cover bg-gradient-to-b  to-blue-[#11493e] h-1/2"
        />
        <motion.div
          className="p-6 flex flex-col gap-4"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <h1 className="">Keep your plants alive</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt,
            nihil? Esse tempore blanditiis autem ea. Deserunt aspernatur
            dolore...
          </p>
        </motion.div>
      </div>

      <motion.button
        initial="hidden"
        animate="visible"
        variants={buttonAnimation}
        className="w-screen border-t-[1px] border-slate-600 h-[8%] justify-center items-center flex flex-row  gap-2 rounded-t-3xl bg-[#ffffff] text-stone-800"
        onClick={() => navigate("/login")}
      >
        <p className="text-[#010001] font-extrabold">Ga Verder</p>
        <FontAwesomeIcon
          icon={faArrowRight}
          fontSize={25}
          className="text-[#010001]"
        />
      </motion.button>
    </div>
  );
};

export default Welcome;
