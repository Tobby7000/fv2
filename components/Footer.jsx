export default function Footer({ restaurant }) {
  return (
    <footer>
      <div className="foot-grid">
        <div>
          <div className="logo" style={{ marginBottom: ".8rem" }}>
            {restaurant.name.split(" ")[0]} <b>Grill</b>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", color: "var(--cream-dim)" }}>
            Home food, away from home. Authentic Nigerian & African dining in the heart of
            Brooklyn.
          </p>
        </div>
        <div>
          <h5>Navigate</h5>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#reserve">Reserve</a></li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li><p>{restaurant.address}</p></li>
            <li><p>{restaurant.phones[0]}</p></li>
            <li><p>{restaurant.email}</p></li>
          </ul>
        </div>
        <div>
          <h5>Follow</h5>
          <ul>
            <li><a href={restaurant.social.instagram}>Instagram</a></li>
            <li><a href={restaurant.social.facebook}>Facebook</a></li>
            <li><a href={restaurant.social.tiktok}>TikTok</a></li>
          </ul>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© {new Date().getFullYear()} {restaurant.legalName}. All rights reserved.</span>
        <span>Design & build — see README for editing instructions</span>
      </div>
    </footer>
  );
}
