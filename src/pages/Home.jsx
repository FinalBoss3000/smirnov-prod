import React from 'react';
import Navbar from '../components/portfolio/Navbar';
import HeroSection from '../components/portfolio/HeroSection';
import StatsSection from '../components/portfolio/StatsSection';
import VideoGallery from '../components/portfolio/VideoGallery';
import ServicesSection from '../components/portfolio/ServicesSection';
import ProcessSection from '../components/portfolio/ProcessSection';
import TestimonialsSection from '../components/portfolio/TestimonialsSection';
import FaqSection from '../components/portfolio/FaqSection';
import ContactSection from '../components/portfolio/ContactSection';
import Footer from '../components/portfolio/Footer';

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <VideoGallery />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
