"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Fashion Brand",
    category: "SEO & Social Media",
    description:
      "Tăng 300% traffic và 250% doanh số cho thương hiệu thời trang online trong 6 tháng.",
    image: "/api/placeholder/400/300",
    icon: "/icons/ecommerce.svg",
    results: ["300% Traffic tăng", "250% Doanh số tăng", "150% Followers tăng"],
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-gradient-to-br from-pink-500/10 to-rose-600/10",
  },
  {
    id: 2,
    title: "Tech Startup Platform",
    category: "Paid Ads & Content",
    description:
      "Xây dựng thương hiệu từ 0 và đạt 10K users trong 3 tháng đầu tiên.",
    image: "/api/placeholder/400/300",
    icon: "/icons/tech-startup.svg",
    results: ["10K Users đạt được", "500% ROI", "50+ Partnerships"],
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-gradient-to-br from-blue-500/10 to-indigo-600/10",
  },
  {
    id: 3,
    title: "Restaurant Chain",
    category: "Local SEO & Social",
    description: "Tăng cường hiện diện địa phương và tăng 180% đặt bàn online.",
    image: "/api/placeholder/400/300",
    icon: "/icons/restaurant.svg",
    results: ["180% Đặt bàn tăng", "95% Review tích cực", "8 Chi nhánh mới"],
    color: "from-orange-500 to-red-600",
    bgColor: "bg-gradient-to-br from-orange-500/10 to-red-600/10",
  },
  {
    id: 4,
    title: "Healthcare Services",
    category: "Content & SEO",
    description: "Xây dựng uy tín trực tuyến và tăng 220% lượt tư vấn online.",
    image: "/api/placeholder/400/300",
    icon: "/icons/healthcare.svg",
    results: ["220% Tư vấn tăng", "400% Organic traffic", "90% Trust score"],
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-gradient-to-br from-green-500/10 to-emerald-600/10",
  },
  {
    id: 5,
    title: "Financial Services",
    category: "Paid Ads & Analytics",
    description:
      "Tối ưu hóa chiến dịch quảng cáo và giảm 40% chi phí khách hàng.",
    image: "/api/placeholder/400/300",
    icon: "/icons/financial.svg",
    results: ["40% Chi phí giảm", "320% Conversion tăng", "15+ Awards"],
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-gradient-to-br from-purple-500/10 to-violet-600/10",
  },
  {
    id: 6,
    title: "Education Platform",
    category: "Social Media & Content",
    description:
      "Phát triển cộng đồng học tập online với 50K+ thành viên tích cực.",
    image: "/api/placeholder/400/300",
    icon: "/icons/education.svg",
    results: ["50K+ Members", "85% Completion rate", "200+ Courses"],
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-gradient-to-br from-cyan-500/10 to-blue-600/10",
  },
];

const PortfolioSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  useEffect(() => {
    if (!scrollRef.current || !containerRef.current) return;

    // GSAP horizontal scroll animation with pinning
    const scrollContainer = scrollRef.current;
    const scrollWidth =
      scrollContainer.scrollWidth - scrollContainer.clientWidth;

    gsap.to(scrollContainer, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: scrollContainer,
        start: "center center",
        end: () => "+=" + scrollWidth, // hoặc tính dựa trên chiều ngang
        scrub: 1,
        invalidateOnRefresh: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Animate portfolio cards
    gsap.fromTo(
      ".portfolio-card",
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".portfolio-container",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate section title
    gsap.fromTo(
      ".portfolio-title",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".portfolio-container",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="py-20 bg-gray-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
      </div>

      <div className="portfolio-container max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 className="portfolio-title text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Portfolio & Case Studies
          </motion.h2>
          <motion.p className="portfolio-title text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Khám phá những dự án thành công mà chúng tôi đã thực hiện cho các
            khách hàng
          </motion.p>

          {/* Scroll Indicator */}
          <motion.div
            className="flex items-center justify-center gap-2 text-cyan-400"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-sm">Cuộn ngang để xem thêm</span>
            <FaArrowRight className="text-sm" />
          </motion.div>
        </div>

        {/* Horizontal Scrolling Portfolio */}
        <div className="relative">
          <div ref={scrollRef} className="flex gap-8 pb-8">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                className={`portfolio-card flex-shrink-0 w-96 ${item.bgColor} rounded-2xl overflow-hidden group cursor-pointer border border-gray-700 hover:border-cyan-500/50 transition-all duration-500`}
              >
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-700 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 flex items-center justify-center">
                      <img 
                        src={item.icon} 
                        alt={item.title}
                        className="w-16 h-16 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0  transition-opacity duration-300 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-full flex items-center gap-2 hover:bg-cyan-400 transition-colors duration-300"
                    >
                      Xem Chi Tiết
                      <FaExternalLinkAlt className="text-sm" />
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 bg-gradient-to-r ${item.color} text-white text-xs font-semibold rounded-full`}
                    >
                      {item.category}
                    </span>
                    <motion.div
                      whileHover={{ rotate: 45 }}
                      className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <FaExternalLinkAlt />
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {item.description}
                  </p>

                  {/* Results */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-cyan-400 mb-3">
                      Kết Quả Đạt Được:
                    </h4>
                    {item.results.map((result, resultIndex) => (
                      <motion.div
                        key={resultIndex}
                        className="flex items-center text-sm text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: resultIndex * 0.1 }}
                      >
                        <div
                          className={`w-2 h-2 bg-gradient-to-r ${item.color} rounded-full mr-3 flex-shrink-0`}
                        />
                        {result}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Border */}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Xem Tất Cả Dự Án
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
