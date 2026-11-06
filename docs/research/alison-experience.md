# Alison: interactive business demonstration

The brief calls for a professional virtual receptionist that responds, with longer examples showing how she could fit a real business. The approved folder banner remains intact. The homepage service-detail panel is replaced by this self-contained section.

## Experience

- A genuine rigged, textured 3D adult in business attire replaces the static portrait and door. Three.js is loaded only as the section approaches the viewport. The character uses a retargeted relaxed reception animation, limited pointer gaze, blinking, a greeting nod and audio-amplitude-driven mouth motion. Mouth movement is an approximation, not phoneme-perfect lip sync.
- Three businesses each have three guided examples: ecommerce (tracking, complaint, return), estate agency (viewing, valuation, follow-up), and IT/professional services (new issue, ticket update, new starter).
- Every example has four natural Alison turns, three caller responses, a complete transcript option, restart, and a progressively populated handover brief. Choice details are retained in the brief. Conversations are scripted; there is no open-ended AI chat or microphone capture.
- Optional British English neural voice uses 37 pre-generated, locally hosted MP3 clips. The Say hello button plays an opt-in spoken greeting; Hear Alison enables the call voice. No sound starts without a click. Sound follows subsequent response choices until muted. It stops on scenario reset/switch, leaving the section, backgrounding, motion reinitialisation and navigation.
- A business name is stored only in session storage and pre-fills the Alison contact enquiry. Text/value assignments avoid HTML interpolation. Recorded voice does not speak the visitor's company name.
- Reduced-motion/paused modes retain a still render of the rig and fully working text interactions. WebGL failure provides a clearly labelled portrait fallback, while the guided demonstration remains usable. Model resources, observers, audio and WebGL context are disposed on navigation.

## Asset provenance and licensing

**Character and source motion:** Microsoft Rocketbox, `Business_Female_04_facial.fbx`, corresponding `f014_*` textures, and `f_idle_neutral_01.max.fbx`. Source: https://github.com/microsoft/Microsoft-Rocketbox (MIT, Copyright Microsoft 2020). License: `docs/licenses/rocketbox-MIT.txt`. The optimized GLB retains seven facial shapes and the skeleton, downsamples textures and retargets source world rotations onto the model's rest pose. It is about 3.1 MB and is downloaded once when needed. `scripts/media/build-alison-avatar.py` records the conversion; run with Blender 4.3+, a directory containing those downloaded source files, and the output GLB path. The character represents a fictional virtual receptionist, not an ITCS employee.

**Voice:** Kokoro-82M v1.0, ONNX community export, `bf_emma` British English preset, generated offline with `kokoro-js@1.2.1` using CPU q8 inference at speed 1.0. Model: https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX . Model weights are Apache-2.0; license: `docs/licenses/kokoro-Apache-2.0.txt`. Call scripts are the `reply` strings in `src/alison-scenarios.js`; `scripts/media/generate-alison-voice.mjs` records the offline generation process, including a separate greeting. It hashes the voice/text settings in a manifest so script edits regenerate matching recordings rather than leaving stale clips. MP3s are mono 24 kHz / 64 kbps, normalized with FFmpeg loudnorm (-18 LUFS, -2 dB true peak). No speech model or third-party speech request runs in the visitor's browser. This is a proposed demonstration voice, not a confirmed production Alison voice.

**Fallback portrait:** a browser-rendered still of the same 3D model, used only if the renderer or model load is unavailable. The normal experience remains the interactive rig.

## Implementation and verification

`src/alison.js` owns the scoped lifecycle and semantic controls. `src/alison-avatar.js` owns WebGL, facial animation and resource disposal. `src/alison-scenarios.js` holds editable call content; `src/alison.css` follows the ITCS charcoal/red palette with a continuous charcoal conversation surface, a larger studio-style character view, genuine ITCS logo, restrained red accents and expandable call notes. A single quiet preview label identifies the experience without interrupting the dialogue. Alison introduces herself by name and does not announce the demo or call herself a virtual assistant during calls. British phrasing includes “give you a ring” and “half past three”; pinstripe business attire and restrained grooming support the UK business setting. Nationality is not inferred from facial appearance.

`npm run test:alison` exercises the actual model, all nine guided flows and caller choices, transcript/reset controls, keyboard tabs, actual MP3 playback/mute, company/contact persistence, eight viewport widths, pause and reduced-motion touch. Folder and homepage regression suites remain applicable. Production verification uses `/ITCS-WEB/` as the Vite base. Screenshots are inspected at desktop and mobile sizes. Browser audio playback is verified; audible quality on every device is not claimed.

All customer data is fictional. No carrier, CRM, calendar, ticketing, telephone, messaging or AI backend is connected. Nothing is submitted, refunded, provisioned or booked. Production capability, identity checks, access permissions, policies, escalation rules and integrations require business/product validation before launch.
