"use client";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#dishes", label: "Signature" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Header({ restaurant }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={scrolled ? "scrolled" : ""}>
        <div className="logo">
          {restaurant.name.split(" ")[0]} <b>Grill</b> & Lounge
        </div>
        <nav>
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#reserve" className="btn solid nav-cta">
          <span>Reserve table</span>
        </a>
        <button
          className="menu-toggle"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          &#9776;
        </button>
      </header>

      <div id="mobileNav" className={open ? "open" : ""}>
        <button className="close-x" aria-label="Close menu" onClick={() => setOpen(false)}>
          &times;
        </button>
        {[...LINKS, { href: "#reserve", label: "Reserve" }].map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
