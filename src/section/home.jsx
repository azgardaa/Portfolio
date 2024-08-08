import TypewriterComponent from "../components/typeWriter";
import Image from "next/image";
import Cat05 from "../../public/image/cat05.png";
import code from "../../public/code-2-svgrepo-com.png";

export default function Home() {
  const strings = [
    {
      text: "Je m'appelle Noah",
      pause: 1000,
      deleteAll: true,
      changeDeleteSpeed: 1000,
      changeDelay: 100,
    },
    { text: "Vous avez un projet ?", pause: 1000 },
    {
      text: "<strong> Une idée ?</strong>",
      pause: 2500,
      deleteAll: true,
      changeDeleteSpeed: 1000,
      changeDelay: 1000,
    },
    {
      text: "N'hesitez plus et consulter mon portfolio !",
      pause: 2500,
      deleteAll: true,
      changeDeleteSpeed: 1000,
      changeDelay: 1000,
    },
  ];

  return (
    <section
      id="home"
      className="section w-full h-screen flex flex-col items-center justify-center "
    >
      <p className="text-white text-4xl xl:text-7xl mb-4">Bienvenue !</p>
      <div className="flex items-center justify-center">
        <Image
          src={Cat05}
          alt="Photo de Noah"
          className="max-w-full h-auto"
          width={200}
          height={200}
        />
      </div>
      <TypewriterComponent strings={strings} loop={true} />
    </section>
  );
}
