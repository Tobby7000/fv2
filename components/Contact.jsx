import Reveal from "./Reveal";

export default function Contact({ restaurant }) {
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow">Find us</p>
          <div className="rule" />
          <h2>Visit {restaurant.name}</h2>
        </Reveal>

        <Reveal className="contact-grid">
          <div className="contact-list">
            <div className="c-item">
              <div className="c-icon">&#9679;</div>
              <div>
                <h4>Address</h4>
                <p>{restaurant.address}</p>
              </div>
            </div>
            <div className="c-item">
              <div className="c-icon">&#9742;</div>
              <div>
                <h4>Phone</h4>
                <p>{restaurant.phones.join(" · ")}</p>
              </div>
            </div>
            <div className="c-item">
              <div className="c-icon">&#9993;</div>
              <div>
                <h4>Email</h4>
                <p>{restaurant.email}</p>
              </div>
            </div>
            <div className="c-item">
              <div className="c-icon">&#9201;</div>
              <div>
                <h4>Hours</h4>
                <p>{restaurant.hours}</p>
              </div>
            </div>
            <div className="social-row">
              <a href={restaurant.social.instagram} aria-label="Instagram">
                IG
              </a>
              <a href={restaurant.social.facebook} aria-label="Facebook">
                FB
              </a>
              <a href={restaurant.social.tiktok} aria-label="TikTok">
                TT
              </a>
            </div>
          </div>

          <div className="map-ph">
            {restaurant.mapEmbedUrl && restaurant.mapEmbedUrl !== "REPLACE_WITH_GOOGLE_MAPS_EMBED_URL" ? (
              <iframe src={restaurant.mapEmbedUrl} loading="lazy" title="Map" />
            ) : (
              "[ Embedded Google Map — add mapEmbedUrl in data/site.json ]"
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
