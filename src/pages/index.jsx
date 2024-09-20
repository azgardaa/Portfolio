// pages/index.js (example page)
import Head from "next/head";
import ScrollSection from "@/components/ScrollSection";
import Home from "@/section/home";
import About from "@/section/apropos";
import Projet from "@/section/projet";
import Contact from "@/section/contact";

export default function Main() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Portfolio de Noah</title>
      </Head>
      <main className="bg-gray-800 w-auto md:pl-[10vh]">
        <ScrollSection>
          <Home />
          <About />
          <Projet />
          <Contact />
        </ScrollSection>
      </main>
    </>
  );
}
