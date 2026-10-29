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
