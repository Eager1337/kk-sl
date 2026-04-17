import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/store", label: "All Drinks" },
  { to: "/mango", label: "Mango" },
  { to: "/mixed-fruit", label: "Mixed Fruit" },
  { to: "/yogurt", label: "Yogurt" },
  { to: "/water", label: "Pure Water" },
  { to: "/about", label: "About" },
  { to: "/support", label: "Support" },
];

export const TopNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 nav-blur border-b border-border/40">
      <nav className="mx-auto flex h-12 max-w-[1024px] items-center justify-between px-6 text-[12px] text-foreground/90">
        <Link to="/" aria-label="KK Drinks home" className="flex items-center font-bold tracking-tight text-base">
          KK
        </Link>
        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.label}>
              <NavLink to={l.to} className="opacity-80 hover:opacity-100 transition-opacity">
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="hidden md:flex items-center gap-6">
          <button aria-label="Search" className="opacity-80 hover:opacity-100"><Search size={14} /></button>
          <Link to="/store" aria-label="Bag" className="opacity-80 hover:opacity-100"><ShoppingBag size={14} /></Link>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <ul className="flex flex-col px-6 py-4 gap-4 text-base">
            {links.map((l) => (
              <li key={l.label}>
                <NavLink to={l.to} onClick={() => setOpen(false)} className="block">{l.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
