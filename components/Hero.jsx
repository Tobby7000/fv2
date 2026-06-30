export default function Hero({ hero }) {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(10,9,8,0.55) 0%, rgba(10,9,8,0.35) 40%, rgba(10,9,8,0.92) 100%), url(${hero.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-inner">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1>
          {hero.headlineLead} <em>{hero.headlineEmphasis}</em>
        </h1>
        <p>{hero.subtext}</p>
        <div className="hero-ctas">
          <a href="#menu" className="btn solid">
            <span>View menu</span>
          </a>
          <a href="#reserve" className="btn">
            <span>Reserve table</span>
          </a>
        </div>
      </div>
      <div className="scroll-cue" />
    </section>
  );
}
