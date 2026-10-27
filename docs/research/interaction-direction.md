# ITCS: interaction research and conversion hypothesis

Reviewed 27 October 2026. This is a design-research record, not evidence of a conversion-rate improvement.

## Sources inspected

| Source | Evidence reviewed | Relevant principle | ITCS application |
| --- | --- | --- | --- |
| [Awwwards Sites of the Day](https://www.awwwards.com/websites/sites_of_the_day/) | Current listing and the Brandon Yasin and Jesper Landberg award pages | Interaction, usability, content and responsive design are evaluated separately; an award is not conversion evidence | Treat craft and task completion as separate acceptance checks |
| [Brandon Yasin](https://brandonyasin.com/) / [award entry](https://www.awwwards.com/sites/brandon-yasin) | Rendered opening and scrolled gallery; award entry describes time-of-day colour changes and editorial navigation | A recognisable interaction can belong to the subject, rather than decorate every section | Keep the ITCS connection engine as the central motif; make it respond to business priorities |
| [Dennis Snellenberg](https://dennissnellenberg.com/) | Rendered opening, scrolling typography, content and navigation | Expressive typography can coexist with simple Work and Contact routes | Make the experience memorable while keeping service and enquiry destinations explicit |
| [Lusion](https://lusion.co/) | Rendered interactive opening after preload and scrolled visual state; homepage content | A continuous visual object gives the experience a recognisable identity | Develop the ITCS connection motif into a scroll-linked explanation, with lightweight SVG instead of a heavy WebGL scene |
| [Jesper Landberg award entry](https://www.awwwards.com/sites/jesper-landberg-4) | Awwwards description, listed transition examples and technology metadata | Motion can provide continuity between overview and detail | Preserve the selected service across the engine, lower-page shortcut and enquiry form |

No source code, brand assets or artwork from these studios was copied. ITCS retains its own logo, palette, content and locally stored images. Screenshots used for inspection were retained in the task's `/tmp/itcs-research` folder. Lusion's first preload captures were rejected and replaced with fully rendered captures. Dennis's project-hover attempt could not be reliably completed; no findings about that interaction are asserted. Active Theory returned a JavaScript shell and was not used as visual evidence.

## Design decision

The compact service-preview box remains. Add three focused mechanisms:

1. **Choose a business priority:** four plain-language choices select a relevant service and explain why it is a useful starting point. These are suggestions, not an automated technical assessment.
2. **Follow the connection:** the selected pathway draws into place; a native-scroll narrative illustrates how six disciplines connect through one team. Desktop uses a sticky illustration; mobile and reduced-motion layouts show the complete illustration without pinning.
3. **Continue the conversation:** after leaving the hero, a dismissible shortcut links to an enquiry with the current service preselected. It hides near the closing CTA and while the cookie panel is visible.

Typography, image reveals and link feedback provide continuity. There is no custom replacement cursor, scroll hijacking, compulsory intro or automatic sound.

## Conversion goal and funnel

Primary eventual outcome: a qualified service enquiry received by ITCS. The form is still a demonstration and sends no messages; this cannot be measured as a real lead yet.

Intended path: business priority → service relevance → service detail or contextual enquiry → completed enquiry → ITCS response. The priority selector can be bypassed through any service node, the service navigation, phone links or the main contact page.

### Objections and responses

These are hypotheses to validate with ITCS sales/support conversations, not findings from visitor interviews.

| Possible question | Response in the prototype | Evidence status |
| --- | --- | --- |
| Where should I start? | Plain-language business-priority choices and a short explanation | Needs task testing with target buyers |
| Is this relevant to my business? | Service capabilities, sectors and customer perspectives | Historical source material is labelled; current relevance needs approval |
| Will I have to repeat myself? | Selected service is carried into the enquiry | Browser-tested behaviour |
| Can I get help without exploring the animation? | Normal navigation, direct links, phone and support route | Browser-tested pathways; external service availability not asserted |
| What happens after contacting ITCS? | Existing contact page explains the process and archived response expectation | Current commercial terms need ITCS confirmation |

### Evidence readiness, not a visual-design score

Using the CRO skill's seven-row diagnostic: **3/7 established (~4.2/10)**. A primary goal is defined, traceable historical proof is displayed, and the intended funnel is mapped. Actual non-converter research, a validated objection table, a five-second comprehension test, and a production-ready/observed funnel are outstanding. The prototype does not substantiate a claim of “world-class conversion”.

## Validation plan

Hypothesis: business-priority entry and selection continuity will improve relevant service discovery and enquiry starts because visitors can begin with their goal instead of interpreting technical categories.

- First run moderated tasks with target decision-makers: choose a service, explain the recommendation, locate a relevant example, start an enquiry and find urgent support. Record completion, wrong turns, interpretation and motion discomfort. Suggested small-sample findings are directional, not conversion estimates.
- Before a production experiment, connect an approved form backend and privacy-respecting measurement. Define qualified leads per eligible session as the primary metric; monitor service-detail discovery and enquiry completion as secondary metrics.
- Guardrails: support discovery, mobile task completion, load performance, accessibility and error rates must not worsen. Longer time on page is not a success metric by itself.
- Decide baseline, minimum detectable effect, sample size and a full business-cycle duration before starting a controlled experiment. Do not claim uplift from the prototype tests or stop on an early favourable result.

The `itcs:interaction` CustomEvent exposes goal selection and contextual enquiry actions in the current browser only. It contains service/goal identifiers, no form values. No analytics collector, network request or persistent visitor log is installed.
