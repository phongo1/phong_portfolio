import { React, useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import { AnimatePresence, motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

import { styles } from "../styles";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const loaderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: .6 } } 
  };

  return (
    <section
      className={`text-white w-full h-auto pt-[11rem] flex flex-wrap ${styles.paddingX} mx-auto gap-x-16 justify-center`}
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="flex flex-col gap-2 justify-center items-center w-screen h-full fixed z-40 bg-black top-0"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={loaderVariants}
            key="loader"
          >
            <div className="loader"></div>
            <span className="w-fit">loading...</span>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className="pb-16 w-fit h-[25rem] flex flex-col justify-center align-center gap-2">
        <p className="text-4xl">Hello, I'm</p>
        <span className="font-bold text-6xl bg-gradient-to-r from-[#4d52ff] to-[#cf3dfd] text-transparent bg-clip-text ">
          <Typewriter
            options={{
              strings: ["Phong"],
              autoStart: true,
              loop: true,
              delay: 320,
              cursor: "_",
            }}
          />
        </span>
        <p className="text-base">an incoming software engineer</p>
      </motion.div>

      <div
        className={`w-[45rem] h-[25rem] relative overflow-visible flex align-middle justify-center md:left-28 hover:cursor-grabbing`}
      >
        <Spline scene="https://prod.spline.design/QAGyEAONPrAsk4Gv/scene.splinecode" />
        <div className="absolute mx-auto b w-60 h-80 top-[10%] shadow-2xl shadow-indigo-600/50 -z-10"></div>
      </div>
    </section>
  );
};

export default Landing;
