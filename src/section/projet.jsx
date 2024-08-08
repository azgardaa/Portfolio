import React, { useState } from "react";
import MasonryGrid from "../components/mansory";
import ScrollSection from "../components/ScrollSection"; // Assurez-vous que le chemin est correct

export default function Projet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleImageClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <ScrollSection isModalOpen={isModalOpen}>
      <section id="projet" className="section w-100p ">
        <div className="my-4">
          <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center ">
            Liste des{" "}
            <mark className=" text-white bg-primary rounded dark:bg-primary px-2">
              Projets
            </mark>{" "}
          </h1>
        </div>
        <MasonryGrid onImageClick={handleImageClick} />
        {isModalOpen && selectedProject && (
          <Modal
            name={selectedProject.name}
            presentation={selectedProject.presentation}
            slides={selectedProject.slides}
            github={selectedProject.github}
            onClose={handleCloseModal}
          />
        )}
      </section>
    </ScrollSection>
  );
}
