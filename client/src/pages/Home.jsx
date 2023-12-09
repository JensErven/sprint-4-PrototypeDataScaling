import React, { useContext, useEffect, useState } from "react";
import AppBar from "../components/shared/AppBar";
import plants_background from "../assets/plants.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faQuoteLeft,
  faQuoteRight,
  faRefresh,
  faSearch,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PlantsService from "../services/plantsService";
import { FactsContext } from "../contexts/FactsContext";
import styles from "../styles/circle-animation.css";
import { motion, useAnimation } from "framer-motion";
import PlantsContext from "../contexts/PlantsContext";
const Home = () => {
  // search input
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the input field value

  const controls = useAnimation();
  const { getRandomFact, fact } = useContext(FactsContext);
  const {
    plantsData,
    fetchingPlants,

    maxPage,
    setPlantsPage,
    pagesToShow,
    plantspage,
    minPage,
    maxVisiblePage,
    searchPlants,
  } = useContext(PlantsContext);

  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value); // Save the input field value on change
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      setPlantsPage(1);
      // Check if the Enter key is pressed
      try {
        await searchPlants(searchTerm);
      } catch (error) {
        console.error("Error fetching plants:", error);
        // Handle error
      }
    }
  };

  const renderNewFact = async () => {
    // Trigger animation when a new fact arrives
    await controls.start({
      opacity: 0, // Fade out
      y: -20, // Move upwards
    });

    controls.start({
      opacity: 1, // Fade in
      y: 0, // Reset Y position
      transition: { duration: 0.5 }, // Animation duration
    });
  };

  useEffect(() => {
    renderNewFact();
  }, [fact]); // Trigger when 'fact' changes

  // Function to handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= maxPage) {
      setPlantsPage(newPage);
    }
  };

  const renderPagination = () => {
    const pages = [];
    if (maxPage <= pagesToShow) {
      for (let i = 1; i <= maxPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`h-12 w-12 ${
              i === plantspage
                ? "bg-[#114239] text-stone-200"
                : "bg-stone-200 text-black"
            } rounded mx-1 `}
          >
            {i}
          </button>
        );
      }
    } else {
      if (minPage > 1) {
        pages.push(
          <button
            key={1}
            onClick={() => handlePageChange(1)}
            className={`h-12 w-12 bg-stone-200 text-black mx-1 rounded-md`}
          >
            1
          </button>
        );
        if (minPage > 2) {
          pages.push(
            <button
              key="left-ellipsis"
              className={`h-12 w-12 bg-stone-200 text-black rounded-md mx-1 `}
              disabled
            >
              ...
            </button>
          );
        }
      }

      for (let i = minPage; i <= maxVisiblePage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`h-12 w-12 rounded-md  ${
              i === plantspage
                ? "bg-[#114239] text-stone-100"
                : "bg-stone-200 text-black"
            } mx-1 `}
          >
            {i}
          </button>
        );
      }

      if (maxVisiblePage < maxPage) {
        if (maxVisiblePage < maxPage - 1) {
          pages.push(
            <button
              key="right-ellipsis"
              className={`h-12 w-12 bg-stone-200 text-black rounded-md mx-1 `}
              disabled
            >
              ...
            </button>
          );
        }
        pages.push(
          <button
            key={maxPage}
            onClick={() => handlePageChange(maxPage)}
            className={`h-12 w-12 bg-stone-200 text-black rounded-md mx-1  `}
          >
            {maxPage}
          </button>
        );
      }
    }

    return (
      <>
        <button
          onClick={() => handlePageChange(plantspage - 1)}
          disabled={plantspage === 1}
          className={`h-12 w-12 bg-[#114239] text-stone-200 rounded-l-full rounded-full`}
        >
          {/* &larr; */}
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(plantspage + 1)}
          disabled={plantspage === maxPage}
          className={`h-12 w-12 bg-[#114239] text-stone-200 rounded-full`}
        >
          {/* &rarr; */}
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </>
    );
  };

  const handlePlantClick = (plantId) => {
    // Create a growing circle element
    const circle = document.createElement("div");
    circle.classList.add("circle-animation");
    document.body.appendChild(circle);

    // Transition to plant details page after animation completes
    circle.addEventListener("animationend", () => {
      // Navigate to the plant details page using React Router
      // Replace this line with your actual navigation logic
      circle.remove();
      navigate(`/plantdetails/${plantId}`);
    });
  };

  // Placeholder component for skeleton cards
  const PlaceholderCard = () => {
    return (
      <div className="flex flex-col items-center justify-center shadow-stone-400 shadow-md rounded-xl">
        <div className="h-40 w-40 bg-gray-300 rounded-t-xl animate-pulse"></div>
        <p className="text-black w-40 bg-stone-100 rounded-b-xl py-2 h-16 items-center justify-center flex animate-pulse"></p>
      </div>
    );
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0 },
    visible: { opacity: 1, y: 0, scale: 1 },
    transition: { type: "spring", stiffness: 1000 },
  };

  const renderPlants = () => {
    if (fetchingPlants) {
      // Return placeholder skeleton cards while data is loading
      return Array.from({ length: 10 }, (_, index) => (
        <PlaceholderCard key={`placeholder-${index}`} />
      ));
    } else {
      // Render actual plant cards when data is available
      return (
        <motion.div
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-y-8 gap-x-4 items-start justify-between"
        >
          {plantsData.plants.map((plant, index) => (
            <motion.div
              whileHover={{
                rotateX: 15,
                rotateY: 10,
                rotateZ: 4,

                transition: { type: "spring", stiffness: 100 },
              }}
              key={plant.id}
              variants={cardVariants}
              className="flex flex-col items-center justify-center shadow-stone-400 shadow-md rounded-2xl lg:w-40 w-32 cursor-pointer "
              onClick={() => handlePlantClick(plant.id)}
            >
              <div className="h-40 w-full  bg-slate-400 rounded-t-2xl">
                <img
                  src={plant.image_url}
                  alt={plant.common_name}
                  className="object-cover w-full h-full rounded-t-2xl"
                />
              </div>
              <p className="text-stone-100 w-full bg-[#11493e] rounded-b-2xl py-2 h-16 items-center justify-center flex">
                {plant.common_name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      );
    }
  };

  return (
    <div className="h-full overflow-hidden relative">
      <div className="h-full flex md:flex-col w-full lg:flex-row xl:flex-row flex-col ">
        <div className="w-full relative lg:w-1/4 ">
          <div className="absolute flex flex-row gap-4 items-center justify-center top-4 h-12 left-4">
            <div className="w-8 h-8 rounded-full bg-slate-100"></div>
            <p>FloraFaunaWorld</p>
          </div>{" "}
          <img
            src={plants_background}
            alt="Description"
            className="w-screen  object-cover h-full"
          />
          <div className="bg-[#11493e] absolute lg:w-full h-1/2 md:w-full md:rounded-full z-20 top-1/2 -translate-y-1/2 lg:-right-1/2 lg:-translate-x-1/2 lg:rounded-full flex flex-col p-4 items-center justify-center shadow-inner shadow-[#142724] rounded-full">
            <div>
              <p
                className="px-2"
                style={{
                  color: "#f9cdc9",
                  fontFamily: "'Londrina Solid', sans-serif",
                  fontWeight: "300",

                  fontSize: "2.5em",
                }}
              >
                Did you know?
              </p>

              <motion.p
                initial={{ opacity: 0, y: -20 }} // Initial state
                animate={controls} // Control animation state
                className="text-left flex flex-row gap-2 relative p-2 "
              >
                <FontAwesomeIcon icon={faQuoteLeft} />
                <span>{fact && fact}</span>
                <FontAwesomeIcon
                  icon={faQuoteRight}
                  className="absolute bottom-0 right-2"
                />
              </motion.p>
            </div>

            <button
              className="bg-[#114239] shadow-sm shadow-black rounded-full w-12 h-12 absolute bottom-8 text-stone-200"
              onClick={getRandomFact}
            >
              <FontAwesomeIcon icon={faRefresh} />
            </button>
          </div>
        </div>
        <div className="w-3/4 bg-stone-100 relative z-10 ">
          <div className="flex flex-col items-center justify-center z-50 gap-4 absolute w-[100%]  ">
            <AppBar />
            <div className="flex flex-row justify-between w-[80%]">
              {" "}
              <div className="h-full  flex flex-row items-center justify-center  w-full shadow-md rounded-full">
                <div className="flex flex-row items-center justify-center h-12 w-16 bg-stone-100 rounded-l-full">
                  <FontAwesomeIcon
                    icon={faSearch}
                    fontSize={25}
                    className="text-stone-400  "
                  />
                </div>
                <input
                  value={searchTerm} // Set the value of the input field
                  onChange={handleSearchInputChange} // Handle input change
                  className="h-12 pl-4 bg-stone-100 rounded-r-full w-full  "
                  placeholder="search by plantname..."
                  onKeyPress={handleSearch}
                ></input>
              </div>
            </div>
            <div className="text-stone-400 px-4 h-12  bg-stone-200 rounded-full flex flex-row gap-2  w-fit items-center justify-center">
              {!fetchingPlants ? (
                <p className="text-stone-400 ">
                  {plantsData.pagination.totalItems} results
                </p>
              ) : (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="animate-spin text-ston-200"
                />
              )}
            </div>
            <div className=" w-[80%] h-fit flex flex-wrap gap-y-8 gap-x-4  items-start justify-between ">
              {renderPlants()}
            </div>
            <div className="flex flex-wrap justify-center mt-8 ">
              {renderPagination()}
            </div>
          </div>
          <div className="absolute bottom-0  w-[120%] text-left h-1/2 pl-8 overflow-hidden z-0">
            <p
              className="flora-fauna-text text-stone-300  overflow-hidden pl-4"
              style={{
                fontFamily: "'abraham.outline-demo-outline', sans-serif",
                fontSize: "6em",
                fontWeight: "lighter",
              }}
            >
              Flora & Fauna & Flora & Fauna & Flora & Fauna & Flora & Fauna &
              Flora & Fauna & Flora & Fauna & Flora & Fauna & Flora & Fauna &
              Flora & Fauna & Flora & Fauna &
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
