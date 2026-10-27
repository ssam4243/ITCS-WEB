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
  return `<div class="goal-picker"><p class="goal-question">What would make the biggest difference?</p><div class="goal-options" role="group" aria-label="Choose a business priority">${goals.map(g => `<button class="goal-button" data-goal="${g.id}" aria-pressed="false" aria-controls="engine-readout"><span>${g.label}</span>${arrow}</button>`).join('')}</div></div>`;
}

export function flowNarrative() {
  const nodes = [
    { x: 72, y: 78, label: 'Support' }, { x: 528, y: 78, label: 'Security' },
    { x: 72, y: 210, label: 'Communications' }, { x: 528, y: 210, label: 'Networks' },
    { x: 72, y: 342, label: 'Software' }, { x: 528, y: 342, label: 'Digital' },
  ];
  return `<section class="flow-narrative" aria-labelledby="flow-title"><div class="wrap"><div class="flow-intro"><span class="eyebrow">The connection is the difference</span><h2 id="flow-title">Technology connects.<br><em>Possibility follows.</em></h2><p>Follow the bigger picture.</p></div><div class="flow-layout"><div class="flow-sticky"><div class="flow-diagram" role="img" aria-label="Six areas of expertise connecting through one ITCS team"><svg viewBox="0 0 600 420" fill="none" aria-hidden="true"><g class="flow-guides">${nodes.map(n => `<path d="M${n.x} ${n.y} C${n.x < 300 ? 220 : 380} ${n.y}, ${n.x < 300 ? 140 : 460} 210, 300 210"/>`).join('')}</g><g class="flow-connections">${nodes.map(n => `<path d="M${n.x} ${n.y} C${n.x < 300 ? 220 : 380} ${n.y}, ${n.x < 300 ? 140 : 460} 210, 300 210"/>`).join('')}</g>${nodes.map(n => `<g class="flow-endpoint"><circle cx="${n.x}" cy="${n.y}" r="8"/><text x="${n.x}" y="${n.y+30}" text-anchor="middle">${n.label}</text></g>`).join('')}</svg><div class="flow-hub"><img src="/assets/itcs-logo.png" alt=""><span>ONE TEAM</span></div></div><div class="flow-caption"><span class="flow-caption-line"></span><span>Six disciplines. A shared direction.</span><span class="flow-step" aria-hidden="true">01 / 03</span></div></div><div class="flow-chapters"><article class="flow-chapter" data-chapter="0"><span class="eyebrow">01 / The challenge</span><h3>A problem rarely<br>stays in one place.</h3><p>An unreliable connection can become a missed call. A missed call can become a missed opportunity. Your technology is already connected to your business.</p></article><article class="flow-chapter" data-chapter="1"><span class="eyebrow">02 / The bigger picture</span><h3>Your expertise<br>should connect, too.</h3><p>Support, security and communications affect the same people. Bringing those disciplines together helps you plan around the whole business.</p></article><article class="flow-chapter" data-chapter="2"><span class="eyebrow">03 / A way forward</span><h3>One conversation.<br><em>More possibilities.</em></h3><p>Start with what you want to change. ITCS brings the relevant people and expertise into the conversation, with a scope and next step agreed together.</p><a class="text-link" href="#expertise">Find your starting point ${arrow}</a></article></div></div></div></section>`;
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
  const context = gsap.context(() => {
    if (!reduced && matchMedia('(min-width: 801px)').matches) {
      const paths = [...document.querySelectorAll('.flow-connections path')];
      paths.forEach(path => {
        const length = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
          strokeDashoffset: 0, ease: 'none',
          scrollTrigger: { trigger: '.flow-layout', start: 'top 75%', end: 'bottom 65%', scrub: .6 },
        });
      });
      gsap.fromTo('.flow-hub', { scale: .88 }, { scale: 1, scrollTrigger: { trigger: '.flow-layout', start: 'top 75%', end: 'bottom 65%', scrub: .6 } });
      gsap.utils.toArray('.flow-chapter').forEach((chapter, i) => {
        ScrollTrigger.create({ trigger: chapter, start: 'top 65%', end: 'bottom 65%', onEnter: () => setChapter(i), onEnterBack: () => setChapter(i) });
      });
    }
  });
  function setChapter(index) {
    const step = document.querySelector('.flow-step');
    if (step) step.textContent = String(index + 1).padStart(2, '0') + ' / 03';
    document.querySelectorAll('.flow-chapter').forEach((el, i) => el.classList.toggle('is-current', i === index));
  }
  setChapter(0);
  const dock = document.querySelector('.conversation-dock');
  const closing = document.querySelector('.closing');
  let dockDismissed = sessionStorage.getItem('itcs-dock-dismissed') === 'yes';
  function updateDock() {
    if (!dock) return;
    const show = !dockDismissed && hero.getBoundingClientRect().bottom <= 100 && closing.getBoundingClientRect().top > innerHeight;
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
    document.querySelectorAll('[data-goal]').forEach(button => {
      const goal = goals.find(g => g.id === button.dataset.goal);
      const active = goal.index === index;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('chosen', active);
    });
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
  // No default goal is represented as a choice the visitor has made.
  document.querySelectorAll('[data-goal]').forEach(button => { button.classList.remove('chosen'); button.setAttribute('aria-pressed', 'false'); });
  const previousGoal = goals.find(g => g.id === hero.dataset.priority && g.index === active);
  if(previousGoal){const b=document.querySelector('[data-goal="'+previousGoal.id+'"]');b.classList.add('chosen');b.setAttribute('aria-pressed','true');document.getElementById('engine-description').textContent=previousGoal.why;}
  on(window, 'itcs:service-select', event => {delete hero.dataset.priority;updateSelection(event.detail.index);});
  document.querySelectorAll('[data-goal]').forEach(button => {
    on(button, 'click', () => {
      const goal = goals.find(g => g.id === button.dataset.goal);
      document.querySelector(`[data-engine="${goal.index}"]`).click();
      updateSelection(goal.index);
      hero.dataset.priority = goal.id;
      document.getElementById('engine-description').textContent = goal.why;
      window.dispatchEvent(new CustomEvent('itcs:interaction', { detail: { action: 'choose-goal', goal: goal.id, service: services[goal.index].slug } }));
      if (matchMedia('(max-width: 800px)').matches) document.getElementById('engine-readout').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    });
  });
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
