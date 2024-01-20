import React from 'react'
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import Spline from '@splinetool/react-spline';

import { styles } from '../styles';
import { avatar_body } from '../assets';
import { avatar_card } from '../assets';

const Landing = () => {
  return (
    <section className={`text-white w-full h-auto pt-[8rem] flex flex-wrap ${styles.paddingX} ` } >
      <motion.div className='mt-[-4rem] w-auto max-w-7xl mx-auto h-[25rem] flex flex-col justify-center gap-2'>
        <p className='text-3xl'>Hello, I'm</p>
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
        <p className='text-base'>an aspiring software engineer</p>
      </motion.div>
      <motion.div className='w-[45rem] h-[25rem] relative overflow-hidden flex '>
        <Spline className='absolute top-0 left-3 z-10' scene="https://prod.spline.design/QAGyEAONPrAsk4Gv/scene.splinecode" />
        <img src={avatar_card} style={{position: 'absolute', width: "67.5rem", height: "auto", objectFit: "contain" }} alt='Avatar Background' />
      </motion.div>
    </section>
  )
}

export default Landing