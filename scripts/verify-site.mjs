// Checks site/ before it goes to Cloudflare Pages, and fails the deploy if something is off.
// The problems it catches look fine when you open the site, so nobody would notice them:
// a missing 404 page (every wrong address then returns the piano with status 200), a stray
// noindex that drops the site from search, or headers that didn't make it into the upload.
// Plain Node, no dependencies.
import { existsSync, readFileSync, statSync } from "node:fs";

const SITE = "site";
const DOMAIN = "https://piano.darjandrugarinovic.com";
const errors = [];
const read = (f) => readFileSync(`${SITE}/${f}`, "utf8");
const need = (f) => {
  if (!existsSync(`${SITE}/${f}`)) { errors.push(`${SITE}/${f} is missing`); return false; }
  return true;
};

if (need("index.html")) {
  const html = read("index.html");
  if (statSync(`${SITE}/index.html`).size < 1000) errors.push("index.html looks empty");
  if (/content="[^"]*noindex/i.test(html)) errors.push("index.html has noindex; this is a public site");
  if (!html.includes("const SONGS")) errors.push("index.html has no SONGS list; is this the piano page?");
}

if (need("404.html") && !/noindex/i.test(read("404.html"))) {
  errors.push("404.html should carry noindex");
}

if (need("_headers")) {
  const h = read("_headers");
  if (!h.includes("X-Content-Type-Options: nosniff")) errors.push("_headers lacks X-Content-Type-Options");
  if (!h.includes("frame-ancestors 'self' https://darjandrugarinovic.com")) errors.push("_headers lacks frame-ancestors");
  if (/X-Robots-Tag/i.test(h)) errors.push("_headers has X-Robots-Tag; this is a public site");
}

if (need("robots.txt")) {
  const r = read("robots.txt");
  if (/Disallow:\s*\/\s*$/m.test(r)) errors.push("robots.txt blocks the whole site");
  if (!r.includes(`Sitemap: ${DOMAIN}/sitemap.xml`)) errors.push("robots.txt doesn't point to the sitemap");
}

if (need("sitemap.xml") && !read("sitemap.xml").includes(`<loc>${DOMAIN}/</loc>`)) {
  errors.push(`sitemap.xml doesn't list ${DOMAIN}/`);
}

if (errors.length) {
  for (const e of errors) console.log(`::error::${e}`);
  process.exit(1);
}
console.log("site/ looks good");
