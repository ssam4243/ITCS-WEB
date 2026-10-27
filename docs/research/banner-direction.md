# Cleaning the ITCS banner

Reviewed 27 October 2026. This is a substantial hierarchy revision within the existing ITCS identity, not a new brand or evidence of improved conversion.

## What the feedback indicates

The user consistently likes the connected-services orbit and wants useful service pathways. The repeated dissatisfaction concerns the banner's composition, competing controls, tall preview panel and overall visual density. Keep the orbit, actual ITCS logo and palette, and the caption beneath the orbit. Simplify the surrounding decisions.

## Research checked

- [Jakob Nielsen: Top 10 Guidelines for Homepage Usability](https://www.nngroup.com/articles/top-ten-guidelines-for-homepage-usability/) — an enduring guideline article originally published in 2002. Relevant guidance: explain the site's purpose, emphasise high-priority tasks, use meaningful graphics, and avoid over-formatting important navigation. This is guidance, not a current conversion benchmark.
- [GOV.UK Design System: Button](https://design-system.service.gov.uk/components/button/) — distinguish the main action, use descriptive action wording, and avoid competing primary buttons. Its service-design guidance informs hierarchy; it does not prove marketing conversion gains.
- [web.dev: prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion) — preserve user control, support static alternatives and respond to preference changes. Existing motion pause and media-query handling remain.
- [BASIC/DEPT](https://www.basicagency.com/) — inspected the rendered video-led opening and subsequent agency-introduction section. The opening has one dominant visual and reel action; corporate explanation and work follow in distinct sections. Borrow the separation of jobs, not its media or brand.
- [Instrument](https://www.instrument.com/) — reviewed content and rendered navigation/typography. Its video did not render reliably in the capture, so no conclusion about the completed media experience is asserted. The inspected content states what the agency does and links to work. Borrow clear language, not its visual identity.

Reference captures and fetched source pages were retained in `/tmp/itcs-research` for this task. These sites are design examples, not evidence of their lead-generation performance. No reference artwork or source code was copied.

## Banner decisions

Target: business owners and IT decision-makers. Main action: discuss requirements with ITCS. Brand retained: original ITCS mark, red (#e22028), charcoal, white and the established typefaces.

1. Replace the abstract headline with **One team. All connected.**
2. State the offer directly: IT support, cyber security, communications and digital services.
3. Keep one filled enquiry button, with a subordinate service link. The header enquiry action becomes outlined on the homepage.
4. Keep the orbit as the single interactive visual. Keep the selected-service caption below it, with a clear service-page link.
5. Move the four business-priority choices into the service-discovery section. A choice updates the local service panel; users need not return to the banner.
6. Remove the marquee, repeated status labels, service count and secondary capability disclosure from the banner. Detailed capabilities and enquiry actions remain on the service pages.
7. Keep a visible motion control near the orbit. Preserve keyboard, touch, reduced-motion and native-scrolling behaviour.

The resulting reading order is: understand the offer → enquire or explore → inspect the relevant service → decide the next step. The connection narrative, customer perspectives, sectors and detailed service discovery remain below the banner.

## What is verified and what remains

Browser checks cover the simplified banner, all priority recommendations, service selection, contextual enquiry continuity, scroll narrative, keyboard controls, motion preferences, touch and eight responsive widths. Desktop and mobile screenshots are inspected. Production-path checks verify the GitHub Pages base path.

A five-second comprehension test with target buyers and production enquiry data are still needed. The current form is a demonstration; no conversion increase is claimed.
