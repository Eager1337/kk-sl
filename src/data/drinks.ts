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
  fullName: string;
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
  { slug: "mango",    name: "KK Mango Fruity",     fullName: "KK Mango Fruity Soft Drink",            short: "Mango Fruity",  tagline: "The taste of sunshine.",        category: "Fruity",     volume: "500ml",  price: 10, image: bottleMango,    accent: "var(--mango)",  href: "/mango" },
  { slug: "orange",   name: "KK Orange Fruity",    fullName: "KK Orange Fruity Soft Drink",           short: "Orange Fruity", tagline: "Pure citrus joy.",              category: "Fruity",     volume: "500ml",  price: 10, image: bottleOrange,   accent: "var(--sun)",    href: "/orange" },
  { slug: "mixed-fruit", name: "KK Mixed Fruit",   fullName: "KK Mixed Fruit Soft Drink",             short: "Mixed Fruit",   tagline: "Berry. Bold. Brilliant.",       category: "Fruity",     volume: "500ml",  price: 10, image: bottleMixed,    accent: "var(--berry)",  href: "/mixed-fruit" },
  { slug: "yogurt",   name: "KK Pineapple Yogurt", fullName: "KK Pineapple Yogurt Flavour Beverage",  short: "Pineapple Yogurt", tagline: "Creamy meets tropical.",     category: "Yogurt",     volume: "500ml",  price: 10, image: bottleYogurt,   accent: "var(--sun)",    href: "/yogurt" },
  { slug: "apple",    name: "KK Apple Soda",       fullName: "KK Carbonated Apple Flavoured Soft Drink", short: "Apple Soda",    tagline: "Crisp, carbonated, classic.",   category: "Carbonated", volume: "500ml",  price: 10, image: bottleApple,    accent: "var(--leaf)",   href: "/apple" },
  { slug: "tamarind", name: "KK Tamarind Soda",    fullName: "KK Carbonated Tamarind Flavoured Soft Drink", short: "Tamarind Soda", tagline: "Tangy. Spicy. Unmistakable.",   category: "Carbonated", volume: "500ml",  price: 10, image: bottleTamarind, accent: "var(--mango)",  href: "/tamarind" },
  { slug: "water",    name: "KK Pure Drink Water", fullName: "KK Pure Drinking Water",                short: "Pure Water",    tagline: "Hydration, perfected.",         category: "Water",      volume: "1500ml", price: 10, image: bottleWater,    accent: "var(--sea)",    href: "/water" },
];

/** Convert a millilitre volume string (e.g. "500ml") to a centilitre label (e.g. "50cl"). */
export const toCl = (volume: string): string => {
  const ml = parseInt(volume, 10);
  if (Number.isNaN(ml)) return volume;
  const cl = ml / 10;
  return `${Number.isInteger(cl) ? cl : cl.toFixed(1)}cl`;
};

export const getDrink = (slug: string) => DRINKS.find((d) => d.slug === slug);
