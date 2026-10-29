import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import './service-folder.css';

gsap.registerPlugin(Draggable);

export function serviceFolder(services, icon, arrow) {
  return `<div class="engine-module folder-module" aria-label="ITCS service folder"><div class="folder-toolbar"><span>Your business. Connected.</span><button class="motion-control" aria-pressed="false">Pause motion <span aria-hidden="true">Ⅱ</span></button></div><div class="folder-viewport"><div class="folder-stage"><div class="folder-ground" aria-hidden="true"></div><div class="folder-back" aria-hidden="true"><span>ITCS / BUSINESS SERVICES</span></div><div id="service-file-stack" class="file-stack">${services.map((s,i)=>`<article class="service-file" data-file="${i}"><div class="file-surface" aria-hidden="true"></div><button class="file-select" data-engine="${i}" aria-pressed="false" aria-controls="engine-readout"><span class="file-icon">${icon(s.icon)}</span><span class="file-label">${s.title}</span><span class="file-index" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><span class="file-hover-arrow" aria-hidden="true">${arrow}</span></button><div class="file-paper-art" aria-hidden="true"><span></span><span></span><span></span><div>${icon(s.icon)}</div></div></article>`).join('')}</div><button class="folder-pocket" aria-label="Spread service cards" aria-expanded="false" aria-controls="service-file-stack folder-mobile-choices"><svg class="pocket-surface" viewBox="0 0 440 235" fill="none" aria-hidden="true"><defs><linearGradient id="pocket-red" x1="30" y1="0" x2="390" y2="235" gradientUnits="userSpaceOnUse"><stop stop-color="#f6373e"/><stop offset=".55" stop-color="#e22028"/><stop offset="1" stop-color="#b70d19"/></linearGradient><linearGradient id="pocket-lip" x1="0" y1="0" x2="0" y2="75"><stop stop-color="white" stop-opacity=".3"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs><path d="M0 37C0 24 11 14 24 14H168C183 14 187 0 203 0H416C429 0 440 11 440 24V211C440 224 429 235 416 235H24C11 235 0 224 0 211Z" fill="url(#pocket-red)"/><path d="M1 38C1 25 12 15 25 15H168C183 15 188 1 203 1H416C428 1 439 12 439 24" stroke="url(#pocket-lip)" stroke-width="2"/></svg><span class="pocket-opening"><span class="pocket-action">Your business. Our expertise.</span><span class="pocket-plus" aria-hidden="true">${arrow}</span></span><img class="pocket-logo" src="/assets/itcs-logo.png" alt="ITCS"><span class="pocket-footer"><span>IT. Security. Connectivity.</span><span>EST. 2004</span></span><span class="pocket-shine" aria-hidden="true"></span></button></div><div id="folder-mobile-choices" class="folder-mobile-choices" hidden><div class="folder-mobile-heading"><span>Choose your next possibility</span><button class="folder-mobile-close" aria-label="Close service folder">×</button></div>${services.map((s,i)=>`<button data-folder-choose="${i}"><span>${icon(s.icon)}</span>${s.title}<span aria-hidden="true">${arrow}</span></button>`).join('')}</div><section class="folder-extracted" id="engine-readout" role="region" aria-labelledby="engine-title" hidden><div class="extracted-top"><div class="file-grab" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div><span class="extracted-category">EXPERTISE FOR YOUR BUSINESS</span><button class="file-return" aria-label="Return card to folder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M18 6 6 18M6 6v12h12"/></svg></button></div><div class="extracted-body" aria-live="polite" aria-atomic="true"><span id="extracted-icon">${icon(services[0].icon)}</span><h2 id="engine-title" tabindex="-1">${services[0].title}</h2><p id="engine-description">${services[0].desc}</p><ul id="folder-capabilities">${services[0].items.slice(0,3).map(x=>`<li>${x}</li>`).join('')}</ul></div><a id="engine-link" class="file-explore" href="/services/it-support"><span>Explore IT support</span>${arrow}</a><div class="extracted-navigation"><button class="file-previous" aria-label="Previous service">←</button><span id="folder-count">01 / 06</span><button class="file-next" aria-label="Next service">→</button></div></section></div><div class="folder-quick-picks" role="group" aria-label="Choose a service card">${services.map((s,i)=>`<button data-folder-quick="${i}"><span>${icon(s.icon)}</span><span>${s.short}</span>${arrow}</button>`).join('')}</div><div class="folder-caption"><span class="folder-caption-mark" aria-hidden="true">↳</span><p id="folder-instruction" role="status">Choose a service card to explore.</p><button class="folder-all" hidden>View all services ${arrow}</button></div></div>`;
}

