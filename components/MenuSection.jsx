"use client";
import { useState } from "react";
import Reveal from "./Reveal";
import DishCard from "./DishCard";

export default function MenuSection({ menu }) {
  const categories = ["All", ...menu.categories];
  const [active, setActive] = useState("All");

  const items =
    active === "All" ? menu.items : menu.items.filter((i) => i.category === active);

  return (
    <section className="section" id="menu">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow">Full menu</p>
          <div className="rule" />
          <h2>The complete menu</h2>
          <p>Filter by category — every dish made to order</p>
        </Reveal>

        <Reveal className="menu-filters">
          {categories.map((c) => (
            <button
              key={c}
              className={`mf-btn ${active === c ? "active" : ""}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <div className="menu-grid">
          {items.map((item) => (
            <DishCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
