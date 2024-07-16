import React, { Component } from "react";
import Slider from "@/components/slider";
import dataP from "../../public/Projet.json";

type Props = {};

type State = {};

export default class projet extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="h-screen">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center mt-8 ">
          Liste des{" "}
          <mark className=" text-white bg-primary rounded dark:bg-primary px-2">
            Projets
          </mark>{" "}
        </h1>
        <Slider slides={dataP.Kasa} enableModal={true}></Slider>
        <Slider slides={dataP.Grimoire} enableModal={true}></Slider>
      </div>
    );
  }
}
