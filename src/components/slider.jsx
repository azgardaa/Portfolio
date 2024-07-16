import React, { useRef, useEffect, useState } from "react";
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";
import Modal from "./modal";

const Slider = ({
  slides,
  animationDuration = 1000,
  autoplayDelay = 20000,
  enableModal = false,
}) => {
  const textSliderRef = useRef(null);
  const imageSliderRef = useRef(null);
  const [modalImage, setModalImage] = useState(null);
  const [modalText, setModalText] = useState("");
  const [centralSlide, setCentralSlide] = useState(1);

  useEffect(() => {
    let textSlider, imageSlider;

    const textSliderNode = textSliderRef.current;
    const imageSliderNode = imageSliderRef.current;

    if (textSliderNode && imageSliderNode) {
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

      imageSlider = new KeenSlider(
        imageSliderNode,
        {
          defaultAnimation: {
            duration: animationDuration,
          },
          loop: true,
          slides: {
            origin: "center",
            perView: 3,
            spacing: 20,
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
        },
        [SyncSlidersPlugin(textSlider)]
      );
    }

    function scaleElement(element, portion, isCentral) {
      const scale_size = isCentral ? 1.5 : 1;
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

    function SyncSlidersPlugin(secondSlider) {
      return (firstSlider) => {
        firstSlider.on("created", () => {
          secondSlider.on("slideChanged", (secondSlider) => {
            const nextId = secondSlider.track.details.rel;
            firstSlider.moveToIdx(nextId);
          });

          firstSlider.on("slideChanged", (firstSlider) => {
            const nextId = firstSlider.track.details.rel;
            secondSlider.moveToIdx(nextId);
          });
        });
      };
    }

    return () => {
      if (textSlider) textSlider.destroy();
      if (imageSlider) imageSlider.destroy();
    };
  }, [textSliderRef, imageSliderRef, animationDuration, autoplayDelay]);

  const openModal = (imageUrl, text) => {
    setModalImage(imageUrl);
    setModalText(text);
  };

  const closeModal = () => {
    setModalImage(null);
    setModalText("");
  };
  return (
    <div className=" bg-gray-800 flex flex-col justify-center h-2/6 py-6">
      <div className="w-full h-full">
        <div
          id="slider-wrapper"
          className="hidden xl:grid xl:grid-cols-[80%_1fr]  w-full h-full py-4"
        >
          <div
            id="image-slider"
            className="keen-slider relative h-full"
            ref={imageSliderRef}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="keen-slider__slide flex flex-col justify-center"
              >
                <div className="rounded-xl overflow-hidden justify-center">
                  <img
                    className={`object-contain rounded-xl ${
                      centralSlide === index ? "cursor-pointer" : ""
                    }`}
                    onClick={() =>
                      enableModal &&
                      centralSlide === index &&
                      openModal(slide.imageUrl, slide.text)
                    }
                    src={slide.imageUrl}
                    alt={slide.alt}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            id="text-slider"
            className="relative z-10 rounded-xl "
            ref={textSliderRef}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="keen-slider__slide absolute top-0  flex flex-col justify-center opacity-0 flex-grow"
              >
                <div className="text-white text-center font-medium  align-middle px-4">
                  {slide.text}
                </div>
              </div>
            ))}
          </div>
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
      {enableModal && modalImage && (
        <Modal imageUrl={modalImage} text={modalText} onClose={closeModal} />
      )}
    </div>
  );
};

export default Slider;
