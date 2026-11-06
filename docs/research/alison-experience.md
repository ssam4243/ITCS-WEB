# Meet Alison — interactive reception preview

## Brief and working assumptions

Replace the homepage's large service-detail panel with a door opening and an original character stepping out to introduce Alison, the virtual receptionist described in the user's brief. The brief mentions speaking with people, providing information, directing visitors/callers and making calls. Alison is the working name; a clarification was requested because the brief also mentioned Alicia. No confirmed product documentation or live calling integration was supplied.

The section markets a conversation about implementing Alison in a business. Four scripted, explicitly illustrative examples cover answering a call, welcoming a visitor, sharing business information and an agreed outbound follow-up. It does not claim that every human task is supported, invent pricing or service-level guarantees, or represent a live AI connection.

## Design and implementation

`src/alison.js` and `src/alison.css` provide a self-contained component. A fictional, photorealistic virtual representative is presented in a charcoal, glass-fronted reception setting. The portrait was created for this concept with image generation; it does not depict an actual ITCS employee. The transparent source is stored in the workspace, with a 99 KB WebP delivery asset in the repository. A perspective door opens and a restrained arrival reveals Alison. The existing GSAP dependency handles the sequence without an additional WebGL runtime.

The introduction starts when the scene enters view and can be replayed explicitly. No sound starts automatically. A four-tab example panel has keyboard navigation, clear selected states and readable scripted replies. Visitors can enter their business name to personalise the reception signage and relevant follow-up examples. The name remains in session storage and pre-fills the Alison enquiry company field, with DOM text/value assignment rather than HTML interpolation. Clearing the input restores the generic preview. An optional Web Speech preview uses a voice available on the visitor's device; this is not a recording of a confirmed Alison product voice. Unsupported voice environments retain the text preview. Audio can be stopped, and navigation, visibility changes and motion-state changes cancel it.

Reduced-motion and paused modes show the completed welcome scene immediately. Scenario changes become immediate, and the text remains visible even if motion is paused midway through a reply transition. The greeting is positioned clear of the character's face. Mobile layouts stack the scene above the copy; all controls remain native HTML.

The main CTA opens `/contact?service=alison`, preselecting the new Alison option, preserving the product name in the form heading and adding an editable initial enquiry message. The existing form remains a browser-only prototype and sends no message. The six business-service cards now link directly to their service pages; the removed panel has no hidden substitute. Business-priority links also open the relevant service page.

## Research

Read the official GSAP Timeline and responsive motion documentation, and the Web Speech API documentation:

- https://gsap.com/docs/v3/GSAP/Timeline/
- https://gsap.com/docs/v3/GSAP/gsap.matchMedia/
- https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

GSAP already provides the sequencing, transforms and cleanup required here. Browser speech synthesis is optional because installed voices and audio availability vary by platform.

## Verification and limits

- `npm run test:alison`: automatic entrance and replay, four examples, keyboard tabs, enquiry context, eight viewport widths, reduced-motion touch, pause during a reply, and opt-in voice start/stop/navigation cleanup.
- Voice lifecycle checks use a controlled speech-engine stub. They do not verify the audible quality of every device voice. No live calling, microphone or AI backend is connected.
- `npm run test:interactions`: retained folder behaviour, paper extraction, navigation, drag, business-priority routes, contextual enquiry, keyboard, mobile and motion preferences.
- `npm run test:homepage`: retained particle logo, direct service links, customer/sector/process interactions and responsive layouts.
- Desktop/mobile browser captures were inspected. Character/greeting overlap was checked at representative widths. Build uses the GitHub Pages `/ITCS-WEB/` base.

## Brand integration refinement

Following feedback that the initial scene felt artificial and separate from the page, the cream stage and cartoon representation were replaced with a restrained charcoal/ITCS-red composition, modern glass-door architecture, an adult-proportioned visual representative and quiet transitions. The example panel, controls and typography now follow the surrounding service cards. Reception personalisation gives visitors a concrete way to picture the concept in their own organisation. This remains an illustrative frontend experience rather than a photograph of an actual employee or a live reception system.
