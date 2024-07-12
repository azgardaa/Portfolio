"use client";

import React, { useEffect } from "react";
import KeenSlider from "keen-slider";
import "keen-slider/keen-slider.min.css";
import data from "/public/Data.json";

const Slider = () => {
  useEffect(() => {
    const animationDuration = 1000;
    const autoplayDelay = 10000;

    // Texte Slider (anciennement Image Slider)
    const textSlider = new KeenSlider(
      "#text-slider",
      {
        loop: true,
        defaultAnimation: {
          duration: animationDuration,
        },
        detailsChanged: (s) => {
          s.slides.forEach((element, idx) => {
            element.style.opacity = String(s.track.details.slides[idx].portion);
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

    // Image Slider (anciennement Text Slider)
    const imageSlider = new KeenSlider(
      "#image-slider",
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
            scaleElement(element.querySelector("div"), slides[idx].portion);
          });
        },
        initial: 0,
      },
      [SyncSlidersPlugin(textSlider)]
    );

    function scaleElement(element, portion) {
      const scale_size = 1.5;
      const scale = 1 - (scale_size - scale_size * portion);
      const scale_style = `scale(${scale})`;
      element.style.transform = scale_style;
      element.style["-webkit-transform"] = scale_style;

      const opacity = portion === 1 ? 1 : 0.2;
      element.style.opacity = String(opacity);
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

    // Cleanup function
    return () => {
      textSlider.destroy();
      imageSlider.destroy();
    };
  }, []);

  const slides = data.slides;

  return (
    <div className="py-[50px] px-[20px] bg-gray-800 flex flex-col justify-center h-full">
      <section className="container">
        <div
          id="slider-wrapper"
          className="hidden xl:grid xl:grid-cols-[50%_1fr] 2xl:grid-cols-[60%_1fr]"
        >
          <div id="image-slider" className="keen-slider relative h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="keen-slider__slide flex flex-col justify-center"
              >
                <div className="rounded-xl overflow-hidden">
                  <img
                    className="block w-full h-full object-contain"
                    src={slide.imageUrl}
                    alt={slide.alt}
                  />
                </div>
              </div>
            ))}
          </div>
          <div id="text-slider" className="relative z-[1] rounded-xl h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className="keen-slider__slide absolute top-0 w-full h-full flex flex-col justify-center opacity-0 flex-grow"
              >
                <div className="text-base text-white text-center font-medium h-full w-full align-middle px-4">
                  {slide.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative xl:hidden flex flex-col gap-6 [&>*:nth-child(2)>img]:order-1">
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
      </section>
    </div>
  );
};

export default Slider;
