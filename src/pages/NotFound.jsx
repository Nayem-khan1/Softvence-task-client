import React from "react";
import { Link } from "react-router";
import { notFound } from "../assets/assets";

const NotFound = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Top Banner */}
        <div
          style={{
            backgroundImage: "url(/header1.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "180px",
          }}
        ></div>

        {/* Form Container */}
        <div className="">
          <div className="h-screen -mt-16 container mx-auto bg-white shadow-lg rounded-2xl px-8 py-10 flex flex-col items-center justify-center">
            <img className="mt-10" src={notFound} />
            <Link
              to="/"
              className="bg-primary px-[15%] py-[1%] mt-16 mb-16 rounded-md cursor-pointer text-base font-medium text-black"
            >
              {" "}
              Back To Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
