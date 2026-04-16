import { Link } from "react-router-dom";

const groups = [
  {
    title: "Shop and Learn",
    items: ["Store", "Lumen Book", "Lumen Phone", "Lumen Watch", "Audio", "Tablet", "Accessories"],
  },
  {
    title: "Account",
    items: ["Manage Your Lumen ID", "Lumen Store Account", "Order Status", "Shopping Help"],
  },
  {
    title: "Lumen Services",
    items: ["Lumen One", "Lumen Cloud+", "Lumen Music", "Lumen TV", "Lumen Pay"],
  },
  {
    title: "About Lumen",
    items: ["Newsroom", "Leadership", "Career Opportunities", "Investors", "Ethics & Compliance", "Contact"],
  },
];

export const Footer = () => (
  <footer className="bg-subtle text-[12px] text-muted-foreground">
    <div className="mx-auto max-w-[1024px] px-6 py-8 space-y-6">
      <p className="border-b border-border pb-5 leading-relaxed">
        A monthly trade-in payment example. Pricing based on a 24-month term and includes credit towards a new device.
        Final terms vary based on credit standing and product configuration. See your local Lumen retailer for details.
      </p>
      <p className="border-b border-border pb-5 leading-relaxed">
        Lumen is a placeholder brand created for design demonstration purposes only. No affiliation with any real company.
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
        <span>Copyright © {new Date().getFullYear()} Lumen Demo Inc. All rights reserved.</span>
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
