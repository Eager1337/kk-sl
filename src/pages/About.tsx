import { Layout } from "@/components/site/Layout";
import lineup from "@/assets/kk-lineup-tall.jpeg";
import fruity from "@/assets/kk-fruity-four.jpeg";

const About = () => (
  <Layout>
    <section className="bg-subtle py-20 text-center px-6">
      <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">About KK Drinks</p>
      <h1 className="display text-5xl md:text-7xl">Made in Sierra Leone.<br />Loved everywhere.</h1>
      <p className="mt-6 max-w-2xl mx-auto text-xl text-muted-foreground">
        KK is a Sierra Leonean drinks company crafting refreshing soft drinks, yogurt beverages and pure drinking water — at a price everyone can enjoy.
      </p>
    </section>

    <section className="py-20 px-6 max-w-[1024px] mx-auto grid md:grid-cols-2 gap-10 items-center">
      <img src={lineup} alt="The KK Drinks family" className="rounded-2xl w-full object-cover max-h-[520px]" />
      <div>
        <h2 className="display text-3xl md:text-4xl mb-4">Our story.</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          From a single bottling line to a beloved national brand, KK Drinks was built on one simple idea — quality refreshment, made locally, sold fairly.
          Every bottle is produced with care in Sierra Leone, supporting local jobs and local taste.
        </p>
      </div>
    </section>

    <section className="bg-foreground text-background py-20 px-6">
      <div className="max-w-[1024px] mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <h2 className="display text-3xl md:text-4xl mb-4">Flavours for every Sierra Leonean.</h2>
          <p className="opacity-80 text-lg leading-relaxed">
            Mango, Orange, Apple, Tamarind, Mixed Fruit, Pineapple Yogurt, and Pure Water — seven products at Le 10 each.
            Whether you're at home, at work, or on the road, there's a KK for you.
          </p>
        </div>
        <img src={fruity} alt="KK fruity range" className="rounded-2xl w-full object-cover max-h-[520px] order-1 md:order-2" />
      </div>
    </section>

    <section className="py-20 px-6 max-w-[1024px] mx-auto text-center">
      <h2 className="display text-3xl md:text-4xl mb-3">Online ordering — coming soon.</h2>
      <p className="text-muted-foreground text-lg">
        We're working on bringing KK Drinks straight to your door. For now, find us at shops and stockists across Sierra Leone.
      </p>
    </section>
  </Layout>
);

export default About;
