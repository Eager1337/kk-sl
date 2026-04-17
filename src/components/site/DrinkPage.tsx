import { Layout } from "@/components/site/Layout";
import { Link } from "react-router-dom";

interface DrinkPageProps {
  eyebrow?: string;
  name: string;
  tagline: string;
  image: string;
  description: string;
  highlight: { title: string; body: string };
  specs: { k: string; v: string }[];
}

export const DrinkPage = ({ eyebrow, name, tagline, image, description, highlight, specs }: DrinkPageProps) => (
  <Layout>
    <section className="bg-subtle py-20 text-center px-6">
      {eyebrow && <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">{eyebrow}</p>}
      <h1 className="display text-5xl md:text-7xl">{name}</h1>
      <p className="mt-4 text-xl md:text-2xl text-muted-foreground">{tagline}</p>
      <div className="flex justify-center gap-4 mt-6 items-center">
        <span className="btn-pill bg-accent text-accent-foreground px-6 opacity-90 cursor-not-allowed">Le 10 · Coming soon</span>
        <Link to="/store" className="pill-link">View all drinks ›</Link>
      </div>
      <img src={image} alt={name} className="mx-auto mt-12 max-h-[600px] object-contain drop-shadow-2xl" />
    </section>

    <section className="py-24 px-6 max-w-4xl mx-auto text-center">
      <h2 className="display text-4xl md:text-5xl">{highlight.title}</h2>
      <p className="mt-6 text-lg text-muted-foreground">{highlight.body}</p>
    </section>

    <section className="bg-foreground text-background py-24 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <p className="text-xs font-semibold tracking-widest uppercase opacity-70">Made in Sierra Leone</p>
        <h2 className="display text-4xl md:text-5xl">Crafted with care.</h2>
        <p className="text-lg opacity-80 mt-4">{description}</p>
      </div>
    </section>

    <section className="py-20 px-6 max-w-5xl mx-auto">
      <h2 className="display text-3xl md:text-4xl text-center mb-10">Product Details</h2>
      <dl className="grid md:grid-cols-2 gap-x-12 gap-y-4">
        {specs.map((s) => (
          <div key={s.k} className="flex justify-between border-b border-border py-3 text-sm">
            <dt className="font-medium">{s.k}</dt>
            <dd className="text-muted-foreground text-right">{s.v}</dd>
          </div>
        ))}
      </dl>
    </section>
  </Layout>
);
