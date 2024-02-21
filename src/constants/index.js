import { spotlist, aipi, uva_cs } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "experience",
      title: "Experience",
    },
    {
      id: "projects",
      title: "Projects",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  
  const technologies = [
    // {
    //   name: "HTML 5",
    //   icon: html,
    // },
    // {
    //   name: "CSS 3",
    //   icon: css,
    // },
    // {
    //   name: "JavaScript",
    //   icon: javascript,
    // },
    // {
    //   name: "TypeScript",
    //   icon: typescript,
    // },
    // {
    //   name: "React JS",
    //   icon: reactjs,
    // },
    // {
    //   name: "Redux Toolkit",
    //   icon: redux,
    // },
    // {
    //   name: "Tailwind CSS",
    //   icon: tailwind,
    // },
    // {
    //   name: "Node JS",
    //   icon: nodejs,
    // },
    // {
    //   name: "MongoDB",
    //   icon: mongodb,
    // },
    // {
    //   name: "Three JS",
    //   icon: threejs,
    // },
    // {
    //   name: "git",
    //   icon: git,
    // },
    // {
    //   name: "figma",
    //   icon: figma,
    // },
    // {
    //   name: "docker",
    //   icon: docker,
    // },
  ];
  
  const experiences = [
    {
      title: "Full Stack Software Developer Intern",
      company_name: "Spotlist",
      icon: spotlist,
      iconBg: "#383E56",
      date: "Aug 2023 - Nov 2023",
      points: [
        "Implemented front-end mobile user interfaces and functionality using React Native.",
        "Created and maintained robust and scalable RESTful APIs using Django REST framework, ensuring efficient data communication between front-end and back-end systems",
        "Tested API end points and database interactions with Postman",
      ],
    },
    {
      title: "Software Developer Intern",
      company_name: "AiPi Solutions",
      icon: aipi,
      iconBg: "#E6DEDD",
      date: "May 2023 - Aug 2023",
      points: [
        "Led a team of 8 interns in training a Large Language Model to automate editing process of Non-Disclosure Agreements, reducing NDA review time by at least 60%.",
        "Utilized Jira and Agile Development methodologies to streamline project workflows and team collaboration.",
        "Developed Python code utilizing Openai API to train 'DaVinci' language model on a data set of 250 attorney revised NDA's",
      ],
    },
    {
      title: "Undergraduate Researcher",
      company_name: "UVA CS",
      icon: uva_cs,
      iconBg: "white",
      date: "Aug 2023 - Present",
      points: [
        "Integrated Large Language Models for accurately generating software and non-software specification with regular expressions",
        " Constructed an internal database of RegEx conversions for LLM training using PyTorch to automate natural language to RegEx conversions",
      ],
    },
  ];
  
  const projects = [
    {
      id: 1,
      title: "Project 1",
      gif: "url-to-gif",
      staticImg: "url-to-static-image",
      description: "Detailed description here...",
      link: " "
    },
    {
      id: 2,
      title: "Project 2",
      gif: "url-to-gif",
      staticImg: "url-to-static-image",
      description: "Detailed description here...",
      link: " "
    },
    {
      id: 3,
      title: "Project 3",
      gif: "url-to-gif",
      staticImg: "url-to-static-image",
      description: "Detailed description here...",
      link: " "
    },
  ];
  
  export { technologies, experiences, projects };