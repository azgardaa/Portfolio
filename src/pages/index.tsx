import ScrollSection from "@/components/ScrollSection";
import Home from "@/section/home";
import About from "@/section/apropos";
import Projet from "@/section/projet";
import Contact from "@/section/contact";
import React from "react";

export default function Main() {
  return (
    <main className="bg-gray-800 w-auto md:pl-[10vh]">
      <ScrollSection>
        <Home />
        <About />
        <Projet />
        <Contact />
      </ScrollSection>
    </main>
  );
}
