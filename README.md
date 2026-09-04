# tizonsoft.net — Jose Tizon personal site

Static single-page site. No build step, no framework, no backend.
Deploy the folder as-is.

## Files
```
index.html               single page, all content + JSON-LD structured data
assets/css/style.css     all styles (custom, no Bootstrap)
assets/js/main.js        ~2 KB: sticky nav, scroll reveal, counters, rotating words
assets/img/              mural + ocean photos (webp + jpg, 3 widths), avatar, OG card, favicons
robots.txt               allows search + AI crawlers, points to sitemap
sitemap.xml
llms.txt                 plain-text fact sheet for answer engines (GEO)
manifest.webmanifest
```

## Ver en local
Todas las rutas son relativas, asi que basta con descomprimir y hacer doble clic en
`index.html`. Si en algun momento anades subpaginas o quieres probar el manifest/PWA,
levanta un servidor:
```
python3 -m http.server 8000
```
y abre http://localhost:8000

## SEO
- One `<h1>`, semantic sections, descriptive alt text, single canonical URL.
- Title + meta description written for the query "Jose Tizon engineering leader".
- Open Graph + Twitter card with a 1200x630 image (`assets/img/og-jose-tizon.jpg`).
- JSON-LD `@graph`: Person, WebSite, ProfilePage, Book, FAQPage — with `sameAs`
  pointing to LinkedIn/Instagram/Threads so Google can link the entity.
- Responsive `srcset` in webp + jpg, hero preloaded, everything else lazy.
- `hreflang` self-reference, `theme-color`, manifest.

## GEO (answer engines)
- FAQ section mirrored in `FAQPage` schema: extractable question/answer pairs.
- `llms.txt` with dated, quotable facts and a preferred citation line.
- `robots.txt` explicitly allows GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot,
  Google-Extended, Applebot-Extended, Amazonbot.
- Facts stated in short declarative sentences (name + role + place), which is what
  LLM retrieval pipelines chunk best.
- `knowsAbout` / `award` / `alumniOf` give models attributes to answer "who is" queries.

## Deploy
GitHub Pages, Netlify, Cloudflare Pages or any static host. No build command;
publish directory = repo root.

Suggested headers if your host supports them:
```
/assets/*  Cache-Control: public, max-age=31536000, immutable
/*.html    Cache-Control: public, max-age=0, must-revalidate
```

## After going live
1. Google Search Console: submit `https://tizonsoft.net/sitemap.xml`, request indexing.
2. Bing Webmaster Tools: same (this feeds Copilot).
3. Validate structured data: https://search.google.com/test/rich-results
4. Update the LinkedIn "Website" field to `https://tizonsoft.net/` (currently ja.tizon.co too)
   so the entity signals point at one canonical place.

## Content decisions (confirmed with Jose)
- Based in Andalusia, Spain.
- Stats read "4 businesses launched / $B+ combined revenue", with the businesses named
  right underneath (Prime Video, Kindle Fire Appstore, Amazon Groceries, Amazon Business),
  so the number is never claimed out of context.
- Role includes "Entrepreneur & co-founder".
- Favicon keeps the original cartoon avatar, re-cut to square (16/32/48 .ico + 512 PNG +
  180 apple-touch-icon on the ink background) so browsers stop squashing it.
- Hero uses the full-resolution original of the Santa Ana mural photo, art-directed:
  wide crop on desktop, portrait crop on phones so the figure stays readable.
