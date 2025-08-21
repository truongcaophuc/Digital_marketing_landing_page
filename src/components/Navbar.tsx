'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaBars, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.services'), href: '#services' },
    { name: t('nav.portfolio'), href: '#portfolio' },
    { name: t('nav.testimonials'), href: '#testimonials' },
    { name: t('nav.contact'), href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-700'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('#home')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <FaRocket className="text-white text-sm" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Digital Agency
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Language Toggle & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 212, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#contact')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300"
            >
              {t('hero.cta')}
            </motion.button>
          </div>

          {/* Mobile menu button & Language Toggle */}
          <div className="md:hidden flex items-center space-x-3">
            <LanguageToggle />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-cyan-400 focus:outline-none focus:text-cyan-400 transition-colors duration-200"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-200"
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                onClick={() => scrollToSection('#contact')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left mt-4"
              >
                {t('hero.cta')}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;