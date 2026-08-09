import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { practiceAreas, courts, caseTypes, notices, resources, serviceRecords, judgments, insights, lawyers } from '../assets/data.js';
import { renderRouteContent } from '../assets/app.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const dist = join(root, 'dist');
const domain = (process.env.SITE_URL || 'https://www.lawprime.com').replace(/\/$/, '');

// Copy generated legal images to assets/images
const imgDir = join(root, 'assets', 'images');
mkdirSync(imgDir, { recursive: true });
const brainDir = 'C:\\Users\\Kstar\\.gemini\\antigravity-ide\\brain\\614cf96f-ec2f-43ce-92fa-cc9393049b32';
if (existsSync(brainDir)) {
  const files = readdirSync(brainDir);
  const mappings = {
    'hero_lawprime': 'hero-lawprime.png',
    'about_lawprime': 'about-lawprime.png',
    'family_law': 'family-law.png',
    'civil_litigation': 'civil-litigation.png',
    'criminal_law': 'criminal-law.png',
    'property_law': 'property-law.png',
    'consumer_law': 'consumer-law.png',
    'banking_finance': 'banking-finance.png',
    'corporate_law': 'corporate-law.png',
    'cheque_bounce': 'cheque-bounce.png',
    'employment_law': 'employment-law.png',
    'constitutional_law': 'constitutional-law.png'
  };
  for (const [prefix, filename] of Object.entries(mappings)) {
    const match = files.find(f => f.startsWith(prefix) && f.endsWith('.png'));
    if (match) {
      cpSync(join(brainDir, match), join(imgDir, filename));
    }
  }
  if (existsSync(join(imgDir, 'about-lawprime.png'))) {
    cpSync(join(imgDir, 'about-lawprime.png'), join(imgDir, 'legal-consultation.png'));
    cpSync(join(imgDir, 'about-lawprime.png'), join(imgDir, 'law-library.png'));
  }
  if (existsSync(join(imgDir, 'constitutional-law.png'))) {
    cpSync(join(imgDir, 'constitutional-law.png'), join(imgDir, 'courtroom-jurisdiction.png'));
  }
}

const shell = readFileSync(join(root, 'index.html'), 'utf8');

const routes = [
  ['/', 'LAWPRIME | Legal counsel with clarity', 'Legal information and consultation for consequential matters.'],
  ['/about/', 'About LAWPRIME | LAWPRIME', 'About the LAWPRIME legal information and consultation platform.'],
  ['/practice-areas/', 'Practice Areas | LAWPRIME', 'Explore LAWPRIME practice areas.'],
  ['/courts/', 'Courts & Jurisdictions | LAWPRIME', 'Courts, commissions and tribunals relevant to LAWPRIME.'],
  ['/lawyers/', 'Lawyers | LAWPRIME', 'Verified professional profiles published by LAWPRIME.'],
  ['/judgments/', 'Judgment Library | LAWPRIME', 'A structured library for verified legal judgments.'],
  ['/legal-insights/', 'Legal Insights | LAWPRIME', 'Verified legal guides, analysis and updates.'],
  ['/case-types/', 'Case Types | LAWPRIME', 'Explore common legal case categories.'],
  ['/legal-notices/', 'Legal Notices | LAWPRIME', 'General information about common legal notices.'],
  ['/legal-resources/', 'Legal Resources | LAWPRIME', 'Legal resources, court procedures and glossary material.'],
  ['/faqs/', 'Frequently Asked Questions | LAWPRIME', 'General legal questions answered with care.'],
  ['/contact/', 'Contact | LAWPRIME', 'Contact LAWPRIME.'],
  ['/consultation/', 'Consultation | LAWPRIME', 'Request a consultation with LAWPRIME.'],
  ['/careers/', 'Careers | LAWPRIME', 'Careers at LAWPRIME.'],
  ['/privacy-policy/', 'Privacy Policy | LAWPRIME', 'LAWPRIME privacy policy.'],
  ['/terms-of-use/', 'Terms of Use | LAWPRIME', 'LAWPRIME terms of use.'],
  ['/website-disclaimer/', 'Website Disclaimer | LAWPRIME', 'LAWPRIME website disclaimer.'],
  ['/legal-disclaimer/', 'Legal Disclaimer | LAWPRIME', 'LAWPRIME legal disclaimer.'],
  ...practiceAreas.map(area => [`/practice-areas/${area.slug}/`, `${area.title} | LAWPRIME`, area.short]),
  ...serviceRecords.map(service => [`/practice-areas/${service.areaSlug}/${service.slug}/`, `${service.title} | LAWPRIME`, service.description]),
  ...courts.map(court => [`/courts/${court.slug}/`, `${court.title} | LAWPRIME`, court.scope]),
  ...caseTypes.map(item => [`/case-types/${item.slug}/`, `${item.title} | LAWPRIME`, `A general guide to ${item.title.toLowerCase()}.`]),
  ...notices.map(item => [`/legal-notices/${item.slug}/`, `${item.title} | LAWPRIME`, `A general guide to ${item.title.toLowerCase()}.`]),
  ...resources.map(item => [`/legal-resources/${item.slug}/`, `${item.title} | LAWPRIME`, item.text]),
  ...judgments.map(item => [`/judgments/${item.slug}/`, `${item.caseName} | LAWPRIME`, item.citation || 'Verified legal judgment.']),
  ...insights.map(item => [`/legal-insights/${item.slug}/`, `${item.title} | LAWPRIME`, item.excerpt || 'Verified legal insight.']),
  ...lawyers.map(item => [`/lawyers/${item.slug}/`, `${item.name} | LAWPRIME`, item.summary || 'Verified professional profile.'])
];

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[char]));
}

function renderRoute(route, defaultTitle, defaultDescription) {
  const { appHtml, meta } = renderRouteContent(route);
  const title = meta.title || defaultTitle;
  const description = meta.description || defaultDescription;
  const canonical = `${domain}${route === '/' ? '/' : `${route}/`}`.replace(/\/+/g, '/').replace('https:/', 'https://');
  const schema = {
    '@context': 'https://schema.org',
    '@type': meta.type || 'WebPage',
    name: title.replace(' | LAWPRIME', ''),
    description: description,
    url: canonical
  };

  return shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(" \/>)/, `$1${escapeHtml(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${canonical}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(" \/>)/, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(" \/>)/, `$1${canonical}$2`)
    .replace(/(<meta name="robots" content=")[^"]*(" \/>)/, `$1${meta.noindex ? 'noindex,nofollow' : 'index,follow'}$2`)
    .replace(/(<script type="application\/ld\+json" id="schema-data">)[\s\S]*?(<\/script>)/, `$1${JSON.stringify(schema)}$2`)
    .replace('<div id="app"></div>', `<div id="app">${appHtml}</div>`);
}

if (existsSync(dist)) rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(root, 'assets'), join(dist, 'assets'), { recursive: true });
for (const file of ['_redirects', 'site.webmanifest', 'wrangler.toml']) {
  if (existsSync(join(root, file))) cpSync(join(root, file), join(dist, file));
}

for (const [route, title, description] of routes) {
  const target = route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html');
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, renderRoute(route, title, description));
}

writeFileSync(join(dist, '404.html'), renderRoute('/404/', 'Page not found | LAWPRIME', 'The requested page is not available.'));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(([route]) => `  <url><loc>${domain}${route}</loc></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /404.html\n\nSitemap: ${domain}/sitemap.xml\n`);
console.log(`Built ${routes.length} static routes in ${dist}`);

