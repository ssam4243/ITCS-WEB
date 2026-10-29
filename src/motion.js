import { gsap } from 'gsap';
import { initServiceFolder } from './service-folder.js';
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
          .from('.hero-description, .hero-core-services, .hero-actions, .hero-footnote', { opacity: 0, y: 20, stagger: .1, duration: .6 }, '-=.5')
          .from('.folder-module', { opacity: 0, y: 25, duration: .8 }, '-=.7');
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
        document.querySelectorAll('.button').forEach(b => {
          on(b, 'pointermove', e => {const r=b.getBoundingClientRect();gsap.to(b,{x:(e.clientX-r.left-r.width/2)*.1,y:(e.clientY-r.top-r.height/2)*.15,duration:.3});});
          on(b, 'pointerleave', () => gsap.to(b,{x:0,y:0,duration:.5,ease:'elastic.out(1,.5)'}));
        });
      }
    }
  });
  const disposeFolder = initServiceFolder(services, base, { reduced });
  const tabs=[...document.querySelectorAll('[data-service]')];
  const selectTab = button => {
    const i=Number(button.dataset.service),s=services[i];
    tabs.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
    const panel=document.getElementById('expertise-panel');panel.setAttribute('aria-labelledby',button.id);
    document.getElementById('panel-kicker').textContent=s.label;
    document.getElementById('panel-title').textContent=s.title;
    document.getElementById('panel-description').textContent=s.desc;
    const capabilities=document.getElementById('panel-capabilities');if(capabilities)capabilities.replaceChildren(...s.items.slice(0,3).map(item=>{const li=document.createElement('li');li.textContent=item;return li}));
    const symbol=document.getElementById('panel-symbol');if(symbol)symbol.innerHTML=document.querySelector('[data-engine="'+i+'"] .file-icon').innerHTML;
    const enquiry=document.getElementById('panel-enquiry');if(enquiry)enquiry.href=base+'contact?service='+s.slug;
    const photo=document.getElementById('panel-photo');photo.src=base+'assets/'+s.image;photo.alt='ITCS '+s.title.toLowerCase()+' imagery';
    const link=document.getElementById('panel-link');link.href=base+'services/'+s.slug;link.firstChild.textContent='Explore '+s.short+' ';
    if(!reduced) gsap.fromTo('.panel-content',{y:12,opacity:.3},{y:0,opacity:1,duration:.4});
  };
  tabs.forEach((b,i)=>{on(b,'click',()=>selectTab(b));on(b,'keydown',e=>{let j;if(e.key==='ArrowDown'||e.key==='ArrowRight')j=(i+1)%tabs.length;if(e.key==='ArrowUp'||e.key==='ArrowLeft')j=(i-1+tabs.length)%tabs.length;if(e.key==='Home')j=0;if(e.key==='End')j=tabs.length-1;if(j!==undefined){e.preventDefault();tabs[j].focus();selectTab(tabs[j]);}});});
  requestAnimationFrame(()=>ScrollTrigger.refresh());
  return () => {controller.abort();disposeFolder();gsap.killTweensOf('.panel-content, .button');context.revert();gsap.set('.button', {clearProps:'transform'});};
}
