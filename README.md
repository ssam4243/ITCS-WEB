# ITCS website prototype

Responsive, client-side website prototype built with Vite and vanilla JavaScript. Uses the recovered ITCS logo, red (#e22028), charcoal and white palette, and locally stored imagery from the archived ITCS website.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev -- --port 5173
```

For a production build: `npm run build`. To serve it: `npm run preview -- --port 4173`.

## Included journeys

- Homepage and service overview
- Six service-detail pages with capabilities, process and FAQs
- Ten sector pages
- Customer perspective listing, filters and three detail pages
- About ITCS
- Three prototype editorial guides
- Contact form with native validation and a local-only confirmation
- Support page linking to the existing client portal and service status
- Privacy explanation and cookie preferences
- Responsive mobile navigation, service menu, keyboard focus and reduced-motion support

Client-side routes require a hosting fallback to `index.html`; Vite handles this during development and preview.

## Content boundaries

This is a design prototype, not a live ITCS service. The enquiry form does not transmit or retain personal data. Only the cookie preference is saved in localStorage. There are no analytics or marketing trackers. Poppins and Barlow Condensed are self-hosted; system fonts are fallbacks.

ITCS content, logo and images were recovered from the homepage archived on 21 April 2026 at https://web.archive.org/web/20260421205355/https://www.itcs.co.uk/. Customer quotes are excerpts from that page. Imagery illustrates the service and is not represented as photography of named customer projects. Logo files are provided for this ITCS design exercise; confirm rights and current customer permissions before publication.

New positioning, sector explanations, editorial guides and service summaries are proposed prototype copy. Verify all commercial commitments, phone numbers, support entitlements, consent language and contact response expectations with ITCS before production. Historical customer metrics and certification badges have deliberately not been presented as current claims.

Production work still required: approved copy and assets, enquiry backend and spam controls, consent/privacy review, CMS integration if desired, redirects and SEO migration, and deployment configuration.

## Validation performed

Production build and clean locked install passed. Chromium smoke checks covered 31 internal routes, image loading, mobile overflow on all routes, navigation and Escape dismissal, service FAQs, service preselection on contact, local-only validated enquiry confirmation without a POST request, customer filters, cookie preferences and absence of JavaScript errors. Desktop and mobile screenshots were inspected. These checks do not establish full WCAG conformance or live external-service availability.

## GitHub Pages

The `.github/workflows/pages.yml` workflow builds and deploys pushes to `main`. Repository Settings → Pages must use **GitHub Actions** as its source. The Pages build uses `/ITCS-WEB/` as its base path; development continues to use `/`.

The expected address after a successful deployment is https://ssam4243.github.io/ITCS-WEB/ . A generated `404.html` renders client-side routes when opened directly; GitHub may return HTTP 404 for those deep links even though the page renders. This is suitable for a prototype; production hosting should provide a proper SPA rewrite or pre-rendered routes.

To reproduce the hosted build locally:

```sh
PAGES_BASE_PATH=/ITCS-WEB/ npm run build
PAGES_BASE_PATH=/ITCS-WEB/ npm run preview -- --port 4173
```

## Motion and interaction design

The revised homepage uses GSAP and ScrollTrigger: character entrances, an interactive six-service connection engine, pointer-responsive graphics, animated signal paths, a scrolling service ribbon, magnetic buttons and scroll reveals. Service nodes and service-selector tabs work with mouse, touch and keyboard. The on-page motion control pauses ambient and entrance animation for the browser session. Operating-system reduced-motion preferences disable decorative animation, including when changed while the page is open. Content and routes remain available when motion is paused. Native scrolling is preserved.

### Connection-engine service discovery

Hovering with a mouse, focusing with the keyboard, or tapping a service selects a persistent preview. Each preview includes a service summary, three capabilities, a direct service-page link and an enquiry link with that service preselected. Arrow keys move between nodes; Escape moves focus to the service-page link. The preview remains available when the pointer leaves the diagram. On desktop it sits beside the larger engine; on mobile it follows the diagram. Preview updates work with motion paused and with reduced-motion preferences.

Validated: all six hover previews and navigation targets, persistent preview when approaching links, keyboard navigation, enquiry preselection, touch interaction with reduced motion, and overflow checks at eight widths from 320 to 1440 pixels.

## Research-led interaction pass

See [interaction research and conversion hypothesis](docs/research/interaction-direction.md) for source links, evidence limits and the validation plan. The homepage now includes a business-priority selector, selected-path drawing, a native-scroll connection narrative and a dismissible contextual enquiry shortcut. Service choice carries through into the form heading and selection. The compact preview remains sized to its content.

With a development or preview server running, execute interaction checks with:

```sh
npx playwright install chromium
npm run test:interactions
```

Set `ITCS_TEST_URL` to test a different base URL (include its trailing slash). `PLAYWRIGHT_EXECUTABLE_PATH` optionally selects an installed Chromium executable. Tests cover recommendation journeys, hover previews, enquiry continuity, keyboard controls, motion preferences, dismissal, touch and eight responsive widths.
