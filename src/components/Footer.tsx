'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowUp,
  FaRocket
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  useEffect(() => {
    // GSAP animations
    gsap.fromTo(
      '.footer-content',
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.footer-container',
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: '#',
      label: 'Facebook',
      color: 'hover:text-blue-500'
    },
    {
      icon: FaTwitter,
      href: '#',
      label: 'Twitter',
      color: 'hover:text-sky-400'
    },
    {
      icon: FaLinkedinIn,
      href: '#',
      label: 'LinkedIn',
      color: 'hover:text-blue-600'
    },
    {
      icon: FaInstagram,
      href: '#',
      label: 'Instagram',
      color: 'hover:text-pink-500'
    },
    {
      icon: FaYoutube,
      href: '#',
      label: 'YouTube',
      color: 'hover:text-red-500'
    }
  ];

  const quickLinks = [
    { name: 'Trang chủ', href: '#' },
    { name: 'Dịch vụ', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Về chúng tôi', href: '#about' },
    { name: 'Blog', href: '#blog' },
    { name: 'Liên hệ', href: '#contact' }
  ];

  const services = [
    { name: 'SEO Optimization', href: '#' },
    { name: 'Social Media Marketing', href: '#' },
    { name: 'Paid Advertising', href: '#' },
    { name: 'Content Marketing', href: '#' },
    { name: 'Email Marketing', href: '#' },
    { name: 'Web Development', href: '#' }
  ];

  const resources = [
    { name: 'Case Studies', href: '#' },
    { name: 'White Papers', href: '#' },
    { name: 'Marketing Tools', href: '#' },
    { name: 'Industry Reports', href: '#' },
    { name: 'Webinars', href: '#' },
    { name: 'Free Consultation', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="footer-container max-w-7xl mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <motion.div 
              className="footer-content lg:col-span-1"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <FaRocket className="text-xl text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">
                    Digital Agency
                  </span>
                </div>
                
                <p className="text-gray-400 leading-relaxed mb-6">
                  Chúng tôi giúp doanh nghiệp phát triển mạnh mẽ trong thế giới số với các chiến lược marketing hiệu quả và sáng tạo.
                </p>
                
                {/* Social Links */}
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:bg-gray-700`}
                      >
                        <IconComponent className="text-sm" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div 
              className="footer-content"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-6">
                Liên Kết Nhanh
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
                    >
                      <div className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Services */}
            <motion.div 
              className="footer-content"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-6">
                Dịch Vụ
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <a 
                      href={service.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center gap-2"
                    >
                      <div className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      {service.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div 
              className="footer-content"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-6">
                Liên Hệ
              </h3>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-start gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaMapMarkerAlt className="text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400">
                      123 Đường ABC, Quận 1<br />
                      TP. Hồ Chí Minh, Việt Nam
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaPhone className="text-cyan-400 flex-shrink-0" />
                  <a 
                    href="tel:+84123456789"
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    +84 123 456 789
                  </a>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaEnvelope className="text-cyan-400 flex-shrink-0" />
                  <a 
                    href="mailto:hello@digitalagency.com"
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  >
                    hello@digitalagency.com
                  </a>
                </motion.div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Đăng Ký Nhận Tin
                </h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Email của bạn"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                  >
                    <FaEnvelope className="text-sm" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-gray-800 py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 Digital Agency. Tất cả quyền được bảo lưu.
            </div>
            
            <div className="flex items-center gap-6">
              <a 
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
              >
                Chính sách bảo mật
              </a>
              <a 
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
              >
                Điều khoản sử dụng
              </a>
              <a 
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 z-50"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <FaArrowUp className="text-sm" />
      </motion.button>
    </footer>
  );
};

export default Footer;