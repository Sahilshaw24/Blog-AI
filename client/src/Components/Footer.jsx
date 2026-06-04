import React from "react";
import { motion } from "framer-motion";
import assets, { footer_data } from "../assets/assets";

export default function Footer() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.1,
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

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      x: 5,
      transition: {
        duration: 0.2,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      x: 5,
      color: "#8b5cf6", // primary color
      transition: {
        duration: 0.2,
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
    hover: {
      scale: 1.05,
      rotate: [0, -3, 3, -3, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const copyrightVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.5,
      },
    },
  };

  const githubLinkVariants = {
    initial: { backgroundPosition: "0% 50%" },
    hover: {
      backgroundPosition: "100% 50%",
      scale: 1.05,
      transition: {
        backgroundPosition: {
          duration: 0.5,
          ease: "linear",
        },
        scale: {
          duration: 0.2,
        },
      },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3 overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500"
      >
        <motion.div variants={itemVariants} className="max-w-md">
          <motion.img
            variants={logoVariants}
            whileHover="hover"
            src={assets.logo}
            alt="QuickBlog Logo"
            className="w-32 sm:w-44 cursor-pointer"
          />
          <motion.p
            variants={itemVariants}
            className="max-w-[410px] mt-6 leading-relaxed"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste veniam
            perspiciatis aut explicabo nam neque nihil ratione fugiat saepe
            maxime?
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="flex flex-wrap justify-between w-full md:w-[45%] gap-8"
        >
          {footer_data.map((sec, idx) => (
            <motion.div
              key={idx}
              variants={sectionVariants}
              whileHover="hover"
              className="min-w-[120px]"
            >
              <motion.h3
                variants={itemVariants}
                className="font-semibold text-base text-gray-900 md:mb-5 mb-3 relative inline-block"
              >
                {sec.title}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.h3>
              <ul className="text-sm space-y-2">
                {sec.links.map((link, i) => (
                  <motion.li
                    key={i}
                    variants={linkVariants}
                    whileHover="hover"
                    className="cursor-pointer"
                  >
                    <a
                      href="#"
                      className="hover:underline transition-all duration-200 block"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.p
        variants={copyrightVariants}
        className="py-6 text-center text-sm md:text-base text-gray-500"
      >
        Copyright 2025 &copy; -{" "}
        <motion.a
          variants={githubLinkVariants}
          initial="initial"
          whileHover="hover"
          href="https://github.com/outgoingrudra"
          className="text-black font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_auto] bg-clip-text"
          style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Rudra Verma
        </motion.a>{" "}
        QuickBlog All Right Reserved.
      </motion.p>
    </motion.footer>
  );
}