// Dynamic sitemap for Next.js
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml');

  // List your static routes here
  const staticPages = [
    '', // home
    'cyber-threat-intelligence',
    'request-a-quote',
    'malware-report',
    'redteam-tools',
    'blog',
  ];

  // Optionally, you can scan your content/pages directory for more routes
  // For demo, we use static list above

  const baseUrl = 'https://hackeranalytics.com';
  const urls = staticPages.map((page) => {
    const path = page ? `/${page}` : '';
    return `<url><loc>${baseUrl}${path}</loc></url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;

  res.status(200).send(sitemap);
}
