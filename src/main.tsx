import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Eagerly preload all bottle images so they appear instantly across the site.
import bMango from "@/assets/bottle-mango.png";
import bOrange from "@/assets/bottle-orange.png";
import bMixed from "@/assets/bottle-mixed.png";
import bApple from "@/assets/bottle-apple.png";
import bTamarind from "@/assets/bottle-tamarind.png";
import bYogurt from "@/assets/bottle-yogurt.png";
import bWater from "@/assets/bottle-water.png";

[bMango, bOrange, bMixed, bApple, bTamarind, bYogurt, bWater].forEach((src) => {
  // Inject <link rel="preload"> so the browser starts fetching ASAP, before React mounts.
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = src;
  (link as HTMLLinkElement & { fetchPriority?: string }).fetchPriority = "high";
  document.head.appendChild(link);

  // Also create an Image and decode it so it's ready in memory by the time it renders.
  const img = new Image();
  img.decoding = "async";
  img.src = src;
  if ("decode" in img) img.decode().catch(() => {});
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
