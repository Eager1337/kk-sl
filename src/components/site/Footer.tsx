import { Link } from "react-router-dom";

const groups = [
  {
    title: "Our Drinks",
    items: ["Mango Fruity", "Orange Fruity", "Mixed Fruit", "Apple Carbonated", "Tamarind Carbonated", "Pineapple Yogurt", "Pure Drink Water"],
  },
  {
    title: "Company",
    items: ["About KK", "Our Story", "Sustainability", "Careers", "Press"],
  },
  {
    title: "For Business",
    items: ["Wholesale", "Distributors", "Become a Stockist", "Bulk Orders"],
  },
  {
    title: "Support",
    items: ["Contact Us", "FAQs", "Quality & Safety", "Find a Shop", "Report an Issue"],
  },
];

export const Footer = () => (
  <footer className="bg-subtle text-[12px] text-muted-foreground">
    <div className="mx-auto max-w-[1024px] px-6 py-8 space-y-6">
      <p className="border-b border-border pb-5 leading-relaxed">
        Online ordering is coming soon. All prices shown are recommended retail in Sierra Leonean Leones (Le). Prices may
        vary by stockist and region.
      </p>
      <p className="border-b border-border pb-5 leading-relaxed">
        KK Drinks is proudly produced in Sierra Leone. NAFDAC and SLSB approved manufacturing.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-6 border-b border-border">
        {groups.map((g) => (
          <div key={g.title}>
            <h4 className="text-foreground font-semibold mb-3">{g.title}</h4>
            <ul className="space-y-2">
              {g.items.map((i) => (
                <li key={i}><Link to="/store" className="hover:underline">{i}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row md:justify-between gap-3">
        <span>Copyright © {new Date().getFullYear()} KK Drinks Sierra Leone. All rights reserved.</span>
        <div className="flex gap-4">
          <Link to="#" className="hover:underline">Privacy Policy</Link>
          <Link to="#" className="hover:underline">Terms of Use</Link>
          <Link to="#" className="hover:underline">Sales Policy</Link>
          <Link to="#" className="hover:underline">Site Map</Link>
        </div>
      </div>
    </div>
  </footer>
);
