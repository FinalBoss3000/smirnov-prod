import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Instagram, Youtube } from 'lucide-react';
import { BlurFade } from '@/components/ui/blur-fade';

const categories = [
  {
    id: "social",
    label: "Social Media",
    icons: [Instagram, Youtube],
    thumbnail: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=500&fit=crop",
    videos: [
      { id: 1, title: "Reel for coach", type: "instagram", url: "https://www.instagram.com/reel/DPZLxArDGED/", thumb: null },
      { id: 2, title: "Reel for basketball photographer", type: "instagram", url: "https://www.instagram.com/reel/DLP2ZbAI-R0/", thumb: null },
      { id: 3, title: "Advertisement for coach", type: "wistia", url: "https://mitasmirno.wistia.com/medias/pmjrtgzx66", embedId: "pmjrtgzx66", thumb: null },
    ]
  },
  {
    id: "animations",
    label: "Animations",
    icons: [],
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=500&fit=crop",
    videos: [
      { id: 4, title: "Animation 1", type: "wistia", url: "https://mitasmirno.wistia.com/medias/8290xqoqza", embedId: "8290xqoqza", thumb: null },
      { id: 5, title: "Animation 2", type: "wistia", url: "https://mitasmirno.wistia.com/medias/iywlvsrpbm", embedId: "iywlvsrpbm", thumb: null },
      { id: 6, title: "Animation 3", type: "instagram", url: "https://www.instagram.com/reel/DW4QIQxjGPO/", thumb: null },
    ]
  },
  {
    id: "sport",
    label: "Sport",
    icons: [],
    thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=500&fit=crop",
    videos: [
      { id: 7, title: "Sport Video 1", type: "wistia", url: "https://mitasmirno.wistia.com/medias/kxlr1h0bkp", embedId: "kxlr1h0bkp", thumb: null },
      { id: 8, title: "Sport Video 2", type: "wistia", url: "https://mitasmirno.wistia.com/medias/uesnpf18vp", embedId: "uesnpf18vp", thumb: null },
      { id: 9, title: "Sport Video 3", type: "wistia", url: "https://mitasmirno.wistia.com/medias/ot2fpdmua8", embedId: "ot2fpdmua8", thumb: null },
    ]
  }
];

export default function VideoGallery() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [modalVideo, setModalVideo] = useState(null);
  const videosRef = useRef(null);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setTimeout(() => {
      videosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <section id="work" className="relative py-24 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <BlurFade inView className="mb-16">
          <p className="text-emerald-400 text-sm tracking-[0.3em] uppercase mb-3">Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Selected Work</h2>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {categories.map((cat, i) => (
            <BlurFade key={cat.id} inView delay={i * 0.1}>
              <div
                onClick={() => handleCategoryClick(cat)}
                className={`group relative aspect-video rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${activeCategory?.id === cat.id ? 'border-emerald-500/60' : 'border-white/5 hover:border-white/20'}`}
              >
                <img src={cat.thumbnail} alt={cat.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                  <span className="text-white font-semibold text-xl tracking-wide">{cat.label}</span>
                  {cat.icons.length > 0 && (
                    <div className="flex items-center gap-2">
                      {cat.icons.map((Icon, idx) => (
                        <div key={idx} className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                          <Icon size={16} className="text-white" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {activeCategory?.id === cat.id && (
                  <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-emerald-400" />
                )}
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Video grid — kept as Framer Motion because it's a UI state change, not a scroll reveal */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              ref={videosRef}
              key={activeCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-6">{activeCategory.label} — Videos</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {activeCategory.videos.map((video, i) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    onClick={() => setModalVideo(video)}
                    className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/10 hover:border-white/20 transition-colors duration-300"
                  >
                    {video.type === 'wistia' ? (
                      <img
                        src={`https://embed-ssl.wistia.com/deliveries/${video.embedId}.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Instagram size={32} className="text-white/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play size={18} className="text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-medium text-sm">{video.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal — kept as Framer Motion (UI interaction, not scroll reveal) */}
      <AnimatePresence>
        {modalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setModalVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {modalVideo.type === 'wistia' ? (
                <iframe
                  src={`https://fast.wistia.net/embed/iframe/${modalVideo.embedId}?autoPlay=1`}
                  title={modalVideo.title}
                  className="w-full h-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 gap-6">
                  <Instagram size={48} className="text-white/40" />
                  <p className="text-white/60 text-sm">Instagram Reels cannot be embedded directly.</p>
                  <a
                    href={modalVideo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Instagram size={16} />
                    Watch on Instagram
                  </a>
                </div>
              )}
              <button
                onClick={() => setModalVideo(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
