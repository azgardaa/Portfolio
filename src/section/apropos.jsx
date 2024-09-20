import { useEffect, useState } from "react";
import axios from "axios";
import HeroSlider from "../components/heroSlider";

export default function About() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        // Requête avec "populate" pour récupérer les images
        const response = await axios.get(
          "https://portfolio-noah-38d5c17b2d07.herokuapp.com/api/slides?populate=*"
        );

        const fetchedSlides = response.data.data.map((slide) => ({
          id: slide.id,
          title: slide.attributes.title,
          subtitle: slide.attributes.subtitle,
          // Récupération de l'URL de l'image
          backgroundImageSrc: slide.attributes.backgroundImageSrc.data[0]
            .attributes.url
            ? `https://portfolio-noah-38d5c17b2d07.herokuapp.com/${slide.attributes.backgroundImageSrc.data[0].attributes.url}`
            : null,
        }));

        setSlides(fetchedSlides);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
        setError("Impossible de récupérer les données");
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) return <p>Chargement des slides...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section
      id="apropos"
      className="section w-full h-screen flex flex-col items-center justify-center"
    >
      <HeroSlider slides={slides} />
    </section>
  );
}
