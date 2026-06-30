# Festac Grill & Lounge — website

A premium, dark-and-gold website for Festac Grill & Lounge, built with
Next.js (App Router) and Tailwind CSS. Menu, restaurant info, hero copy,
testimonials, and gallery captions all live in plain JSON/data files so
non-technical edits never touch component code.

## 1. Run it locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## 2. Editing content (no code required)

| What to change            | File                       |
|----------------------------|----------------------------|
| Menu items, prices, categories | `data/menu.json`       |
| Restaurant name, address, phone, hours, socials, map | `data/site.json` → `restaurant` |
| Hero headline & subtext   | `data/site.json` → `hero`  |
| About section copy & stats| `data/site.json` → `about` |
| Gallery captions          | `data/site.json` → `gallery` |
| Testimonials              | `data/site.json` → `testimonials` |

### Adding or removing a menu item

Open `data/menu.json` and add an object to the `items` array:

```json
{
  "name": "Pepper Soup",
  "desc": "Short, appetizing description.",
  "price": 18,
  "category": "Soups",
  "image": "/images/menu/pepper-soup.jpg"
}
```

- `price` can be `null` for "market price" / "price varies" items.
- `category` must match one of the strings in the `categories` array at
  the top of the file, or add a new category there too — the menu filter
  buttons and the "All" tab update automatically.
- To feature a dish in the homepage "Signature dishes" section, add its
  exact `name` to the `signature` array.

No other file needs to change — `MenuSection.jsx` and `SignatureDishes.jsx`
read this file and render whatever is in it.

## 3. Images

Every photo on the site right now is a **real, free-to-use Unsplash photo**
(no attribution required, licensed for commercial use) — they're stand-ins
for real food/restaurant photography, not your actual dishes or dining room.
Several dishes within the same menu category currently share one photo.

To replace any image with your own:
1. Drop your photo into `public/images/` (e.g. `public/images/menu/jollof.jpg`).
2. In `data/menu.json` or `data/site.json`, change the relevant `"image"`
   field from the Unsplash URL to your local path, e.g.
   `"image": "/images/menu/jollof.jpg"`.

No component code needs to change — every image is read from these two
JSON files.

For best performance, consider swapping the plain `<img>` tags in the
components for Next.js's `<Image>` component (`import Image from
"next/image"`), which adds automatic lazy loading and responsive sizing —
this satisfies the "optimize images" / "lazy loading" goals from the
original brief. The current setup already uses `loading="lazy"` on every
`<img>` as a baseline.

## 4. Reservation form → email to admin

The reservation form now POSTs to `app/api/reservations/route.js`, which
emails the admin via **Resend** (resend.com) — a simple email API, no SMTP
server needed.

Setup:
1. Create a free Resend account at resend.com.
2. Verify a sending domain (or use their shared test sender
   `onboarding@resend.dev` while you're testing — fine for development,
   but for production you'll want your own domain verified so the emails
   don't land in spam).
3. Grab your API key from the Resend dashboard.
4. In Vercel: **Project Settings → Environment Variables**, add:
   - `RESEND_API_KEY` = `re_xxxxxxxxxxxx`
   - `RESEND_FROM` = `reservations@yourdomain.com` (must match a verified
     sender/domain in Resend)
5. Redeploy (Vercel → Deployments → ⋯ → Redeploy, or just push a commit).
6. Set who receives the email in `data/site.json` → `restaurant.adminEmail`.

Until `RESEND_API_KEY` is set, reservations still get validated and
accepted (the customer sees the success screen), but no email goes out —
the route just logs the submission server-side so nothing is silently
lost. Once the key is added, every submission emails the admin with the
guest's name, phone, email, date, time, party size, and message, and sets
the guest's email as the reply-to so the admin can hit "reply" directly.

To test locally, create a `.env.local` file (already gitignored) with:
```
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM=onboarding@resend.dev
```

## 5. Deploying (Vercel)

The fastest path to a live URL:

```bash
npm install -g vercel
vercel
```

Follow the prompts (or push this repo to GitHub and import it at
vercel.com/new — Vercel auto-detects Next.js and needs zero config).

Netlify works too: connect the repo and set build command `npm run
build`, publish directory `.next` (Netlify's Next.js runtime handles the
rest automatically).

## 6. Project structure

```
app/                Next.js App Router pages, layout, global CSS
components/         One component per section (Header, Hero, About, …)
data/menu.json       All menu items — edit freely
data/site.json       Restaurant info, hero copy, about copy, testimonials
public/images/       Drop replacement photos here
```

## 7. Accessibility & performance notes already built in

- Semantic HTML (`header`, `nav`, `section`, `footer`)
- Keyboard-reachable nav links and form fields
- High-contrast cream-on-charcoal palette
- Scroll-triggered fade-ins respect `prefers-reduced-motion`-friendly
  patterns (CSS transitions, not heavy JS animation libraries)
- Swap `<img>` for `next/image` (see step 3) to pick up automatic lazy
  loading, responsive `srcset`, and a strong Lighthouse score
