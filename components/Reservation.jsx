"use client";
import { useState } from "react";
import Reveal from "./Reveal";

export default function Reservation({ restaurant }) {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.target;
    const payload = {
      name: form.rName.value,
      phone: form.rPhone.value,
      email: form.rEmail.value,
      date: form.rDate.value,
      time: form.rTime.value,
      guests: form.rGuests.value,
      message: form.rMsg.value,
    };

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }
      setStatus("success");
    } catch (err) {
      setErrorMsg(
        "We couldn't submit your reservation right now. Please call us directly at " +
          restaurant.phones[0] +
          "."
      );
      setStatus("error");
    }
  };

  return (
    <section className="section" id="reserve" style={{ background: "var(--charcoal)" }}>
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow">Book a table</p>
          <div className="rule" />
          <h2>Reserve your evening</h2>
        </Reveal>

        <Reveal className="reserve-wrap">
          <div className="reserve-info">
            <h2>{restaurant.legalName}</h2>
            <p>
              Reservations are recommended for parties of 4 or more, and required for our
              private dining table. We&apos;ll confirm by phone within 24 hours.
            </p>
            <ul>
              <li>
                <b>Address</b> {restaurant.address}
              </li>
              <li>
                <b>Phone</b> {restaurant.phones[0]}
              </li>
              <li>
                <b>Hours</b> {restaurant.hours}
              </li>
            </ul>
          </div>

          <div className="reserve-form">
            {status !== "success" ? (
              <form onSubmit={handleSubmit}>
                <div className="f-row">
                  <div className="field">
                    <label htmlFor="rName">Full name</label>
                    <input id="rName" name="rName" type="text" placeholder="Your name" required />
                  </div>
                  <div className="field">
                    <label htmlFor="rPhone">Phone</label>
                    <input id="rPhone" name="rPhone" type="tel" placeholder="(000) 000-0000" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="rEmail">Email</label>
                  <input id="rEmail" name="rEmail" type="email" placeholder="you@email.com" required />
                </div>
                <div className="f-row">
                  <div className="field">
                    <label htmlFor="rDate">Date</label>
                    <input id="rDate" name="rDate" type="date" required />
                  </div>
                  <div className="field">
                    <label htmlFor="rTime">Time</label>
                    <input id="rTime" name="rTime" type="time" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="rGuests">Guests</label>
                  <select id="rGuests" name="rGuests" required defaultValue="">
                    <option value="" disabled>
                      Select party size
                    </option>
                    <option>1 guest</option>
                    <option>2 guests</option>
                    <option>3 guests</option>
                    <option>4 guests</option>
                    <option>5–6 guests</option>
                    <option>7+ guests</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="rMsg">Message (optional)</label>
                  <textarea
                    id="rMsg"
                    name="rMsg"
                    rows="3"
                    placeholder="Allergies, occasion, special requests..."
                  />
                </div>

                {status === "error" && (
                  <p style={{ color: "var(--rust)", fontSize: "13px", marginBottom: "1rem" }}>
                    {errorMsg}
                  </p>
                )}

                <button type="submit" className="btn solid" disabled={status === "sending"}>
                  <span>{status === "sending" ? "Sending..." : "Confirm reservation"}</span>
                </button>
              </form>
            ) : (
              <div id="resSuccess" className="show">
                <div className="check">&#10003;</div>
                <h3>Reservation received</h3>
                <p>Thank you — we&apos;ll call to confirm your table shortly.</p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
