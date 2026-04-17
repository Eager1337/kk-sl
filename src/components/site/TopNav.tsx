import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { OrderDialog } from "./OrderDialog";

const links = [
  { to: "/", label: "Home" },
  { to: "/store", label: "Our Drinks" },
  { to: "/about", label: "Our Story" },
  { to: "/support", label: "Contact" },
];

export const TopNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 nav-blur border-b border-white/5">
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 text-[13px] text-white/90">
        <Link to="/" aria-label="KK Drinks home" className="flex items-center gap-2">
          <span className="display text-2xl text-[hsl(var(--sun))]">KK</span>
          <span className="hidden sm:inline text-[10px] tracking-[0.3em] uppercase opacity-70">Sierra Leone</span>
        </Link>
        <ul className="hidden md:flex items-center gap-9 tracking-[0.15em] uppercase text-[11px] font-semibold">
          {links.map((l) => (
            <li key={l.label}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `transition-colors hover:text-[hsl(var(--sun))] ${isActive ? "text-[hsl(var(--sun))]" : "opacity-90"}`
                }
                end={l.to === "/"}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-3">
          <OrderDialog
            trigger={
              <button className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase bg-[hsl(var(--sun))] text-[hsl(var(--wood))] rounded-full px-4 py-2 hover:scale-[1.03] transition-transform">
                <ShoppingBag className="h-3.5 w-3.5" /> Order
              </button>
            }
          />
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white" aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[hsl(var(--wood))]">
          <ul className="flex flex-col px-6 py-4 gap-4 text-base text-white">
            {links.map((l) => (
              <li key={l.label}>
                <NavLink to={l.to} onClick={() => setOpen(false)} className="block">
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <OrderDialog
                trigger={
                  <button className="w-full bg-[hsl(var(--sun))] text-[hsl(var(--wood))] rounded-full py-3 text-sm font-bold uppercase tracking-[0.2em]">
                    Order Now
                  </button>
                }
              />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
