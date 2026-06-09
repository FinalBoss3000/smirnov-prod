import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { BlurFade } from '@/components/ui/blur-fade';

const testimonials = [
  {
    name: "Alex M.",
    role: "Content Creator · 500K+ Followers",
    text: "Dmitry completely transformed my raw footage into something I'm genuinely proud to post. The pacing, color, the way he matched cuts to the music — it felt like he understood my brand better than I did. My last reel hit 2M views. I'm not going anywhere else.",
    stars: 5,
  },
  {
    name: "Sarah K.",
    role: "CEO, Momentum Agency",
    text: "We hired Smirnov Prod. for a product launch campaign and the results were beyond expectation. Fast turnaround, zero back-and-forth headaches, and the final ad performed 3x better than our previous campaigns. A true professional.",
    stars: 5,
  },
  {
    name: "Coach D. Reyes",
    role: "Head Coach, Urban Athletics",
    text: "We needed hype videos for our athletes and Dmitry delivered fire every single time. He captures the energy of sport in a way that gets kids excited and sponsors impressed. Highly recommend to any team or sports brand.",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  return (
    <section id="reviews" className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-emerald-500/30" />
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-6">
        <BlurFade inView className="text-center mb-16">
          <p className="text-emerald-400 text-sm tracking-[0.3em] uppercase mb-3">Client Reviews</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">What Clients Say</h2>
        </BlurFade>

        <BlurFade inView delay={0.1}>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative p-8 md:p-12 rounded-3xl border border-white/8 bg-white/[0.02]"
              >
                <Quote size={40} className="text-emerald-500/20 absolute top-8 left-8" />

                <div className="flex gap-1 mb-6 justify-center">
                  {Array.from({ length: testimonials[active].stars }).map((_, i) => (
                    <Star key={i} size={16} className="text-emerald-400 fill-emerald-400" />
                  ))}
                </div>

                <p className="text-white/70 text-lg md:text-xl leading-relaxed text-center font-light italic">
                  "{testimonials[active].text}"
                </p>

                <div className="mt-8 text-center">
                  <p className="text-white font-semibold">{testimonials[active].name}</p>
                  <p className="text-white/55 text-sm mt-1">{testimonials[active].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20 flex items-center justify-center transition-all duration-300"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-1">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
                    aria-current={i === active ? 'true' : undefined}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <span
                      aria-hidden="true"
                      className={`block rounded-full transition-all duration-300 h-2 ${i === active ? 'bg-emerald-400 w-6' : 'bg-white/20 w-2'}`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20 flex items-center justify-center transition-all duration-300"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
