import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Home");

  const toggleMenu = () => {
    setIsMenuHidden(!isMenuHidden);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <header>
      <nav className="bg-white border border-gray-200 dark:border-gray-700 px-2 sm:px-4 py-2.5 rounded dark:bg-primary shadow">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className="flex items-center">
            <Image
              className="self-center text-xl font-semibold whitespace-nowrap dark:text-white max-w-32"
              src="/image/logo.png"
              alt="Logo Noah"
              width={100}
              height={100}
            ></Image>
          </Link>

          <div className="flex items-center">
            <button
              id="menu-toggle"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-danger rounded-lg hover:bg-secondary focus:outline-none md:hidden size-4 "
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <div
            className={`w-full md:block md:w-auto ${
              isMenuHidden ? "hidden" : "block"
            }`}
            id="mobile-menu"
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              {["Home", "projet", "Contact"].map((menu) => (
                <li key={menu}>
                  <Link
                    href="#"
                    onClick={() => handleMenuClick(menu)}
                    className={`block py-2 pr-4 pl-3 ${
                      activeMenu === menu
                        ? "font-bold text-blue-700 dark:text-white"
                        : "text-danger"
                    } border-b border-gray-100 hover:bg-secondary md:hover:bg-transparent md:border-0 md:hover:text-dangerPlus md:p-0`}
                    aria-current={activeMenu === menu ? "page" : undefined}
                  >
                    {menu}
                  </Link>
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
