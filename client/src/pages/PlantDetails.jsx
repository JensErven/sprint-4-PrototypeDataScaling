import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlantsService from "../services/plantsService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import OpenaiService from "../services/openaiService"; // Import OpenAI service

import {
  faCalendarAlt,
  faLightbulb,
  faMessage,
  faQuestion,
  faRefresh,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import plants_background from "../assets/plants.jpg";
import margriet_bloem_v1 from "../assets/margriet_bloem_v1.png";
import sowing_seeds from "../assets/sowing-seeds.png";
import AppBar from "../components/shared/AppBar";

const PlantDetails = () => {
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const questions = [
    "Where does the plant naturally grow?",
    "Does it produce flowers, fruits, or seeds?",
    "Are there any medicinal, culinary, or cultural uses for this plant?",
  ];
  const { id } = useParams();
  const [fetchedPlantData, setFetchedPlantData] = useState({});

  const [inputMessage, setInputMessage] = useState(
    " Where does the water-dropwort plant naturally grow?"
  ); // State to hold input message
  const [openaiResponse, setOpenaiResponse] = useState(""); // State to hold OpenAI responses
  const [loadingResponse, setLoadingRespone] = useState(false);
  const [answerToQuestionNumber, setAnswerToQuestionNumber] = useState("");

  useEffect(() => {
    if (id) {
      const fetchPlantById = async (id) => {
        try {
          const fetchedData = await PlantsService.getPlantById(id);
          setFetchedPlantData(fetchedData);
        } catch (error) {
          console.error("Error fetching plant:", error);
        }
      };
      fetchPlantById(id);
    }
  }, [id]);

  useEffect(() => {
    console.log(fetchedPlantData);
  }, [fetchedPlantData]);

  const sendMessageToOpenAI = async (question, index) => {
    const indexPlusOne = index + 1;

    setAnswerToQuestionNumber(indexPlusOne);
    // Check if response for this question exists in the state

    try {
      setLoadingRespone(true);
      const response = await OpenaiService.sendMessage(
        `${question} plant: ${fetchedPlantData.common_name}, scientific name: ${fetchedPlantData.scientific_name}`
      );
      console.log(response);
      const newOpenaiResponse = response.choices[0]?.message?.content;
      console.log(newOpenaiResponse);
      setOpenaiResponse(newOpenaiResponse);
      setLoadingRespone(false);
    } catch (error) {
      console.error("Error sending message to OpenAI:", error);
      setOpenaiResponse("Error occurred. Please try again.");
    }
  };
  return (
    <div className="h-full overflow-hidden relative">
      <div className="h-full flex md:flex-col w-full lg:flex-row xl:flex-row flex-col ">
        <div
          className="w-full relative lg:w-1/4 bg-stone-200"
          style={{
            backgroundImage: `url(${plants_background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
        >
          <div className="mt-4 flex flex-row gap-4 items-center justify-start ml-4 h-12 mb-20">
            <div className="w-8 h-8 rounded-full bg-slate-300"></div>
            <p className="">FloraFaunaWorld</p>
          </div>{" "}
          <div className="flex flex-col gap-y-2">
            <div className="bg-stone-200 mx-4 rounded-lg flex-col flex justify-center items-centerj">
              <div className="bg-[#11493e] h-12 p-2 rounded-t-lg w-full flex flex-row items-center justify-between">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-900">
                  <FontAwesomeIcon
                    icon={faQuestion}
                    className="text-stone-200 "
                  />
                </div>

                <p className="text-stone-100 capitalize">Questions to Ask</p>
                <div className="h-8 w-8 flex items-center justify-center rounded-full">
                  {/* <FontAwesomeIcon
                    icon={faQuestion}
                    className="text-stone-200 "
                  /> */}
                </div>
              </div>
              <div className="bg-stone-200  w-full flex flex-col gap-y-2 p-2 ">
                {questions.map((question, index) => (
                  <button
                    onClick={() => sendMessageToOpenAI(question, index)}
                    className="border-2 border-[#11493e] rounded-lg min-h-fit flex items-center justify-center text-left p-2 hover:bg-stone-300 relative w-full"
                  >
                    <div className="absolute top-0 left-0 bg-[#11493e] text-stone-100 rounded-br-xl w-fit px-2 flex items-center justify-center">
                      <p>{index + 1}</p>
                    </div>
                    <p className="text-stone-800 pt-4 text-left  w-full">
                      {question}
                    </p>
                  </button>
                ))}
              </div>
              <div>
                <div className="bg-[#11493e] h-12 p-2  w-full flex flex-row items-center justify-between">
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-900">
                    <FontAwesomeIcon
                      icon={faLightbulb}
                      className="text-stone-200 "
                    />
                  </div>

                  <p className="text-stone-100 capitalize">
                    Answer to Your Question{" "}
                    <span>
                      {answerToQuestionNumber !== "" && answerToQuestionNumber}
                    </span>
                  </p>
                  <div className="h-8 w-8 flex items-center justify-center rounded-full "></div>
                </div>
                {loadingResponse ? (
                  <div className="p-4 ">
                    {" "}
                    <FontAwesomeIcon
                      icon={faSpinner}
                      fontSize={25}
                      className="text-stone-400 animate-spin "
                    />
                  </div>
                ) : (
                  <>
                    {openaiResponse !== "" ? (
                      <div className="p-2 overflow-y-scroll max-h-80">
                        <p className="text-left text-stone-800 p-2 border-2 border-[#11493e] rounded-lg">
                          {openaiResponse}
                        </p>
                      </div>
                    ) : (
                      <div className="p-4">
                        {" "}
                        <FontAwesomeIcon
                          icon={faQuestion}
                          fontSize={25}
                          className="text-stone-400  "
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
              <p className="text-stone-400 pb-4">
                powered By{" "}
                <a className="underline" href="https://openai.com/">
                  OpenAI
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="w-3/4 bg-stone-100 relative z-10 ">
          <div className="flex flex-col items-center  z-50 absolute w-[100%] h-[100%] ">
            <AppBar />
            <div className="flex flex-row w-[80%] m-0 h-1/2  justify-between">
              <div className="text-left text-stone-800 w-1/2 px-4 py-2 rounded-lg">
                <h2
                  className="text-3xl font-bold mb-4"
                  style={{
                    textAlign: "left",
                    color: "#267641",
                    fontFamily: "'Londrina Solid', sans-serif",
                    fontWeight: "300",

                    fontSize: "2.5em",
                  }}
                >
                  {fetchedPlantData.common_name}
                </h2>
                <p className="text-lg mb-2 text-stone-800">
                  <strong>Scientific Name:</strong>{" "}
                  {fetchedPlantData.scientific_name}
                </p>
                <p className="text-lg mb-2 text-stone-800">
                  <strong>Family:</strong> {fetchedPlantData.family}
                </p>
                <p className="text-lg mb-2 text-stone-800">
                  <strong>Year Discovered:</strong> {fetchedPlantData.year}
                </p>
                <p className="text-lg mb-2 text-stone-800">
                  <strong>Discoverer:</strong>{" "}
                  {fetchedPlantData.discoverer_name}
                </p>
              </div>
              <div className="w-[100%] h-[50vh]  flex flex-row rounded-xl">
                <img
                  src={fetchedPlantData.image_url}
                  className="bg-stone-200 rounded-xl"
                  style={{
                    maxHeight: "100%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
            <div className="w-[80%]  rounded-lg overflow-hidden mt-8 ">
              <h1
                style={{
                  textAlign: "left",
                  color: "#267641",
                  fontFamily: "'Londrina Solid', sans-serif",
                  fontWeight: "300",

                  fontSize: "2.5em",
                }}
              >
                Bloom <span className="text-stone-900">&</span> Sowing{" "}
                <span className="text-stone-900">Months</span>
              </h1>
              <div className="h-40 w-full">
                <div className="bg-[#11493e] text-stone-200 flex flex-row justify-between rounded-t-lg items-center h-1/3">
                  {months.map((month) => (
                    <div key={month} className="flex-1 text-center p-2">
                      <p>{month}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row items-center justify-between h-2/3">
                  {months.map((month) => (
                    <div key={month} className="flex-1 text-center h-full">
                      {fetchedPlantData.bloom_months &&
                      (fetchedPlantData.bloom_months.includes(month) ||
                        fetchedPlantData.planting_months.includes(month)) ? (
                        <div className="h-full  w-full bg-stone-300 object-cover flex items-center justify-center">
                          <img
                            src={
                              fetchedPlantData.bloom_months.includes(month)
                                ? margriet_bloem_v1
                                : sowing_seeds
                            }
                            alt="margriet bloem"
                            className=" w-10 "
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-stone-200">{""}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
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

export default PlantDetails;
