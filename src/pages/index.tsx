import Image from "next/image";
import Chat from "/public/image/Cat03.jpg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
    </main>
  );
}
