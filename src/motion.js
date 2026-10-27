import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initMotion(services, base) {
  const controller = new AbortController();
  const on = (el, event, fn) => el?.addEventListener(event, fn, { signal: controller.signal });
  const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
  const paused = sessionStorage.getItem('itcs-motion') === 'paused';
  const reduced = reducedQuery.matches || paused;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const toggle = document.querySelector('.motion-control');
  if (toggle) {
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.innerHTML = paused ? 'Play motion <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
    if (reducedQuery.matches) toggle.textContent = 'Reduced motion on';
    on(toggle, 'click', () => {
      if (reducedQuery.matches) return;
      sessionStorage.setItem('itcs-motion', paused ? 'playing' : 'paused');
      window.dispatchEvent(new Event('itcs:motion-change'));
    });
  }
  on(reducedQuery, 'change', () => window.dispatchEvent(new Event('itcs:motion-change')));
  const context = gsap.context(() => {
    const hero = document.querySelector('.experience-hero');
    if (!reduced) {
      if (hero) {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .from('.hero-kicker', { opacity: 0, y: 15, duration: .6 })
          .from('.hero-char', { yPercent: 115, rotation: 6, opacity: 0, duration: .85, stagger: .023 }, '-=.3')
          .from('.hero-description, .hero-actions, .hero-footnote', { opacity: 0, y: 20, stagger: .1, duration: .6 }, '-=.5')
          .from('.engine-core', { scale: .7, opacity: 0, duration: 1 }, '-=1.2')
          .from('.engine-lines', { opacity: 0, scale: .85, duration: 1 }, '-=.9')
          .from('.orbit-node', { opacity: 0, scale: .5, stagger: .08, duration: .6 }, '-=.7')
          .from('.engine-readout', { opacity: 0, y: 15, duration: .6 }, '-=.3');
        gsap.to('.signal-orbit', { rotation: 360, transformOrigin: '300px 300px', duration: 22, repeat: -1, ease: 'none' });
        gsap.to('.signal-orbit.reverse', { rotation: -360, transformOrigin: '300px 300px', duration: 30, repeat: -1, ease: 'none' });
        gsap.to('.core-signal i', { scaleY: .25, duration: .5, stagger: { each: .1, repeat: -1, yoyo: true }, ease: 'sine.inOut' });
        gsap.to('.core-halo', { scale: 1.13, opacity: .35, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to('.hero-watermark', { xPercent: 8, scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 } });
        gsap.to('.ticker-track', { xPercent: -50, duration: 38, repeat: -1, ease: 'none' });
      } else {
        gsap.from('.page-intro h1, .inner-hero h1', { y: 25, opacity: 0, duration: .7, ease: 'power3.out' });
      }
      gsap.utils.toArray('.section-heading, .manifesto-heading, .difference-copy, .faq-layout>div:first-child, .page-intro .lead').forEach(el => {
        gsap.from(el, { y: 35, opacity: .15, duration: .85, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 93%', once: true } });
      });
      gsap.utils.toArray('.story-card, .capabilities>div, .process>div').forEach(el => {
        gsap.from(el, { y: 40, duration: .9, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 95%', once: true } });
      });
      const sweep = document.querySelector('.difference-sweep');
      if(sweep) gsap.fromTo(sweep, { yPercent: 12, rotation: -8 }, { yPercent: -7, rotation: 0, scrollTrigger: { trigger: '.difference', start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
      gsap.from('.closing h2', { y: 35, scrollTrigger: { trigger: '.closing', start: 'top 95%', once: true }, duration: .8 });
      if (fine) {
        const scene = document.querySelector('.connection-scene');
        const stage = document.querySelectorAll('.engine-lines, .engine-core');
        if(scene && stage.length) {
          on(scene, 'pointermove', e => {const r=scene.getBoundingClientRect();gsap.to(stage,{rotationY:(e.clientX-r.left-r.width/2)/r.width*12,rotationX:-(e.clientY-r.top-r.height/2)/r.height*10,duration:.8,ease:'power2.out'});});
          on(scene, 'pointerleave', () => gsap.to(stage, { rotationX: 0, rotationY: 0, duration: 1 }));
        }
        document.querySelectorAll('.button').forEach(b => {
          on(b, 'pointermove', e => {const r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.1,y:(e.clientY-r.top-r.height/2)*.15,duration:.3});});
          on(b, 'pointerleave', () => gsap.to(b,{x:0,y:0,duration:.5,ease:'elastic.out(1,.5)'}));
        });
      }
    }
  });
  // A persistent preview can be reached without crossing a disappearing tooltip.
  let connectionTween;
  const engineButtons = [...document.querySelectorAll('[data-engine]')];
  let activeEngine = Number(document.querySelector('[data-engine].selected')?.dataset.engine ?? 0);
  const selectEngine = (button) => {
    const index = Number(button.dataset.engine), s = services[index];
    const changed = activeEngine !== index;
    activeEngine = index;
    engineButtons.forEach(b => {
      const active = b === button;
      b.classList.toggle('selected', active);
      b.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-spoke]').forEach(p => p.classList.toggle('active', Number(p.dataset.spoke) === index));
    document.getElementById('engine-title').textContent = s.title;
    document.getElementById('engine-description').textContent = s.desc;
    document.getElementById('engine-count').textContent = String(index + 1).padStart(2, '0') + ' / 06';
    const list = document.getElementById('engine-capabilities');
    list.replaceChildren(...s.items.slice(0, 3).map(item => {
      const li = document.createElement('li');
      li.textContent = item;
      return li;
    }));
    const link = document.getElementById('engine-link');
    link.href = base + 'services/' + s.slug;
    link.querySelector('span').textContent = 'Explore ' + s.short;
    document.getElementById('engine-contact').href = base + 'contact?service=' + s.slug;
    window.dispatchEvent(new CustomEvent('itcs:service-select', { detail: { index, slug: s.slug } }));
    if (!reduced && changed) {
      gsap.fromTo('.engine-detail', { y: 5, opacity: .55 }, { y: 0, opacity: 1, duration: .22, overwrite: true });
      connectionTween?.kill();
      document.querySelectorAll('[data-spoke]').forEach(p=>{p.style.strokeDasharray='';p.style.strokeDashoffset='';});
      const path = document.querySelector('[data-spoke="' + index + '"]');
      const length = path.getTotalLength();
      connectionTween = gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: .45, ease: 'power2.out' });
    }
  };
  engineButtons.forEach((button, i) => {
    on(button, 'pointerenter', event => {
      if (event.pointerType === 'mouse' && fine) selectEngine(button);
    });
    on(button, 'focus', () => selectEngine(button));
    on(button, 'click', () => selectEngine(button));
    on(button, 'keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (i + 1) % engineButtons.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (i - 1 + engineButtons.length) % engineButtons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = engineButtons.length - 1;
      if (next !== undefined) { event.preventDefault(); engineButtons[next].focus(); }
      if (event.key === 'Escape') { event.preventDefault(); document.getElementById('engine-link').focus(); }
    });
  });
  if (engineButtons.length) selectEngine(engineButtons[activeEngine]);
  const tabs=[...document.querySelectorAll('[data-service]')];
  const selectTab = button => {
    const i=Number(button.dataset.service),s=services[i];
    tabs.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
    const panel=document.getElementById('expertise-panel');panel.setAttribute('aria-labelledby',button.id);
    document.getElementById('panel-kicker').textContent=s.label;
    document.getElementById('panel-title').textContent=s.title;
    document.getElementById('panel-description').textContent=s.desc;
    const photo=document.getElementById('panel-photo');photo.src=base+'assets/'+s.image;photo.alt='ITCS '+s.title.toLowerCase()+' imagery';
    const link=document.getElementById('panel-link');link.href=base+'services/'+s.slug;link.firstChild.textContent='Explore '+s.short+' ';
    if(!reduced) gsap.fromTo('.panel-content',{y:12,opacity:.3},{y:0,opacity:1,duration:.4});
  };
  tabs.forEach((b,i)=>{on(b,'click',()=>selectTab(b));on(b,'keydown',e=>{let j;if(e.key==='ArrowDown'||e.key==='ArrowRight')j=(i+1)%tabs.length;if(e.key==='ArrowUp'||e.key==='ArrowLeft')j=(i-1+tabs.length)%tabs.length;if(e.key==='Home')j=0;if(e.key==='End')j=tabs.length-1;if(j!==undefined){e.preventDefault();tabs[j].focus();selectTab(tabs[j]);}});});
  requestAnimationFrame(()=>ScrollTrigger.refresh());
  return () => {controller.abort();connectionTween?.kill();document.querySelectorAll('[data-spoke]').forEach(p=>{p.style.strokeDasharray='';p.style.strokeDashoffset='';});gsap.killTweensOf('.engine-readout, .engine-detail, .panel-content, .engine-lines, .engine-core, .button');context.revert();gsap.set('.button', {clearProps:'transform'});};
}
