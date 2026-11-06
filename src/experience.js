import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
const arrow = '<svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
const goals = [
  { id: 'reliability', label: 'Keep work moving', index: 0, why: 'Start with proactive IT support. Discuss recurring issues, day-to-day support and a clearer plan for the systems your team relies on.' },
  { id: 'security', label: 'Protect our business', index: 1, why: 'Start with cyber security. Understand your risks, strengthen your defences and explore the right training or assessment for your organisation.' },
  { id: 'connection', label: 'Connect our people', index: 2, why: 'Start with communications and connectivity. Explore business broadband, cloud phones and Teams Voice around how your people work.' },
  { id: 'digital', label: 'Build something new', index: 4, why: 'Start with software and websites. Explore a new digital experience, a bespoke workflow or an integration that helps your business work better.' },
];

export function goalPicker() {
  const slugs=['it-support','cyber-security','telecoms','networks','software-websites','digital-marketing'];
  return `<div class="goal-picker"><p class="goal-question">What would make the biggest difference?</p><div class="goal-options" role="group" aria-label="Choose a business priority">${goals.map(g=>`<a class="goal-button" data-goal="${g.id}" href="/services/${slugs[g.index]}"><span>${g.label}</span>${arrow}</a>`).join('')}</div></div>`;
}

export function conversationDock() {
  return `<aside class="conversation-dock" aria-label="Continue your service enquiry" hidden><div><span>Your next connection</span><strong id="dock-service">Business IT support</strong></div><a id="dock-link" href="/contact?service=it-support">Discuss IT support ${arrow}</a><button class="dock-close" aria-label="Hide conversation shortcut">×</button></aside>`;
}

export function initExperience(services, base) {
  const hero = document.querySelector('.experience-hero');
  if (!hero) return () => {};
  const controller = new AbortController();
  const on = (el, type, fn) => el?.addEventListener(type, fn, { signal: controller.signal });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem('itcs-motion') === 'paused';
  const context = gsap.context(() => {});
  const dock = document.querySelector('.conversation-dock');
  const closing = document.querySelector('.closing');
  let dockDismissed = sessionStorage.getItem('itcs-dock-dismissed') === 'yes';
  function updateDock() {
    if (!dock) return;
    const show = !dockDismissed && hero.dataset.serviceChosen === 'yes' && hero.getBoundingClientRect().bottom <= 100 && closing.getBoundingClientRect().top > innerHeight;
    dock.hidden = !show;
  }
  const observer = new IntersectionObserver(updateDock, { threshold: [0, .05, 1] });
  observer.observe(hero);
  observer.observe(closing);
  on(document.querySelector('.dock-close'), 'click', () => {
    dockDismissed = true;
    sessionStorage.setItem('itcs-dock-dismissed', 'yes');
    dock.hidden = true;
  });
  function updateSelection(index) {
    const s = services[index];
    const core = document.querySelector('.engine-core>span');
    if (core) core.textContent = ['KEEP WORK MOVING', 'PROTECT WHAT MATTERS', 'CONNECT YOUR PEOPLE', 'BUILD YOUR FOUNDATION', 'MAKE IDEAS WORK', 'REACH YOUR CUSTOMERS'][index];
    document.getElementById('dock-service').textContent = s.title;
    const link = document.getElementById('dock-link');
    link.href = base + 'contact?service=' + s.slug;
    link.firstChild.textContent = 'Discuss ' + s.short + ' ';
    hero.dataset.connection = String(index);
  }
  const active = Number(document.querySelector('[data-engine].selected')?.dataset.engine ?? 0);
  updateSelection(active);
  on(window, 'itcs:service-select', event => {hero.dataset.serviceChosen='yes';updateSelection(event.detail.index);updateDock();});
  on(document.getElementById('engine-contact'), 'click', () => {
    const index = Number(document.querySelector('[data-engine].selected').dataset.engine);
    window.dispatchEvent(new CustomEvent('itcs:interaction', { detail: { action: 'open-enquiry', service: services[index].slug, source: 'engine' } }));
  });
  on(document.getElementById('dock-link'), 'click', () => {
    const index = Number(document.querySelector('[data-engine].selected').dataset.engine);
    window.dispatchEvent(new CustomEvent('itcs:interaction', { detail: { action: 'open-enquiry', service: services[index].slug, source: 'shortcut' } }));
  });
  requestAnimationFrame(() => { ScrollTrigger.refresh(); updateDock(); });
  return () => { controller.abort(); observer.disconnect(); context.revert(); };
}
