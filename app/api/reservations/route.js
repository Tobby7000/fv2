import { NextResponse } from "next/server";
import siteData from "@/data/site.json";

// This route receives the reservation form payload and emails the admin
// via Resend (https://resend.com). Resend's free tier is generous and
// the API is a single fetch call — no SMTP setup required.
//
// Setup:
// 1. Create a free Resend account and get an API key.
// 2. Verify a sending domain in Resend (or use their shared
//    onboarding@resend.dev sender while testing).
// 3. In Vercel: Project Settings → Environment Variables, add:
//      RESEND_API_KEY   = re_xxxxxxxxxxxx
//      RESEND_FROM      = reservations@yourdomain.com   (must be a verified sender)
//    (Locally, put these in a .env.local file — never commit that file.)
// 4. Redeploy. Reservations will now land in the inbox set as
//    "adminEmail" in data/site.json.

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, phone, email, date, time, guests, message } = body || {};

  if (!name || !phone || !email || !date || !time || !guests) {
    return NextResponse.json(
      { error: "Missing required reservation fields." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM || "onboarding@resend.dev";
  const adminEmail = siteData.restaurant.adminEmail || siteData.restaurant.email;

  // If no API key is configured yet, don't fail the whole reservation —
  // log it server-side and tell the caller email isn't wired up yet.
  if (!apiKey) {
    console.warn(
      "RESEND_API_KEY is not set — reservation received but no email was sent.",
      { name, phone, email, date, time, guests, message }
    );
    return NextResponse.json(
      {
        ok: true,
        emailSent: false,
        note: "Reservation recorded, but email sending is not configured yet (missing RESEND_API_KEY).",
      },
      { status: 200 }
    );
  }

  const subject = `New reservation: ${name} — ${date} ${time} (${guests})`;
  const html = `
    <h2>New reservation request</h2>
    <p><b>Name:</b> ${escapeHtml(name)}</p>
    <p><b>Phone:</b> ${escapeHtml(phone)}</p>
    <p><b>Email:</b> ${escapeHtml(email)}</p>
    <p><b>Date:</b> ${escapeHtml(date)}</p>
    <p><b>Time:</b> ${escapeHtml(time)}</p>
    <p><b>Guests:</b> ${escapeHtml(guests)}</p>
    <p><b>Message:</b> ${message ? escapeHtml(message) : "—"}</p>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [adminEmail],
        reply_to: email,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend API error:", errText);
      return NextResponse.json(
        { ok: false, emailSent: false, error: "Failed to send email." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, emailSent: true }, { status: 200 });
  } catch (err) {
    console.error("Reservation email error:", err);
    return NextResponse.json(
      { ok: false, emailSent: false, error: "Failed to send email." },
      { status: 500 }
    );
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
