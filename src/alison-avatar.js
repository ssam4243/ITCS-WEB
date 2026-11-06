import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
export async function createAlisonAvatar(host,{amplitude}){
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(29,1,.01,30);
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.08;
 scene.add(new THREE.HemisphereLight(0xfff4e9,0x323643,2.0));const key=new THREE.DirectionalLight(0xfff7ef,2.7);key.position.set(-2,3,4);scene.add(key);const fill=new THREE.DirectionalLight(0xe1e7ff,1.1);fill.position.set(3,2,1);scene.add(fill);const rim=new THREE.DirectionalLight(0xffdadb,1.7);rim.position.set(1,3,-2);scene.add(rim);
 let gltf;try{gltf=await new GLTFLoader().loadAsync(`${import.meta.env.BASE_URL}assets/alison/alison.glb?v=studio-3`)}catch(e){renderer.dispose();throw e}
 const model=gltf.scene;scene.add(model);model.updateMatrixWorld(true);
 const bounds=new THREE.Box3().setFromObject(model),height=bounds.max.y-bounds.min.y;
 // Frame a close, conversational portrait; keep the real body proportions.
 const center=bounds.getCenter(new THREE.Vector3());model.position.x-=center.x;model.position.z-=center.z;
 camera.position.set(0,bounds.min.y+height*.86,height*.82);camera.lookAt(0,bounds.min.y+height*.84,0);
 const mixer=new THREE.AnimationMixer(model);if(gltf.animations.length)mixer.clipAction(gltf.animations[0]).play();
 const head=model.getObjectByName('Bip01_Head')||model.getObjectByName('Bip01 Head');
 const faces=[];model.traverse(o=>{if(o.isMesh){o.frustumCulled=false;if(o.morphTargetDictionary)faces.push(o);if(o.material?.name.includes('opacity')){o.material.alphaTest=.45;o.material.transparent=false;o.material.side=THREE.DoubleSide}if(o.material){o.material.roughness=o.material.name.includes('head')?.62:.82;o.material.metalness=0}}});
 function morph(name,value){for(const f of faces){const i=f.morphTargetDictionary[name];if(i!==undefined)f.morphTargetInfluences[i]=value}}
 host.replaceChildren(renderer.domElement);let active=false,speaking=false,disposed=false,raf=0,last=0,elapsed=0,nextBlink=2.5,nodTime=-10,pointer={x:0,y:0},lastRender=0,gaze={x:0,y:0},mouthLevel=0;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches||sessionStorage.getItem('itcs-motion')==='paused';
 const resize=new ResizeObserver(()=>{if(disposed)return;const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();render(0)});resize.observe(host);
 function render(dt){mixer.update(dt);gaze.x+=(pointer.x-gaze.x)*.08;gaze.y+=(pointer.y-gaze.y)*.08;if(head){head.rotation.y+=reduced?0:gaze.x*.07;head.rotation.x+=reduced?0:gaze.y*.025;if(elapsed-nodTime<1)head.rotation.x+=Math.sin((elapsed-nodTime)*Math.PI*2)*.045}
 const blinkAge=elapsed-nextBlink;let blink=0;if(blinkAge>0&&blinkAge<.18)blink=Math.sin(blinkAge/.18*Math.PI);if(blinkAge>=.18)nextBlink=elapsed+2.8+Math.random()*2.2;
 morph('AK_09_EyeBlinkLeft',reduced?0:blink);morph('AK_10_EyeBlinkRight',reduced?0:blink);
 const target=speaking&&!reduced?amplitude():0;mouthLevel+=(target-mouthLevel)*.55;const mouth=mouthLevel;morph('AK_25_JawOpen',mouth*.45);morph('AA_VI_13_O',mouth*(.12+.1*Math.sin(elapsed*16)));morph('AA_VI_11_E',mouth*.08);morph('AK_44_MouthSmileLeft',.18);morph('AK_45_MouthSmileRight',.18);renderer.render(scene,camera)}
 function tick(t){if(disposed||!active)return;raf=requestAnimationFrame(tick);if(t-lastRender<40)return;const dt=Math.min((t-(last||t))/1000,.07);last=t;lastRender=t;elapsed+=dt;render(reduced?0:dt)}
 function move(e){const r=host.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width-.5)*2;pointer.y=((e.clientY-r.top)/r.height-.5)*2}function leave(){pointer={x:0,y:0}}
 host.addEventListener('pointermove',move);host.addEventListener('pointerleave',leave);render(0);
 return{setActive(v){if(active===v)return;active=v;cancelAnimationFrame(raf);last=0;if(active){if(reduced)render(0);else raf=requestAnimationFrame(tick)}},setSpeaking(v){speaking=v},nod(){nodTime=elapsed;render(0)},dispose(){disposed=true;cancelAnimationFrame(raf);resize.disconnect();host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);model.traverse(o=>{if(!o.isMesh)return;o.geometry?.dispose();for(const m of (Array.isArray(o.material)?o.material:[o.material])){for(const value of Object.values(m))if(value?.isTexture)value.dispose();m.dispose()}});mixer.stopAllAction();renderer.dispose();renderer.domElement.remove()}};
}
