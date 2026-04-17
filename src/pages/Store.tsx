import { Layout } from "@/components/site/Layout";
import { SpinBottle } from "@/components/site/SpinBottle";
import { OrderDialog } from "@/components/site/OrderDialog";
import { DRINKS } from "@/data/drinks";
import { Link } from "react-router-dom";

const Store = () => (
  <Layout>
    <section className="paper-bg py-20 px-6 text-center">
      <p className="eyebrow text-[hsl(var(--sea))]">All KK Drinks</p>
      <h1 className="display text-5xl md:text-6xl mt-3">Pick your favourite.</h1>
      <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
        Seven distinct flavours. One simple price — <span className="font-semibold text-foreground">Le 10</span> per bottle.
      </p>
    </section>

    <section className="paper-bg pb-24 px-6">
      <div className="mx-auto max-w-[1200px] grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {DRINKS.map((d, i) => (
          <article key={d.slug} className="bg-white rounded-2xl p-6 pt-10 shadow-md hover:shadow-2xl transition-shadow">
            <div className="h-72 flex items-end">
              <SpinBottle src={d.image} alt={d.name} glow={`hsl(${d.accent})`} speed={i % 2 === 0 ? "normal" : "slow"} />
            </div>
            <div className="text-center mt-6 space-y-1">
              <p className="eyebrow text-[hsl(var(--sea))]">{d.category}</p>
              <h3 className="display text-2xl">{d.short}</h3>
              <p className="text-sm text-muted-foreground">{d.tagline}</p>
              <p className="text-xs text-muted-foreground/80">{d.volume}</p>
            </div>
            <div className="flex items-center justify-between gap-3 mt-5">
              <span className="display text-2xl">Le {d.price}</span>
              <OrderDialog initialDrink={d} trigger={<button className="btn-brush text-[10px]">Order</button>} />
            </div>
            {d.href && (
              <Link to={d.href} className="block text-center text-xs text-[hsl(var(--sea))] mt-3 hover:underline">
                Learn more →
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  </Layout>
);

export default Store;
