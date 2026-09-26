# NST Group of Education website

This is a standalone, responsive, English-language eight-page website. It uses plain HTML, CSS and JavaScript, so it has no package installation or build step.

## Search and sharing metadata

Each page has its own title, description, Open Graph and Twitter card metadata. The supplied NST logo is the favicon. The site also adds School/WebSite/WebPage structured data, including the supplied Facebook page and known contact details.

The production domain has not been set. `site-config.js` is the single place to add it later. Once the final HTTPS domain is known, set `window.NST_SITE_URL` there and run `node tools/generate-seo.mjs` from this folder. That creates an absolute-URL sitemap and sitemap directive in `robots.txt`, and writes canonical and social image URLs into all eight HTML pages. Until then, `robots.txt` allows crawling and the site intentionally has no invented canonical domain or sitemap URL.

The sitemap uses the existing `.html` routes; no framework or URL migration is required.

## Open the website

Open `index.html` in a browser. Use the navigation to visit About Us, Academics, Campus & Facilities, Activities & Events, Achievements, Gallery and Contact.

## School photographs

The homepage hero uses the supplied school-building photo in `assets/nst-campus.jpg`, a compressed full-width background with a light text overlay. Director, classroom, parent meeting, assembly, tree planting, speaking, exhibition, annual function, cultural performance and recognition photos are placed in the related sections and Gallery. Add future photos to `assets` and the photo list in `assets/site.js`.

LEAD is identified as the digital education service provider and curriculum partner for Nursery through Class 8. Its supplied logo is saved as `assets/lead-logo.png` and appears in the homepage partner feature.

The supplied school emblem is saved as `assets/nst-logo.jpg` and appears in the header and footer on every page.

## Contact form

The enquiry form prepares a message in the visitor's email app addressed to `singhtomarjasvant@gmail.com`; it does not submit data to a server.

## External fonts

The site loads DM Sans and Manrope from Google Fonts when an internet connection is available. System fonts are used as fallbacks.