export function initServiceFolder(services, base, { reduced = false } = {}) {
  const module = document.querySelector('.folder-module');
  if (!module) return () => {};
  const abort = new AbortController();
  const on = (el, event, fn) => el?.addEventListener(event, fn, { signal: abort.signal });
  const viewport = module.querySelector('.folder-viewport');
  const stage = module.querySelector('.folder-stage');
  const cards = [...module.querySelectorAll('.service-file')];
  const buttons = [...module.querySelectorAll('[data-engine]')];
  const stack = module.querySelector('.file-stack');
  const mobileChoices = module.querySelector('.folder-mobile-choices');
  const isMobile = () => matchMedia('(max-width: 1100px)').matches;
  const pocket = module.querySelector('.folder-pocket');
  const extracted = module.querySelector('.folder-extracted');
  const all = module.querySelector('.folder-all');
  const hint = module.querySelector('#folder-instruction');
  let state = module.dataset.folderState || 'closed';
  let selected = Number(module.dataset.selected ?? 0);
  let extractionTween;
  let drag;
  const context = gsap.context(() => {});
  const duration = reduced ? 0 : .7;
  const canDrag = !reduced && matchMedia('(pointer: fine)').matches;
  module.classList.toggle('folder-no-drag', !canDrag);
  const resize = new ResizeObserver(() => {
    stage.style.transform = `scale(${viewport.clientWidth / 600})`;
    mobileChoices.hidden = state !== 'open' || !isMobile();
    stack.inert = state === 'selected' || (state === 'open' && isMobile());
    pocket.inert = state === 'open' && isMobile();
    updateDragBounds();
    if (drag) drag.update(true);
  });
  resize.observe(viewport);

  function updateDragBounds() {
    if(!drag || extracted.hidden) return;
    const horizontal=Math.max(0,Math.min(30,(viewport.clientWidth-extracted.offsetWidth)/2-5));
    const up=Math.max(0,Math.min(15,extracted.offsetTop-4));
    const down=Math.max(0,Math.min(25,viewport.clientHeight-extracted.offsetTop-extracted.offsetHeight-4));
    drag.applyBounds({minX:-horizontal,maxX:horizontal,minY:-up,maxY:down});
  }
  function poseCards(open, animate = true) {
    cards.forEach((card, i) => {
      const vars = open
        ? { x: [-24,-15,-5,5,15,24][i], y: -165 + i * 37, rotation: [-7,-4,-1,1,4,7][i] }
        : { x: [-16,-10,-4,4,10,16][i], y: -125 + i*31, rotation: [-5,-3,-1,1,3,5][i] };
      gsap.to(card, { ...vars, duration: animate ? duration : 0, delay: animate && !reduced ? i*.025 : 0, ease: 'back.out(1.05)', overwrite: true });
    });
  }
  function setState(next) {
    state = next;
    module.dataset.folderState = next;
    module.classList.toggle('folder-is-open', next !== 'closed');
    module.classList.toggle('folder-has-card', next === 'selected');
    stack.inert = next === 'selected' || (next === 'open' && isMobile());
    pocket.inert = next === 'open' && isMobile();
    mobileChoices.hidden = next !== 'open' || !isMobile();
    pocket.setAttribute('aria-expanded', String(next !== 'closed'));
    pocket.setAttribute('aria-label', next === 'closed' ? 'Spread service cards' : next === 'selected' ? 'Return to all service cards' : 'Restack service cards');
    module.querySelector('.pocket-action').textContent = next === 'closed' ? 'Your business. Our expertise.' : next === 'selected' ? 'All your expertise. Together.' : 'Choose your next possibility';
    all.hidden = next !== 'selected';
    hint.textContent = next === 'closed' ? 'Choose a service card to explore.' : next === 'open' ? 'Choose a card to see what’s possible.' : 'Your service. Your next step.';
  }
  function openFolder(animate = true) {
    const returningCard = state === 'selected' && !extracted.hidden && animate && !reduced;
    extractionTween?.kill();
    gsap.killTweensOf(extracted);
    extracted.hidden = !returningCard;
    if(returningCard) extractionTween = gsap.to(extracted, {y:150,scale:.84,rotation:-6,opacity:0,duration:.4,ease:'power2.in',onComplete(){extracted.hidden=true;gsap.set(extracted,{clearProps:'transform,opacity'});}});
    setState('open');
    poseCards(true, animate);
    cards.forEach(card => { card.style.opacity = '1'; });
    gsap.to(pocket, { rotationX: -7, y: 12, duration: animate ? duration : 0, ease: 'power2.out', overwrite: true });
  }
  function closeFolder() {
    extractionTween?.kill();
    extracted.hidden = true;
    setState('closed');
    poseCards(false);
    gsap.to(pocket, { rotationX: 0, y: 0, duration, ease: 'power2.out', overwrite: true });
  }
  function updateContent(index) {
    const s = services[index];
    selected = index;
    module.dataset.selected = String(index);
    buttons.forEach((b,i) => { b.classList.toggle('selected',i===index);b.setAttribute('aria-pressed',String(i===index)); });
    module.querySelector('#engine-title').textContent = s.title;
    module.querySelector('#engine-description').textContent = s.desc;
    module.querySelector('#extracted-icon').innerHTML = buttons[index].querySelector('.file-icon').innerHTML;
    const list = module.querySelector('#folder-capabilities');
    list.replaceChildren(...s.items.slice(0,3).map(text => {const li=document.createElement('li');li.textContent=text;return li;}));
    const link = module.querySelector('#engine-link');
    link.href = base + 'services/' + s.slug;
    link.querySelector('span').textContent = 'Explore ' + s.short;
    module.querySelector('#folder-count').textContent = String(index+1).padStart(2,'0') + ' / 06';
    window.dispatchEvent(new CustomEvent('itcs:service-select',{detail:{index,slug:s.slug}}));
  }
  function choose(index, animate = true, direction = 0) {
    const approach = direction || (index >= selected ? 1 : -1);
    const wasSelected = state === 'selected';
    extractionTween?.kill();
    gsap.killTweensOf(extracted);
    drag?.endDrag();
    gsap.killTweensOf(module.querySelectorAll('.file-surface,.file-select>span'));
    cards.forEach(card=>card.classList.remove('is-hovered'));
    gsap.set(module.querySelectorAll('.file-surface,.file-select>span'),{clearProps:'transform'});
    updateContent(index);
    setState('selected');
    extracted.hidden = false;
    updateDragBounds();
    poseCards(false, animate);
    cards.forEach((card,i) => {card.style.opacity=i===index?'.15':'.7';});
    gsap.set(extracted, { clearProps: 'transform,opacity' });
    gsap.to(pocket, { rotationX: -4, y: 10, duration: animate ? duration : 0, overwrite:true });
    if (!reduced && animate) {
      extractionTween = gsap.fromTo(extracted,
        wasSelected ? { x:approach*24, y:12, rotation:approach*3, rotationY:approach*-8, opacity:.25, scale:.97 } : { y:160, rotation:-9, opacity:0, scale:.83 },
        { x:0, y:0, rotation:0, rotationY:0, opacity:1, scale:1, duration:wasSelected ? .4 : .85, ease:wasSelected?'power2.out':'back.out(1.1)', clearProps:'transform,opacity', overwrite:true });
    }
  }
  document.querySelectorAll('[data-hero-service]').forEach(button=>on(button,'click',()=>{choose(Number(button.dataset.heroService)); if(matchMedia('(max-width: 800px)').matches) extracted.scrollIntoView({behavior:reduced?'instant':'smooth',block:'center'}); module.querySelector('#engine-title').focus({preventScroll:true});}));
  module.querySelectorAll('[data-folder-quick]').forEach(button=>on(button,'click',()=>choose(Number(button.dataset.folderQuick))));
  module.querySelectorAll('[data-folder-choose]').forEach(button=>on(button,'click',()=>choose(Number(button.dataset.folderChoose))));
  on(module.querySelector('.folder-mobile-close'),'click',()=>{closeFolder();pocket.focus({preventScroll:true});});
  on(pocket,'click',event=>{ if(state==='closed'||state==='selected'){openFolder();if(event.isTrusted&&event.detail===0)(isMobile()?mobileChoices.querySelector('[data-folder-choose]'):buttons[0]).focus({preventScroll:true});} else closeFolder(); });
  on(all,'click',()=>{openFolder();(isMobile()?mobileChoices.querySelector('[data-folder-choose="'+selected+'"]'):buttons[selected]).focus({preventScroll:true});});
  on(module.querySelector('.file-return'),'click',()=>{openFolder();(isMobile()?mobileChoices.querySelector('[data-folder-choose="'+selected+'"]'):buttons[selected]).focus({preventScroll:true});});
  on(module.querySelector('.file-previous'),'click',()=>choose((selected+services.length-1)%services.length,true,-1));
  on(module.querySelector('.file-next'),'click',()=>choose((selected+1)%services.length,true,1));
  const surfaces = [...module.querySelectorAll('.file-surface')];
  const headers = [...module.querySelectorAll('.file-select>span')];
  function lift(index, raised) {
    if(state==='selected' || isMobile()) return;
    cards[index].classList.toggle('is-hovered',raised);
    hint.textContent=raised?'Pull out '+services[index].short+'.':state==='closed'?'Choose a service card to explore.':'Choose a card to see what’s possible.';
    if(reduced) return;
    gsap.to(surfaces[index], {y:raised?-9:0,rotation:raised?-.6:0,duration:raised ? .22 : .45,ease:raised?'power2.out':'back.out(1.5)',overwrite:true});
    gsap.to(buttons[index].querySelectorAll('.file-icon,.file-label,.file-index'),{y:raised?-4:0,duration:.25,overwrite:true});
  }
  cards.forEach((card,i)=>{on(card,'click',event=>{if(!event.target.closest('button,a'))choose(i);});on(card,'pointerenter',event=>{if(event.pointerType==='mouse')lift(i,true);});on(card,'pointerleave',()=>lift(i,false));});
  buttons.forEach((button,i)=>{
    on(button,'focus',()=>lift(i,true));
    on(button,'blur',()=>lift(i,false));
    on(button,'click',event=>{choose(i);if(event.isTrusted&&event.detail===0)module.querySelector('#engine-title').focus({preventScroll:true});});
    on(button,'keydown',event=>{
      let index;
      if(['ArrowRight','ArrowDown'].includes(event.key)) index=(i+1)%buttons.length;
      if(['ArrowLeft','ArrowUp'].includes(event.key)) index=(i+buttons.length-1)%buttons.length;
      if(event.key==='Home')index=0;
      if(event.key==='End')index=buttons.length-1;
      if(index!==undefined){event.preventDefault();buttons[index].focus({preventScroll:true});}
    });
  });
  on(module,'keydown',event=>{if(event.key==='Escape'){event.preventDefault();if(state==='selected'){openFolder();(isMobile()?mobileChoices.querySelector('[data-folder-choose="'+selected+'"]'):buttons[selected]).focus({preventScroll:true});}else{closeFolder();pocket.focus({preventScroll:true});}}});
  if (canDrag) {
    drag = Draggable.create(extracted, {
      type:'x,y', trigger:module.querySelector('.file-grab'),
      bounds:{minX:-30,maxX:30,minY:-20,maxY:25},edgeResistance:.85,
      onPress(){extractionTween?.kill();gsap.killTweensOf(extracted);},
      onDragEnd(){gsap.to(extracted,{x:0,y:0,duration:.65,ease:'elastic.out(1,.55)'});},
    })[0];
  }
  if (state==='selected') choose(selected,false);
  else if(state==='open')openFolder(false);
  else {setState('closed');poseCards(false,false);}
  return ()=>{abort.abort();resize.disconnect();extractionTween?.kill();drag?.kill();gsap.killTweensOf([...cards,...surfaces,...headers,pocket,extracted]);context.revert();};
}
