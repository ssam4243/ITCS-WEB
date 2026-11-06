# Homepage: connected expertise

29 October 2026. Built against the existing ITCS code, assets and approved folder banner.

## Reference review

- https://www.awwwards.com/websites/business-corporate/ — visited the current listing and captured its rendered desktop view. The listing included Refactory, Prime, Cleal Kakuta Paper and Sanwa Kaihatsu. The variety supports selecting a specific business metaphor rather than applying one generic animated card layout to every section. This was a listing review, not a usability assessment of every featured site.
- https://www.awwwards.com/sites/lusion — read the award entry and its interactive navigation and figure descriptions. This is a historical 2019 award entry, not a current award. Its lesson here is a purposeful signature interaction, rather than adding WebGL throughout a business services site.
- https://www.basicagency.com/ — read the current homepage and captured its rendered opening view. Project-led storytelling, deliberate scale and a distinct human image establish character before secondary information.
- https://www.instrument.com/ — read the current homepage content. Multidisciplinary work is tied to an explicit brand/product/marketing offering, providing a useful example of explaining connected disciplines clearly. No new rendered Instrument capture was used for this pass.

Screenshots were captured using Chromium/Playwright with the environment's trusted certificate store and proxy. No TLS validation was disabled.

## What changed and why

The previous full-page capture showed an oversized scroll narrative, repeated two-line headings and image-led stories whose quotations were buried on detail pages. The redesign keeps the ITCS folder as the main signature, with quieter, useful interactions elsewhere.

- Customer references immediately follow the hero. They remain explicitly attributed to the April 2026 archived site, rather than represented as newly verified endorsements.
- A manual, three-scenario connection workbench replaces the long scroll story. New starter, suspicious email and growth scenarios each connect three relevant services, with working service links. The diagram updates with the choice. Scenarios are clearly illustrative; they are not performance claims or live system telemetry.
- The service explorer retains all six services and the four business-priority journeys. It now includes three capabilities, a contextual enquiry link and a more legible split panel.
- People principles expand to explain the proposed relationship, instead of being three unexplained labels. The partnership photograph and ITCS swirl remain existing brand assets.
- Customer perspectives become a manually controlled quote feature. Keyboard tabs, customer identity and story links update together. No autoplay and no invented outcomes.
- Sector links expose concise context by default, with fuller hover/focus context. Touch visitors can read sector descriptions and follow the links without hover.
- FAQs include a direct phone route. The closing invitation uses a subtle stacked-paper motif related to the banner.
- The contextual enquiry dock appears only after a visitor has chosen a service and scrolled past the banner, and remains dismissible.

## Visual system and constraints

ITCS red #e22028, charcoal #191919, white #ffffff, neutral paper #f6f6f4, grey #eeefed. Existing Poppins carries narrative and interface labels; existing Barlow Condensed remains available elsewhere. No new fonts or runtime dependencies. The tactile cards, connector lines and paper motif form the signature; typography and spacing carry the rest. The red card edge accents removed at the user's request remain removed.

Motion is limited to entry, signal drawing and explicit selection transitions. Native scrolling is preserved. Motion preferences, the existing pause control, semantic tabs, focus indicators and touch input remain supported. Contrast, reading size and motion were reviewed during implementation, but this is not a claim of complete WCAG conformance or a measured conversion uplift.

## Verification

`npm run test:interactions` covers the existing folder and enquiry journeys. `npm run test:homepage` covers new scenario/customer keyboard tabs, sector hover and focus, people accordions, service capabilities and enquiry preselection, eight responsive widths, motion pause and reduced-motion touch input. Production builds use `/ITCS-WEB/` as the GitHub Pages base. Desktop and mobile section captures were visually inspected. Conversion impact requires real analytics and testing after launch.

## HeyHiHello reference — 6 November 2026

Reviewed https://heyhihello.com/ in a rendered Chromium desktop session (HTTP 200). Ordinary non-browser requests returned 403, so the rendered page was used as the source. Captured the opening view and read the homepage's service, sector, case study and FAQ content.

Observed a large conversational proposition, a bright rounded hero surface, restrained hand-drawn emphasis, a customer quotation close to the opening action, three plainly explained practices, and sector-specific context. Adopted the principles of approachable language, visible customer proof and softer section transitions for ITCS. The ITCS logo, existing red/charcoal palette, direct-selection service folder, service priorities and working enquiry journeys remain the design foundation. No HeyHiHello assets, testimonials, business metrics or agency offerings were reused.

The experimental pass adds a drawn connection stroke to the hero, brings an existing attributed Sony customer quotation into the opening reference strip, makes the service heading explicit, rounds the main alternating section surfaces, and softens selected CTA shapes. Drawing respects reduced motion and the existing pause control. Existing archived-source attribution is retained. Responsive and interaction regression checks accompany this pass; no conversion improvement is claimed without user data.

## Direct interaction pass — 6 November 2026

The connection diagram now contains native service links, with coordinated hover/focus highlights on the corresponding explanation. Service URLs update with each scenario. A bounded pointer tilt adds tactile feedback to the central card only for fine pointers with motion enabled. The diagram remains usable as links with reduced motion.

