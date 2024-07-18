import TypewriterComponent from "../components/typeWriter";
import Image from "next/image";
import Cat05 from "../../public/image/cat05.png";

export default function Home() {
  const strings = [
    { text: "Je m'appelle Noah", pause: 2500, deleteAll: true },
    { text: "Je suis développeur Front end", pause: 2500, deleteChars: 9 },
    { text: "<strong>et Backend !</strong>", pause: 2500 },
  ];

  return (
    <section
      id="home"
      className="section w-full h-[100vh] bg-gray-800 flex flex-col items-center justify-center"
    >
      <p className="text-white text-4xl mb-4">Hi !</p>
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
