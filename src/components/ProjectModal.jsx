import React from "react";

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-xl mx-auto">
        <h2 className="text-xl font-bold">{project.name}</h2>
        <p>{project.description}</p>
        {project.video && (
          <video controls src={project.video} className="w-full mt-2"></video>
        )}
        <ul className="list-disc pl-5 py-2">
          {project.bulletPoints.map((point, index) => (
            <li key={index} className="text-gray-600">
              {point}
            </li>
          ))}
        </ul>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white p-2 mt-2 rounded"
        >
          GitHub Link
        </a>
        <button
          onClick={onClose}
          className="block ml-auto bg-red-500 text-white p-2 mt-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProjectModal;
