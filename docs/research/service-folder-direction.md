# ITCS service-folder illustration

Implemented 29 October 2026 following the user's request to replace the orbit with a folder/pocket holding stacked service cards.

## Options checked

| Approach | Strength | Requirement / tradeoff | Decision |
| --- | --- | --- | --- |
| [Three.js](https://threejs.org/docs/) | Full 3D geometry, camera and lighting | Needs a WebGL scene, materials and a separate accessible interaction/content layer | Useful for a spatial world; unnecessary for a six-card service object |
| [Rive Web](https://rive.app/docs/runtimes/web/web-js) | Authored vector animation and state-machine runtime | Requires a suitable authored `.riv` asset and runtime integration | Good when there is a supplied animation asset; none exists for this custom folder |
| [GSAP Draggable](https://gsap.com/docs/v3/Plugins/Draggable/) + CSS/SVG | Layered materials, controllable timelines, mouse/touch drag and native HTML links | Requires explicit state, focus and responsive handling | Selected; GSAP is already a project dependency |

Official documentation was read for all three approaches. No external artwork, WebGL model or animation file was copied. The folder silhouette, materials, stack and paper layout are authored in code using the real ITCS logo and brand red.

## Interaction model

- **Closed:** an ITCS-red pocket, six layered papers and a clear open control.
- **Open:** on a wide desktop, six labelled cards fan out with staggered, spring-like motion. Each card is a native button.
- **Selected:** the chosen paper lifts forward with a service explanation, three relevant capabilities and a real service-page link. Previous/next buttons let the visitor browse without reopening the whole stack.
- **Return:** the paper slides back toward the pocket and the service stack opens again.
- **Drag:** on fine-pointer devices the selected paper's grip allows bounded movement and a spring return. Dragging is optional; every useful task is available by clicking or keyboard.

On compact layouts the pocket opens into six readable, touch-sized choices rather than shrinking the desktop text. The selected paper remains full-size HTML text. Keyboard users can open with Enter, move between desktop card headers with arrow keys, select with Enter, and return/close with Escape. Focus moves to the extracted heading after keyboard selection. Hidden paper controls are inert, and touch choices have a close control.

Reduced-motion and the existing motion toggle preserve the folder state while removing animation and dragging. The chosen service still carries through the lower-page recommendation panel, contextual enquiry shortcut and service-to-contact journey.

## Validation

The interaction test covers all six cards, next/previous, real dragging and spring return, business-priority continuity, service-to-contact preselection, keyboard open/select/return/close, motion pause, compact/touch choices, clipping/overflow at eight widths, and JavaScript errors. Desktop closed/open/selected and mobile open/selected screenshots were inspected. GitHub Pages uses the existing base-path build.

The enquiry form is still a demonstration. These checks validate interaction behaviour, not conversion uplift or full cross-browser/WCAG conformance.
