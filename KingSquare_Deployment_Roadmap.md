# KingSquare — From Prototype to Production
## Deployment Roadmap for Wix (and Beyond)

**Prepared for:** Rohan Campbell  
**Date:** February 19, 2026  
**Status:** Prototype Complete → Ready for Production Planning

---

## The Honest Truth About Wix + This App

KingSquare is built in React with AI-powered features (Claude API for food scanning), complex state management, and 7 interactive screens. Wix is primarily a drag-and-drop website builder. Here's the reality:

**What Wix does well:** Marketing pages, landing pages, blog, SEO, email collection, membership gating, payment processing, app store integrations.

**What Wix cannot do natively:** Run a React application, make direct API calls to Claude, handle complex multi-screen app state, or support the camera-to-AI food scanning pipeline.

**The good news:** There are clear paths to make this work. Here are your three options, ranked by practicality.

---

## OPTION A: Hybrid Approach (Recommended)
### Wix as the Front Door + App Hosted Separately

**This is the most practical path.** Use Wix for what it's good at (marketing, SEO, membership, payments) and host the actual KingSquare app on a free platform like Vercel.

### Architecture

```
[Wix Website - kingsquarewellness.com]
    ├── Landing Page (marketing, testimonials, video)
    ├── About / Mission page
    ├── Blog (health articles, recipes, exercise tips)
    ├── Pricing / Membership page (Wix Payments)
    ├── Contact / Community signup
    └── "Launch App" button → app.kingsquarewellness.com

[Vercel - app.kingsquarewellness.com]
    └── KingSquare React App (full functionality)
        ├── All 7 screens
        ├── AI Food Scanner
        ├── Exercise Program
        ├── Meal Planners
        └── Future: User auth, database, social features
```

### Step-by-Step Deployment

#### Phase 1: Deploy the App (Week 1)

**Step 1 — Create a GitHub account** (free)
- Go to github.com → Sign up
- Create a new repository called "kingsquare-app"

**Step 2 — Set up a Next.js project**
You can ask me to convert the current .jsx file into a full Next.js project. The structure would be:

```
kingsquare-app/
├── app/
│   ├── layout.js
│   ├── page.js          (renders KingSquare component)
│   └── globals.css
├── components/
│   └── KingSquare.jsx   (your current file)
├── package.json
└── next.config.js
```

**Step 3 — Deploy to Vercel** (free tier)
- Go to vercel.com → Sign up with GitHub
- Click "Import Project" → Select your kingsquare-app repo
- Vercel auto-detects Next.js and deploys
- You get a URL like: kingsquare-app.vercel.app
- Connect your custom domain: app.kingsquarewellness.com

**Step 4 — Set up the Anthropic API key** (for food scanner)
- In Vercel dashboard → Settings → Environment Variables
- Add: `ANTHROPIC_API_KEY` = your key from console.anthropic.com
- Create a small API route to proxy the Claude call (keeps your key secure)

#### Phase 2: Build the Wix Site (Week 2)

**Step 1 — Create the Wix site**
- Use your existing Wix account
- Choose a template or start blank
- Domain: kingsquarewellness.com

**Step 2 — Build these pages:**

| Page | Purpose | Wix Features to Use |
|------|---------|-------------------|
| **Home/Landing** | Hook visitors, explain the mission | Hero video, scroll animations, testimonial slider |
| **About** | Your story, the "why" behind KingSquare | Image + text sections, team bio |
| **Features** | Showcase the 7 app features | Icon grids, feature cards, screenshots |
| **Blog** | SEO content — recipes, health tips, exercises | Wix Blog (built-in) |
| **Pricing** | Free tier vs Premium | Wix Pricing Table widget |
| **Join / Sign Up** | Email collection, waitlist | Wix Forms, Mailchimp integration |

**Step 3 — Add the "Launch App" button**
- On every page, prominent CTA button
- Links to: `https://app.kingsquarewellness.com`
- Style: Gold gradient matching KingSquare brand

**Step 4 — Optionally embed the app in Wix**
- Add an HTML iframe widget to a "Try the App" page:
```html
<iframe src="https://app.kingsquarewellness.com" 
        width="100%" height="800px" 
        style="border: none; border-radius: 16px;"
        title="KingSquare Wellness App"
        allow="camera">
</iframe>
```

#### Phase 3: Add a Database + User Accounts (Weeks 3-4)

To make data persist (health logs, meal tracking, exercise progress), you'll need a backend. Options:

| Service | Cost | Difficulty | Best For |
|---------|------|-----------|----------|
| **Supabase** | Free tier | Medium | PostgreSQL database + auth + real-time |
| **Firebase** | Free tier | Medium | NoSQL, Google auth, quick setup |
| **Convex** | Free tier | Low | Real-time, type-safe, great with React |
| **Wix Velo (Members)** | Wix Premium | Low | If you want everything on Wix |

**Recommended: Supabase** — free PostgreSQL database, built-in authentication (email, Google, Apple), and a generous free tier that handles thousands of users.

### Cost Breakdown (Option A)

