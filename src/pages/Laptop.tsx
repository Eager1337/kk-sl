import { Layout } from "@/components/site/Layout";
import laptop from "@/assets/laptop.jpg";
import { Link } from "react-router-dom";

const Laptop = () => (
  <Layout>
    <section className="bg-foreground text-background py-20 text-center px-6">
      <h1 className="display text-5xl md:text-7xl">Lumen Book Air</h1>
      <p className="mt-4 text-xl md:text-2xl opacity-80">Speed of thought. Battery of legend.</p>
      <div className="flex justify-center gap-4 mt-6">
        <Link to="#" className="btn-pill bg-background text-foreground px-6">Buy from $1,199</Link>
        <a className="pill-link" href="#">Learn more ›</a>
      </div>
      <img src={laptop} alt="Lumen Book Air" className="mx-auto mt-12 max-h-[520px]" />
    </section>

    <section className="grid md:grid-cols-3 gap-2 p-2 bg-background">
      {[
        { t: "L4 Chip", d: "Up to 2× faster than the previous generation. Whisper-quiet, fanless design." },
        { t: "22-hr battery", d: "All-day power. And then some. Charge fast. Last long." },
        { t: '15.3" Liquid Retina', d: "500 nits, P3 wide color, 1 billion colors. Stunning from any angle." },
      ].map((f) => (
        <div key={f.t} className="bg-card rounded-2xl p-10 min-h-[280px] flex flex-col justify-end">
          <h3 className="display text-2xl mb-2">{f.t}</h3>
          <p className="text-muted-foreground">{f.d}</p>
        </div>
      ))}
    </section>
  </Layout>
);

export default Laptop;
