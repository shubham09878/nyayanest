# LAWPRIME

A dependency-free, data-driven static legal website. It is designed to be deployed as a static site and keeps legal content deliberately conservative: no lawyer profile, contact detail, case outcome, judgment citation or legal proposition is invented.

## Run locally

The browser client can be served by any static file server. For example, from this folder:

```powershell
python -m http.server 8080
```

Open `http://localhost:8080`. Use the generated `dist` output for production deployment.

## Build production files

Node.js 18+ is sufficient; there are no package dependencies.

```powershell
$env:SITE_URL = 'https://www.your-domain.in'
node scripts/build.mjs
```

This generates `dist/` with static `index.html` files for all major routes, unique title/description/canonical/Open Graph metadata, a sitemap, robots file and SPA fallback configuration.

## Content architecture

Edit `assets/data.js` to add verified practice areas, services, courts, FAQs, legal notices, legal resources, lawyers, judgments and insights. The interface automatically links related service, practice-area, resource, FAQ and jurisdiction pages.

For judgments, retain only verified data and add these fields to each record: case name, citation, court, bench, date, statutes, sections, facts, issues, arguments, findings, decision, ratio, practical significance and original source URL. The initial seven family-law records are concise summaries indexed from the user-supplied compendium; add an independently verified official full-text URL before treating any record as a complete authority source.

## Required pre-launch replacements

- Set `SITE_URL` during build and replace `baseUrl` in `assets/app.js` with the final canonical domain.
- Add only verified phone, WhatsApp, email and office details to `site.contact` and the contact presentation.
- Connect the validated forms to an approved server-side endpoint with rate limiting, spam protection, validation, sanitisation, secure storage and consent handling.
- Have the privacy policy, terms and disclaimers reviewed and approved for the operating entity before publishing.

## Cloudflare Pages + GitHub Deployment

LAWPRIME is fully configured for automated zero-cost hosting on **Cloudflare Pages** connected to GitHub.

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial LAWPRIME static platform release"
git remote add origin https://github.com/YOUR_USERNAME/lawprime.git
git push -u origin main
```

### 2. Connect to Cloudflare Pages
1. Log into your **Cloudflare Dashboard** and select **Workers & Pages**.
2. Click **Create Application** $\rightarrow$ **Pages** $\rightarrow$ **Connect to Git**.
3. Select your `lawprime` repository.
4. Configure Build Settings:
   - **Framework preset:** `None`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Environmental Variables (Optional):
   - Add `SITE_URL` = `https://lawprime.pages.dev` (or your custom domain).
6. Click **Save and Deploy**. Cloudflare Pages will automatically build all 206 static routes and deploy worldwide with free SSL and CDN edge caching.

## Content architecture

Edit `assets/data.js` to update verified practice areas, services, courts, FAQs, legal notices, legal resources, lawyers, judgments and insights. The interface automatically links related service, practice-area, resource, FAQ and jurisdiction pages.

## Required pre-launch replacements

- Set `SITE_URL` during build and update `baseUrl` in `assets/app.js` with the final canonical domain.
- Connect the validated forms to an approved server-side endpoint with rate limiting, spam protection, validation, sanitisation, secure storage and consent handling.
- Have the privacy policy, terms and disclaimers reviewed and approved for the operating entity before publishing.
