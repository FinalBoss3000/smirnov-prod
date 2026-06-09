import { MeshGradient } from "@paper-design/shaders-react";

// Subtle dark shader using the portfolio's emerald + blue accent palette.
// Sits fixed behind all content as z-0.
export default function BackgroundShader() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <MeshGradient
        style={{ width: "100vw", height: "100vh" }}
        speed={0.4}
        distortion={0.55}
        swirl={0.12}
        offsetX={0}
        offsetY={0}
        scale={1.15}
        rotation={0}
        colors={[
          "hsl(0, 0%, 3%)",      // near-black base
          "hsl(158, 80%, 7%)",   // dark emerald
          "hsl(221, 65%, 9%)",   // dark navy blue
          "hsl(0, 0%, 5%)",      // deep charcoal
        ]}
      />
    </div>
  );
}
