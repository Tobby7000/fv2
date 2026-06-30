import Reveal from "./Reveal";
import DishCard from "./DishCard";

export default function SignatureDishes({ menu }) {
  const dishes = menu.items.filter((i) => menu.signature.includes(i.name));

  return (
    <section className="section" id="dishes" style={{ background: "var(--charcoal)" }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow">Chef's selection</p>
          <div className="rule" />
          <h2>Signature dishes</h2>
          <p>The plates that define our table</p>
        </Reveal>
        <div className="menu-grid">
          {dishes.map((item) => (
            <DishCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
