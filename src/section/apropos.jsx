import { useEffect, useState } from "react";
import HeroSlider from "../components/heroSlider";
import slidesData from "../../public/SliderData.json";

export default function About() {
  return (
    <section
      id="apropos"
      className="section w-full h-[100vh] flex flex-col items-center justify-center"
    >
      <HeroSlider slides={slidesData.slides} />
    </section>
  );
}
