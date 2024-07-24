import React from "react";
import Slider from "./slider";

const Modal = ({ slides, onClose, github }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center bg-black bg-opacity-80 z-50">
      <button
        className="absolute top-4 right-4 text-white text-xl"
        onClick={onClose}
      >
        X
      </button>
      <div className="w-3/4 max-h-full my-10">
        <Slider slides={slides} />
      </div>

      <div className=" my-4 flex items-center cursor-pointer">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline flex items-center"
        >
          View on GitHub
          <img
            className="h-8 w-8 ml-2 invert"
            src="https://www.svgrepo.com/show/512317/github-142.svg"
            alt="GitHub"
          />
        </a>
      </div>
    </div>
  );
};

export default Modal;
