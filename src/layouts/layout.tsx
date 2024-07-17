import React from "react";
import { Inter } from "next/font/google";
import Header from "../components/header";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={inter.className}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
