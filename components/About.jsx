import Reveal from "./Reveal";

export default function About({ about }) {
  return (
    <section className="section" id="about">
      <div className="wrap about-grid">
        <Reveal className="about-imgs">
          <div className="ph ph1">
            <img src={about.images.interior} alt="Restaurant interior" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div className="ph ph2">
            <img src={about.images.chef} alt="Chef plating a dish" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </Reveal>
        <Reveal className="about-copy">
          <p className="eyebrow">{about.eyebrow}</p>
          <h2>{about.heading}</h2>
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="stat-row">
            {about.stats.map((s, i) => (
              <div key={i}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
