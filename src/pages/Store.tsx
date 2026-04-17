import { Layout } from "@/components/site/Layout";
import mango from "@/assets/kk-mango.jpeg";
import mixed from "@/assets/kk-mixed-fruit.jpeg";
import orange from "@/assets/kk-orange.jpeg";
import apple from "@/assets/kk-apple.jpeg";
import tamarind from "@/assets/kk-tamarind.jpeg";
import yogurt from "@/assets/kk-pineapple-yogurt.jpeg";
import water from "@/assets/kk-water.jpeg";

const items = [
  { name: "KK Mango Fruity Soft Drink", size: "500ml", img: mango },
  { name: "KK Orange Fruity Soft Drink", size: "500ml", img: orange },
  { name: "KK Mixed Fruit Soft Drink", size: "500ml", img: mixed },
  { name: "KK Carbonated Apple Soft Drink", size: "500ml", img: apple },
  { name: "KK Carbonated Tamarind Soft Drink", size: "500ml", img: tamarind },
  { name: "KK Pineapple Yogurt Beverage", size: "500ml", img: yogurt },
  { name: "KK Pure Drink Water", size: "1500ml", img: water },
];

const Store = () => (
  <Layout>
    <section className="px-6 py-16 max-w-[1024px] mx-auto">
      <h1 className="display text-5xl md:text-6xl mb-2">All Drinks.</h1>
      <p className="text-2xl text-muted-foreground">Every KK flavour, in one place. Le 10 each.</p>
      <p className="text-sm text-muted-foreground mt-3">
        Online ordering coming soon. Available at shops across Sierra Leone.
      </p>
    </section>
    <section className="px-6 pb-24 max-w-[1024px] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((p) => (
        <article key={p.name} className="bg-card rounded-2xl p-6 flex flex-col items-center text-center min-h-[420px]">
          <img src={p.img} alt={p.name} loading="lazy" className="h-56 object-contain mb-6" />
          <h3 className="text-base font-semibold leading-tight">{p.name}</h3>
          <p className="text-muted-foreground text-sm mt-1">{p.size} · Le 10</p>
          <span className="btn-pill bg-accent text-accent-foreground mt-auto opacity-80 cursor-not-allowed">Coming soon</span>
        </article>
      ))}
    </section>
  </Layout>
);

export default Store;
