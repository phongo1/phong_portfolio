import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {projects} from "../constants";
import ProjectModal from './ProjectModal';
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={` w-full h-auto flex flex-col gap-20`}
      id="projects"
    >
      <motion.div className="w-full flex flex-col gap-8 mb-5">
        <h1 className={`self-center pb-[1rem] font-bold text-center bg-gradient-to-r from-[#4d52ff] to-[#cf3dfd] text-transparent bg-clip-text`}>
          Projects.
        </h1>

      </motion.div>
      <div className="w-full mx-auto gap-20 justify-center flex flex-row flex-wrap px-10 max-w-[90rem]">
        {projects.map(project => (
          <div key={project.id} onClick={() => openModal(project)} className="cursor-pointer">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      {selectedProject && (
        <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
};

export default Projects;
