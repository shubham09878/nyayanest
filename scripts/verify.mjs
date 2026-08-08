import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('..', import.meta.url)));
const dist = join(root, 'dist');
const errors = [];
for (const file of ['index.html', 'assets/app.js', 'assets/styles.css', 'robots.txt', 'sitemap.xml', '_redirects']) {
  if (!existsSync(join(dist, file))) errors.push(`Missing ${file}`);
}
const sitemap = existsSync(join(dist, 'sitemap.xml')) ? readFileSync(join(dist, 'sitemap.xml'), 'utf8') : '';
const urls = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map(match => match[1]);
if (!urls.length) errors.push('Sitemap has no URLs');
for (const route of urls) {
  const file = route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html');
  if (!existsSync(file)) errors.push(`Sitemap route has no file: ${route}`);
  else {
    const html = readFileSync(file, 'utf8');
    if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`Missing title: ${route}`);
    if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`Missing description: ${route}`);
    if (!/<link rel="canonical" href="https?:\/\//.test(html)) errors.push(`Missing canonical: ${route}`);
  }
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Verified ${urls.length} sitemap routes and production assets.`);
