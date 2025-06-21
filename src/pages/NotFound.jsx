import React from "react";
import { header1, notFound } from "../assets/assets";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      <div className="w-full">
        <img
          src={header1}
          alt="Header"
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="pb-10 absolute top-[15%] w-full">
        <div className="ml-[5%] mr-[5%] flex flex-col items-center justify-center shadow-lg bg-white rounded-lg">
          <img className="mt-10" src={notFound} />
          <button className="bg-primary px-[15%] py-[1%] mt-16 mb-16 rounded-md cursor-pointer text-base font-medium text-black">
            {" "}
            <Link to="/">Back To Home</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
