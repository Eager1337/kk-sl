import { Layout } from "@/components/site/Layout";
import { SpinBottle } from "@/components/site/SpinBottle";
import { OrderDialog } from "@/components/site/OrderDialog";
import { DRINKS, getDrink } from "@/data/drinks";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Truck, Sparkles, Leaf } from "lucide-react";
import wood from "@/assets/wood-bg.jpg";
import lineup from "@/assets/kk-lineup.jpeg";
import lineupTall from "@/assets/kk-lineup-tall.jpeg";
import fruityFour from "@/assets/kk-fruity-four.jpeg";

const Index = () => {
  const heroDrinks = ["mango", "yogurt", "orange"].map(getDrink).filter(Boolean) as ReturnType<typeof getDrink>[] & {};
  const sorten = DRINKS.filter((d) => ["mango", "orange", "mixed-fruit"].includes(d.slug));

  return (
    <Layout>
      {/* HERO — wood with three spinning bottles */}
      <section
        className="relative -mt-16 pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden"
        style={{ backgroundImage: `linear-gradient(180deg, hsla(22,35%,8%,0.5), hsla(22,35%,12%,0.7)), url(${wood})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="mx-auto max-w-[1200px] grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 text-white fade-up">
            <span className="eyebrow text-[hsl(var(--sun))]">KK Drinks · Estd. Sierra Leone</span>
            <h1 className="display text-5xl md:text-7xl mt-4 mb-5">
              However refreshing you are,<br />
              <span className="italic text-[hsl(var(--sun))]">KK is more refreshing.</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-md leading-relaxed">
              Crafted in Freetown. Bottled with sunshine. Seven flavours, one unmistakable taste — every drink just <span className="font-semibold text-[hsl(var(--sun))]">Le 10</span>.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <OrderDialog trigger={<button className="btn-pill bg-[hsl(var(--sun))] text-[hsl(var(--wood))]">Order Now · Le 10</button>} />
              <Link to="/store" className="btn-pill bg-white/10 text-white border border-white/20 backdrop-blur">Explore drinks</Link>
            </div>
          </div>
          <div className="order-1 md:order-2 relative h-[440px] md:h-[560px] fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="absolute left-[8%] top-[18%] w-[36%] z-10 opacity-90">
              <SpinBottle src={heroDrinks[0]!.image} alt={heroDrinks[0]!.name} speed="slow" glow="hsl(var(--mango))" priority />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[44%] z-20">
              <SpinBottle src={heroDrinks[1]!.image} alt={heroDrinks[1]!.name} glow="hsl(var(--sun))" priority />
            </div>
            <div className="absolute right-[8%] top-[22%] w-[34%] z-10 opacity-90">
              <SpinBottle src={heroDrinks[2]!.image} alt={heroDrinks[2]!.name} speed="slow" glow="hsl(var(--sun))" priority />
            </div>
          </div>
        </div>
        {/* torn paper bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[hsl(var(--paper))] torn-top" aria-hidden />
      </section>

      {/* TRUST BADGES strip */}
      <section className="paper-bg py-10 px-6 border-b border-kraft">
        <div className="mx-auto max-w-[1200px] grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { Icon: Leaf, t: "Made in Sierra Leone", s: "Locally bottled in Freetown" },
            { Icon: Award, t: "NAFDAC & SLSB", s: "Certified safe & approved" },
            { Icon: Truck, t: "Delivery available", s: "Order & pay on delivery" },
            { Icon: Sparkles, t: "Always Le 10", s: "One price. Every drink." },
          ].map(({ Icon, t, s }) => (
            <div key={t} className="flex items-start gap-3">
              <Icon className="h-6 w-6 text-[hsl(var(--sea))] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-sm">{t}</div>
                <div className="text-xs text-muted-foreground">{s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KK ESTD section — Apple-tile style icons */}
      <section className="paper-bg py-20 px-6 text-center">
        <p className="eyebrow text-[hsl(var(--sea))]">KK · Bottled in Sierra Leone</p>
        <h2 className="display text-4xl md:text-5xl mt-3 mb-12">Sip a little sunshine.</h2>
        <div className="mx-auto max-w-[1100px] grid md:grid-cols-3 gap-10">
          <div>
            <div className="mx-auto h-20 mb-4 flex items-center justify-center text-[hsl(var(--sea))]">
              <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 8h6v8h-6zM36 8h6v8h-6zM18 16h28v40a4 4 0 0 1-4 4H22a4 4 0 0 1-4-4z"/></svg>
            </div>
            <h3 className="eyebrow mb-2">Discover our flavours</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">Take a peek at our full range. Seven distinct drinks — there's a KK for every craving.</p>
          </div>
          <div>
            <div className="mx-auto h-20 mb-4 flex items-center justify-center text-[hsl(var(--sea))]">
              <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M32 6c-9 0-16 7-16 16 0 12 16 30 16 30s16-18 16-30c0-9-7-16-16-16z"/><circle cx="32" cy="22" r="5"/></svg>
            </div>
            <h3 className="eyebrow mb-2">Where to buy KK</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">Find KK Drinks at shops, stalls and supermarkets across Sierra Leone.</p>
          </div>
          <div>
            <div className="mx-auto h-20 mb-4 flex items-center justify-center text-[hsl(var(--sea))]">
              <svg viewBox="0 0 64 64" className="h-16 w-16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 16h48v32H8z"/><path d="M8 16l24 18 24-18"/></svg>
            </div>
            <h3 className="eyebrow mb-2">Want to stock KK?</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">Restaurants, hotels, kiosks — get in touch and bring KK to your customers.</p>
          </div>
        </div>
        <Link to="/store" className="btn-brush mt-12">The Drinks</Link>
      </section>

      {/* WOOD STRIP — polaroid story */}
      <section
        className="relative py-24 px-6 overflow-hidden"
        style={{ backgroundImage: `linear-gradient(180deg, hsla(22,35%,8%,0.55), hsla(22,35%,10%,0.7)), url(${wood})`, backgroundSize: "cover" }}
      >
        <div className="absolute top-0 left-0 right-0 h-12 paper-bg torn-top rotate-180" aria-hidden />
        <div className="mx-auto max-w-[1200px] grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[420px]">
            <div className="absolute left-0 top-4 w-56 polaroid -rotate-6 hover:rotate-0 hover:scale-105 transition-transform duration-500">
              <img src={lineup} alt="KK lineup" className="w-full h-56 object-cover" loading="lazy" />
              <p className="text-center text-xs mt-2 text-foreground italic">The KK family</p>
            </div>
            <div className="absolute right-4 top-12 w-56 polaroid rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-500">
              <img src={fruityFour} alt="KK fruity range" className="w-full h-56 object-cover" loading="lazy" />
              <p className="text-center text-xs mt-2 text-foreground italic">Fruity four</p>
            </div>
            <div className="absolute left-10 bottom-0 w-52 polaroid -rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-500">
              <img src={lineupTall} alt="Tall lineup" className="w-full h-52 object-cover" loading="lazy" />
              <p className="text-center text-xs mt-2 text-foreground italic">From our brewery</p>
            </div>
          </div>
          <div className="text-white">
            <h2 className="display text-4xl md:text-5xl text-[hsl(var(--sea))] mb-6">Learn more about<br />the KK story</h2>
            <p className="text-white/80 leading-relaxed mb-4">
              KK was born in Sierra Leone with one belief: refreshment should taste like home. From sweet ripe mango to creamy pineapple yogurt, every bottle is filled in our Freetown facility with care.
            </p>
            <p className="text-white/80 leading-relaxed">
              We work with local farmers, follow strict quality standards, and keep the price simple — Le 10 a bottle, no matter the flavour.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 mt-6 text-[hsl(var(--sun))] font-semibold hover:gap-3 transition-all">
              Read our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 paper-bg torn-top" aria-hidden />
      </section>

      {/* DIE SORTEN — three featured spinning bottles */}
      <section className="paper-bg py-24 px-6">
        <div className="mx-auto max-w-[1200px] text-center">
          <p className="eyebrow text-[hsl(var(--sea))]">Die Sorten</p>
          <h2 className="display text-4xl md:text-5xl mt-3 mb-14">The flavours.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {sorten.map((d, i) => (
              <div key={d.slug} className="flex flex-col items-center fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-full max-w-[240px] h-[360px] flex items-end">
                  <SpinBottle src={d.image} alt={d.name} glow={`hsl(${d.accent})`} speed={i % 2 === 0 ? "normal" : "slow"} />
                </div>
                <h3 className="display text-2xl mt-6">{d.short}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">{d.tagline}</p>
                <OrderDialog initialDrink={d} trigger={<button className="btn-brush">Order · Le {d.price}</button>} />
              </div>
            ))}
          </div>
          <Link to="/store" className="inline-flex items-center gap-2 mt-14 font-semibold text-[hsl(var(--sea))] hover:gap-3 transition-all">
            See all 7 drinks <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* INSTAGRAM marquee strip */}
      <section className="bg-[hsl(var(--sea))] py-12 overflow-hidden">
        <div className="text-center mb-8 text-white">
          <p className="eyebrow opacity-80">@kkdrinks_sl</p>
          <h2 className="display text-3xl md:text-4xl mt-2">Fresh from our feed.</h2>
        </div>
        <div className="flex marquee-track gap-4 w-max">
          {[lineup, fruityFour, lineupTall, lineup, fruityFour, lineupTall, lineup, fruityFour].concat([lineup, fruityFour, lineupTall, lineup, fruityFour, lineupTall, lineup, fruityFour]).map((src, i) => (
            <div key={i} className="h-44 w-44 md:h-56 md:w-56 shrink-0 rounded-xl overflow-hidden bg-white shadow-lg">
              <img src={src} alt="KK on Instagram" className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="paper-bg py-20 px-6 text-center">
        <h2 className="display text-4xl md:text-6xl">Until your next sip.</h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Stock up on KK today. Pay on delivery anywhere in Sierra Leone — every bottle just Le 10.</p>
        <div className="mt-8">
          <OrderDialog trigger={<button className="btn-pill bg-[hsl(var(--wood))] text-white text-base px-8 py-3">Place an order →</button>} />
        </div>
      </section>
    </Layout>
  );
};

export default Index;
