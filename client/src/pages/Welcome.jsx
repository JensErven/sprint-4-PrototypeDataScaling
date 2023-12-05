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
    hidden: { opacity: 0, x: -200 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, type: "spring" } },
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
      <div className="h-screen relative flex  flex-col">
        {" "}
        <div className="h-[92%] flex flex-col">
          <img
            src={plants_background}
            alt="Description"
            className="w-screen  object-cover bg-gradient-to-b  to-blue-[#11493e] h-1/3"
          />
          <motion.div
            className="px-6 py-3 flex flex-col gap-2 h-2/3"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <h1 className="">Cultivate Curiosity, Nurture Nature</h1>
            <p>
              Explore the breathtaking diversity of our planet's flora and fauna
              at FloraFaunaWorld. Our catalog is a comprehensive guide to the
              botanical wonders that inhabit our world. From towering trees to
              delicate flowers,
            </p>
          </motion.div>
        </div>
        <motion.button
          initial="hidden"
          animate="visible"
          variants={buttonAnimation}
          className="bottom-0 absolute w-screen border-t-[1px] border-slate-600 h-[8%] justify-center items-center flex flex-row  gap-2 rounded-t-3xl bg-[#ffffff] text-stone-800"
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
    </div>
  );
};

export default Welcome;
