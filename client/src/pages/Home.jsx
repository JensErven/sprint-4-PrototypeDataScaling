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

const Home = () => {
  const { getRandomFact, fact } = useContext(FactsContext);
  const [maxPage, setMaxPage] = useState(1);
  const pagesToShow = 5;
  const [plantspage, setPlantsPage] = useState(1);
  const halfPagesToShow = Math.floor(pagesToShow / 2);
  const minPage = Math.max(1, plantspage - halfPagesToShow);
  const maxVisiblePage = Math.min(minPage + pagesToShow - 1, maxPage);
  const [plantsData, setPlantsData] = useState({ pagination: {}, plants: [] });
  const navigate = useNavigate();

  const [fetchingPlants, setFetchingPlants] = useState(false);
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setFetchingPlants(true);
        const fetchedData = await PlantsService.getPlants(plantspage);
        setMaxPage(fetchedData.pagination.totalPages);
        setPlantsData(fetchedData);

        setFetchingPlants(false);
      } catch (error) {
        // Handle error
        console.error("Error fetching plants:", error);
      }
    };

    console.log("Fetching plants...");
    fetchPlants();
  }, [plantspage]); // Make sure to include all dependencies used inside the effect
  useEffect(() => {
    console.log(plantsData);
  }, [plantsData.plants]);

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
                : "bg-gray-300 text-black"
            } rounded `}
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
            className={`h-12 w-12 bg-gray-300 text-black ml-1 rounded-md `}
          >
            1
          </button>
        );
        if (minPage > 2) {
          pages.push(
            <button
              key="left-ellipsis"
              className={`h-12 w-12 bg-gray-300 text-black rounded-md ml-1 `}
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
            className={`h-12 w-12 ml-1 rounded-md  ${
              i === plantspage
                ? "bg-[#114239] text-stone-200"
                : "bg-gray-300 text-black"
            } `}
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
              className={`h-12 w-12 bg-gray-300 text-black ml-1 rounded-md  `}
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
            className={`h-12 w-12 bg-gray-300 text-black rounded-md  ml-1 `}
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
          className={`h-12 w-12 bg-[#114239] text-stone-200 rounded-l-full rounded-full `}
        >
          {/* &larr; */}
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(plantspage + 1)}
          disabled={plantspage === maxPage}
          className={`h-12 w-12 bg-[#114239] text-stone-200 rounded-full ml-1`}
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
      <div className="flex flex-col items-center justify-center shadow-stone-400 shadow-md rounded-md">
        <div className="h-40 w-40 bg-gray-300 rounded-t-md animate-pulse"></div>
        <p className="text-black w-40 bg-stone-100 rounded-b-md py-2 h-16 items-center justify-center flex animate-pulse"></p>
      </div>
    );
  };

  const renderPlants = () => {
    if (fetchingPlants) {
      // Return placeholder skeleton cards while data is loading
      return Array.from({ length: 10 }, (_, index) => (
        <PlaceholderCard key={`placeholder-${index}`} />
      ));
    } else {
      // Render actual plant cards when data is available
      return plantsData.plants.map((plant) => (
        <div
          onClick={() => handlePlantClick(plant.id)}
          key={plant.id}
          className="flex flex-col items-center justify-center shadow-stone-400 shadow-md rounded-md"
        >
          <div className="h-40 w-40 bg-slate-400 rounded-t-md">
            <img
              src={plant.image_url}
              alt={plant.common_name}
              className="object-cover w-full h-full rounded-md"
            />
          </div>
          <p className="text-black w-40 bg-stone-100 rounded-b-md py-2 h-16 items-center justify-center flex">
            {plant.common_name}
          </p>
        </div>
      ));
    }
  };
  return (
    <div className="h-full overflow-hidden relative">
      <div className="h-full flex flex-row w-full">
        <div className="w-1/4 relative">
          <div className="absolute flex flex-row gap-4 items-center justify-center top-4 left-4">
            <div className="w-8 h-8 rounded-full bg-slate-100"></div>
            <p>FloraFaunaWorld</p>
          </div>{" "}
          <img
            src={plants_background}
            alt="Description"
            className="w-screen  object-cover h-full"
          />
          <div className="bg-[#11493e] absolute lg:w-full h-1/2 md:w-full md:rounded-full z-20 top-1/2 -translate-y-1/2 -right-1/2 -translate-x-1/2 lg:rounded-full flex flex-col p-4 items-center justify-center shadow-inner shadow-[#142724]">
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

              <p className="text-left flex flex-row gap-2 relative p-2 ">
                <FontAwesomeIcon icon={faQuoteLeft} />
                <span>{fact && fact}</span>
                <FontAwesomeIcon
                  icon={faQuoteRight}
                  className="absolute bottom-0 right-2"
                />
              </p>
            </div>

            <button
              className="bg-[#114239] shadow-sm shadow-black rounded-full w-12 h-12 absolute bottom-8 text-stone-200"
              onClick={getRandomFact}
            >
              <FontAwesomeIcon icon={faRefresh} />
            </button>
          </div>
        </div>
        <div className="w-3/4 bg-[#ffffff] relative z-10 ">
          <div className="flex flex-col items-center justify-center z-50 gap-4 absolute w-[100%]  ">
            <AppBar />
            <div className="flex flex-row justify-between w-[80%]">
              {" "}
              <div className="h-full  flex flex-row items-center justify-center mb-20 w-2/3">
                <input
                  className="h-12 pl-4 bg-stone-100 rounded-l-md w-full  "
                  placeholder="search by plantname..."
                ></input>
                <div className="flex flex-rw items-center justify-center h-12 w-12 bg-stone-200 rounded-r-md">
                  <FontAwesomeIcon
                    icon={faSearch}
                    fontSize={25}
                    className="text-stone-500  "
                  />
                </div>
              </div>
            </div>

            <div className=" w-[80%] h-fit flex flex-wrap gap-y-8 gap-x-8  items-start justify-between ">
              {renderPlants()}
            </div>
            <div className="flex flex-wrap justify-center mt-8 ">
              {renderPagination()}
            </div>
          </div>
          <div className="absolute bottom-0  w-[120%] text-left h-1/2 pl-8 overflow-hidden z-0">
            <p
              className="text-stone-100  overflow-hidden pl-4"
              style={{
                fontFamily: "'Londrina Outline', sans-serif",
                fontSize: "6em",
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
