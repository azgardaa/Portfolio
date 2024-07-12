import Image from "next/image";
import Chat from "/public/image/Cat03.jpg";
import pdp from "/public/image/pdp.jpg";
import Slider from "@/components/slider";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-16 ">
      <div className=" w-full rounded-md bg-gradient-to-r from-green-600 via-yellow-600 to-orange-700 p-1">
        <div className="flex h-full w-full items-center justify-center bg-gray-800 back p-6">
          <Image
            src={pdp}
            alt="Photo de noah"
            className="justify-start basis-1/4 max-w-48 h-fit z-20 "
          ></Image>
          <p className="basis-3/4 mx-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis
            lorem ac enim posuere ultrices. Duis pellentesque laoreet risus eu
            sollicitudin. Donec ultrices nunc et nisi faucibus maximus. Nam
            efficitur id neque eu pulvinar. Maecenas fermentum nisl nec leo
            rhoncus sagittis ut nec ligula. Morbi fringilla suscipit diam nec
            tincidunt. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Ut ipsum magna, pharetra vel odio ut, molestie dictum
            arcu. Nunc porta vulputate elit non convallis. Suspendisse porta
            libero ac libero molestie pellentesque. Nunc scelerisque arcu vitae
            diam tempus ullamcorper ac vitae odio. Phasellus at consectetur dui.
            Etiam fermentum tortor in fermentum laoreet. Aliquam at urna se sem.{" "}
          </p>
        </div>
        <Slider />
      </div>
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
