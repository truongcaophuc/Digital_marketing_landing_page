"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SocialMediaFloat = () => {
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  useEffect(() => {
    const toggleScrollVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsScrollVisible(true);
      } else {
        setIsScrollVisible(false);
      }
    };

    window.addEventListener("scroll", toggleScrollVisibility);
    return () => window.removeEventListener("scroll", toggleScrollVisibility);
  }, []);

  const handleMessengerClick = () => {
    // Replace with your Facebook page ID or messenger link
    window.open("https://www.messenger.com/t/450573774801640", "_blank");
  };

  const handleZaloClick = () => {
    // Replace with your Zalo number or Zalo OA link
    window.open("https://zalo.me/2163862657855887735", "_blank");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed right-4 bottom-10 z-50 flex flex-col space-y-3">
      {/* Messenger Button */}
      <button
        onClick={handleMessengerClick}
        className="group relative w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110"
        aria-label="Contact via Messenger"
      >
        {/* Messenger Icon */}
        <svg
          className="w-7 h-7 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.477 2 2 6.145 2 11.25c0 2.9 1.4 5.5 3.6 7.2V22l3.45-1.9c.9.25 1.85.4 2.95.4 5.523 0 10-4.145 10-9.25S17.523 2 12 2zm1.1 12.4l-2.55-2.7L6.4 14.4l5.05-5.35 2.6 2.7 4.15-2.7-5.1 5.35z" />
        </svg>

        {/* Tooltip */}
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat qua Messenger
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
        </div>
      </button>

      {/* Zalo Button */}
      <button
        onClick={handleZaloClick}
        className="group relative w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110"
        aria-label="Contact via Zalo"
      >
        {/* Zalo Icon */}
        <Image src="/icons/zalo.svg" alt="Zalo" width={32} height={32} className="w-8 h-8" />

        {/* Tooltip */}
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Chat qua Zalo
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
        </div>
      </button>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {isScrollVisible && (
          <motion.button
            onClick={scrollToTop}
            className="group relative w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-110"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Arrow Up Icon */}
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>

            {/* Tooltip */}
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Lên đầu trang
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Pulse Animation */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        .animate-pulse-custom {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default SocialMediaFloat;
