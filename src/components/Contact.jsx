import React from "react";

import { MdEmail } from "react-icons/md";
import { FaInstagram, FaLink } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

import { beach_portrait } from "../assets";

const Contact = () => {
  return (
    <div
      className={`flex flex-col flex-wrap items-center w-full h-fit bg-[#1d1836] pt-5 pb-8 gap-5 `}
    >
      <h2
        className={`self-center pb-[1rem] font-bold text-4xl text-center bg-gradient-to-r from-[#4d52ff] to-[#cf3dfd] text-transparent bg-clip-text`}
      >
        {"<"}Contact{"/>"}
      </h2>
      <div className="rounded-full overflow-hidden w-48 items-center border border-[#4d52ff] bg-indigo-500 shadow-lg shadow-indigo-500/50">
        <img
          src={beach_portrait}
          className="object-contain scale-150 translate-y-4"
          draggable="false"
        />
      </div>

      <div className="flex gap-[3rem] flex-wrap py-5">
        <a href="mailto:phongl.hoa@gmail.com" target="_blank" className="hover:cursor-pointer text-4xl hover:scale-125 hover:-translate-y-2 transition-transform duration-300">
          <MdEmail />
        </a>
        <a href="https://www.instagram.com/phong.hle/?next=%2F&hl=en" target="_blank" className="hover:cursor-pointer text-4xl hover:scale-125 hover:-translate-y-2 transition-transform duration-300">
          <FaInstagram />
        </a>
        <a href="https://github.com/phongo1" target="_blank" className="hover:cursor-pointer text-4xl hover:scale-125 hover:-translate-y-2 transition-transform duration-300">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/phongle1x/" target="_blank" className="hover:cursor-pointer text-4xl hover:scale-125 hover:-translate-y-2 transition-transform duration-300">
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Contact;
