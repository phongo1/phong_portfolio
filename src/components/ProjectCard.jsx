import React from "react";

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-[#1d1836] rounded-lg overflow-hidden hover:scale-110 transition-scale duration-300 ease-in-out w-[23rem] flex flex-col items-center gap-4">
      <div className="w-full h-44 bg-white rounded-t-md overflow-hidden flex justify-center items-center">
        <img
          src={project.image}
          alt={project.name}
          className="object-cover"
        />
      </div>
      <div className="h-fit px-6 pb-6">
        <div>
          <i className={`text-${project.type.color} text-base`}>
            {project.type.name}
          </i>
          <h3 className="text-xl font-semibold mb-2 -mt-1">{project.name}</h3>
        </div>
        <p className="text-sm">{project.description}</p>

        <div className="flex flex-wrap aligns-center mt-4 ">
          {project.skills.map((skill, index) => (
            <span
              key={index}
              className={`inline-block text-sm font-medium mr-2 px-3 py-1 rounded-full bg-${
                skill.color}-200 text-${skill.color}-800 text-`}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;