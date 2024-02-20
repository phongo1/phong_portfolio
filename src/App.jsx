import { useState, useEffect } from 'react'

import './App.css'

import { Landing, About, Contact, Experience, Navbar, Tech, Projects} from "./components";

import { BrowserRouter } from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter >
        <Navbar />
        <Landing/>
        <About />
        <Experience />
        <Projects />
        <Tech />
        <Contact />
    </BrowserRouter>
  );
}

export default App;