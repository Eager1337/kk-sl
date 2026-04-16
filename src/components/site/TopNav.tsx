import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/store", label: "Store" },
  { to: "/laptop", label: "Lumen Book" },
  { to: "/phone", label: "Lumen Phone" },
  { to: "/watch", label: "Lumen Watch" },
  { to: "/store", label: "Audio" },
  { to: "/store", label: "Tablet" },
  { to: "/support", label: "Support" },
];

export const TopNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 nav-blur border-b border-border/40">
      <nav className="mx-auto flex h-12 max-w-[1024px] items-center justify-between px-6 text-[12px] text-foreground/90">
        <Link to="/" aria-label="Lumen home" className="flex items-center">
          <svg width="18" height="22" viewBox="0 0 18 22" fill="currentColor" aria-hidden>
            <path d="M9 2.2c.7-.9 1.9-1.6 3-1.6.1 1.2-.4 2.4-1.1 3.2-.7.9-1.9 1.6-3 1.5-.2-1.2.4-2.3 1.1-3.1zM12.6 6c-1.6-.1-3 .9-3.7.9-.8 0-1.9-.9-3.2-.8C4 6.2 2.5 7.2 1.7 8.7c-1.7 3-.4 7.5 1.2 10 .8 1.2 1.7 2.5 3 2.5 1.2 0 1.6-.8 3.1-.8 1.4 0 1.8.8 3.1.8 1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.5-.9-2.5-3.7 0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.7-3.2-1.8z"/>
          </svg>
        </Link>
        <ul className="hidden md:flex items-center gap-8">
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
