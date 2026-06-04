// Alternative with enhanced animations
import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

export default function BlogList() {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();
  const [isFiltering, setIsFiltering] = useState(false);

  const filteredBlogs = () => {
    if (input === "") {
      return blogs;
    }
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase())
    );
  };

  const handleCategoryClick = (category) => {
    setIsFiltering(true);
    setMenu(category);
    setTimeout(() => setIsFiltering(false), 500);
  };

  const handleClearAll = () => {
    if (input) {
      const clearEvent = new Event("clearSearch", { bubbles: true });
      document.dispatchEvent(clearEvent);
    }
    setMenu("All");
  };

  const blogsToDisplay = filteredBlogs().filter((blog) =>
    menu === "All" ? true : blog.category === menu
  );

  return (
    <div>
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative overflow-x-auto pb-2 px-4">
        <AnimatePresence>
          {blogCategories.map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative shrink-0"
            >
              <motion.button
                onClick={() => handleCategoryClick(item)}
                className={`cursor-pointer px-4 py-2 rounded-full relative overflow-hidden ${
                  menu === item
                    ? "text-white"
                    : "text-gray-500 hover:text-primary"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">{item}</span>
                {menu === item && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-full -z-1"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={menu + input}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {blogsToDisplay.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="inline-block p-6 bg-gray-50 rounded-2xl mb-4">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No blogs found
              </h3>
              <p className="text-gray-500 mb-6">
                {input
                  ? `No results for "${input}"`
                  : `No blogs in category "${menu}"`}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearAll}
                className="px-6 py-2.5 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full hover:shadow-lg transition-all cursor-pointer"
              >
                View All Blogs
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40"
            >
              <AnimatePresence>
                {blogsToDisplay.map((blog) => (
                  <motion.div
                    key={blog._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <BlogCard blog={blog} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}