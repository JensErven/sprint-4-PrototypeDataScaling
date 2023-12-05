import React from "react";
import AppBar from "../components/shared/AppBar";
import plants_background from "../assets/plants.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faQuoteRight,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className="h-full overflow-hidden relative">
      {/* <AppBar /> */}
      <div className="h-full flex flex-row w-full">
        <div className="w-1/3 relative">
          <div className="absolute flex flex-row gap-4 items-center justify-center top-4 left-4">
            <div className="w-8 h-8 rounded-full bg-slate-100"></div>
            <p>FloraFaunaWorld</p>
          </div>{" "}
          <img
            src={plants_background}
            alt="Description"
            className="w-screen  object-cover h-full"
          />
          <div className="bg-[#11493e] absolute lg:w-1/2 h-1/2 md:w-full md:rounded-full z-20 top-1/2 -translate-y-1/2 -right-1/2 -translate-x-1/2 lg:rounded-full flex flex-col p-4 items-center justify-center shadow-inner shadow-[#142724]">
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
                <span>
                  Botanical gardens house diverse flora, conserving endangered
                  species. Fauna relies on this biodiversity, and plants produce
                  oxygen, vital for life on Earth.
                </span>
                <FontAwesomeIcon
                  icon={faQuoteRight}
                  className="absolute bottom-0 right-2"
                />
              </p>
            </div>

            <button className="bg-[#114239] shadow-sm shadow-black rounded-full w-12 h-12 absolute bottom-8 text-stone-200">
              <FontAwesomeIcon icon={faRefresh} />
            </button>
          </div>
        </div>
        <div className="w-2/3 bg-[#ffffff] relative z-10 ">
          <div className="flex flex-col items-center justify-center z-auto gap-4">
            content
            <div className="">
              <input className="bg-stone-200 rounded h-8"></input>
            </div>
            <div className=" w-[80%] h-fit flex flex-wrap gap-4 items-center justify-end">
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 bg-slate-400 rounded-md"></div>
                <p className="text-black">Lorem, ipsum.</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0  w-[120%] text-left h-1/2 pl-8 overflow-hidden z-0">
            <p
              className="text-stone-200  overflow-hidden pl-4"
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
