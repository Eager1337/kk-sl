import { Layout } from "@/components/site/Layout";
import { Search } from "lucide-react";

const topics = [
  "Lumen Phone", "Lumen Book", "Lumen Watch", "Lumen Buds",
  "Tablet", "Lumen ID & Password", "Billing & Subscriptions", "Repair",
];

const Support = () => (
  <Layout>
    <section className="bg-subtle py-20 text-center px-6">
      <h1 className="display text-5xl md:text-6xl">Lumen Support</h1>
      <p className="mt-4 text-xl text-muted-foreground">We're here to help.</p>
      <div className="mt-8 max-w-xl mx-auto relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search support"
          className="w-full rounded-full border border-border bg-background pl-12 pr-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </section>
    <section className="max-w-[1024px] mx-auto px-6 py-16">
      <h2 className="display text-3xl mb-8">Browse by topic</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
        {topics.map((t) => (
          <a key={t} href="#" className="bg-card rounded-2xl p-6 hover:bg-muted transition-colors">
            <h3 className="font-medium">{t}</h3>
            <p className="text-sm text-muted-foreground mt-1">Get help & guides</p>
          </a>
        ))}
      </div>
    </section>
  </Layout>
);

export default Support;
