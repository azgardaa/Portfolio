import React from "react";
import Slider from "./slider";

const Modal = ({ slides, onClose, github, name, presentation }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-scroll lg:overflow-hidden w-[90%] h-[90%]">
        <button
          className="sticky top-4 left-[90%] text-gray-800 text-xl sm:text-2xl bg-gray-200 px-2 py-1 rounded-full hover:bg-gray-300 z-50"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="p-4 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-white">{name}</h2>
          <p className="mt-2 text-gray-400">{presentation}</p>
        </div>
        <Slider slides={slides} />

        <div className="sticky lg:absolute bottom-0 p-4 flex items-center justify-center bg-gray-100 border-t w-full h-8">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-black hover:underline cursor-pointer text-sm sm:text-base md:text-lg"
          >
            <span className="mr-2">View on GitHub</span>
            <img
              className="h-6 w-6 sm:h-6 sm:w-6"
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
