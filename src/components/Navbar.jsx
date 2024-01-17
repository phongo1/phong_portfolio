import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";

import { styles } from '../styles';
import { navLinks } from '../constants';
import { fadeIn, textVariant } from "../utils/motion";
import { logo, menu, close } from '../assets';

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav
      className={`${styles.paddingX} w-full h-[4.5rem] flex items-center py-5 fixed top-0 z-20 bg-dark-purple bg-cover bg-no-repeat bg-center`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt="logo"
            className="rounded-full w-[2.5rem] h-[2.5rem] object-contain mr-2"
          ></img>
          <p className="text-white text-[1.25rem] font-bold cursor-pointer">
            Phong Le
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((Link) => (
            <li key={Link.id} onClick={() => setActive(Link.title)}>
              <a
                href={`#${Link.id}`}
                className={`${
                  active === Link.title ? "text-white" : "text-ivory"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
              >
                {Link.title}
              </a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w[140px] z-10 rounded-xl`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((Link) => (
                <li key={Link.id} 
                onClick={() => {
                  setToggle(!toggle);
                  setActive(Link.title);
                  }}
                >
                  <a
                    href={`#${Link.id}`}
                    className={`${
                      active === Link.title ? "text-white" : "text-stone"
                    } font-poppins font-medium cursour-pointer text-[16px]`}
                  >
                    {Link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>


        </div>
      </div>
    </nav>
  );
}

export default Navbar
