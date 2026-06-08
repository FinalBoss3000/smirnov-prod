import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Scissors, RefreshCw, PackageCheck } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "We Talk",
    description: "Share your vision, references, and goals. I'll ask the right questions so the final edit matches exactly what you had in mind — no guessing.",
  },
  {
    icon: Scissors,
    number: "02",
    title: "I Craft",
    description: "I get to work on your footage — cutting, grading, adding motion graphics and sound design. You'll get a first version within the agreed timeline.",
  },
  {
    icon: RefreshCw,
    number: "03",
    title: "You Review",
    description: "Watch the edit and leave your feedback. Every project includes revision rounds to make sure the result is exactly right before delivery.",
  },
  {
    icon: PackageCheck,
    number: "04",
    title: "You Publish",
    description: "Files delivered in your preferred format — 4K, web-optimized, platform-ready. Ready to upload and go live the moment you receive them.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-24 md:py-32 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-blue-500/30" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-emerald-400 text-sm tracking-[0.3em] uppercase mb-3">Simple & Clear</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">How We Work</h2>
          <p className="mt-4 text-white/40 max-w-xl mx-auto">
            A smooth, professional process from first message to final delivery — so you always know what to expect.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-10 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <step.icon size={28} className="text-emerald-400" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-zinc-900 border border-white/10 text-white/30 text-xs flex items-center justify-center font-mono">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full text-white text-sm tracking-wider hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-500"
          >
            START YOUR PROJECT
          </button>
        </motion.div>
      </div>
    </section>
  );
}
