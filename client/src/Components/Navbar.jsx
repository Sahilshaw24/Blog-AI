// Alternative with staggered floating animation
import React from 'react'
import { motion } from 'framer-motion'
import assets from "../assets/assets"
import { useAppContext } from "../context/AppContext.jsx"

export default function Navbar() {
  const { navigate, token } = useAppContext()

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [0, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer'
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <motion.img
          onClick={() => navigate('/')}
          src={assets.logo}
          alt="logo"
          className='w-32 sm:w-44'
          animate="animate"
          variants={floatingAnimation}
        />
      </motion.div>
      
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/admin')}
        className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5 relative overflow-hidden group'
      >
        {/* Button shine effect */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
        />
        
        <span className="relative z-10">
          {token ? 'Dashboard' : 'Login'}
        </span>
        
        <motion.img
          src={assets.arrow}
          alt="arrow"
          className='w-3 relative z-10'
          animate={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </motion.button>
    </motion.div>
  )
}