import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/header.jsx";
import ParticlesBack from "../components/theme/particle.jsx";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} relative`}>
        <ParticlesBack />

        <Header />
        {children}
      </body>
    </html>
  );
}
