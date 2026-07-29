import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { DRINKS } from "@/data/drinks";
import { Helmet } from "react-helmet-async";
import { Star } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const TESTIMONIALS = [
  { name: "Aminata K.", role: "Freetown", text: "KK Mango is my daughter's favourite. Always fresh, always cold from our local shop." },
  { name: "David S.", role: "Bo District", text: "We stock KK Pure Water for the whole office — clean taste, fair price, reliable delivery." },
  { name: "Fatmata B.", role: "Makeni", text: "The Pineapple Yogurt is unlike anything else on the market. A real Sierra Leonean signature." },
];

const Store = () => {
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (params.get("paid") === "1") {
      toast.success("Payment received — thank you! We'll call to confirm your delivery.");
    } else if (params.get("canceled") === "1") {
      toast("Payment canceled. Your order was saved — you can pay on delivery instead.");
    }
    if (params.get("paid") || params.get("canceled")) {
      // Clean the URL so the toast doesn't reappear on refresh.
      params.delete("paid");
      params.delete("canceled");
      params.delete("order");
      setParams(params, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
  <Layout>
    <Helmet>
      <title>Our Drinks · KK Drinks Sierra Leone</title>
      <meta name="description" content="Browse all seven KK Drinks flavours — fruity sodas, pineapple yogurt and pure water. Bottled fresh in Sierra Leone. Order yours today, every drink Le 10." />
      <link rel="canonical" href="/store" />
      <meta property="og:title" content="Our Drinks · KK Drinks Sierra Leone" />
      <meta property="og:description" content="Seven distinct flavours of refreshment, made in Freetown. Order online today." />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: DRINKS.map((d, i) => ({
          "@type": "Product",
          position: i + 1,
          name: d.name,
          description: d.tagline,
          category: d.category,
          offers: { "@type": "Offer", price: d.price, priceCurrency: "SLL", availability: "https://schema.org/InStock" },
        })),
      })}</script>
    </Helmet>

    {/* HERO */}
    <section className="paper-bg pt-32 pb-12 px-6 text-center">
      <p className="eyebrow text-[hsl(var(--sea))]">All KK Drinks</p>
      <h1 className="display text-5xl md:text-6xl mt-3">Pick your favourite.</h1>
      <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base">
        Seven distinct flavours. One simple price · <span className="font-semibold text-foreground">Le 10</span> per bottle.
      </p>
    </section>

    {/* PRODUCT GRID — uniform premium e-commerce cards */}
    <section className="paper-bg pb-16 px-4 sm:px-6">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {DRINKS.map((d, i) => (
          <ProductCard key={d.slug} drink={d} index={i} />
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-muted-foreground">Bottled fresh today · Delivered across Sierra Leone</p>
    </section>

    {/* TRUST / REVIEWS */}
    <section className="bg-[hsl(var(--wood))] text-[hsl(var(--wood-foreground))] py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="eyebrow text-[hsl(var(--sun))]">Loved across Sierra Leone</p>
        <h2 className="display text-4xl md:text-5xl mt-3">4.9 / 5 from 2,400+ families</h2>
        <div className="flex justify-center gap-1 mt-3" aria-label="4.9 out of 5 stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} size={20} className="fill-[hsl(var(--sun))] text-[hsl(var(--sun))]" />
          ))}
        </div>
        <p className="opacity-80 mt-4 max-w-2xl mx-auto">
          Trusted in homes, shops and offices from Freetown to Kenema. Every bottle is produced in our Freetown facility under strict quality control.
        </p>

        <div className="grid sm:grid-cols-3 gap-5 mt-10 text-left">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
              <div className="flex gap-0.5 mb-3" aria-hidden>
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} size={14} className="fill-[hsl(var(--sun))] text-[hsl(var(--sun))]" />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed opacity-95">"{t.text}"</blockquote>
              <figcaption className="mt-4 text-xs opacity-70">
                <span className="font-semibold">{t.name}</span> · {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>

    {/* SEO content */}
    <section className="paper-bg py-16 px-6">
      <div className="max-w-3xl mx-auto prose prose-sm">
        <h2 className="display text-3xl mb-4">Refreshing drinks made in Sierra Leone</h2>
        <p className="text-muted-foreground leading-relaxed">
          KK Drinks is a Sierra Leonean beverage company producing fruity soft drinks, carbonated sodas, pineapple yogurt and purified drinking water from our facility in Freetown. Every bottle is crafted with locally-sourced ingredients and filtered through a multi-stage purification process to deliver a clean, consistent taste.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Whether you're stocking your home, your shop, or your office, our seven flavours — Mango, Orange, Mixed Fruit, Apple Soda, Tamarind Soda, Pineapple Yogurt and Pure Water — give you a complete refreshment range at one simple price. Order online today and get fresh delivery across Sierra Leone.
        </p>
      </div>
    </section>
  </Layout>
  );
};

export default Store;
