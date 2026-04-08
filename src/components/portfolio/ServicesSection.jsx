import React from 'react';
import { motion } from 'framer-motion';
import { Film, Sparkles, Monitor, Palette, Music, Clapperboard } from 'lucide-react';

const services = [
  { icon: Film, title: "Video Editing", description: "Professional cutting, color grading, and post-production for any format — from short-form reels to feature films." },
  { icon: Sparkles, title: "Motion Graphics", description: "Eye-catching animations, lower thirds, intros, and dynamic visual effects that elevate your content." },
  { icon: Monitor, title: "Commercial Ads", description: "High-impact advertising content optimized for social media, TV, and digital campaigns." },
  { icon: Music, title: "Music Videos", description: "Visually-driven storytelling synced to rhythm and beat, with creative color grading and effects." },
  { icon: Clapperboard, title: "Documentary Editing", description: "Narrative-driven editing that weaves footage, interviews, and archival material into compelling stories." },
  { icon: Palette, title: "Color Grading", description: "Cinematic color correction and grading to establish mood, tone, and visual consistency." }
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-emerald-500/30" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-emerald-400 text-sm tracking-[0.3em] uppercase mb-3">What I Do</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Services</h2>
          <p className="mt-4 text-white/40 max-w-xl mx-auto">
            From concept to final delivery - I offer end-to-end post-production services tailored to your vision.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <service.icon size={22} className="text-emerald-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">{service.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
