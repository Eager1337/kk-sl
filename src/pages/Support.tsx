import { Layout } from "@/components/site/Layout";
import { Search } from "lucide-react";

const topics = [
  { title: "Where to buy", body: "Find KK Drinks at shops and supermarkets across Sierra Leone." },
  { title: "Wholesale & distribution", body: "Become a stockist or distributor of the KK family of drinks." },
  { title: "Product safety", body: "All KK products are made under NAFDAC and SLSB approved standards." },
  { title: "Online orders", body: "Online ordering is coming soon. Sign up to be the first to know." },
  { title: "Report an issue", body: "Found a problem with a bottle? Let us know and we'll make it right." },
  { title: "Careers", body: "Join the team building Sierra Leone's favourite drinks brand." },
];

const Support = () => (
  <Layout>
    <section className="bg-subtle py-20 text-center px-6">
      <h1 className="display text-5xl md:text-6xl">KK Support</h1>
      <p className="mt-4 text-xl text-muted-foreground">How can we help you today?</p>
      <div className="mx-auto mt-8 max-w-xl flex items-center bg-background rounded-full px-5 py-3 shadow-sm">
        <Search size={16} className="text-muted-foreground" />
        <input
          className="bg-transparent outline-none w-full ml-3 text-sm"
          placeholder="Search for help with KK Drinks"
        />
      </div>
    </section>

    <section className="py-20 px-6 max-w-[1024px] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {topics.map((t) => (
        <article key={t.title} className="bg-card rounded-2xl p-8 min-h-[200px]">
          <h3 className="text-lg font-semibold mb-2">{t.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{t.body}</p>
        </article>
      ))}
    </section>

    <section className="bg-subtle py-16 px-6">
      <div className="max-w-[1024px] mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <p className="eyebrow text-muted-foreground mb-2">Visit</p>
          <p className="text-base leading-relaxed">KK Company Limited<br />Waterloo–Masiaka Highway<br />Kwama Village, Koya Rural District<br />Sierra Leone</p>
        </div>
        <div>
          <p className="eyebrow text-muted-foreground mb-2">Call</p>
          <p className="text-base leading-relaxed">
            <a href="tel:+232033666888" className="hover:underline">(+232) 033 666 888</a><br />
            <a href="tel:+232090555999" className="hover:underline">090 555 999</a>
          </p>
        </div>
        <div>
          <p className="eyebrow text-muted-foreground mb-2">Email</p>
          <p className="text-base leading-relaxed">
            <a href="mailto:kkfood866@gmail.com" className="hover:underline">kkfood866@gmail.com</a>
          </p>
        </div>
      </div>
    </section>
  </Layout>
);

export default Support;
