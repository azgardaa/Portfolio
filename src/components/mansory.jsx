import React, { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import imagesData from "../../public/Projet.json"; // Assurez-vous que le chemin est correct
import Modal from "./modal"; // Assurez-vous que le chemin est correct
import ClientOnly from "../ClientOnly";

const MasonryGrid = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (project) => {
    setSelectedProject(project.slides);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <ClientOnly>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {imagesData.map((project) => (
            <img
              key={project.id}
              src={project.cover}
              alt={`Image principale du projet ${project.name}`}
              style={{
                display: "block",
                width: "100%",
                padding: "5px",
              }}
              className="cursor-pointer"
              onClick={() => handleImageClick(project)}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {isModalOpen && selectedProject && (
        <Modal slides={selectedProject} onClose={handleCloseModal} />
      )}
    </ClientOnly>
  );
};

export default MasonryGrid;
