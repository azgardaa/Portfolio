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
          perView: 2,
          spacing: 5,
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
              element.style.display =
                s.track.details.rel === idx ? "block" : "none";
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
      const scale_size = isCentral ? 1 : 0.5;
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
    <div className=" flex flex-col">
      <div
        id="slider-wrapper"
        className="py-4 hidden lg:block xl:block 2xl:block"
      >
        <div
          id="image-slider"
          className="keen-slider w-full max-h-[60vh] overflow-hidden"
          ref={imageSliderRef}
        >
          {slides.map((slide, index) => (
            <div key={index} className="keen-slider__slide flex">
              <div className="w-full h-full flex">
                <img
                  className="object-contain w-full h-full transition-transform duration-300"
                  src={slide.imageUrl}
                  alt={slide.alt}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
        {enableText && (
          <div
            id="text-slider"
            className="keen-slider relative z-10 rounded-xl pt-2"
            ref={textSliderRef}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="keen-slider__slide flex justify-center items-center"
              >
                <div className="text-white text-center font-medium px-4">
                  {slide.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className=" xl:hidden lg:hidden flex flex-col gap-2 overflow-scroll lg:overflow-hidden px-2">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row  gap-3 md:gap-5 w-100p h-1/3"
          >
            <img
              className="block md:w-[70%] h-full w-100p object-cover rounded-md"
              src={slide.imageUrl}
              alt={slide.alt}
            />
            <p className="m-0 text-sm md:text-md lg:text-lg text-white block">
              {slide.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
