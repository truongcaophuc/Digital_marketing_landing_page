"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "vi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Translations object
const translations = {
  vi: {
    // Navigation
    "nav.home": "Trang chủ",
    "nav.services": "Dịch vụ",
    "nav.portfolio": "Portfolio",
    "nav.testimonials": "Đánh giá",
    "nav.contact": "Liên hệ",

    // Hero Section
    "hero.title": "Giải Pháp Marketing\nSố Hóa Toàn Diện",
    "hero.subtitle":
      "Chúng tôi giúp doanh nghiệp phát triển mạnh mẽ trong kỷ nguyên số với các giải pháp marketing đa kênh: SEO, SEM, Social Media, Content Marketing và Analytics – tối ưu ROI và gia tăng doanh thu bền vững.",
    "hero.cta": "Tư Vấn Marketing Miễn Phí",
    "hero.learn_more": "Xem Gói Dịch Vụ",

    // Services Section
    "services.title": "Dịch Vụ Digital Marketing",
    "services.subtitle":
      "Giải pháp marketing số toàn diện giúp doanh nghiệp tăng trưởng bền vững trong kỷ nguyên số",
    "services.items.0.title": "SEO (Search Engine Optimization)",
    "services.items.0.description":
      "Tối ưu hóa website để đạt thứ hạng cao trên Google, tăng lưu lượng truy cập tự nhiên và thu hút khách hàng tiềm năng chất lượng cao.",
    "services.items.1.title": "SEM (Search Engine Marketing)",
    "services.items.1.description":
      "Quảng cáo Google Ads hiệu quả, tối ưu chi phí quảng cáo và tăng tỷ lệ chuyển đổi với chiến lược từ khóa chính xác.",
    "services.items.2.title": "Social Media Marketing",
    "services.items.2.description":
      "Xây dựng thương hiệu mạnh mẽ trên Facebook, Instagram, TikTok với nội dung sáng tạo và chiến lược tương tác hiệu quả.",
    "services.items.3.title": "Content Marketing",
    "services.items.3.description":
      "Sản xuất nội dung chất lượng cao, thu hút và giữ chân khách hàng thông qua storytelling và thông tin giá trị.",
    "services.items.4.title": "Email Marketing",
    "services.items.4.description":
      "Chiến dịch email marketing tự động hóa, nurture leads và duy trì mối quan hệ lâu dài với khách hàng.",
    "services.items.5.title": "Marketing Analytics",
    "services.items.5.description":
      "Phân tích dữ liệu marketing chuyên sâu, đo lường ROI và tối ưu hóa chiến lược dựa trên insights thực tế.",
    "services.items.6.title": "Video Marketing",
    "services.items.6.description":
      "Sản xuất video marketing chuyên nghiệp, từ TVC đến video viral, tăng engagement và brand awareness.",
    "services.items.7.title": "Mobile Marketing",
    "services.items.7.description":
      "Chiến lược marketing di động toàn diện, tối ưu hóa trải nghiệm người dùng trên smartphone và tablet.",
    "services.items.8.title": "Influencer Marketing",
    "services.items.8.description":
      "Kết nối với KOLs và influencers phù hợp, mở rộng tầm ảnh hưởng thương hiệu và tiếp cận đối tượng mới.",
    "services.seo.title": "Tối ưu hóa công cụ tìm kiếm",
    "services.seo.description":
      "Cải thiện thứ hạng website của bạn trên Google và tăng lưu lượng truy cập tự nhiên.",
    "services.social.title": "Marketing Mạng xã hội",
    "services.social.description":
      "Xây dựng thương hiệu và tương tác với khách hàng trên các nền tảng mạng xã hội.",
    "services.content.title": "Marketing Nội dung",
    "services.content.description":
      "Tạo nội dung hấp dẫn để thu hút và giữ chân khách hàng của bạn.",
    "services.email.title": "Email Marketing",
    "services.email.description":
      "Thiết kế và thực hiện các chiến dịch email hiệu quả để nuôi dưỡng khách hàng tiềm năng.",
    "services.analytics.title": "Phân tích & Báo cáo",
    "services.analytics.description":
      "Theo dõi hiệu suất và tối ưu hóa chiến lược marketing dựa trên dữ liệu.",
    "services.mobile.title": "Mobile Marketing",
    "services.mobile.description":
      "Tiếp cận khách hàng trên thiết bị di động với các chiến lược marketing tối ưu.",

    // Portfolio Section
    "portfolio.title": "Portfolio & Case Studies",
    "portfolio.subtitle":
      "Khám phá những dự án thành công mà chúng tôi đã thực hiện cho các khách hàng",
    "portfolio.view_details": "Xem Chi Tiết",
    "portfolio.scroll_hint": "Cuộn ngang để xem thêm",
    "portfolio.ecommerce": "Thương mại điện tử",
    "portfolio.education": "Giáo dục",
    "portfolio.healthcare": "Y tế",
    "portfolio.financial": "Tài chính",
    "portfolio.restaurant": "Nhà hàng",
    "portfolio.tech": "Công nghệ",
    "portfolio.items.0.title": "E-commerce Fashion Brand",
    "portfolio.items.0.category": "SEO & Social Media",
    "portfolio.items.0.description":
      "Tăng 300% traffic và 250% doanh số cho thương hiệu thời trang online trong 6 tháng.",
    "portfolio.items.0.results.0": "300% Traffic tăng",
    "portfolio.items.0.results.1": "250% Doanh số tăng",
    "portfolio.items.0.results.2": "150% Followers tăng",
    "portfolio.items.1.title": "Tech Startup Platform",
    "portfolio.items.1.category": "Paid Ads & Content",
    "portfolio.items.1.description":
      "Xây dựng thương hiệu từ 0 và đạt 10K users trong 3 tháng đầu tiên.",
    "portfolio.items.1.results.0": "10K Users đạt được",
    "portfolio.items.1.results.1": "500% ROI",
    "portfolio.items.1.results.2": "50+ Partnerships",
    "portfolio.items.2.title": "Restaurant Chain",
    "portfolio.items.2.category": "Local SEO & Social",
    "portfolio.items.2.description":
      "Tăng cường hiện diện địa phương và tăng 180% đặt bàn online.",
    "portfolio.items.2.results.0": "180% Đặt bàn tăng",
    "portfolio.items.2.results.1": "95% Review tích cực",
    "portfolio.items.2.results.2": "8 Chi nhánh mới",
    "portfolio.items.3.title": "Healthcare Services",
    "portfolio.items.3.category": "Content & SEO",
    "portfolio.items.3.description":
      "Xây dựng uy tín trực tuyến và tăng 220% lượt tư vấn online.",
    "portfolio.items.3.results.0": "220% Tư vấn tăng",
    "portfolio.items.3.results.1": "400% Organic traffic",
    "portfolio.items.3.results.2": "90% Trust score",
    "portfolio.items.4.title": "Financial Services",
    "portfolio.items.4.category": "Paid Ads & Analytics",
    "portfolio.items.4.description":
      "Tối ưu hóa chiến dịch quảng cáo và giảm 40% chi phí khách hàng.",
    "portfolio.items.4.results.0": "40% Chi phí giảm",
    "portfolio.items.4.results.1": "320% Conversion tăng",
    "portfolio.items.4.results.2": "15+ Awards",
    "portfolio.items.5.title": "Education Platform",
    "portfolio.items.5.category": "Social Media & Content",
    "portfolio.items.5.description":
      "Phát triển cộng đồng học tập online với 50K+ thành viên tích cực.",
    "portfolio.items.5.results.0": "50K+ Members",
    "portfolio.items.5.results.1": "85% Completion rate",
    "portfolio.items.5.results.2": "200+ Courses",

    // Testimonials Section
    "testimonials.title": "Khách Hàng Nói Gì Về Chúng Tôi",
    "testimonials.subtitle":
      "Hơn 500+ doanh nghiệp đã tin tưởng và đạt được thành công cùng chúng tôi",

    // Testimonials Data
    "testimonials.items.0.name": "Nguyễn Văn An",
    "testimonials.items.0.position": "CEO",
    "testimonials.items.0.company": "TechViet Solutions",
    "testimonials.items.0.content":
      "Đội ngũ marketing của họ đã giúp chúng tôi tăng 300% doanh số chỉ trong 6 tháng. Chiến lược SEO và Social Media thực sự hiệu quả!",
    "testimonials.items.0.results": "300% doanh số tăng",

    "testimonials.items.1.name": "Trần Thị Bình",
    "testimonials.items.1.position": "Marketing Director",
    "testimonials.items.1.company": "Fashion House VN",
    "testimonials.items.1.content":
      "Chuyên nghiệp, sáng tạo và hiệu quả. Họ đã biến thương hiệu của chúng tôi thành một cái tên được biết đến rộng rãi trên mạng xã hội.",
    "testimonials.items.1.results": "250% followers tăng",

    "testimonials.items.2.name": "Lê Minh Cường",
    "testimonials.items.2.position": "Founder",
    "testimonials.items.2.company": "EduTech Platform",
    "testimonials.items.2.content":
      "ROI từ các chiến dịch quảng cáo của họ vượt xa mong đợi. Đội ngũ luôn tận tâm và đưa ra những giải pháp sáng tạo.",
    "testimonials.items.2.results": "500% ROI đạt được",

    "testimonials.items.3.name": "Phạm Thu Hương",
    "testimonials.items.3.position": "Operations Manager",
    "testimonials.items.3.company": "HealthCare Plus",
    "testimonials.items.3.content":
      "Dịch vụ content marketing tuyệt vời! Họ đã giúp chúng tôi xây dựng uy tín và thu hút hàng nghìn khách hàng mới.",
    "testimonials.items.3.results": "400% traffic tăng",

    "testimonials.items.4.name": "Hoàng Đức Thành",
    "testimonials.items.4.position": "Business Owner",
    "testimonials.items.4.company": "Restaurant Chain",
    "testimonials.items.4.content":
      "Local SEO và Social Media Marketing đã giúp chuỗi nhà hàng của chúng tôi mở rộng thành công ra 8 chi nhánh mới.",
    "testimonials.items.4.results": "8 chi nhánh mới",

    "testimonials.items.5.name": "Vũ Thị Mai",
    "testimonials.items.5.position": "Marketing Lead",
    "testimonials.items.5.company": "FinTech Startup",
    "testimonials.items.5.content":
      "Chiến lược Paid Ads của họ đã giúp chúng tôi giảm 40% chi phí khách hàng trong khi tăng 320% tỷ lệ chuyển đổi.",
    "testimonials.items.5.results": "40% chi phí giảm",

    // Stats
    "testimonials.stats.customers": "Khách hàng hài lòng",
    "testimonials.stats.success_rate": "Tỷ lệ thành công",
    "testimonials.stats.support": "Hỗ trợ khách hàng",
    "testimonials.stats.rating": "Đánh giá trung bình",

    // CTA Section
    "cta.title": "Sẵn Sàng Tăng Trưởng Doanh Nghiệp?",
    "cta.subtitle":
      "Liên hệ ngay để nhận tư vấn miễn phí và báo giá chi tiết cho dự án của bạn",
    "cta.form.name": "Họ và tên",
    "cta.form.email": "Email",
    "cta.form.phone": "Số điện thoại",
    "cta.form.company": "Công ty",
    "cta.form.service": "Dịch vụ quan tâm",
    "cta.form.message": "Tin nhắn",
    "cta.form.submit": "Gửi Yêu Cầu Tư Vấn",
    "cta.form.submitting": "Đang gửi...",
    "cta.form.success": "Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.",
    "cta.benefits.0.title": "Tư Vấn Miễn Phí",
    "cta.benefits.0.description":
      "Phân tích chi tiết hiện trạng và đưa ra giải pháp phù hợp",
    "cta.benefits.1.title": "Báo Giá Minh Bạch",
    "cta.benefits.1.description": "Chi phí rõ ràng, không phát sinh thêm",
    "cta.benefits.2.title": "Hỗ Trợ 24/7",
    "cta.benefits.2.description": "Đội ngũ chuyên gia luôn sẵn sàng hỗ trợ",

    // CTA Benefits (Additional)
    "cta.benefits.growth.title": "Tăng Trưởng Nhanh Chóng",
    "cta.benefits.growth.description":
      "Tăng 300% traffic và doanh số trong 6 tháng đầu tiên",
    "cta.benefits.guarantee.title": "Cam Kết Kết Quả",
    "cta.benefits.guarantee.description":
      "Đảm bảo ROI tối thiểu 200% hoặc hoàn tiền 100%",
    "cta.benefits.support247.title": "Hỗ Trợ 24/7",
    "cta.benefits.support247.description":
      "Đội ngũ chuyên gia luôn sẵn sàng hỗ trợ bạn mọi lúc",

    // CTA Form Labels
    "cta.form.contact_now": "Liên Hệ Ngay",
    "cta.form.contact_description":
      "Điền thông tin để nhận tư vấn miễn phí từ chuyên gia",
    "cta.form.get_consultation": "Nhận Tư Vấn Miễn Phí",
    "cta.form.submitting_text": "Đang gửi...",
    "cta.form.success_title": "Cảm ơn bạn đã liên hệ!",
    "cta.form.success_message":
      "Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ tới.",

    // Services Options
    "cta.services.seo": "SEO Optimization",
    "cta.services.social_media": "Social Media Marketing",
    "cta.services.paid_ads": "Paid Advertising",
    "cta.services.content": "Content Marketing",
    "cta.services.email": "Email Marketing",
    "cta.services.consultation": "Tư vấn tổng thể",
    "cta.why_choose.title": "Tại Sao Chọn Chúng Tôi?",
    "cta.why_choose.subtitle": "Hơn 500+ doanh nghiệp đã thành công cùng chúng tôi",
    
    // Contact Form
    "cta.form.name_label": "Họ và tên *",
    "cta.form.name_placeholder": "Nhập họ và tên",
    "cta.form.email_label": "Email *",
    "cta.form.email_placeholder": "email@example.com",
    "cta.form.phone_label": "Số điện thoại",
    "cta.form.phone_placeholder": "0123 456 789",
    "cta.form.company_label": "Công ty",
    "cta.form.company_placeholder": "Tên công ty",
    "cta.form.service_label": "Dịch vụ quan tâm",
    "cta.form.service_placeholder": "Chọn dịch vụ",
    "cta.form.message_label": "Tin nhắn",
    "cta.form.message_placeholder": "Mô tả chi tiết về nhu cầu của bạn...",

    "cta.contact.title": "Liên Hệ Trực Tiếp",
    "cta.button": "Liên hệ ngay",
    "services.consultation_button": "Tư Vấn Giải Pháp Phù Hợp",

    // Footer
    "footer.description":
      "Chúng tôi giúp doanh nghiệp phát triển mạnh mẽ trong thế giới số với các chiến lược marketing hiệu quả và sáng tạo.",
    "footer.quick_links": "Liên Kết Nhanh",
    "footer.services_title": "Dịch vụ",
    "footer.contact_info": "Thông tin liên hệ",
    "footer.rights": "Tất cả quyền được bảo lưu.",
    "footer.quicklinks.home": "Trang chủ",
    "footer.quicklinks.services": "Dịch vụ",
    "footer.quicklinks.portfolio": "Portfolio",
    "footer.quicklinks.about": "Về chúng tôi",
    "footer.quicklinks.blog": "Blog",
    "footer.quicklinks.contact": "Liên hệ",
    "footer.newsletter.title": "Đăng Ký Nhận Tin",
    "footer.newsletter.placeholder": "Email của bạn",
    "footer.copyright": "© 2024 Digital Agency. Tất cả quyền được bảo lưu.",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.testimonials": "Testimonials",
    "nav.contact": "Contact",

    // Hero Section
    "hero.title": "Comprehensive Digital\nMarketing Solutions",
    "hero.subtitle":
      "We help businesses thrive in the digital age with multi-channel marketing solutions: SEO, SEM, Social Media, Content Marketing, and Analytics – optimizing ROI and driving sustainable revenue growth.",
    "hero.cta": "Free Marketing Consultation",
    "hero.learn_more": "View Service Packages",

    // Services Section
    "services.title": "Digital Marketing Services",
    "services.subtitle":
      "Comprehensive digital marketing solutions to help businesses achieve sustainable growth in the digital era",
    "services.items.0.title": "SEO (Search Engine Optimization)",
    "services.items.0.description":
      "Optimize your website to achieve high rankings on Google, increase organic traffic and attract high-quality potential customers.",
    "services.items.1.title": "SEM (Search Engine Marketing)",
    "services.items.1.description":
      "Effective Google Ads campaigns, optimize advertising costs and increase conversion rates with precise keyword strategies.",
    "services.items.2.title": "Social Media Marketing",
    "services.items.2.description":
      "Build a strong brand presence on Facebook, Instagram, TikTok with creative content and effective engagement strategies.",
    "services.items.3.title": "Content Marketing",
    "services.items.3.description":
      "Produce high-quality content that attracts and retains customers through storytelling and valuable information.",
    "services.items.4.title": "Email Marketing",
    "services.items.4.description":
      "Automated email marketing campaigns, nurture leads and maintain long-term relationships with customers.",
    "services.items.5.title": "Marketing Analytics",
    "services.items.5.description":
      "In-depth marketing data analysis, measure ROI and optimize strategies based on real insights.",
    "services.items.6.title": "Video Marketing",
    "services.items.6.description":
      "Professional video marketing production, from TVC to viral videos, increase engagement and brand awareness.",
    "services.items.7.title": "Mobile Marketing",
    "services.items.7.description":
      "Comprehensive mobile marketing strategy, optimize user experience on smartphones and tablets.",
    "services.items.8.title": "Influencer Marketing",
    "services.items.8.description":
      "Connect with suitable KOLs and influencers, expand brand influence and reach new audiences.",
    "services.seo.title": "Search Engine Optimization",
    "services.seo.description":
      "Improve your website ranking on Google and increase organic traffic.",
    "services.social.title": "Social Media Marketing",
    "services.social.description":
      "Build your brand and engage with customers on social media platforms.",
    "services.content.title": "Content Marketing",
    "services.content.description":
      "Create engaging content to attract and retain your customers.",
    "services.email.title": "Email Marketing",
    "services.email.description":
      "Design and execute effective email campaigns to nurture leads.",
    "services.analytics.title": "Analytics & Reporting",
    "services.analytics.description":
      "Track performance and optimize marketing strategies based on data.",
    "services.mobile.title": "Mobile Marketing",
    "services.mobile.description":
      "Reach customers on mobile devices with optimized marketing strategies.",

    // Portfolio Section
    "portfolio.title": "Portfolio & Case Studies",
    "portfolio.subtitle":
      "Explore successful projects we have delivered for our clients",
    "portfolio.view_details": "View Details",
    "portfolio.scroll_hint": "Scroll horizontally to see more",
    "portfolio.ecommerce": "E-commerce",
    "portfolio.education": "Education",
    "portfolio.healthcare": "Healthcare",
    "portfolio.financial": "Financial",
    "portfolio.restaurant": "Restaurant",
    "portfolio.tech": "Technology",

    // Testimonials Section
    "testimonials.title": "What Our Clients Say About Us",
    "testimonials.subtitle":
      "Over 500+ businesses have trusted and achieved success with us",

    // Testimonials Data
    "cta.title": "Ready to Grow Your Business?",
    "cta.subtitle":
      "Contact us now for free consultation and detailed project quotes",
    "cta.form.name": "Full Name",
    "cta.form.email": "Email",
    "cta.form.phone": "Phone Number",
    "cta.form.company": "Company",
    "cta.form.service": "Service of Interest",
    "cta.form.message": "Message",
    "cta.form.submit": "Send Consultation Request",
    "cta.form.submitting": "Sending...",
    "cta.form.success": "Thank you! We will contact you soon.",
    "cta.benefits.0.title": "Free Consultation",
    "cta.benefits.0.description":
      "Detailed analysis of current situation and suitable solutions",
    "cta.benefits.1.title": "Transparent Pricing",
    "cta.benefits.1.description": "Clear costs, no hidden fees",
    "cta.benefits.2.title": "24/7 Support",
    "cta.benefits.2.description": "Expert team always ready to support",

    // CTA Benefits (Additional)
    "cta.benefits.growth.title": "Rapid Growth",
    "cta.benefits.growth.description":
      "Increase 300% traffic and sales in first 6 months",
    "cta.benefits.guarantee.title": "Results Guarantee",
    "cta.benefits.guarantee.description":
      "Guaranteed minimum 200% ROI or 100% money back",
    "cta.benefits.support247.title": "24/7 Support",
    "cta.benefits.support247.description":
      "Expert team always ready to support you anytime",

    // CTA Form Labels
    "cta.form.contact_now": "Contact Now",
    "cta.form.contact_description":
      "Fill in your information to receive free consultation from experts",
    "cta.form.get_consultation": "Get Free Consultation",
    "cta.form.submitting_text": "Sending...",
    "cta.form.success_title": "Thank you for contacting us!",
    "cta.form.success_message": "We will contact you within 24 hours.",

    // Services Options
    "cta.services.seo": "SEO Optimization",
    "cta.services.social_media": "Social Media Marketing",
    "cta.services.paid_ads": "Paid Advertising",
    "cta.services.content": "Content Marketing",
    "cta.services.email": "Email Marketing",
    "cta.services.consultation": "Overall Consultation",

    "cta.why_choose.title": "Why Choose Us?",
    "cta.why_choose.subtitle": "Over 500+ businesses have succeeded with us",
    
    // Contact Form
    "cta.form.name_label": "Full Name *",
    "cta.form.name_placeholder": "Enter your full name",
    "cta.form.email_label": "Email *",
    "cta.form.email_placeholder": "email@example.com",
    "cta.form.phone_label": "Phone Number",
    "cta.form.phone_placeholder": "0123 456 789",
    "cta.form.company_label": "Company",
    "cta.form.company_placeholder": "Company name",
    "cta.form.service_label": "Service of Interest",
    "cta.form.service_placeholder": "Select service",
    "cta.form.message_label": "Message",
    "cta.form.message_placeholder": "Describe your needs in detail...",

    "cta.contact.title": "Direct Contact",
    "cta.button": "Contact Now",
    "services.consultation_button": "Get Suitable Solution Consultation",

    // Testimonials Data
    "testimonials.items.0.name": "Nguyen Van An",
    "testimonials.items.0.position": "CEO",
    "testimonials.items.0.company": "TechViet Solutions",
    "testimonials.items.0.content":
      "Their marketing team helped us increase sales by 300% in just 6 months. SEO and Social Media strategies are truly effective!",
    "testimonials.items.0.results": "300% Sales Increase",

    "testimonials.items.1.name": "Tran Thi Binh",
    "testimonials.items.1.position": "Marketing Director",
    "testimonials.items.1.company": "Fashion House VN",
    "testimonials.items.1.content":
      "Professional, creative and effective. They turned our brand into a widely recognized name on social media.",
    "testimonials.items.1.results": "250% Followers Growth",

    "testimonials.items.2.name": "Le Minh Cuong",
    "testimonials.items.2.position": "Founder",
    "testimonials.items.2.company": "EduTech Platform",
    "testimonials.items.2.content":
      "ROI from their advertising campaigns exceeded expectations. The team is always dedicated and provides creative solutions.",
    "testimonials.items.2.results": "500% ROI Achieved",

    "testimonials.items.3.name": "Pham Thu Huong",
    "testimonials.items.3.position": "Operations Manager",
    "testimonials.items.3.company": "HealthCare Plus",
    "testimonials.items.3.content":
      "Excellent content marketing service! They helped us build credibility and attract thousands of new customers.",
    "testimonials.items.3.results": "400% Traffic Growth",

    "testimonials.items.4.name": "Hoang Duc Thanh",
    "testimonials.items.4.position": "Business Owner",
    "testimonials.items.4.company": "Restaurant Chain",
    "testimonials.items.4.content":
      "Local SEO and Social Media Marketing helped our restaurant chain successfully expand to 8 new branches.",
    "testimonials.items.4.results": "8 New Branches",

    "testimonials.items.5.name": "Vu Thi Mai",
    "testimonials.items.5.position": "Marketing Lead",
    "testimonials.items.5.company": "FinTech Startup",
    "testimonials.items.5.content":
      "Their Paid Ads strategy helped us reduce customer costs by 40% while increasing conversion rates by 320%.",
    "testimonials.items.5.results": "40% Cost Reduction",

    // Stats
    "testimonials.stats.customers": "Satisfied Customers",
    "testimonials.stats.success_rate": "Success Rate",
    "testimonials.stats.support": "Customer Support",
    "testimonials.stats.rating": "Average Rating",

    // Footer
    "footer.description":
      "We help businesses thrive in the digital world with effective and creative marketing strategies.",
    "footer.quick_links": "Quick Links",
    "footer.services_title": "Services",
    "footer.contact_info": "Contact Info",
    "footer.rights": "All rights reserved.",
    "footer.quicklinks.home": "Home",
    "footer.quicklinks.services": "Services",
    "footer.quicklinks.portfolio": "Portfolio",
    "footer.quicklinks.about": "About Us",
    "footer.quicklinks.blog": "Blog",
    "footer.quicklinks.contact": "Contact",
    "footer.newsletter.title": "Subscribe to Newsletter",
    "footer.newsletter.placeholder": "Your email",
    "footer.copyright": "© 2024 Digital Agency. All rights reserved.",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("vi");

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
