"use client";

import React, { useState } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi"; // Import icons for menu and close button

const Header = () => {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for managing menu visibility

  const handleSetActive = (to) => {
    setActiveMenu(to);
    setIsMenuOpen(false); // Close the menu after clicking a section
  };

  const menuItems = [
    { name: "Acceuil", to: "acceuil" },
    { name: "A propos", to: "apropos" },
    { name: "Projet", to: "projet" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <header className="flex md:h-[100vh]  z-50 fixed shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
      <nav
        className={
          "border-primary  rounded bg-transparent md:bg-primary md:shadow w-screen md:w-[10vh]"
        }
      >
        <div className="flex flex-col items-center w-full">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => scroll.scrollToTop()}
          >
            <Image
              className="self-center text-xl font-semibold whitespace-nowrap dark:text-white hidden md:block md:px-1.5 md:py-2.5"
              src="/images/logo.png"
              alt="Logo Noah"
              width={100}
              height={100}
            />
          </div>

          {/* Menu Toggle Button for small screens */}
          <button
            className="md:hidden p-2 text-white fixed top-2 right-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>

          {/* Menu Items */}
          <ul
            className={`flex flex-col py-4 bg-primary md:mt-0 md:items-baseline items-center md:bg-inherit  ${
              isMenuOpen ? "block border-none rounded w-full" : "hidden md:flex"
            }`}
          >
            {menuItems.map((menu) => (
              <li
                key={menu.name}
                className="md:bg-inherit md:border-none md:hover:bg-inherit py-2 pr-2 pl-2 text-gray-700 border-b border-gray-100 "
              >
                <ScrollLink
                  to={menu.to}
                  smooth={true}
                  duration={500}
                  spy={true}
                  onSetActive={handleSetActive}
                  className={`block cursor-pointer ${
                    activeMenu === menu.to
                      ? "font-bold text-white"
                      : "text-danger"
                  } md:hover:bg-transparent border-none md:border-0 hover:text-gray-50 md:p-0 text-sm nav-link`}
                  aria-current={activeMenu === menu.to ? "page" : undefined}
                >
                  {menu.name}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
