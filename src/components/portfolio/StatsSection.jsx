import React from 'react';
import { BlurFade } from '@/components/ui/blur-fade';

const stats = [
  { value: "80+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "24h", label: "Response Time" },
  { value: "3+", label: "Years Experience" },
];

export default function StatsSection() {
  return (
    <section className="relative py-12 bg-black border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/20 via-transparent to-blue-950/20" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <BlurFade key={stat.label} inView delay={i * 0.1} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                {stat.value}
              </p>
              <p className="text-white/40 text-sm mt-1 tracking-wide">{stat.label}</p>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
