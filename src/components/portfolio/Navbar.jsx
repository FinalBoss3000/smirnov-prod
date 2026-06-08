import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const LOGO_URL = "https://media.base44.com/images/public/69b2c6356fea6110797bb265/20e7836d1_smirnovprodnewlogoBW.png";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#reviews" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Smirnov Prod." className="w-10 h-10 rounded-lg object-cover object-top" />
          <span className="text-white font-semibold tracking-wider text-lg hidden sm:block">SMIRNOV PROD.</span>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-white/60 hover:text-white text-sm tracking-widest uppercase transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#contact")}
            className="px-5 py-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-sm tracking-wider rounded-full hover:bg-emerald-500/30 transition-all duration-300"
          >
            Get in Touch
          </button>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white/70 hover:text-white">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 space-y-4">
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="block w-full text-left text-white/70 hover:text-white text-sm tracking-widest uppercase py-2"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("#contact")}
            className="block w-full text-left text-emerald-400 text-sm tracking-widest uppercase py-2"
          >
            Get in Touch
          </button>
        </div>
      )}
    </nav>
  );
}
