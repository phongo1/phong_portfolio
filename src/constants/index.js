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
    date: "Summer 2024 - present",
    points: [
      "Collaborated in a 6-person scrum team to develop internal software services extending AWS and Azure AI capabilities into existing company products, increasing feature throughput by at least 30%",
      "Constructed a data cache system using AWS Lambda & DynamoDB, reducing ERP API fetch latency by 96%",
      "Developed a ”commenting” micro-service API with AWS, DocumentDB. and React, streamlining comment creation in 3 different company products with user permissions, file attachments, and comment replying"
    ],
  },
  {
    title: "Undergraduate Researcher",
    company_name: "UVA CS",
    icon: assets.uva_cs,
    iconBg: "white",
    date: "Fall 2023",
    points: [
      "Fine-tuned Meta Llama2 LLM to accurately generate regular expressions representing written English requirements, significantly reducing English language ambiguity in written requirements",
      "Constructed a foundational dataset of 200+ English to RegEx conversions for LLM training through PyTorch",
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
      "Expanded front-end user experiences by 15% by developing and integrating mobile app interfaces with back-end functionality using React Native and Node",
      "Developed, maintained, and tested RESTful APIs integrating with a PostgresSQL database using Django REST Framework and Postman",
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
      "A mobile app to streamline bill splitting by allowing users to scan a receipt, match friends to receipt items, and send Venmo requests accordingly with one click",
    photos: assets.simplisplit,
    bullets: [
      "Utilized tesseract for receipt scanning (OCR)",
      "React Native for front-end mobile development",
      "Venmo API for payment processing",
      "Firebase for user account database storage",
      "Custom API built with Python Flask",
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
