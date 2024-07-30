import MasonryGrid from "../components/mansory";

export default function Projet() {
  return (
    <section id="projet" className="section   w-100p ">
      <div className="my-4">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center ">
          Liste des{" "}
          <mark className=" text-white bg-primary rounded dark:bg-primary px-2">
            Projets
          </mark>{" "}
        </h1>
      </div>
      <MasonryGrid />
    </section>
  );
}
