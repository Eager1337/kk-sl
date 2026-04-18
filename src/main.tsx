import { createRoot } from "react-dom/client";
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
  const img = new Image();
  img.decoding = "async";
  img.src = src;
});

createRoot(document.getElementById("root")!).render(<App />);
