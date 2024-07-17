import Image from "next/image";
import Chat from "../../public/image/cat05.png";

export default function About() {
  return (
    <section id="apropos" className="h-[100vh]">
      <div>
        <p className="z-50 p-50 text-white">Jadore OC</p>
        <Image
          src={Chat}
          className="z-50"
          alt="image de chat"
          width={50}
          height={50}
        ></Image>
      </div>
    </section>
  );
}
