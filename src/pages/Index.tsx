import { Layout } from "@/components/site/Layout";
import { ProductTile } from "@/components/site/ProductTile";
import mango from "@/assets/kk-mango.jpeg";
import mixed from "@/assets/kk-mixed-fruit.jpeg";
import orange from "@/assets/kk-orange.jpeg";
import apple from "@/assets/kk-apple.jpeg";
import tamarind from "@/assets/kk-tamarind.jpeg";
import yogurt from "@/assets/kk-pineapple-yogurt.jpeg";
import water from "@/assets/kk-water.jpeg";
import lineup from "@/assets/kk-lineup.jpeg";

const Index = () => {
  return (
    <Layout>
      {/* Promo strip */}
      <div className="bg-subtle py-3 text-center text-sm text-muted-foreground">
        Online ordering is coming soon. Find KK Drinks at shops across Sierra Leone today.{" "}
        <a className="pill-link" href="/about">Learn more</a>
      </div>

      <div className="space-y-2 py-2 bg-background">
        <ProductTile
          eyebrow="New"
          title="KK Mango Fruity"
          tagline="The taste of sunshine. Bottled in Sierra Leone."
          image={mango}
          primaryHref="/mango"
          primaryLabel="Learn more"
          secondaryLabel="Le 10 · Coming soon"
        />

        <ProductTile
          title="KK Mixed Fruit"
          tagline="Berry. Bold. Brilliantly refreshing."
          image={mixed}
          primaryHref="/mixed-fruit"
          secondaryLabel="Le 10 · Coming soon"
          variant="dark"
        />

        <div className="grid md:grid-cols-2 gap-2">
          <ProductTile
            title="KK Orange Fruity"
            tagline="Pure citrus joy."
            image={orange}
            primaryHref="/store"
            secondaryLabel="Le 10 · Coming soon"
            size="half"
          />
          <ProductTile
            title="KK Apple Soda"
            tagline="Crisp, carbonated, classic."
            image={apple}
            primaryHref="/store"
            secondaryLabel="Le 10 · Coming soon"
            size="half"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-2">
          <ProductTile
            title="KK Tamarind Soda"
            tagline="Tangy. Spicy. Unmistakable."
            image={tamarind}
            primaryHref="/store"
            secondaryLabel="Le 10 · Coming soon"
            size="half"
            variant="dark"
          />
          <ProductTile
            title="KK Pineapple Yogurt"
            tagline="Creamy meets tropical."
            image={yogurt}
            primaryHref="/yogurt"
            secondaryLabel="Le 10 · Coming soon"
            size="half"
          />
        </div>

        <ProductTile
          title="KK Pure Drink Water"
          tagline="Hydration, perfected. 1500ml of pure refreshment."
          image={water}
          primaryHref="/water"
          secondaryLabel="Le 10 · Coming soon"
          textPosition="bottom"
        />

        {/* Family lineup */}
        <section className="bg-card text-center px-6 py-20">
          <p className="text-xs font-semibold tracking-widest uppercase opacity-70 mb-2">The KK Family</p>
          <h2 className="display text-4xl md:text-5xl mb-3">One brand. Every flavour you love.</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto mb-10">
            From pure drinking water to creamy yogurt beverages and bold carbonated sodas — there's a KK for every moment.
          </p>
          <img src={lineup} alt="The full KK Drinks family lineup" className="mx-auto max-h-[480px] w-auto object-contain rounded-2xl" />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
