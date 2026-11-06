/* Sample the actual ITCS artwork; the image remains the accessible/static fallback. */
export function initLogoParticles({reduced=false}={}){
 const pocket=document.querySelector('.folder-pocket'),logo=pocket?.querySelector('.pocket-logo');
 if(!logo||reduced||!matchMedia('(hover:hover) and (pointer:fine)').matches)return()=>{};
 const abort=new AbortController(),on=(el,type,fn)=>el.addEventListener(type,fn,{signal:abort.signal});
 const canvas=document.createElement('canvas');canvas.className='pocket-particles';canvas.setAttribute('aria-hidden','true');pocket.append(canvas);const ctx=canvas.getContext('2d');
 if(!ctx){canvas.remove();return()=>{abort.abort()}}let points=[],frame=0,active=false,visible=true,disposed=false,settling=0,mouse={x:-1000,y:-1000};const width=440,height=235,dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;ctx.scale(dpr,dpr);
 function sample(){if(disposed||!logo.complete||!logo.naturalWidth)return;const w=190,h=logo.naturalHeight/logo.naturalWidth*w,s=document.createElement('canvas');s.width=Math.ceil(w);s.height=Math.ceil(h);const c=s.getContext('2d');if(!c)return;c.drawImage(logo,0,0,w,h);let pixels;try{pixels=c.getImageData(0,0,s.width,s.height).data}catch{return}points=[];for(let y=0;y<h;y+=1.8)for(let x=0;x<w;x+=1.8){const offset=(Math.floor(y)*s.width+Math.floor(x))*4;if(pixels[offset+3]>120&&(pixels[offset]+pixels[offset+1]+pixels[offset+2])>100){const tx=28+x,ty=height-52-h+y;points.push({tx,ty,x:tx,y:ty,vx:0,vy:0,color:'#ffffff'})}}canvas.dataset.particleCount=String(points.length);draw();}
 function draw(){ctx.clearRect(0,0,width,height);points.forEach(p=>{ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,1,0,Math.PI*2);ctx.fill()})}
 function tick(){frame=0;if(disposed||!visible||document.hidden)return;let energy=0;for(const p of points){const dx=p.x-mouse.x,dy=p.y-mouse.y,d=Math.hypot(dx,dy);if(active&&d<42){const force=(1-d/42)*1.1;p.vx+=(dx/(d||1))*force;p.vy+=(dy/(d||1))*force}p.vx+=(p.tx-p.x)*.045;p.vy+=(p.ty-p.y)*.045;p.vx*=.78;p.vy*=.78;p.x+=p.vx;p.y+=p.vy;energy+=Math.abs(p.vx)+Math.abs(p.vy)}draw();if(!active)settling--;if(active||(energy>.2&&settling>0))frame=requestAnimationFrame(tick);else{pocket.classList.remove('logo-is-particles');points.forEach(p=>{p.x=p.tx;p.y=p.ty;p.vx=p.vy=0});draw()}}
 function start(){if(!frame&&points.length&&visible&&!document.hidden)frame=requestAnimationFrame(tick)}
 on(logo,'load',sample);sample();
 on(pocket,'pointerenter',()=>{if(!points.length)return;active=true;settling=45;pocket.classList.add('logo-is-particles');points.forEach((p,i)=>{p.vx=Math.sin(i*1.7)*2;p.vy=Math.cos(i*.8)*2});start()});
 on(pocket,'pointermove',e=>{const r=pocket.getBoundingClientRect();mouse={x:(e.clientX-r.left)/r.width*width,y:(e.clientY-r.top)/r.height*height};start()});
 on(pocket,'pointerleave',()=>{active=false;mouse={x:-1000,y:-1000};settling=60;start()});
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible){cancelAnimationFrame(frame);frame=0;active=false;pocket.classList.remove('logo-is-particles')}else if(active)start()});observer.observe(pocket);
 on(document,'visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;active=false;pocket.classList.remove('logo-is-particles')}});
 return()=>{disposed=true;abort.abort();observer.disconnect();cancelAnimationFrame(frame);canvas.remove();pocket.classList.remove('logo-is-particles')};
}
