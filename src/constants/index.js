import * as assets from "../assets";
  
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
  
  

  
  const experiences = [
    {
      title: "Full Stack Software Developer Intern",
      company_name: "Spotlist",
      icon: assets.spotlist, 
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
      icon: assets.aipi,
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
      icon: assets.uva_cs,
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
      name: "SimpliSplit",
      type: { "name": "Mobile Application", "color": "blue-400" },
      image: assets.ss_logo,
      description: "An app-store published mobile app to streamline bill splitting by allowing users to scan a receipt, match friends to receipt items, and send Venmo requests accordingly with one click",
      bulletPoints: ["Utilized tesseract for receipt scanning (OCR)",
       "React Native for front-end mobile development",
       "Venmo API for payment processing",
      "Firebase for user account database storage",
      "Built custom API using Python Flask"],
      skills: [
        { "name": "React Native", "color": "green" },
        { "name": "Python", "color": "yellow" },
        { "name": "Flask", "color": "violet" },

      ],
      link: null,
      video: "path/to/video1.mp4"
    },
    {
      id: 2,
      name: "Phobot",
      type: { "name": "Discord Bot", "color": "[#566af6]" },
      image: assets.pho_icon,
      description: "A multifaceted Discord Bot that can run autonomously, pull league of legends game data, send customized emails, search google, automatically welcome new server users, tell random jokes, and relay bot latency",
      bulletPoints: ["Built with Discord API, Riot API, googlesearch API, and BeautifulSoup for webscraping"],
      skills: [
        { "name": "Python", "color": "yellow" },
        { "name": "Discord API", "color": "blue" },
        { "name": "Web Scraping", "color": "orange" },

      ],
      link: "https://github.com/phongo1/discord_bot",
      video: "path/to/video1.mp4"
    },
    {
      id: 3,
      name: "Fantasy Shooter",
      type: { "name": "2D - Platformer Game", "color": "emerald-400" },
      image: assets.game_logo,
      description: "A 2D RPG inspired shooter-platformer game using pygame and UVAGE (UVA game engine)",
      bulletPoints: [""],
      skills: [
        { "name": "Python", "color": "yellow" },
        { "name": "Pygame", "color": "red" },

      ],
      link: "https://github.com/phongo1/Fantasy-Shooter-Game-",
      video: "path/to/video1.mp4"
    },

  ]
  
  export { experiences, projects };