import { useState } from 'react'

import './App.css'

import { Landing, About, Contact, Experience, Navbar, Tech} from "./components";

import { BrowserRouter } from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Landing></Landing>
      <About></About>
      <Experience></Experience>
      <Tech></Tech>
      <Contact></Contact>
    </BrowserRouter>
  );
}

export default App;