import React from "react";
import { Inter } from "next/font/google";
import Header from "../components/header";
import ParticlesBack from "../components/theme/particle.jsx";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={inter.className}>
      <ParticlesBack />
      <Header />
      {children}
    </div>
  );
};

export default Layout;
