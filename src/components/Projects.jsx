import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { projects } from "../constants";
import { styles } from "../styles";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  const handleClick = (project) => {
    setActiveProject(activeProject === project.id ? null : project.id);
  };

  return (
    <div
      className={`${styles.paddingX} w-full h-auto flex flex-col bg-black gap-16`}
    >
      <div>
        <h2 className={`${styles.sectionHeadText} text-center`} id="projects">
          Projects.
        </h2>
        <div
          className={`sm:text-[14px] text-[12px] text-secondary uppercase tracking-wider text-center`}
        >
          <p>
            "For the things we have to learn before we can do them, we learn by
            doing them."
          </p>
          <p>{"</Aristotle>"}</p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
