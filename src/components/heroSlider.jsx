import { useState } from "react";

const HeroSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);
  const [direction, setDirection] = useState("");

  const nextSlide = () => {
    setDirection("next");
    setPrevSlide(currentSlide);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlideFunc = () => {
    setDirection("prev");
    setPrevSlide(currentSlide);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="h-[100vh] w-full flex relative overflow-hidden">
      <div className="h-full w-full flex relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-100p h-100p flex items-center justify-center transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 "
            } ${
              index === currentSlide && direction === "next"
                ? "animate-slideInFromRight"
                : index === currentSlide && direction === "prev"
                ? "animate-slideInFromLeft"
                : index === prevSlide && direction === "next"
                ? "animate-slideOutToLeft"
                : index === prevSlide && direction === "prev"
                ? "animate-slideOutToRight"
                : ""
            }`}
            style={{
              backgroundImage: `url(${slide.backgroundImageSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="text-center text-white flex flex-col items-center  ">
              <h1 className="text-4xl font-bold">{slide.title}</h1>
              <p className="mt-4 text-lg w-3/4 align-center">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 z-20 bg-gray-800 bg-opacity-50 text-white px-4 py-2 rounded-md text-2xl"
        onClick={prevSlideFunc}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-4 z-20 bg-gray-800 bg-opacity-50 text-white px-4 py-2 rounded-md text-2xl"
        onClick={nextSlide}
      >
        &#10095;
      </button>
    </div>
  );
};

export default HeroSlider;
