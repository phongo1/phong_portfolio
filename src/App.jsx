import "./App.css";

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from 'framer-motion'

import {
  Landing,
  About,
  Contact,
  Experience,
  Navbar,
  Projects,
} from "./components";

import { BrowserRouter } from "react-router-dom";

const App = () => {
  const [isBootReady, setIsBootReady] = useState(false);
  const [isSplineReady, setIsSplineReady] = useState(false);

  const loaderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsBootReady(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = !isBootReady || !isSplineReady;

  return (
    <BrowserRouter>
      <AnimatePresence>
        {isLoading && (
          <motion.div className="flex flex-col gap-2 justify-center items-center w-screen h-full fixed z-40 bg-black top-0" initial="hidden" animate="visible" exit="exit" variants={loaderVariants} key="loader" >
            <div className="loader"></div>
            <span className="w-fit">loading...</span>
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar isLoading={isLoading} />
      <Landing isLoading={isLoading} onSplineReady={() => setIsSplineReady(true)} />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </BrowserRouter>
  );
};

export default App;
