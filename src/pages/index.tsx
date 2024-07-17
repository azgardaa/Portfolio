import Home from "@/section/home";
import About from "@/section/apropos";
import Projet from "@/section/projet";
import Contact from "@/section/contact";

export default function Main() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ml-[134px] ">
      <Home />
      <About />
      <Projet />
      <Contact />
    </main>
  );
}
