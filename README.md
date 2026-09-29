# Aditya Thakare | 1-on-1 Relationship Mentorship Portal

A production-ready, mobile-first intake and booking web application for private 1-on-1 relationship clarity mentorship sessions with **Aditya Thakare (Aditya Sir)**.

---

## 🌟 Key Features

- **Eligibility & Overview Gateway**: Clear introduction to the 30-minute private session, focus areas (resolving communication loops, healing attachment friction, stopping silent treatments), and community membership check.
- **13-Question Structured Intake**: Mobile-ergonomic form capturing emotional background, attachment dynamics, and desired breakthroughs.
- **Dual-Redundant Instant Submission**:
  - Automatically forwards all 13 form answers directly to your **Google Sheet Webhook** in the background using `keepalive`.
  - Zero-wait **"Click and Go"** instant redirection to the official Monkhood 1-on-1 booking link: `https://monkhood.org/checkout/9f9083e9-d8d4-4936-b11a-0ab397dd8fbf`.
- **Cloudflare Edge Support**: Built-in Cloudflare Pages Functions (`/functions/api/submit.ts` & `/functions/api/config.ts`) and SPA routing (`_redirects`).
- **Complete Mobile Optimization**: Anti-zoom inputs on iOS Safari, generous 48px–58px touch targets, zero horizontal scrolling, and sticky progress tracking.

---

## 📁 Repository Structure

```text
├── functions/                     # Cloudflare Pages Serverless Functions (Edge runtime)
│   └── api/
│       ├── config.ts              # GET /api/config edge handler
│       └── submit.ts              # POST /api/submit edge handler (Sheets forwarder)
├── public/                        # Static assets & Cloudflare routing
│   ├── _headers                   # Security & CORS headers
│   └── _redirects                 # SPA client-side routing fallback (/* -> /index.html)
├── src/                           # React frontend source code
│   ├── components/                # Modular UI views
│   │   ├── GatewayView.tsx        # Overview & Membership verification
│   │   ├── MemberFormView.tsx     # 13-question intake application form
│   │   ├── NonMemberView.tsx      # Non-member access guidance
│   │   ├── AdminPortal.tsx        # Internal submissions & pipeline viewer
│   │   ├── ConfigModal.tsx        # Dynamic funnel configuration modal
│   │   └── SuccessView.tsx        # Optional backup confirmation view
│   ├── App.tsx                    # Main app state router & dual-dispatch logic
│   ├── index.css                  # Global Tailwind styling & mobile touch fixes
│   ├── main.tsx                   # React root entry point
│   └── types.ts                   # TypeScript interfaces & types
├── data/                          # Default configurations
│   └── config.json                # Default funnel copy & webhook URLs
├── index.html                     # HTML5 entry with SEO & OpenGraph tags
├── package.json                   # NPM dependencies and scripts
├── server.ts                      # Full-stack Node/Express dev & production server
├── tsconfig.json                  # TypeScript compiler settings
├── vite.config.ts                 # Vite bundler configuration
└── wrangler.toml                  # Cloudflare Pages project configuration
```

---

## 🚀 Step 1: Push to GitHub

Follow these steps in your local terminal to upload the project to GitHub:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Add all files
git add .

# 3. Create your first commit
git commit -m "feat: complete mobile-optimized Aditya Sir 1-on-1 mentorship portal"

# 4. Set main branch
git branch -M main

# 5. Link your GitHub repository (replace with your actual repository URL)
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPOSITORY-NAME>.git

# 6. Push code to GitHub
git push -u origin main
```

---

## ☁️ Step 2: Deploy Live to Cloudflare Pages

Deploying on **Cloudflare Pages** takes under 2 minutes:

1. **Log in** to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. In the left navigation, click **Workers & Pages**.
3. Click **Create Application** → Select the **Pages** tab → Click **Connect to Git**.
4. Select your GitHub account and pick the repository you pushed to.
5. In **Set up builds and deployments**, configure:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave empty or default)
6. Under **Environment variables**, click **Add variable**:
   - `NODE_VERSION` = `20`
7. Click **Save and Deploy**.
8. Cloudflare will automatically build and assign your free live URL (e.g., `https://aditya-thakare-mentorship.pages.dev`). You can also attach your custom domain in 1 click under **Custom domains**.

---

## ⚙️ Google Sheets Integration

The application forwards all 13 intake answers to your Google Apps Script Webhook:
- **Default Webhook**: `https://script.google.com/macros/s/AKfycbzmwl31w0HaVBtwrRaFGJxV-GlBvMijC1a_NmW_941ywqMEl6tOdDf4DJpw4MarOZaG/exec`
- **Booking Checkout**: `https://monkhood.org/checkout/9f9083e9-d8d4-4936-b11a-0ab397dd8fbf`

### Data fields sent:
1. `fullName`
2. `email`
3. `phone`
4. `gender`
5. `location`
6. `currentJourney`
7. `breakthroughArea`
8. `untappedPotential`
9. `readyForDirection`
10. `committedToRoadmap`
11. `investEnergy`
12. `whyMentor`
13. `breakthroughVision`
14. `timestamp`
15. `status` (`New`)

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run full-stack dev server (starts on http://localhost:3000)
npm run dev

# Test production build
npm run build
```
