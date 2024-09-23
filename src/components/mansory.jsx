import React, { useState, useEffect } from "react";
import axios from "axios";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Modal from "./modal"; // Assurez-vous que le chemin est correct
import ClientOnly from "../ClientOnly";

const MasonryGrid = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `https://portfolio-noah-38d5c17b2d07.herokuapp.com/api/projects?populate[cover]=*&populate[slides][populate]=imageUrl`
        );

        // Traitement des données récupérées
        const fetchedProjects = response.data.data.map((project) => ({
          id: project.id,
          name: project.attributes.name,
          presentation: project.attributes.presentation,
          github: project.attributes.github,
          cover: project.attributes.cover.data.attributes.url.startsWith("http")
            ? project.attributes.cover.data.attributes.url
            : `https://portfolio-noah-38d5c17b2d07.herokuapp.com${project.attributes.cover.data.attributes.url}`,
          slides: project.attributes.slides.map((slide) => ({
            id: slide.id,
            alt: slide.alt,
            text: slide.text,
            imageUrl: slide.imageUrl.data.map((image) =>
              image.attributes.url.startsWith("http")
                ? `https://portfolio-noah-38d5c17b2d07.herokuapp.com${image.attributes.url}`
                : image.attributes.url
            ),
          })),
        }));

        setProjects(fetchedProjects);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
        setError("Impossible de récupérer les projets");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleImageClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  if (loading) return <p>Chargement des projets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ClientOnly>
      <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {projects.map((project) => (
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
      {selectedProject && (
        <Modal
          name={selectedProject.name}
          presentation={selectedProject.presentation}
          slides={selectedProject.slides}
          github={selectedProject.github}
          onClose={handleCloseModal}
        />
      )}
    </ClientOnly>
  );
};

export default MasonryGrid;
