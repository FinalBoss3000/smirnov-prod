import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { BlurFade } from '@/components/ui/blur-fade';

const faqs = [
  {
    q: "How long does a project take?",
    a: "Turnaround depends on the scope, but most short-form edits (reels, ads, highlights) are delivered within 3–5 business days. Longer projects like documentary or full commercials are discussed case by case. Rush delivery is available — just ask.",
  },
  {
    q: "How much does it cost?",
    a: "Pricing is tailored to your project. Message me with a brief and I'll give you a clear number with no surprises.",
  },
  {
    q: "How many revisions do I get?",
    a: "Every project includes revision rounds built into the price. I want you to love the result, so we don't stop until it's right. Extensive structural changes beyond the agreed scope may be quoted separately.",
  },
  {
    q: "What do I need to send you?",
    a: "Your raw footage, any brand assets (logos, fonts, colors), reference videos you love, and a brief explaining the goal. The more context you give me up front, the better the first version lands.",
  },
  {
    q: "What formats do you deliver?",
    a: "Any format you need — 4K ProRes for broadcast, H.264/H.265 for web and social, vertical crops for Reels/TikTok, or multiple versions in one go. Just tell me the platforms and I handle the rest.",
  },
  {
    q: "How do I get started?",
    a: "Scroll down and fill out the contact form or message me directly on WhatsApp. I'll usually respond within a few hours. We'll have a quick chat, agree on scope and timeline, and I'll get started.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-gradient-to-b from-black via-zinc-950 to-black">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-blue-500/30" />

      <div className="max-w-3xl mx-auto px-6">
        <BlurFade inView className="text-center mb-16">
          <p className="text-emerald-400 text-sm tracking-[0.3em] uppercase mb-3">Got Questions?</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">FAQ</h2>
          <p className="mt-4 text-white/40 max-w-xl mx-auto">
            Everything you need to know before reaching out.
          </p>
        </BlurFade>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <BlurFade key={i} inView delay={i * 0.07}>
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                >
                  <span className={`font-medium text-sm md:text-base transition-colors duration-300 ${open === i ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border flex-shrink-0 ml-4 transition-all duration-300 ${open === i ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400' : 'border-white/10 text-white/30'}`}>
                    {open === i ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 text-white/40 text-sm leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </BlurFade>
          ))}
        </div>

        <BlurFade inView delay={0.35} className="mt-12 p-6 rounded-2xl border border-white/8 bg-white/[0.02] text-center">
          <p className="text-white/50 text-sm">Still have a question?</p>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-3 text-emerald-400 text-sm tracking-wider hover:text-emerald-300 transition-colors duration-300 font-medium"
          >
            SEND ME A MESSAGE →
          </button>
        </BlurFade>
      </div>
    </section>
  );
}
