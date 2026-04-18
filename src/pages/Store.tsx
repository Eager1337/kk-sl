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
        Seven distinct flavours. One simple price · <span className="font-semibold text-foreground">Le 10</span> per bottle.
      </p>
    </section>

    <section className="paper-bg pb-20 px-4 sm:px-6">
      <div className="mx-auto max-w-[1200px] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {DRINKS.map((d, i) => (
          <article
            key={d.slug}
            className="bg-white rounded-2xl p-4 sm:p-5 pt-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="h-40 sm:h-48 flex items-end">
              <SpinBottle src={d.image} alt={d.name} glow={`hsl(${d.accent})`} speed={i % 2 === 0 ? "normal" : "slow"} />
            </div>
            <div className="text-center mt-4 space-y-0.5">
              <p className="eyebrow text-[10px] text-[hsl(var(--sea))]">{d.category}</p>
              <h3 className="display text-lg sm:text-xl">{d.short}</h3>
              <p className="text-xs text-muted-foreground line-clamp-1">{d.tagline}</p>
            </div>
            <div className="flex items-center justify-between gap-2 mt-4">
              <span className="display text-lg">Le {d.price}</span>
              <OrderDialog initialDrink={d} trigger={<button className="btn-brush text-[9px] px-4 py-2">Order</button>} />
            </div>
            {d.href && (
              <Link to={d.href} className="block text-center text-[11px] text-[hsl(var(--sea))] mt-2 hover:underline">
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
