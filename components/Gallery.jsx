"use client";
import { useState } from "react";
import Reveal from "./Reveal";

export default function Gallery({ gallery }) {
  const [active, setActive] = useState(null);
  const spanClasses = ["g1", "g2", "g3", "g4", "g5", "g6"];

  return (
    <section className="section" id="gallery" style={{ background: "var(--charcoal)" }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow">A taste of the room</p>
          <div className="rule" />
          <h2>Gallery</h2>
          <p>Food, interior, drinks, and the evenings in between</p>
        </Reveal>

        <Reveal className="masonry">
          {gallery.map((g, i) => (
            <div
              key={g.label}
              className={`g-item ${spanClasses[i] || ""}`}
              onClick={() => setActive(g)}
            >
              <img src={g.image} alt={g.label} loading="lazy" />
              <span>{g.label}</span>
            </div>
          ))}
        </Reveal>
      </div>

      <div id="lightbox" className={active ? "open" : ""} onClick={() => setActive(null)}>
        <div className="lb-box">
          {active && <img src={active.image} alt={active.label} />}
        </div>
        <button aria-label="Close" onClick={() => setActive(null)}>
          &times;
        </button>
      </div>
    </section>
  );
}
