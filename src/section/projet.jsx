import React, { useState } from "react";
import MasonryGrid from "../components/mansory";
import ScrollSection from "../components/ScrollSection"; // Assurez-vous que le chemin est correct
import Modal from "../components/modal";

export default function Projet() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleImageClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projet" className="section w-100p ">
      <div className="py-4">
        <h2 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center ">
          Liste des{" "}
          <mark className=" text-white bg-primary rounded dark:bg-primary px-2">
            Projets
          </mark>{" "}
        </h2>
      </div>
      <MasonryGrid onImageClick={handleImageClick} />
    </section>
  );
}
