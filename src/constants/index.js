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
    title: "Software Engineer Intern",
    company_name: "Ellucian",
    icon: assets.ellucian_logo,
    iconBg: "white",
    date: "Summer 2024",
    points: [
      "Incoming Intern for Summer 2024",
    ],
  },
  {
    title: "Undergraduate Researcher",
    company_name: "UVA CS",
    icon: assets.uva_cs,
    iconBg: "white",
    date: "Fall 2023",
    points: [
      "Integrated Large Language Models for accurately generating software and non-software specification with regular expressions",
      " Constructed an internal database of RegEx conversions for LLM training using PyTorch to automate natural language to RegEx conversions",
    ],
  },
  {
    title: "Full Stack Software Developer Intern",
    company_name: "Spotlist",
    icon: assets.spotlist,
    iconBg: "#383E56",
    date: "Fall 2023",
    points: [
      "Implemented front-end mobile user interfaces and functionality using React Native",
      "Created and maintained robust and scalable RESTful APIs using Django REST framework, ensuring efficient data communication between front-end and back-end systems",
      "Tested API end points and database interactions with Postman",
    ],
  },
  {
    title: "Software Developer Intern",
    company_name: "AiPi Solutions",
    icon: assets.aipi,
    iconBg: "#FFFF",
    date: "Summer 2023",
    points: [
      "Led a team of 8 interns in training a Large Language Model to automate editing process of Non-Disclosure Agreements, reducing NDA review time by at least 60%",
      "Utilized Jira and Agile Development methodologies to streamline project workflows and team collaboration",
      "Developed Python code utilizing Openai API to train 'DaVinci' language model on a data set of 250 attorney revised NDA's",
    ],
  },
];

const projects = [
  {
    id: 1,
    name: "GradeBuddy",
    type: { name: "Web Application", color: "lime-300" },
    image: assets.gradebuddy_logo,
    description:
      "An auto-grader tool built for students and faculty to automate manual grading of open-ended answers based on a rubric",
    photos: assets.gradebuddy,
    bullets: [
      "Dynamic question inputting (prompt, student-answer,max points, and rubric)",
      "Scores each question based on given question rubric",
      "Aggregates total score for an assigment after grading individual questions"
    ],
    skills: [
      { name: "React.js", color: "cyan" },  
      { name: "Django", color: "emerald" },
      { name: "Firebase DB", color: "orange" },
    ],
    link: "https://github.com/phongo1/gradebuddy",
    video: "path/to/video1.mp4",
  },
  {
    id: 2,
    name: "SimpliSplit",
    type: { name: "Mobile Application", color: "blue-400" },
    image: assets.ss_logo,
    description:
      "An app-store published mobile app to streamline bill splitting by allowing users to scan a receipt, match friends to receipt items, and send Venmo requests accordingly with one click",
    photos: assets.simplisplit,
    bullets: [
      "Utilized tesseract for receipt scanning (OCR)",
      "React Native for front-end mobile development",
      "Venmo API for payment processing",
      "Firebase for user account database storage",
      "Built custom API using Python Flask",
    ],
    skills: [
      { name: "React Native", color: "green" },
      { name: "Python", color: "yellow" },
      { name: "Flask", color: "violet" },
      { name: "Firebase DB", color: "orange" },

    ],
    link: null,
    video: "path/to/video1.mp4",
  },
  {
    id: 3,
    name: "Phobot",
    type: { name: "Discord Bot", color: "[#566af6]" },
    image: assets.pho_icon,
    description:
      "A multifaceted Discord Bot that can run autonomously, pull league of legends game data, send customized emails, search google,  tell random jokes, and more",
    photos: assets.phobot,
    bullets: [
      "Built with Discord API, Riot API, googlesearch API, and BeautifulSoup for webscraping",
    ],
    skills: [
      { name: "Python", color: "yellow" },
      { name: "Discord API", color: "blue" },
      { name: "Web Scraping", color: "orange" },
    ],
    link: "https://github.com/phongo1/discord_bot",
    video: "path/to/video1.mp4",
  },
  {
    id: 4,
    name: "Fantasy Shooter",
    type: { name: "2D - Platformer Game", color: "emerald-400" },
    image: assets.game_logo,
    description:
      "A 2D RPG inspired shooter-platformer game built with pygame and UVAGE (UVA game engine)",
    photos: assets.game,
    bullets: [],
    skills: [
      { name: "Python", color: "yellow" },
      { name: "Pygame", color: "red" },
    ],
    link: "https://github.com/phongo1/Fantasy-Shooter-Game-",
    video: "https://www.youtube.com/watch?v=FLIzubXNmyo&ab_channel=PhongLe",
  },
  {
    id: 5,
    name: "Jose's Website",
    type: { name: "Website", color: "lime-300" },
    image: assets.joseweb_thumbnail,
    description:
      "A commisioned website for Jose, an author who was publishing a new book called \"Queen of Heaven\"",
    photos: assets.website,
    bullets: [],
    skills: [
      { name: "HTML/CSS", color: "cyan" },
      { name: "Javascript", color: "yellow" },
    ],
    link: "https://github.com/phongo1/phongo1.github.io",
    video: "https://www.youtube.com/watch?v=FLIzubXNmyo&ab_channel=PhongLe",
  },
];

export { experiences, projects };
