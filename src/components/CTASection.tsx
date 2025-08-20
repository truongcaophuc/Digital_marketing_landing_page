'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaEnvelope, 
  FaPhone, 
  FaUser, 
  FaBuilding, 
  FaRocket,
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // GSAP animations
    gsap.fromTo(
      '.cta-title',
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
          trigger: '.cta-container',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.cta-form',
      {
        x: -100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.cta-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      '.cta-benefits',
      {
        x: 100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: '.cta-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  const benefits = [
    {
      icon: FaRocket,
      title: 'Tăng Trưởng Nhanh Chóng',
      description: 'Tăng 300% traffic và doanh số trong 6 tháng đầu tiên'
    },
    {
      icon: FaCheckCircle,
      title: 'Cam Kết Kết Quả',
      description: 'Đảm bảo ROI tối thiểu 200% hoặc hoàn tiền 100%'
    },
    {
      icon: FaUser,
      title: 'Hỗ Trợ 24/7',
      description: 'Đội ngũ chuyên gia luôn sẵn sàng hỗ trợ bạn mọi lúc'
    }
  ];

  const services = [
    'SEO Optimization',
    'Social Media Marketing',
    'Paid Advertising',
    'Content Marketing',
    'Email Marketing',
    'Tư vấn tổng thể'
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full filter blur-3xl" />
      </div>
      
      <div className="cta-container max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="cta-title text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
          >
            Sẵn Sàng Phát Triển Doanh Nghiệp?
          </motion.h2>
          <motion.p 
            className="cta-title text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Nhận tư vấn miễn phí và báo cáo phân tích chi tiết về thị trường của bạn
          </motion.p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div className="cta-form">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-sm text-white" />
                  </div>
                  Liên Hệ Ngay
                </h3>
                <p className="text-gray-400">
                  Điền thông tin để nhận tư vấn miễn phí từ chuyên gia
                </p>
              </div>
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Họ và tên *
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                          placeholder="Nhập họ và tên"
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                          placeholder="email@example.com"
                        />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Phone & Company Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Số điện thoại
                      </label>
                      <div className="relative">
                        <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                          placeholder="0123 456 789"
                        />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Công ty
                      </label>
                      <div className="relative">
                        <FaBuilding className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                          placeholder="Tên công ty"
                        />
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Service Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Dịch vụ quan tâm
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
                    >
                      <option value="">Chọn dịch vụ</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                  
                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tin nhắn
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
                      placeholder="Mô tả chi tiết về nhu cầu của bạn..."
                    />
                  </motion.div>
                  
                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        Nhận Tư Vấn Miễn Phí
                        <FaArrowRight className="text-sm" />
                      </>
                    )}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheckCircle className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Cảm ơn bạn đã liên hệ!
                  </h3>
                  <p className="text-gray-300">
                    Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ tới.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {/* Benefits */}
          <motion.div className="cta-benefits space-y-8">
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Tại Sao Chọn Chúng Tôi?
              </h3>
              <p className="text-gray-300 text-lg">
                Hơn 500+ doanh nghiệp đã thành công cùng chúng tôi
              </p>
            </div>
            
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 bg-gray-800/30 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <IconComponent className="text-xl text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-2xl p-6 border border-cyan-500/20"
            >
              <h4 className="text-xl font-bold text-white mb-4">
                Liên Hệ Trực Tiếp
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <FaPhone className="text-cyan-400" />
                  <span>+84 123 456 789</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <FaEnvelope className="text-cyan-400" />
                  <span>hello@digitalagency.com</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;