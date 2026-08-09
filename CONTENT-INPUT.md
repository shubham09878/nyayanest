# LAWPRIME Content & Configuration Input Guide

This document outlines the exact fields and information required to complete the verified content and deployment configuration for LAWPRIME.

---

## 1. Domain & Canonical Base URL

To ensure proper static route generation, canonical link tags, Open Graph meta tags, and `sitemap.xml` generation, provide:

* **Production Domain / Canonical URL**: e.g., `https://www.lawprime.com` (or your exact production domain).
  * Used in `scripts/build.mjs` (`SITE_URL` env variable)
  * Used in `assets/app.js` (`baseUrl` variable)

---

## 2. Site Contact & Office Information

Update `site.contact` in `assets/data.js` with verified contact details:

| Field Name | Type | Description | Example / Format |
| :--- | :--- | :--- | :--- |
| `phone` | String | Official telephone / mobile number | `"+91 172 XXXXXXX"` |
| `email` | String | Official contact email address | `"contact@lawprime.com"` |
| `whatsapp` | String | Official WhatsApp number or link | `"+91 98XXXXXXXX"` |
| `address` | String | Official physical office location / address | `"Office No. XX, Sector XX, Chandigarh"` |

---

## 3. Lawyer Profiles (`lawyers` array in `assets/data.js`)

Each record added to the `lawyers` array in `assets/data.js` requires the following fields:

```javascript
{
  slug: 'lawyer-name',                 // String (URL slug e.g. "adv-arun-sharma")
  name: 'Advocate Full Name',          // String (Full name with prefix)
  designation: 'Designation / Title',  // String (e.g. "Senior Advocate", "Managing Partner")
  summary: 'Brief professional summary',// String (1-2 sentences for card previews)
  profile: 'Detailed profile overview',// String (Full professional bio)
  practiceAreas: 'Primary areas',     // String (e.g. "Family Law, Civil Litigation")
  courts: 'Courts of practice',        // String (e.g. "Punjab & Haryana High Court, District Courts")
  experience: 'Years / details',      // String (e.g. "15+ years at the High Court Bar")
  representativeWork: 'Key matters',   // String (Summary of verified representative work)
  judgments: 'Noteworthy decisions',   // String (Key reported judgments or citations)
  insights: 'Published articles'       // String (Authored articles or guides)
}
```

---

## 4. Legal Insights (`insights` array in `assets/data.js`)

Each article or legal guide added to the `insights` array in `assets/data.js` requires:

```javascript
{
  slug: 'article-title-slug',          // String (URL slug e.g. "understanding-interim-maintenance")
  title: 'Article Title',              // String (Full headline)
  category: 'Category',                // String (e.g. "Family Law", "Criminal Law", "Property Law")
  excerpt: 'Short summary',            // String (1-2 sentence excerpt for card preview & meta description)
  author: 'Author Name',               // String (e.g. "LAWPRIME Legal Desk" or lawyer name)
  publishedAt: 'Publication date',     // String (e.g. "August 8, 2026")
  updatedAt: 'Last updated date',      // String (e.g. "August 8, 2026")
  applicableLaw: 'Relevant Acts',      // String (e.g. "Hindu Marriage Act, 1955; Code of Civil Procedure, 1908")
  body: 'Full article text',           // String (Detailed legal analysis)
  sections: 'Relevant provisions',     // String (Statutory sections referenced)
  judgments: 'Cited judgments'         // String (Case law citations referenced)
}
```

---

## 5. Contact & Consultation Form Handler

The front-end form validation is implemented in `assets/app.js`. To make contact and consultation requests active in production:

* **Endpoint Target URL**: A secure server-side form handler endpoint URL (e.g., Formspree, Web3Forms, Netlify Forms, or custom API route) capable of handling `POST` requests with fields: `name`, `email`, `phone`, `matter`, and `message`.
