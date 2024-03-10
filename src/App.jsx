
import './App.css'

import { Landing, About, Contact, Experience, Navbar, Projects} from "./components";

import { BrowserRouter } from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
        <Navbar />
        <Landing/>
        <About />
        <Experience />
        <Projects />
        <Contact />
    </BrowserRouter>
  );
}

export default App;