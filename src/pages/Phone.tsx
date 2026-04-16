import { Layout } from "@/components/site/Layout";
import phone from "@/assets/phone.jpg";
import { Link } from "react-router-dom";

const specs = [
  { k: "Display", v: '6.3" OLED ProMotion, 2622×1206' },
  { k: "Chip", v: "Lumen L18 Bionic — 3nm" },
  { k: "Camera", v: "48MP Fusion + 12MP Ultra Wide" },
  { k: "Battery", v: "Up to 28 hours video playback" },
  { k: "Material", v: "Aerospace-grade titanium" },
  { k: "Storage", v: "256GB / 512GB / 1TB" },
];

const Phone = () => (
  <Layout>
    <section className="bg-subtle py-20 text-center px-6">
      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">New</p>
      <h1 className="display text-5xl md:text-7xl">Lumen Phone 16 Pro</h1>
      <p className="mt-4 text-xl md:text-2xl text-muted-foreground">Titanium. So strong. So light. So Pro.</p>
      <div className="flex justify-center gap-4 mt-6">
        <Link to="#" className="btn-pill bg-accent text-accent-foreground px-6">Buy from $999</Link>
        <a className="pill-link" href="#">Watch the film ›</a>
      </div>
      <img src={phone} alt="Lumen Phone 16 Pro" className="mx-auto mt-12 max-h-[600px]" />
    </section>

    <section className="py-24 px-6 max-w-4xl mx-auto text-center">
      <h2 className="display text-4xl md:text-5xl">Forged in fire. Built for life.</h2>
      <p className="mt-6 text-lg text-muted-foreground">
        A Grade 5 titanium frame meets a polished ceramic shield. The result is our most durable phone ever — and the lightest Pro to date.
      </p>
    </section>

    <section className="bg-foreground text-background py-24 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <p className="text-xs font-semibold tracking-widest uppercase opacity-70">L18 Bionic</p>
        <h2 className="display text-4xl md:text-5xl">A new class of chip.</h2>
        <p className="text-lg opacity-80 mt-4">
          16-core Neural Engine. 6-core GPU. Up to 40% faster machine learning. Studio-grade video encode in real time.
        </p>
      </div>
    </section>

    <section className="py-20 px-6 max-w-5xl mx-auto">
      <h2 className="display text-3xl md:text-4xl text-center mb-10">Tech Specs</h2>
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

export default Phone;
