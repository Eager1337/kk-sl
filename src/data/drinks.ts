import bottleMango from "@/assets/bottle-mango.png";
import bottleOrange from "@/assets/bottle-orange.png";
import bottleMixed from "@/assets/bottle-mixed.png";
import bottleApple from "@/assets/bottle-apple.png";
import bottleTamarind from "@/assets/bottle-tamarind.png";
import bottleYogurt from "@/assets/bottle-yogurt.png";
import bottleWater from "@/assets/bottle-water.png";

export type Drink = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  category: "Fruity" | "Carbonated" | "Yogurt" | "Water";
  volume: string;
  price: number;
  image: string;
  accent: string; // hsl variable name
  href?: string;
};

export const DRINKS: Drink[] = [
  { slug: "mango",    name: "KK Mango Fruity",     short: "Mango Fruity",  tagline: "The taste of sunshine.",        category: "Fruity",     volume: "500ml",  price: 10, image: bottleMango,    accent: "var(--mango)",  href: "/mango" },
  { slug: "orange",   name: "KK Orange Fruity",    short: "Orange Fruity", tagline: "Pure citrus joy.",              category: "Fruity",     volume: "500ml",  price: 10, image: bottleOrange,   accent: "var(--sun)" },
  { slug: "mixed-fruit", name: "KK Mixed Fruit",   short: "Mixed Fruit",   tagline: "Berry. Bold. Brilliant.",       category: "Fruity",     volume: "500ml",  price: 10, image: bottleMixed,    accent: "var(--berry)",  href: "/mixed-fruit" },
  { slug: "yogurt",   name: "KK Pineapple Yogurt", short: "Pineapple Yogurt", tagline: "Creamy meets tropical.",     category: "Yogurt",     volume: "500ml",  price: 10, image: bottleYogurt,   accent: "var(--sun)",    href: "/yogurt" },
  { slug: "apple",    name: "KK Apple Soda",       short: "Apple Soda",    tagline: "Crisp, carbonated, classic.",   category: "Carbonated", volume: "500ml",  price: 10, image: bottleApple,    accent: "var(--leaf)" },
  { slug: "tamarind", name: "KK Tamarind Soda",    short: "Tamarind Soda", tagline: "Tangy. Spicy. Unmistakable.",   category: "Carbonated", volume: "500ml",  price: 10, image: bottleTamarind, accent: "var(--mango)" },
  { slug: "water",    name: "KK Pure Drink Water", short: "Pure Water",    tagline: "Hydration, perfected.",         category: "Water",      volume: "1500ml", price: 10, image: bottleWater,    accent: "var(--sea)",    href: "/water" },
];

export const getDrink = (slug: string) => DRINKS.find((d) => d.slug === slug);
