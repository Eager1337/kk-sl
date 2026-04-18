import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SpinBottleProps {
  src: string;
  alt: string;
  className?: string;
  speed?: "normal" | "slow";
  glow?: string;
  priority?: boolean;
}

/**
 * Compact, always-spinning bottle with 3D Y-rotation, interactive tilt,
 * soft floor shadow and brand glow. Pauses on hover for readability.
 */
export const SpinBottle = ({ src, alt, className, speed = "normal", glow, priority }: SpinBottleProps) => {
  const [loaded, setLoaded] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 16).toFixed(2)}deg`);
  };
  const handleLeave = () => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("relative group pause-on-hover transition-transform duration-300", className)}
      style={{ perspective: "1200px", transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))" }}
    >
      {glow && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 blur-3xl opacity-50 rounded-full"
          style={{ background: `radial-gradient(closest-side, ${glow}, transparent 70%)` }}
        />
      )}
      <div className="float-y">
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={cn(
            speed === "slow" ? "spin-bottle-slow" : "spin-bottle",
            "drop-shadow-[0_22px_22px_rgba(0,0,0,0.32)] mx-auto h-auto w-full select-none",
            !loaded && "opacity-0",
          )}
          draggable={false}
        />
      </div>
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 bottom-[-4%] h-2.5 w-1/2 rounded-full bg-black/35 blur-md"
      />
    </div>
  );
};
