import React from 'react';
import Navbar from '../components/portfolio/Navbar';
import HeroSection from '../components/portfolio/HeroSection';
import VideoGallery from '../components/portfolio/VideoGallery';
import ServicesSection from '../components/portfolio/ServicesSection';
import ContactSection from '../components/portfolio/ContactSection';
import Footer from '../components/portfolio/Footer';

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <HeroSection />
      <VideoGallery />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
