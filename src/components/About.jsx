import React from 'react'
import { motion } from "framer-motion";

import { styles } from '../styles'

const About = () => {
  return (
    <section className={`text-white w-full py-[4rem] flex flex-col ${styles.paddingX}`} >
      <motion.h1 className='self-center pb-[3rem]'>About Me</motion.h1>
      <motion.div className={`flex flex-row ${styles.paddingX} max-w-7xl mx-auto`}>
        <div className='h-6 w-6 bg-white'></div>
        <p>Lorem Ipsum</p>
      </motion.div>
    </section>
  )
}

export default About