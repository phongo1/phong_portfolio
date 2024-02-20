import React from 'react';
import { motion } from 'framer-motion';

const ProjectGallery = ({ projects }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          className="p-4 border rounded shadow hover:shadow-lg transition duration-300 ease-in-out"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
          layout
        >
          <h2 className="text-lg font-bold">{project.title}</h2>
          <div className="relative">
            {/* Static Image */}
            <img
              src={project.staticImg}
              alt={`${project.title} Preview`}
              className="w-full"
              onMouseEnter={e => e.currentTarget.src = project.gif}
              onMouseLeave={e => e.currentTarget.src = project.staticImg}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectGallery;