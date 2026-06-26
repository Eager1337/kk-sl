import { OrderDialog } from "@/components/site/OrderDialog";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { toCl, type Drink } from "@/data/drinks";
import { track } from "@/lib/analytics";

interface ProductCardProps {
  drink: Drink;
  index?: number;
}

/**
 * Uniform, premium e-commerce product card.
 * Static (no spin/float) to guarantee a stable, clip-free grid layout.
 */
export const ProductCard = ({ drink, index = 0 }: ProductCardProps) => {
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl fade-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* image area — isolated transparent bottle on soft cream wash */}
      <div className="relative flex h-60 items-center justify-center overflow-hidden bg-gradient-to-b from-[hsl(var(--paper))] to-card px-6 pt-6">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-4 bottom-0 rounded-full opacity-50 blur-2xl"
          style={{ background: `radial-gradient(ellipse at center, hsl(${drink.accent} / 0.4), transparent 70%)` }}
        />
        <img
          src={drink.image}
          alt={`${drink.fullName} — ${drink.volume} bottle`}
          loading="lazy"
          decoding="async"
          width={240}
          height={320}
          className="relative z-10 h-[15rem] w-auto object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.18)] transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* details */}
      <div className="flex flex-1 flex-col px-5 pt-4">
        <p className="eyebrow text-[10px] text-[hsl(var(--sea))]">{drink.category}</p>
        <h3 className="mt-1 text-base font-semibold leading-snug text-foreground text-balance">
          {drink.fullName}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <span>{toCl(drink.volume)}</span>
          <span aria-hidden className="h-1 w-1 rounded-full bg-muted-foreground/40" />
          <span className="display text-lg text-foreground">Le {drink.price}</span>
        </div>

        {drink.href && (
          <Link
            to={drink.href}
            className="mt-1 inline-block text-[11px] font-medium text-[hsl(var(--sea))] hover:underline"
          >
            View details
          </Link>
        )}

        {/* add to cart pinned to the bottom for uniform card height */}
        <div className="mt-auto pb-5 pt-4">
          <OrderDialog
            initialDrink={drink}
            trigger={
              <button
                onClick={() => track("add_to_cart", { label: drink.fullName, value: drink.price, meta: { slug: drink.slug } })}
                className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-full bg-[hsl(var(--wood))] px-5 py-3 text-sm font-semibold text-[hsl(var(--wood-foreground))] shadow-md transition-all hover:bg-[hsl(var(--sea))] hover:shadow-lg active:scale-[0.98]"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            }
          />
        </div>
      </div>
    </article>
  );
};
