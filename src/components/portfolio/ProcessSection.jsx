import React from 'react';
import { MessageSquare, Scissors, RefreshCw, PackageCheck } from 'lucide-react';
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';
import { BlurFade } from '@/components/ui/blur-fade';

const processData = [
  {
    id: 1,
    title: "We Talk",
    date: "Step 01",
    content: "Share your vision, references, and goals. I'll ask the right questions so the final edit matches exactly what you had in mind — no guessing.",
    category: "Discovery",
    icon: MessageSquare,
    relatedIds: [2],
    status: "completed",
    energy: 25,
  },
  {
    id: 2,
    title: "I Craft",
    date: "Step 02",
    content: "I get to work on your footage — cutting, grading, adding motion graphics and sound design. You'll get a first version within the agreed timeline.",
    category: "Production",
    icon: Scissors,
    relatedIds: [1, 3],
    status: "in-progress",
    energy: 50,
  },
  {
    id: 3,
    title: "You Review",
    date: "Step 03",
    content: "Watch the edit and leave your feedback. Every project includes revision rounds to make sure the result is exactly right before delivery.",
    category: "Revision",
    icon: RefreshCw,
    relatedIds: [2, 4],
    status: "pending",
    energy: 75,
  },
  {
    id: 4,
    title: "You Publish",
    date: "Step 04",
    content: "Files delivered in your preferred format — 4K, web-optimized, platform-ready. Ready to upload and go live the moment you receive them.",
    category: "Delivery",
    icon: PackageCheck,
    relatedIds: [3],
    status: "pending",
    energy: 100,
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-24 md:py-32 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-blue-500/30" />

      <div className="max-w-7xl mx-auto px-6">
        <BlurFade inView className="text-center mb-4">
          <p className="text-emerald-400 text-sm tracking-[0.3em] uppercase mb-3">Simple & Clear</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">How We Work</h2>
          <p className="mt-4 text-white/40 max-w-xl mx-auto">
            A smooth, professional process from first message to final delivery. Click any node to explore each step.
          </p>
        </BlurFade>

        <BlurFade inView delay={0.15}>
          <RadialOrbitalTimeline
            timelineData={processData}
            className="h-[460px] md:h-[580px]"
          />
        </BlurFade>

        <BlurFade inView delay={0.25} className="mt-0 text-center">
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-10 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full text-white text-sm tracking-wider hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-500"
          >
            START YOUR PROJECT
          </button>
        </BlurFade>
      </div>
    </section>
  );
}
