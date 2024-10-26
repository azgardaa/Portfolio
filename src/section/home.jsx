import TypewriterComponent from "../components/typeWriter";
import Image from "next/image";
import Cat05 from "../../public/images/cat05.png";

export default function Home() {
  const strings = [
    {
      text: "Je m'appelle Noah",
      pause: 1000,
      deleteAll: true,
      deleteSpeed: 50,
      changeDelay: 100,
    },
    { text: "Vous avez un projet ?", pause: 1000 },
    {
      text: "<strong> Une idée ?</strong>",
      pause: 2500,
      deleteAll: true,
      deleteSpeed: 50,
      changeDelay: 1000,
    },
    {
      text: "Consultez mon portfolio !",
      pause: 2500,
      deleteAll: true,
      deleteSpeed: 50,
      changeDelay: 1000,
    },
  ];

  return (
    <section
      id="acceuil"
      className="section w-full h-screen flex flex-col items-center justify-center "
    >
      <h1 className="text-white text-4xl xl:text-7xl mb-4">Bienvenue !</h1>
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
