import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import assets from "../assets/assets";
import { useAppContext } from "../context/AppContext";

export default function Header() {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "backOut",
      },
    },
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, -2, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const starVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const searchButtonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const clearButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "backOut",
      },
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#f3f4f6",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const gradientVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.5,
      transition: {
        duration: 1,
        ease: "easeIn",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-8 sm:mx-16 xl:mx-24 relative"
    >
      <div className="text-center mt-20 mb-8">
        <motion.div
          variants={badgeVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary"
        >
          <p>AI feature Integrated</p>
          <motion.img
            variants={starVariants}
            animate="animate"
            src={assets.star_icon}
            className="w-2.5"
            alt="star"
          />
        </motion.div>

        <motion.h1
          variants={titleVariants}
          className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700"
        >
          Your Own{" "}
          <motion.span
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: "100% 50%" }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            className="text-primary bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] bg-clip-text"
            style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Blogging
          </motion.span>{" "}
          <br />
          Platform
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500"
        >
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your
          story starts right here
        </motion.p>

        <motion.form
          variants={formVariants}
          onSubmit={onsubmitHandler}
          className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden"
        >
          <motion.input
            ref={inputRef}
            type="text"
            placeholder="search for blogs"
            className="w-full pl-4 outline-none"
            required
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            whileFocus={{
              borderLeft: "3px solid #8b5cf6",
              paddingLeft: "12px",
            }}
          />
          <motion.button
            type="submit"
            variants={searchButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="bg-primary text-white px-8 py-2 m-1.5 rounded cursor-pointer"
          >
            Search
          </motion.button>
        </motion.form>
      </div>

      <div className="text-center">
        <AnimatePresence>
          {input && (
            <motion.button
              key="clear-button"
              variants={clearButtonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="hover"
              whileTap="tap"
              onClick={onClear}
              className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer"
            >
              Clear Search
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <motion.img
        variants={gradientVariants}
        src={assets.gradientBackground}
        alt="gradient background"
        className="absolute -top-50 -z-1 opacity-50"
      />
    </motion.div>
  );
}