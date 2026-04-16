import { Layout } from "@/components/site/Layout";
import { ProductTile } from "@/components/site/ProductTile";
import phone from "@/assets/phone.jpg";
import laptop from "@/assets/laptop.jpg";
import watch from "@/assets/watch.jpg";
import buds from "@/assets/buds.jpg";
import tablet from "@/assets/tablet.jpg";

const Index = () => {
  return (
    <Layout>
      {/* Promo strip */}
      <div className="bg-subtle py-3 text-center text-sm text-muted-foreground">
        Get up to 12 months of free Lumen Cloud+ when you buy a Lumen device.{" "}
        <a className="pill-link" href="#">Learn more</a>
      </div>

      <div className="space-y-2 py-2 bg-background">
        <ProductTile
          eyebrow="New"
          title="Lumen Phone 16 Pro"
          tagline="Engineered for the next decade. Built to last forever."
          image={phone}
          primaryLabel="Learn more"
          secondaryLabel="Buy"
        />

        <ProductTile
          title="Lumen Book Air"
          tagline="Speed of thought. Battery of legend."
          image={laptop}
          variant="dark"
        />

        <div className="grid md:grid-cols-2 gap-2">
          <ProductTile
            title="Lumen Watch"
            tagline="A healthier you, on the go."
            image={watch}
            size="half"
          />
          <ProductTile
            title="Lumen Buds Pro"
            tagline="Sound, sculpted for you."
            image={buds}
            size="half"
            variant="dark"
          />
        </div>

        <ProductTile
          title="Lumen Tablet"
          tagline="Your canvas. Reimagined."
          image={tablet}
          textPosition="bottom"
        />
      </div>
    </Layout>
  );
};

export default Index;
