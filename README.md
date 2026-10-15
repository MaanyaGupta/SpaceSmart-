# SpaceSmart

**Make More of Your Space.**

SpaceSmart is an independent home-organization publication dedicated to helping people in small apartments, compact bedrooms, rental homes, student hostels, and PG accommodations organize their spaces affordably and practically.

---

## Technology Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite 8 |
| Language | JavaScript / JSX |
| Routing | React Router DOM v7 |
| Icons | Lucide React |
| Styles | Plain CSS (per-component + global variables) |
| Fonts | Playfair Display (serif) + Plus Jakarta Sans (sans-serif) via Google Fonts |
| Hosting | Vercel (recommended) |

---

## Installation

```bash
# Install dependencies
npm install
```

---

## Development Server

```bash
npm run dev
```

The development server starts at `http://localhost:5173`.

---

## Production Build

```bash
npm run build
```

The production output is written to `dist/`. You can preview it locally with:

```bash
npm run preview
```

---

## Project Structure

```
src/
  components/        # Shared components (Header, Footer, SEO, ArticleCard, etc.)
  data/              # Content data (articles.js, categories.js, tips.js, siteConfig.js)
  pages/             # Page components (Home, Blog, Article, CategoryPage, About, Contact)
  styles/            # Global CSS and CSS variables
  utils/             # Utilities (readingTime.js)
  main.jsx           # Entry point
  App.jsx            # Route definitions

public/
  robots.txt         # Crawler directives
  sitemap.xml        # XML sitemap
  favicon.svg        # Brand favicon
```

---

## Routes

| Route | Page |
|---|---|
| `/` | Homepage |
| `/small-bedroom-ideas` | Small Bedroom Ideas Category |
| `/storage-solutions` | Storage Solutions Category |
| `/decluttering` | Decluttering Guides Category |
| `/budget-friendly-ideas` | Budget-Friendly Ideas Category |
| `/blog` | All Articles Index |
| `/article/:slug` | Individual Article |
| `/about` | About SpaceSmart |
| `/contact` | Contact |

---

## Deploying to Vercel

### Option 1 — Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from the project root
vercel

# For production deployment
vercel --prod
```

### Option 2 — Vercel Dashboard (Git Integration)

1. Push the project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial SpaceSmart build"
   git remote add origin https://github.com/YOUR_USERNAME/spacesmart.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and click **Add New → Project**.
3. Import your GitHub repository.
4. Leave the **Build Command** as `npm run build` and **Output Directory** as `dist`.
5. Click **Deploy**.

Vercel automatically handles the SPA routing rewrite via `vercel.json`.

---

## Updating the Site URL

The canonical site URL is configured in `src/data/siteConfig.js`:

```js
siteUrl: 'https://spacesmart.vercel.app',  // ← change to your actual domain
```

After updating, also update:
- `public/robots.txt` — the `Sitemap:` line
- `public/sitemap.xml` — all `<loc>` entries

You can set it from an environment variable by adding to `.env`:

```
VITE_SITE_URL=https://your-custom-domain.com
```

Then update `siteConfig.js` to read `import.meta.env.VITE_SITE_URL` at the top level. (Note: Vite env vars are static at build time, so a new build is needed after changing them.)

---

## SEO Implementations

### ✅ Implemented

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<aside>`)
- Unique `<title>` and `<meta name="description">` per page via `SEO.jsx`
- Canonical `<link rel="canonical">` per page
- One clear `<h1>` per page with logical heading hierarchy
- `lang="en"` on the HTML element (`index.html`)
- Open Graph metadata (og:title, og:description, og:url, og:image, og:type)
- Twitter Card metadata (summary_large_image)
- Schema.org JSON-LD: `WebSite` (Homepage), `Article` (article pages), `BreadcrumbList` (all pages)
- `robots.txt` in `/public/`
- `sitemap.xml` in `/public/` with canonical URLs, lastmod, changefreq, and priority
- Meaningful, lowercase, hyphenated URL slugs
- Breadcrumb navigation on all sub-pages
- Internal cross-linking between articles, categories, and pages
- `alt` attributes on all informative images
- `loading="lazy"` on below-fold images; `fetchpriority="high"` on hero images
- Width/height attributes on images to reduce layout shift
- Accessible focus states and keyboard navigation
- Skip-to-main-content link
- ARIA roles and labels on interactive components
- `vercel.json` SPA catch-all rewrite for clean URLs on hard refresh

### ⚠️ Limitations to Verify Manually

1. **Client-side rendering (CSR) and crawlers**: This is a standard Vite SPA. Googlebot and modern crawlers generally render JavaScript, but social preview scrapers (Slack, WhatsApp, Facebook) may receive an empty HTML shell. For guaranteed social previews and faster first-crawl indexing, consider pre-rendering with a tool like `vite-plugin-ssg` or `@vitejs/plugin-static-copy` in a future iteration.

2. **Sitemap URL**: Update the `Sitemap:` domain in `public/robots.txt` and all `<loc>` entries in `public/sitemap.xml` to match your verified Vercel deployment URL.

3. **Google Search Console**: Submit the sitemap manually via Google Search Console after deployment.

4. **Core Web Vitals**: Run Lighthouse or PageSpeed Insights on the live Vercel URL to check LCP, CLS, and INP. Images served from Unsplash CDN via the `auto=format` parameter receive WebP negotiation automatically.

5. **Social sharing images**: OG images currently link to Unsplash photos. For reliable og:image previews, consider generating and hosting static open-graph images.

---

## Adding New Articles

1. Open `src/data/articles.js` and append a new object following the existing schema.
2. Add the article slug to `public/sitemap.xml`.
3. Ensure `relatedSlugs` links to real article slugs.
4. Rebuild: `npm run build`.

---

## License

SpaceSmart editorial content, design, and code are original work. Do not republish or redistribute without permission.
