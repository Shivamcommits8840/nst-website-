import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const config = await readFile(join(root, "site-config.js"), "utf8");
const match = config.match(/window\.NST_SITE_URL\s*=\s*["']([^"']*)["']/);
if (!match?.[1]) {
  throw new Error("Set window.NST_SITE_URL in site-config.js to the real production origin first.");
}
const site = new URL(match[1]);
if (site.protocol !== "https:" || site.pathname !== "/" || site.search || site.hash) {
  throw new Error("NST_SITE_URL must be the HTTPS site origin without a path, query, or fragment.");
}

const base = site.origin;
const routes = ["", "about.html", "academics.html", "campus.html", "activities.html", "achievements.html", "gallery.html", "contact.html"];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${base}/${route}</loc></url>`).join("\n")}
</urlset>
`;
await writeFile(join(root, "sitemap.xml"), sitemap, "utf8");
await writeFile(join(root, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`, "utf8");

for (const route of routes) {
  const file = join(root, route || "index.html");
  let html = await readFile(file, "utf8");
  const canonical = new URL(route, `${base}/`).href;
  const ogImage = new URL("assets/nst-campus-og.jpg", `${base}/`).href;
  html = html.replace(/<link\s+rel="canonical"[^>]*>/i, "");
  html = html.replace("</head>", `  <link rel="canonical" href="${canonical}">\n</head>`);
  for (const key of ["og:url", "og:image", "twitter:image"]) {
    const value = key === "og:url" ? canonical : ogImage;
    const attr = key.startsWith("og:") ? "property" : "name";
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const tag = new RegExp(`<meta\\s+${attr}="${escaped}"\\s+content="[^"]*">`, "i");
    if (tag.test(html)) html = html.replace(tag, `<meta ${attr}="${key}" content="${value}">`);
    else html = html.replace("</head>", `  <meta ${attr}="${key}" content="${value}">\n</head>`);
  }
  await writeFile(file, html, "utf8");
}
console.log(`Generated sitemap.xml and production canonical/social URLs for ${routes.length} pages.`);
