import { React, useState } from 'react'
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import Spline from '@splinetool/react-spline';

import { styles } from '../styles';


const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);


  return (
    <section className={`text-white w-full h-auto pt-[11rem] flex flex-wrap ${styles.paddingX} mx-auto gap-x-16 justify-center`} >
      <motion.div className='pb-16 w-fit h-[25rem] flex flex-col justify-center align-center gap-2'>
        <p className='text-4xl'>Hello, I'm</p>
        <span className='font-bold text-6xl bg-gradient-to-r from-[#4d52ff] to-[#cf3dfd] text-transparent bg-clip-text '>
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
        <p className='text-base'>an incoming software engineer</p>
      </motion.div>
      
      <div className='w-[45rem] h-[25rem] relative overflow-visible flex align-middle justify-center md:left-28'>
        <Spline scene="https://prod.spline.design/QAGyEAONPrAsk4Gv/scene.splinecode"/>
      </div>
    </section>
  )
}

export default Landing