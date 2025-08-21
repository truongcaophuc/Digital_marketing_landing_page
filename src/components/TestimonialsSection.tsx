'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

// Custom hook for typing effect
const useTypingEffect = (text: string, speed: number = 80, trigger: boolean = true) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!trigger) {
      setDisplayedText('');
      setIsComplete(false);
      return;
    }

    let index = 0;
    setDisplayedText('');
    setIsComplete(false);

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, trigger]);

  return { displayedText, isComplete };
};

// Custom hook for counter animation
const useCounterAnimation = (endValue: number, duration: number = 2000, trigger: boolean = false) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (!trigger) return;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      let currentValue = Math.round(startValue + (endValue - startValue) * easeOutQuart);
      
      // Ensure we reach the exact end value
      if (progress >= 1) {
        currentValue = endValue;
      }
      
      countRef.current = currentValue;
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [endValue, duration, trigger]);

  return count;
};

const getTestimonials = (t: (key: string) => string) => [
  {
    id: 1,
    name: t('testimonials.items.0.name'),
    position: t('testimonials.items.0.position'),
    company: t('testimonials.items.0.company'),
    avatar: '/api/placeholder/80/80',
    rating: 5,
    content: t('testimonials.items.0.content'),
    results: t('testimonials.items.0.results'),
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 2,
    name: t('testimonials.items.1.name'),
    position: t('testimonials.items.1.position'),
    company: t('testimonials.items.1.company'),
    avatar: '/api/placeholder/80/80',
    rating: 5,
    content: t('testimonials.items.1.content'),
    results: t('testimonials.items.1.results'),
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 3,
    name: t('testimonials.items.2.name'),
    position: t('testimonials.items.2.position'),
    company: t('testimonials.items.2.company'),
    avatar: '/api/placeholder/80/80',
    rating: 5,
    content: t('testimonials.items.2.content'),
    results: t('testimonials.items.2.results'),
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 4,
    name: t('testimonials.items.3.name'),
    position: t('testimonials.items.3.position'),
    company: t('testimonials.items.3.company'),
    avatar: '/api/placeholder/80/80',
    rating: 5,
    content: t('testimonials.items.3.content'),
    results: t('testimonials.items.3.results'),
    color: 'from-purple-500 to-violet-600'
  },
  {
    id: 5,
    name: t('testimonials.items.4.name'),
    position: t('testimonials.items.4.position'),
    company: t('testimonials.items.4.company'),
    avatar: '/api/placeholder/80/80',
    rating: 5,
    content: t('testimonials.items.4.content'),
    results: t('testimonials.items.4.results'),
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 6,
    name: t('testimonials.items.5.name'),
    position: t('testimonials.items.5.position'),
    company: t('testimonials.items.5.company'),
    avatar: '/api/placeholder/80/80',
    rating: 5,
    content: t('testimonials.items.5.content'),
    results: t('testimonials.items.5.results'),
    color: 'from-cyan-500 to-blue-600'
  }
];

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showTyping, setShowTyping] = useState(true);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const testimonials = getTestimonials(t);
  const currentTestimonial = testimonials[currentIndex];
  const { displayedText, isComplete } = useTypingEffect(
    currentTestimonial.content, 
    30, 
    showTyping
  );
  
  // Counter animations for stats
  const customerCount = useCounterAnimation(500, 2000, statsInView);
  const successRate = useCounterAnimation(98, 2000, statsInView);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);
  
  // Trigger typing effect when testimonial changes
  useEffect(() => {
    setShowTyping(false);
    const timer = setTimeout(() => {
      setShowTyping(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentIndex]);
  
  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
   }, []);

  // GSAP animations
  useEffect(() => {
    gsap.fromTo(
      '.testimonials-title',
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-container',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.testimonial-card',
      {
        y: 100,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonials-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="testimonials-container max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="testimonials-title text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
          >
            {t('testimonials.title')}
          </motion.h2>
          <motion.p 
            className="testimonials-title text-xl text-gray-300 max-w-3xl mx-auto"
          >
            {t('testimonials.subtitle')}
          </motion.p>
        </div>
        
        {/* Main Testimonial Card */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <motion.div
            key={currentTestimonial.id}
            className="testimonial-card bg-gray-900 rounded-3xl p-8 md:p-12 border border-gray-700 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${currentTestimonial.color} opacity-5 rounded-3xl`} />
            
            {/* Quote Icon */}
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`w-16 h-16 bg-gradient-to-br ${currentTestimonial.color} rounded-full flex items-center justify-center mb-8 mx-auto`}
              >
                <FaQuoteLeft className="text-2xl text-white" />
              </motion.div>
              
              {/* Content with Typing Effect */}
              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl md:text-2xl text-gray-300 text-center leading-relaxed mb-8 italic min-h-[120px] flex items-center justify-center"
              >
                &ldquo;{displayedText}&rdquo;
                {!isComplete && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-1 text-cyan-400"
                  >
                    |
                  </motion.span>
                )}
              </motion.blockquote>
              
              {/* Results Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mb-8"
              >
                <span className={`inline-block px-6 py-3 bg-gradient-to-r ${currentTestimonial.color} text-white font-semibold rounded-full text-lg`}>
                  {currentTestimonial.results}
                </span>
              </motion.div>
              
              {/* Author Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center justify-center gap-4"
              >
                {/* Avatar */}
                <div className={`w-16 h-16 bg-gradient-to-br ${currentTestimonial.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                  {currentTestimonial.name.charAt(0)}
                </div>
                
                <div className="text-left">
                  <h4 className="text-xl font-bold text-white mb-1">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-gray-400 mb-2">
                    {currentTestimonial.position} - {currentTestimonial.company}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                      >
                        <FaStar className="text-yellow-400 text-sm" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all duration-300 border border-gray-600 hover:border-cyan-500"
          >
            <FaChevronLeft />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all duration-300 border border-gray-600 hover:border-cyan-500"
          >
            <FaChevronRight />
          </button>
        </div>
        
        {/* Testimonial Indicators */}
        <div className="flex justify-center gap-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-cyan-400 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
        
        {/* Stats with Counter Animation */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: `${customerCount}+`, label: t('testimonials.stats.customers'), isAnimated: true },
            { number: `${successRate}%`, label: t('testimonials.stats.success_rate'), isAnimated: true },
            { number: '24/7', label: t('testimonials.stats.support'), isAnimated: false },
            { number: '5★', label: t('testimonials.stats.rating'), isAnimated: false }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div 
                className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2"
                animate={stat.isAnimated && statsInView ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {stat.number}
              </motion.div>
              <div className="text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;