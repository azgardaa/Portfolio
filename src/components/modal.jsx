import React from "react";
import Slider from "./slider"; // Assurez-vous que le chemin est correct

const Modal = ({ slides, onClose }) => {
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
    </div>
  );
};

export default Modal;
