import React from 'react';

const LOGO_URL = "https://media.base44.com/images/public/69b2c6356fea6110797bb265/20e7836d1_smirnovprodnewlogoBW.png";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Smirnov Prod." className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-white/50 text-sm tracking-wider">SMIRNOV PROD.</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Smirnov Prod. All rights reserved.
            </p>
            <span className="text-white/10 text-sm hidden md:block">·</span>
            <button
              onClick={() => window.openLegal && window.openLegal('accessibility')}
              className="footer-legal-btn"
            >
              Accessibility
            </button>
            <span className="text-white/10 text-sm">·</span>
            <button
              onClick={() => window.openLegal && window.openLegal('cookies')}
              className="footer-legal-btn"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
