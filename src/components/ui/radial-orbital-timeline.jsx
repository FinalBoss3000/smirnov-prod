import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SPEED_DEG_PER_SEC = 18;

export default function RadialOrbitalTimeline({ timelineData, className }) {
  // Only state that triggers real React re-renders (user interactions only)
  const [expandedItems, setExpandedItems] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [pulseEffect, setPulseEffect] = useState({});
  const [radius, setRadius] = useState(175);

  // Refs for the animation loop — updating these never causes re-renders
  const rotationRef  = useRef(0);
  const autoRotRef   = useRef(true);
  const expandedRef  = useRef({});
  const radiusRef    = useRef(175);
  const rafRef       = useRef(null);
  const lastTsRef    = useRef(null);

  const containerRef = useRef(null);
  const nodeRefs     = useRef({});

  // Keep expandedRef in sync so the RAF loop can read it without closures
  useEffect(() => { expandedRef.current = expandedItems; }, [expandedItems]);

  // ── Responsive radius via ResizeObserver ──────────────────────────────────
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const r = Math.min(175, Math.floor(containerRef.current.offsetWidth / 2 - 60));
      radiusRef.current = r;
      setRadius(r);
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // ── RAF loop — pure DOM updates, zero React re-renders ───────────────────
  useEffect(() => {
    const tick = (ts) => {
      // Cap delta to 100 ms so a backgrounded tab doesn't jump
      const delta = Math.min((ts - (lastTsRef.current ?? ts)) / 1000, 0.1);
      lastTsRef.current = ts;

      if (autoRotRef.current) {
        rotationRef.current = (rotationRef.current + SPEED_DEG_PER_SEC * delta) % 360;
      }

      const total = timelineData.length;
      const r     = radiusRef.current;

      timelineData.forEach((item, i) => {
        const el = nodeRefs.current[item.id];
        if (!el || expandedRef.current[item.id]) return;

        const angleDeg = ((i / total) * 360 + rotationRef.current) % 360;
        const rad      = (angleDeg * Math.PI) / 180;
        const x        = r * Math.cos(rad);
        const y        = r * Math.sin(rad);
        const opacity  = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2)));
        const zIndex   = Math.round(100 + 50 * Math.cos(rad));

        // translate3d forces GPU compositing — no layout, no paint, just composite
        el.style.transform = `translate3d(${x}px,${y}px,0)`;
        el.style.opacity   = opacity;
        el.style.zIndex    = zIndex;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [timelineData]); // only re-start loop if data changes

  // ── Interaction helpers ───────────────────────────────────────────────────
  const handleContainerClick = (e) => {
    if (e.target !== containerRef.current) return;
    setExpandedItems({});
    setActiveNodeId(null);
    setPulseEffect({});
    autoRotRef.current = true;
  };

  const toggleItem = (id) => {
    const opening = !expandedRef.current[id];

    if (opening) {
      const idx = timelineData.findIndex((item) => item.id === id);
      const r   = radiusRef.current;

      // Stop rotation and snap so clicked node lands at top of orbit
      autoRotRef.current  = false;
      rotationRef.current = (((270 - (idx / timelineData.length) * 360) % 360) + 360) % 360;

      // Place node at top immediately (RAF loop skips expanded nodes)
      const el = nodeRefs.current[id];
      if (el) {
        el.style.transform = `translate3d(0,${-r}px,0)`;
        el.style.opacity   = "1";
        el.style.zIndex    = "200";
      }

      // Pulse neighbours
      const pulse = {};
      const item  = timelineData.find((i) => i.id === id);
      if (item) item.relatedIds.forEach((rId) => { pulse[rId] = true; });

      setPulseEffect(pulse);
      setActiveNodeId(id);
      setExpandedItems({ [id]: true });
    } else {
      autoRotRef.current = true;
      setActiveNodeId(null);
      setPulseEffect({});
      setExpandedItems({});
    }
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    const item = timelineData.find((i) => i.id === activeNodeId);
    return item ? item.relatedIds.includes(itemId) : false;
  };

  const getStatusStyles = (status) => {
    if (status === "completed")   return "text-white bg-emerald-600 border-emerald-500";
    if (status === "in-progress") return "text-white bg-blue-600 border-blue-500";
    return "text-white/70 bg-black/40 border-white/30";
  };

  const orbitSize = radius * 2;

  return (
    <div
      ref={containerRef}
      className={cn("w-full flex items-center justify-center overflow-hidden", className)}
      onClick={handleContainerClick}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="relative flex items-center justify-center"
          style={{ width: orbitSize + 120, height: orbitSize + 120 }}
        >
          {/* Centre orb */}
          <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 via-blue-500 to-emerald-400 animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-[72px] h-[72px] rounded-full border border-white/20 animate-ping opacity-70" />
            <div className="absolute w-[88px] h-[88px] rounded-full border border-white/10 animate-ping opacity-40" style={{ animationDelay: "0.5s" }} />
            <div className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-md" />
          </div>

          {/* Orbit ring */}
          <div
            className="absolute rounded-full border border-white/10"
            style={{ width: orbitSize, height: orbitSize }}
          />

          {/* Nodes */}
          {timelineData.map((item) => {
            const isExpanded = !!expandedItems[item.id];
            const isRelated  = isRelatedToActive(item.id);
            const isPulsing  = !!pulseEffect[item.id];
            const Icon       = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute cursor-pointer"
                style={{ willChange: "transform, opacity" }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
              >
                {/* Glow ring */}
                <div
                  className={cn("absolute rounded-full pointer-events-none", isPulsing && "animate-pulse")}
                  style={{
                    background: "radial-gradient(circle, rgba(52,211,153,0.18) 0%, rgba(52,211,153,0) 70%)",
                    width:  `${item.energy * 0.3 + 40}px`,
                    height: `${item.energy * 0.3 + 40}px`,
                    left:   `-${(item.energy * 0.3) / 2}px`,
                    top:    `-${(item.energy * 0.3) / 2}px`,
                  }}
                />

                {/* Icon circle */}
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isExpanded ? "bg-emerald-400 text-black border-emerald-300 shadow-lg shadow-emerald-400/30 scale-150"
                    : isRelated ? "bg-white/40 text-white border-white animate-pulse"
                    : "bg-black text-white border-white/40",
                )}>
                  <Icon size={16} />
                </div>

                {/* Label */}
                <div className={cn(
                  "absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300",
                  isExpanded ? "text-white scale-125" : "text-white/70",
                )}>
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <Card
                    className="absolute top-20 left-1/2 -translate-x-1/2 bg-black/95 backdrop-blur-lg border-white/20 shadow-xl shadow-emerald-500/10 overflow-visible"
                    style={{ width: Math.min(240, (containerRef.current?.offsetWidth ?? 320) - 32) }}
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/40" />
                    <CardHeader className="pb-2 px-4 pt-4">
                      <div className="flex justify-between items-center gap-2">
                        <Badge className={`px-2 text-xs border shrink-0 ${getStatusStyles(item.status)}`}>
                          {item.status === "completed" ? "COMPLETE" : item.status === "in-progress" ? "IN PROGRESS" : "UPCOMING"}
                        </Badge>
                        <span className="text-xs font-mono text-white/40 shrink-0">{item.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-white">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/70 px-4 pb-4">
                      <p>{item.content}</p>

                      <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center text-white/50">
                            <Zap size={10} className="mr-1" /> Stage Progress
                          </span>
                          <span className="font-mono text-white/50">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-blue-500" style={{ width: `${item.energy}%` }} />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-white/50 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/50">Connected Steps</h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const rel    = timelineData.find((i) => i.id === relatedId);
                              const isPrev = relatedId < item.id;
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/70 hover:text-white transition-all"
                                  onClick={(e) => { e.stopPropagation(); toggleItem(relatedId); }}
                                >
                                  {isPrev && <ArrowLeft size={8} className="mr-1 text-white/50" />}
                                  {rel?.title}
                                  {!isPrev && <ArrowRight size={8} className="ml-1 text-white/50" />}
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
