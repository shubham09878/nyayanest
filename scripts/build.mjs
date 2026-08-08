import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { practiceAreas, courts, caseTypes, notices, resources, serviceRecords, judgments, insights, lawyers } from '../assets/data.js';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const dist = join(root, 'dist');
const domain = (process.env.SITE_URL || 'https://www.example.com').replace(/\/$/, '');
const shell = readFileSync(join(root, 'index.html'), 'utf8');

const routes = [
  ['/', 'NyayaNest | Legal counsel with clarity', 'Legal information and consultation for consequential matters.'],
  ['/about/', 'About NyayaNest | NyayaNest', 'About the NyayaNest legal information and consultation platform.'],
  ['/practice-areas/', 'Practice Areas | NyayaNest', 'Explore NyayaNest practice areas.'],
  ['/courts/', 'Courts & Jurisdictions | NyayaNest', 'Courts, commissions and tribunals relevant to NyayaNest.'],
  ['/lawyers/', 'Lawyers | NyayaNest', 'Verified professional profiles published by NyayaNest.'],
  ['/judgments/', 'Judgment Library | NyayaNest', 'A structured library for verified legal judgments.'],
  ['/legal-insights/', 'Legal Insights | NyayaNest', 'Verified legal guides, analysis and updates.'],
  ['/case-types/', 'Case Types | NyayaNest', 'Explore common legal case categories.'],
  ['/legal-notices/', 'Legal Notices | NyayaNest', 'General information about common legal notices.'],
  ['/legal-resources/', 'Legal Resources | NyayaNest', 'Legal resources, court procedures and glossary material.'],
  ['/faqs/', 'Frequently Asked Questions | NyayaNest', 'General legal questions answered with care.'],
  ['/contact/', 'Contact | NyayaNest', 'Contact NyayaNest.'],
  ['/consultation/', 'Consultation | NyayaNest', 'Request a consultation with NyayaNest.'],
  ['/careers/', 'Careers | NyayaNest', 'Careers at NyayaNest.'],
  ['/privacy-policy/', 'Privacy Policy | NyayaNest', 'NyayaNest privacy policy.'],
  ['/terms-of-use/', 'Terms of Use | NyayaNest', 'NyayaNest terms of use.'],
  ['/website-disclaimer/', 'Website Disclaimer | NyayaNest', 'NyayaNest website disclaimer.'],
  ['/legal-disclaimer/', 'Legal Disclaimer | NyayaNest', 'NyayaNest legal disclaimer.'],
  ...practiceAreas.map(area => [`/practice-areas/${area.slug}/`, `${area.title} | NyayaNest`, area.short]),
  ...serviceRecords.map(service => [`/practice-areas/${service.areaSlug}/${service.slug}/`, `${service.title} | NyayaNest`, service.description]),
  ...courts.map(court => [`/courts/${court.slug}/`, `${court.title} | NyayaNest`, court.scope]),
  ...caseTypes.map(item => [`/case-types/${item.slug}/`, `${item.title} | NyayaNest`, `A general guide to ${item.title.toLowerCase()}.`]),
  ...notices.map(item => [`/legal-notices/${item.slug}/`, `${item.title} | NyayaNest`, `A general guide to ${item.title.toLowerCase()}.`]),
  ...resources.map(item => [`/legal-resources/${item.slug}/`, `${item.title} | NyayaNest`, item.text]),
  ...judgments.map(item => [`/judgments/${item.slug}/`, `${item.caseName} | NyayaNest`, item.citation || 'Verified legal judgment.']),
  ...insights.map(item => [`/legal-insights/${item.slug}/`, `${item.title} | NyayaNest`, item.excerpt || 'Verified legal insight.']),
  ...lawyers.map(item => [`/lawyers/${item.slug}/`, `${item.name} | NyayaNest`, item.summary || 'Verified professional profile.'])
];

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' }[char]));
}

function renderRoute(route, title, description) {
  const canonical = `${domain}${route}`;
  return shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(" \/>)/, `$1${escapeHtml(description)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, `$1${canonical}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, `$1${escapeHtml(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(" \/>)/, `$1${escapeHtml(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(" \/>)/, `$1${canonical}$2`);
}

if (existsSync(join(root, 'wrangler.toml'))) rmSync(join(root, 'wrangler.toml'), { force: true });
if (existsSync(dist)) rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(root, 'assets'), join(dist, 'assets'), { recursive: true });
for (const file of ['_redirects', 'site.webmanifest']) cpSync(join(root, file), join(dist, file));

for (const [route, title, description] of routes) {
  const target = route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html');
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, renderRoute(route, title, description));
}

writeFileSync(join(dist, '404.html'), renderRoute('/404/', 'Page not found | NyayaNest', 'The requested page is not available.'));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(([route]) => `  <url><loc>${domain}${route}</loc></url>`).join('\n')}\n</urlset>\n`;
writeFileSync(join(dist, 'sitemap.xml'), sitemap);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /404.html\n\nSitemap: ${domain}/sitemap.xml\n`);
console.log(`Built ${routes.length} static routes in ${dist}`);
