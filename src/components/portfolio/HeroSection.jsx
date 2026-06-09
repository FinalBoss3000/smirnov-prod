import React from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronDown, Zap } from 'lucide-react';

const LOGO_URL = "https://media.base44.com/images/public/69b2c6356fea6110797bb265/20e7836d1_smirnovprodnewlogoBW.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Thin vignette so edges don't feel too open — shader shows through the middle */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={LOGO_URL}
            alt="Smirnov Prod."
            className="w-24 h-24 md:w-32 md:h-32 mx-auto object-contain mix-blend-screen mb-6"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs tracking-widest uppercase">
            <Zap size={12} className="fill-emerald-400" />
            Available for new projects
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none"
        >
          Video That
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 pb-2">
            Gets Results.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
        >
          Cinematic editing, motion graphics, and color grading that make brands look premium and content creators stand out — fast turnaround, zero headaches.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-9 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full text-white text-sm tracking-wider hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-500 font-medium"
          >
            START A PROJECT
          </button>
          <button
            onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 hover:border-white/20 transition-all duration-500"
          >
            <Play size={16} className="text-emerald-400 group-hover:scale-110 transition-transform fill-emerald-400" />
            <span className="tracking-wider text-sm">SEE MY WORK</span>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 text-white/20 text-xs tracking-widest"
        >
          TRUSTED BY CREATORS · BRANDS · SPORTS TEAMS
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown size={24} className="text-white/20 animate-bounce" />
      </motion.div>
    </section>
  );
}
