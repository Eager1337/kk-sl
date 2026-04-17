import { DrinkPage } from "@/components/site/DrinkPage";
import img from "@/assets/kk-pineapple-yogurt.jpeg";

const Yogurt = () => (
  <DrinkPage
    eyebrow="Creamy"
    name="KK Pineapple Yogurt"
    tagline="Creamy meets tropical."
    image={img}
    highlight={{
      title: "Smooth pineapple, with a yogurt finish.",
      body: "A creamy yogurt-based beverage with the sweet, sun-ripened flavour of pineapple. Refreshing, satisfying and totally unique.",
    }}
    description="A signature yogurt beverage from KK, blending tropical fruit with smooth dairy goodness."
    specs={[
      { k: "Flavour", v: "Pineapple Yogurt" },
      { k: "Type", v: "Yogurt Beverage" },
      { k: "Volume", v: "500ml" },
      { k: "Price", v: "Le 10" },
      { k: "Origin", v: "Sierra Leone" },
      { k: "Serve", v: "Keep cool, shake well" },
    ]}
  />
);

export default Yogurt;
