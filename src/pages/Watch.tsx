import { Layout } from "@/components/site/Layout";
import watch from "@/assets/watch.jpg";
import { Link } from "react-router-dom";

const Watch = () => (
  <Layout>
    <section className="bg-subtle py-20 text-center px-6">
      <h1 className="display text-5xl md:text-7xl">Lumen Watch Series 10</h1>
      <p className="mt-4 text-xl md:text-2xl text-muted-foreground">A healthier you, on the go.</p>
      <div className="flex justify-center gap-4 mt-6">
        <Link to="#" className="btn-pill bg-accent text-accent-foreground px-6">Buy from $399</Link>
        <a className="pill-link" href="#">Compare models ›</a>
      </div>
      <img src={watch} alt="Lumen Watch" className="mx-auto mt-12 max-h-[520px]" />
    </section>

    <section className="max-w-3xl mx-auto py-24 px-6 text-center">
      <h2 className="display text-4xl md:text-5xl">Health, on your wrist.</h2>
      <p className="mt-6 text-lg text-muted-foreground">
        Sleep tracking, heart insights, ECG, blood oxygen, and fall detection — designed to keep you informed and safe, every moment of every day.
      </p>
    </section>
  </Layout>
);

export default Watch;
