import Reveal from "./Reveal";

export default function Testimonials({ testimonials }) {
  return (
    <section className="section" id="testimonials">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow">Guest reviews</p>
          <div className="rule" />
          <h2>What our guests say</h2>
        </Reveal>
        <div className="test-grid">
          {testimonials.map((t) => (
            <div className="test-card" key={t.name}>
              <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p>&quot;{t.text}&quot;</p>
              <div className="test-name">
                {t.name}
                <span>{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
