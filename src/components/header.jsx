"use client";

import React, { useState } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import Image from "next/image";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState("Home");

  const handleSetActive = (to) => {
    setActiveMenu(to);
  };

  const menuItems = [
    { name: "Home", to: "home" },
    { name: "A propos", to: "apropos" },
    { name: "Projet", to: "projet" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <header className="flex h-[100vh] z-50 fixed ">
      <nav className="border-primary px-2 sm:px-4 py-2.5 rounded bg-primary shadow">
        <div className="container flex flex-col justify-between items-center mx-auto">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => scroll.scrollToTop()}
          >
            <Image
              className="self-center text-xl font-semibold whitespace-nowrap dark:text-white max-w-32"
              src="/image/logo.png"
              alt="Logo Noah"
              width={100}
              height={100}
            />
          </div>

          <div className="w-full">
            <ul className="flex flex-col mt-4 ">
              {menuItems.map((menu) => (
                <li key={menu.name}>
                  <ScrollLink
                    to={menu.to}
                    smooth={true}
                    duration={500}
                    spy={true}
                    onSetActive={handleSetActive}
                    className={`block py-2 pr-4 pl-3 cursor-pointer ${
                      activeMenu === menu.to
                        ? "font-bold text-white"
                        : "text-danger"
                    } hover:bg-secondary md:hover:bg-transparent md:border-0 md:hover:text-dangerPlus md:p-0`}
                    aria-current={activeMenu === menu.to ? "page" : undefined}
                  >
                    {menu.name}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
