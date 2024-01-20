import { useState } from 'react'

import './App.css'

import { Landing, About, Contact, Experience, Navbar, Tech, Projects} from "./components";

import { BrowserRouter } from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Landing></Landing>
      <About></About>
      <Experience></Experience>
      <Projects></Projects>
      <Tech></Tech>
      <Contact></Contact>
    </BrowserRouter>
  );
}

export default App;