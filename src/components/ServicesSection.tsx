"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useLanguage } from "../contexts/LanguageContext";

// Import Lottie animations
import seoAnimation from "../../public/animations/SearchEngineOptimization.json";
import semAnimation from "../../public/animations/SearchEngineMarketing.json";
import socialMediaAnimation from "../../public/animations/SocialMediaMarketing.json";
import contentMarketingAnimation from "../../public/animations/ContentMarketing.json";
import emailMarketingAnimation from "../../public/animations/EmailMarketing.json";
import mobileMarketingAnimation from "../../public/animations/MobileMarketing.json";
import influencerMarketingAnimation from "../../public/animations/InfluencerMarketing.json";
import videoMarketingAnimation from "../../public/animations/VideoMarketing.json";
import analyticsAnimation from "../../public/animations/AnalyticsMarketing.json";

const services = [
  {
    animation: seoAnimation,
    title: "SEO (Search Engine Optimization)",
    description:
      "Tối ưu hóa website để đạt thứ hạng cao trên Google, tăng lưu lượng truy cập tự nhiên và thu hút khách hàng tiềm năng chất lượng cao.",
    color: "from-green-500 to-emerald-600",
    hoverColor: "group-hover:shadow-green-500/25",
    isLottie: true,
  },
  {
    animation: semAnimation,
    title: "SEM (Search Engine Marketing)",
    description:
      "Quảng cáo Google Ads hiệu quả, tối ưu chi phí quảng cáo và tăng tỷ lệ chuyển đổi với chiến lược từ khóa chính xác.",
    color: "from-blue-500 to-indigo-600",
    hoverColor: "group-hover:shadow-blue-500/25",
    isLottie: true,
  },
  {
    animation: socialMediaAnimation,
    title: "Social Media Marketing",
    description:
      "Xây dựng thương hiệu mạnh mẽ trên Facebook, Instagram, TikTok với nội dung sáng tạo và chiến lược tương tác hiệu quả.",
    color: "from-pink-500 to-rose-600",
    hoverColor: "group-hover:shadow-pink-500/25",
    isLottie: true,
  },
  {
    animation: contentMarketingAnimation,
    title: "Content Marketing",
    description:
      "Sản xuất nội dung chất lượng cao, thu hút và giữ chân khách hàng thông qua storytelling và thông tin giá trị.",
    color: "from-purple-500 to-violet-600",
    hoverColor: "group-hover:shadow-purple-500/25",
    isLottie: true,
  },
  {
    animation: emailMarketingAnimation,
    title: "Email Marketing",
    description:
      "Chiến dịch email marketing tự động hóa, nurture leads và duy trì mối quan hệ lâu dài với khách hàng.",
    color: "from-orange-500 to-amber-600",
    hoverColor: "group-hover:shadow-orange-500/25",
    isLottie: true,
  },
  {
    animation: analyticsAnimation,
    title: "Marketing Analytics",
    description:
      "Phân tích dữ liệu marketing chuyên sâu, đo lường ROI và tối ưu hóa chiến lược dựa trên insights thực tế.",
    color: "from-teal-500 to-cyan-600",
    hoverColor: "group-hover:shadow-teal-500/25",
    isLottie: true,
  },
  {
    animation: videoMarketingAnimation,
    title: "Video Marketing",
    description:
      "Sản xuất video marketing chuyên nghiệp, từ TVC đến video viral, tăng engagement và brand awareness.",
    color: "from-red-500 to-rose-600",
    hoverColor: "group-hover:shadow-red-500/25",
    isLottie: true,
  },
  {
    animation: mobileMarketingAnimation,
    title: "Mobile Marketing",
    description:
      "Chiến lược marketing di động toàn diện, tối ưu hóa trải nghiệm người dùng trên smartphone và tablet.",
    color: "from-indigo-500 to-blue-600",
    hoverColor: "group-hover:shadow-indigo-500/25",
    isLottie: true,
  },
  {
    animation: influencerMarketingAnimation,
    title: "Influencer Marketing",
    description:
      "Kết nối với KOLs và influencers phù hợp, mở rộng tầm ảnh hưởng thương hiệu và tiếp cận đối tượng mới.",
    color: "from-emerald-500 to-green-600",
    hoverColor: "group-hover:shadow-emerald-500/25",
    isLottie: true,
  },
];

const ServicesSection = () => {
  const { t } = useLanguage();
  // Removed GSAP animations to prevent conflicts with Framer Motion

  return (
    <section
      id="services"
      className="py-20 bg-slate-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="services-container px-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              className="services-title text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {t("services.title")}
              </span>
            </motion.h2>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {t("services.subtitle")}
            </motion.p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-24">
            {services.map((service, index) => {
              return (
                <motion.div
                  key={index}
                  className="service-card group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl  hover:border-cyan-500/50 overflow-hidden "
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.2, ease: "easeOut" },
                  }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ y: 0, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{
                    transition: "box-shadow 0.15s ease-out",
                  }}
                  onHoverStart={() => {}}
                  onHoverEnd={() => {}}
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                  />

                  {/* Icon */}
                  <div className="relative z-10 mb-6">
                    <div className="bg-white h-[300px]">
                      <Lottie
                        animationData={service.animation}
                        loop={true}
                        autoplay={true}
                        style={{ height: "100%" }}
                        rendererSettings={{
                          preserveAspectRatio: "xMidYMid slice",
                          progressiveLoad: true,
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {t(`services.items.${index}.title`)}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {t(`services.items.${index}.description`)}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/30 rounded-xl transition-all duration-300" />
                </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              {t('services.consultation_button')}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