Customer perspectives have explicit previous/next controls and a position indicator, plus horizontal touch swipe. Vertical scrolling remains native; there is no autoplay. The sector preview has a native selector and an explicit link, enabling touch visitors to explore context before navigating. The homepage closing invitation includes four topic controls that update the action and preselect the enquiry form. Selecting an active topic again clears it. No message is sent by these controls.

Extended homepage checks cover matching node/service URLs, coordinated highlights, customer arrows, actual Chromium touch-swipe input, sector selection, enquiry topic continuity and responsive layouts. The existing folder regression suite also passes.

## Structural rework and WebCastle reference — 6 November 2026

The user requested a full homepage rework, named https://webcastle.com/in-en/ as the principal reference, and then specified keeping the folder while adding a particle interaction to its logo. Reviewed the live WebCastle homepage in Chromium, including its particle-built opening mark, dark immersive background, service-card grid, oversized section statements, collaborator logo grid and case-study framing. Captured the rendered opening and service/work sections. The reference uses long animated/pinned scenes; ITCS retains native scrolling and immediately readable content.

The new homepage below the banner is authored in `src/home-rework.js` and `src/home-rework.css`: dark service cards with a shared detail panel, a connected-services statement, a light customer quotation section, an interactive three-step partnership sequence, a sector selector and new FAQs. Content uses ITCS services and attributed archived customer material. No WebCastle imagery, awards, metrics or client results were reused. ITCS remains red and charcoal rather than adopting WebCastle's green/purple identity.

The existing banner markup and folder navigation are retained. `src/logo-particles.js` samples the actual ITCS logo into canvas points on folder hover. Pointer proximity displaces the points, which spring back to the original mark; the accessible image remains the fallback. The effect is unavailable for coarse pointers, paused motion and reduced-motion preferences. Rendering stops out of view, on hidden documents and after the return settles. No new dependency was added.

The homepage regression suite was updated for the new composition, including particle readiness/return, pause cleanup, six service selectors, enquiry preselection, process keyboard controls, customer swipe, sector choices, eight widths and touch/reduced-motion use. The existing service-folder suite remains applicable and passes.

### Folder logo visibility correction

Enlarged the mark from 132 to 190 design pixels and rendered its existing silhouette in white against the red pocket. The base image now remains fully visible during particle interaction. A denser white particle overlay adds motion around the readable mark instead of replacing it. Folder headline and footer text were also increased for clarity. Verified static and hovered logo opacity, particle generation, mobile spacing and the homepage regression suite.

### Dotted default

At the user's request, the folder mark now renders as separated white dots as soon as the source artwork is sampled. Hover displaces the points gently and restores the dotted shape, rather than switching to a solid mark. Touch, paused and reduced-motion modes render the same static dotted mark without animation. The original image remains an accessible loading/error fallback. Verified desktop/mobile default captures, hover return and the updated homepage regression suite.

## Natural homepage refinement — November 2026

The folder remains the opening signature. The rest of the page now follows a clearer reading order: direct service choices, sourced customer quotations, three visible steps for starting a relationship, Alison as an optional interactive discovery, direct sector links, practical FAQs and one closing enquiry route.

IT support, cyber security and telecoms have the strongest visual hierarchy. Secondary services remain directly accessible. Repeated connected-services graphics, the priority chooser, hidden process tabs, the decorative sector simulator and the closing topic picker were removed. The low-resolution decorative photograph was also removed rather than enlarged. No new customer results, testimonials or service guarantees were invented.

Typography, neutral colours, red accents and spacing are consistent across the sections. Customer switching and Alison keep useful interaction; essential service and sector information is available without interaction. Scroll movement is limited to a small, one-time entrance; the parallax and rotated-card entrances are removed. The existing folder and particle-logo interactions are retained.

Validation covers the revised reading order, six service destinations, service-to-enquiry continuity, direct sector routes, visible process content, FAQ expansion, customer controls and touch swipe, eight responsive widths, reduced motion, plus the existing Alison and folder interaction suites. This validates implementation and navigation; conversion improvements require observation with real prospective customers.

## Landing-only review and alignment refinement

The customer section now uses equal text tabs instead of differently proportioned logo images. The heading, quotation and attribution share the same left edge. Source information and browsing controls share a separate aligned bottom row. Quotations and source attribution remain unchanged.

Navigation uses a compact sticky ITCS header with section links and a mobile disclosure. The footer groups services, page sections and contact information; its closing enquiry area uses the same palette and typography. Internal journeys stay on the homepage. Native dialogs provide service capabilities, sourced customer summaries, sector context, support information and the local enquiry form. Direct old inner-page URLs resolve to the landing page; page source is retained for later development. External telephone and client portal links remain functional.

Dialog focus is managed by the native modal element; Escape closes it, the backdrop can dismiss it, and the underlying page is locked while open. Opening a dialog stops Alison audio. Enquiry service context and Alison business-name personalisation are preserved. This remains a frontend preview with no message delivery.
