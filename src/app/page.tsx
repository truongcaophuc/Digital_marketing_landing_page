'use client';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ChatwootWidget from '@/components/ChatwootWidget'
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <ChatwootWidget/>
    </main>
  );
}
