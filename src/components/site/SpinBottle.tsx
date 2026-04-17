import { useState } from "react";
import { cn } from "@/lib/utils";

interface SpinBottleProps {
  src: string;
  alt: string;
  className?: string;
  speed?: "normal" | "slow";
  glow?: string; // CSS color (e.g. "hsl(var(--mango))")
  priority?: boolean;
}

/**
 * Always-spinning bottle with 3D Y-rotation, soft floor shadow and brand glow.
 * Pauses on hover for readability.
 */
export const SpinBottle = ({ src, alt, className, speed = "normal", glow, priority }: SpinBottleProps) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={cn("relative group pause-on-hover", className)} style={{ perspective: "1200px" }}>
      {/* glow halo */}
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
          onLoad={() => setLoaded(true)}
          className={cn(
            speed === "slow" ? "spin-bottle-slow" : "spin-bottle",
            "drop-shadow-[0_28px_28px_rgba(0,0,0,0.35)] mx-auto h-auto w-full select-none",
            !loaded && "opacity-0",
          )}
          draggable={false}
        />
      </div>
      {/* floor reflection */}
      <div
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 bottom-[-6%] h-3 w-2/3 rounded-full bg-black/35 blur-md"
      />
    </div>
  );
};