| Item | Monthly Cost |
|------|-------------|
| Vercel (free tier) | $0 |
| Wix Business plan | $17–27/mo |
| Supabase (free tier) | $0 |
| Anthropic API (food scanner) | ~$5–20/mo (usage-based) |
| Custom domain | ~$12/year |
| **Total** | **$22–47/month** |

---

## OPTION B: Full Wix with Velo
### Everything Inside Wix (More Limited)

If you want everything in one place, Wix Velo (their code platform) can handle simpler versions of the features.

### What You'd Rebuild in Wix Velo

| Feature | Wix Velo Approach | Limitations |
|---------|------------------|-------------|
| Health Tracker | Wix Forms + Database Collections | No charts/visualizations without custom code |
| Food Log | Database Collection + Repeaters | Works well for manual logging |
| AI Food Scanner | **Not possible in Wix** — API calls are restricted | Must use external service or iframe |
| Meal Planner | Repeaters + Database | Doable but tedious to build |
| Exercise Program | Dynamic Pages + Database | Good fit — Wix handles content pages well |
| Mind & Spirit | Wix Forms for journaling | Basic but functional |
| The Circle | Wix Forum (built-in) | Actually great — Wix Forums is solid |

### The Dealbreaker

The AI food scanner — the standout feature — cannot be built in Wix Velo because Wix restricts which external APIs you can call. You'd need to either drop this feature or embed it via iframe from an external host anyway, which brings you back to Option A.

### When Option B Makes Sense
- You're comfortable with a simpler MVP without AI scanning
- You want a content-heavy site (blog, recipes, exercise guides) with basic tracking
- You plan to use Wix's built-in Forum for the community Circle feature
- Budget is the primary concern

---

## OPTION C: Leave Wix Entirely
### Full React App on Vercel (Most Powerful)

If KingSquare is going to be a serious product, the cleanest architecture is a full Next.js app hosted on Vercel with no Wix dependency.

### Architecture

```
kingsquarewellness.com (Vercel)
├── / (Marketing landing page — built in React/Next.js)
├── /about
├── /blog (MDX or CMS like Sanity)
├── /pricing
├── /app (The full KingSquare app — gated by auth)
│   ├── /app/home
│   ├── /app/health
│   ├── /app/food (with AI scanner)
│   ├── /app/plan
│   ├── /app/exercise
│   ├── /app/mind
│   └── /app/circle
├── /api/scan-food (Claude API proxy)
└── /api/auth (Supabase or Clerk)
```

### Advantages
- One codebase, one deployment, one domain
- Full control over every pixel and feature
- Better SEO with Next.js server rendering
- Scales to mobile app (React Native) easily later
- No Wix monthly fee

### Disadvantages
- Requires more technical setup upfront
- No drag-and-drop for marketing pages (unless you add a CMS)
- You'd need to build or integrate a blog

### Cost Breakdown (Option C)

| Item | Monthly Cost |
|------|-------------|
| Vercel Pro | $20/mo (or free for hobby) |
| Supabase | $0 (free tier) |
| Anthropic API | ~$5–20/mo |
| Domain | ~$12/year |
| **Total** | **$6–41/month** |

---

## My Recommendation

**Start with Option A** (Wix + Vercel hybrid). Here's why:

1. **You already have a Wix account** — use it for the marketing site
2. **The app deploys to Vercel in under 30 minutes** — I can generate the full Next.js project for you right now
3. **The AI food scanner works immediately** — no Wix restrictions
4. **You can migrate to Option C later** — if KingSquare grows, moving the marketing pages to Next.js is straightforward
5. **Lowest risk** — you test the concept without rebuilding anything

---

## What I Can Build for You Right Now

Just say the word and I'll create any of these:

| Deliverable | Description |
|------------|-------------|
| **Next.js project** | Full deployable project with KingSquare as the app + landing page |
| **API route for food scanner** | Secure server-side proxy so your Anthropic key isn't exposed |
| **Wix embed code** | Ready-to-paste HTML for embedding the app in your Wix site |
| **Supabase schema** | Database tables for users, health logs, food logs, exercise progress |
| **Landing page** | Dedicated marketing page for KingSquare with brand design |
| **PWA manifest** | Turn the web app into an installable "app" on phones (no app store needed) |

---

## The PWA Shortcut (Get It on Phones Fast)

Before you even think about the Apple App Store or Google Play, you can make KingSquare installable on any phone as a **Progressive Web App (PWA)**:

- Users visit the site → get "Add to Home Screen" prompt
- App icon appears on their phone like a native app
- Works offline for cached content
- Full-screen, no browser chrome
- No app store approval needed
- Updates instantly when you deploy

This is the fastest path to getting KingSquare into the hands of real users.

---

## Timeline

| Week | Milestone |
|------|-----------|
| **Week 1** | Deploy app to Vercel, set up GitHub repo, configure API key |
| **Week 2** | Build Wix marketing site, connect custom domain, embed app |
| **Week 3** | Add Supabase for user accounts and data persistence |
| **Week 4** | Add PWA manifest, beta test with 10-20 users |
| **Month 2** | Iterate based on feedback, add community features |
| **Month 3** | Soft launch, content marketing via blog and YouTube |

---

*KingSquare — Wellness for Kings. From prototype to production.*
