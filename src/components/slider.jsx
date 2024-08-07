import React, { useRef, useEffect, useState } from "react";
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";

const Slider = ({
  slides,
  animationDuration = 1000,
  autoplayDelay = 20000,
  enableText = true,
}) => {
  const textSliderRef = useRef(null);
  const imageSliderRef = useRef(null);
  const [centralSlide, setCentralSlide] = useState(1);

  useEffect(() => {
    let textSlider;
    let imageSlider;

    const textSliderNode = textSliderRef.current;
    const imageSliderNode = imageSliderRef.current;

    if (imageSliderNode) {
      imageSlider = new KeenSlider(imageSliderNode, {
        defaultAnimation: {
          duration: animationDuration,
        },
        loop: true,
        slides: {
          origin: "center",
          perView: 2.6,
          spacing: 10,
        },
        detailsChanged: (s) => {
          const slides = s.track.details.slides;
          s.slides.forEach((element, idx) => {
            const isCentral = idx === s.track.details.rel;
            scaleElement(
              element.querySelector("div"),
              slides[idx].portion,
              isCentral
            );
          });
          setCentralSlide(s.track.details.rel);
        },
        initial: 0,
      });
    }

    if (enableText && textSliderNode) {
      textSlider = new KeenSlider(
        textSliderNode,
        {
          loop: true,
          defaultAnimation: {
            duration: animationDuration,
          },
          detailsChanged: (s) => {
            s.slides.forEach((element, idx) => {
              element.style.opacity = String(
                s.track.details.slides[idx].portion
              );
            });
          },
          renderMode: "custom",
        },
        [
          (slider) => {
            let timeout;
            let mouseOver = false;
            function clearNextTimeout() {
              clearTimeout(timeout);
            }
            function nextTimeout() {
              clearTimeout(timeout);
              if (mouseOver) return;
              timeout = setTimeout(() => {
                slider.next();
              }, autoplayDelay);
            }
            slider.on("created", () => {
              slider.container.addEventListener("mouseover", () => {
                mouseOver = true;
                clearNextTimeout();
              });
              slider.container.addEventListener("mouseout", () => {
                mouseOver = false;
                nextTimeout();
              });
              nextTimeout();
            });
            slider.on("dragStarted", clearNextTimeout);
            slider.on("animationEnded", nextTimeout);
            slider.on("updated", nextTimeout);
          },
        ]
      );
    }

    if (imageSlider && textSlider) {
      imageSlider.on("slideChanged", (slider) => {
        const nextId = slider.track.details.rel;
        textSlider.moveToIdx(nextId);
      });

      textSlider.on("slideChanged", (slider) => {
        const nextId = slider.track.details.rel;
        imageSlider.moveToIdx(nextId);
      });
    }

    function scaleElement(element, portion, isCentral) {
      const scale_size = isCentral ? 2 : 0.5;
      const scale = 1 - (scale_size - scale_size * portion);
      const scale_style = `scale(${scale})`;
      element.style.transform = scale_style;
      element.style["-webkit-transform"] = scale_style;

      const opacity = portion === 1 ? 1 : 0.5;
      element.style.opacity = String(opacity);

      if (isCentral) {
        element.classList.add("central-slide");
        element.classList.remove("side-slide");
      } else {
        element.classList.add("side-slide");
        element.classList.remove("central-slide");
      }
    }

    return () => {
      if (textSlider && typeof textSlider.destroy === "function") {
        textSlider.destroy();
      }
      if (imageSlider && typeof imageSlider.destroy === "function") {
        imageSlider.destroy();
      }
    };
  }, [
    textSliderRef,
    imageSliderRef,
    animationDuration,
    autoplayDelay,
    enableText,
  ]);

  return (
    <div className="bg-gray-800 flex flex-col justify-center h-full w-full">
      <div className="w-full h-full">
        <div
          id="slider-wrapper"
          className={`${
            enableText ? "xl:grid-cols-[80%_1fr]" : "xl:grid-cols-[100%_1fr]"
          } hidden xl:grid w-full h-full py-4`}
        >
          <div
            id="image-slider"
            className="keen-slider relative h-full w-100p"
            ref={imageSliderRef}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`keen-slider__slide flex flex-col justify-center ${
                  centralSlide === index ? "w-2/4" : "w-1/4"
                }`}
              >
                <div className="rounded-xl overflow-hidden justify-center">
                  <img
                    className={`object-contain rounded-xl ${
                      centralSlide === index ? "cursor-pointer" : ""
                    }`}
                    src={slide.imageUrl}
                    alt={slide.alt}
                  />
                </div>
              </div>
            ))}
          </div>
          {enableText && (
            <div
              id="text-slider"
              className="keen-slider relative z-10 rounded-xl"
              ref={textSliderRef}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="keen-slider__slide absolute top-0 flex flex-col justify-center opacity-0 flex-grow"
                >
                  <div className="text-white text-center font-medium align-middle px-4">
                    {slide.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative xl:hidden flex flex-col gap-6">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="grid grid-cols-2 gap-3 md:gap-5 lg:gap-8"
            >
              <img
                className="block w-full h-full object-cover rounded-md"
                src={slide.imageUrl}
                alt={slide.alt}
              />
              <p className="m-0 text-sm md:text-md lg:text-lg text-white">
                {index + 1} {slide.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
