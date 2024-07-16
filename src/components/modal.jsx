import React from "react";

const Modal = ({ imageUrl, alt, text, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center  bg-black bg-opacity-80 z-50">
      <button
        className="absolute top-4 right-4 text-white text-xl"
        onClick={onClose}
      >
        X
      </button>
      <img className="w-3/4 max-h-full my-10" src={imageUrl} alt={alt} />
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Modal;
