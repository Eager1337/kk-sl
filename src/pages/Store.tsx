import { Layout } from "@/components/site/Layout";
import phone from "@/assets/phone.jpg";
import laptop from "@/assets/laptop.jpg";
import watch from "@/assets/watch.jpg";
import buds from "@/assets/buds.jpg";
import tablet from "@/assets/tablet.jpg";

const items = [
  { name: "Lumen Phone 16 Pro", price: "From $999", img: phone },
  { name: "Lumen Book Air", price: "From $1,199", img: laptop },
  { name: "Lumen Watch Series 10", price: "From $399", img: watch },
  { name: "Lumen Buds Pro", price: "From $249", img: buds },
  { name: "Lumen Tablet", price: "From $599", img: tablet },
];

const Store = () => (
  <Layout>
    <section className="px-6 py-16 max-w-[1024px] mx-auto">
      <h1 className="display text-5xl md:text-6xl mb-2">Store.</h1>
      <p className="text-2xl text-muted-foreground">The best way to buy the products you love.</p>
    </section>
    <section className="px-6 pb-24 max-w-[1024px] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((p) => (
        <article key={p.name} className="bg-card rounded-2xl p-6 flex flex-col items-center text-center min-h-[400px]">
          <img src={p.img} alt={p.name} loading="lazy" className="h-52 object-contain mb-6" />
          <h3 className="text-lg font-semibold">{p.name}</h3>
          <p className="text-muted-foreground text-sm mt-1">{p.price}</p>
          <button className="btn-pill bg-accent text-accent-foreground mt-auto mt-6">Buy</button>
        </article>
      ))}
    </section>
  </Layout>
);

export default Store;
