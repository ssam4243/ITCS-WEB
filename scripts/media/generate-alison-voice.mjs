// Offline tooling only: npm install --prefix /tmp/itcs-voice kokoro-js@1.2.1 --ignore-scripts
// Run with inherited HTTPS proxy/CA settings; never disable TLS verification.
import {pathToFileURL,fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {allCases} from '../../src/alison-scenarios.js';
const toolRoot=process.env.ITCS_VOICE_TOOL_ROOT||'/tmp/itcs-voice';
const {KokoroTTS}=await import(pathToFileURL(resolve(toolRoot,'node_modules/kokoro-js/dist/kokoro.js')));
const {env}=await import(pathToFileURL(resolve(toolRoot,'node_modules/@huggingface/transformers/src/transformers.js')));
import {existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
env.cacheDir=resolve(toolRoot,'cache');
const tts=await KokoroTTS.from_pretrained('onnx-community/Kokoro-82M-v1.0-ONNX',{dtype:'q8',device:'cpu',session_options:{intraOpNumThreads:4,interOpNumThreads:1}});
const dir=fileURLToPath(new URL('../../public/assets/alison/voice',import.meta.url));mkdirSync(dir,{recursive:true});
const manifestFile=resolve(dir,'manifest.json');
const manifest=existsSync(manifestFile)?JSON.parse(readFileSync(manifestFile,'utf8')):{};
const voiceCases=[{id:"welcome",steps:[{reply:"Hello, I’m Alison. Lovely to meet you. Shall we see how I could help your business? Choose a conversation, and let’s take it from there."}]},...allCases];
for(const c of voiceCases)for(let i=0;i<c.steps.length;i++){
 const name=`${c.id}-${i}`,out=`${dir}/${name}.mp3`;const hash=createHash('sha256').update(c.steps[i].reply+'bf_emma:1.0').digest('hex');if(existsSync(out)&&manifest[name]===hash)continue;
 const a=await tts.generate(c.steps[i].reply,{voice:'bf_emma',speed:1.0});await a.save(resolve(toolRoot,`${name}.wav`));
 execFileSync('ffmpeg',['-v','error','-y','-i',resolve(toolRoot,`${name}.wav`),'-af','loudnorm=I=-18:TP=-2:LRA=9','-ar','24000','-ac','1','-b:a','64k',out]);manifest[name]=hash;writeFileSync(manifestFile,JSON.stringify(manifest,null,2)+'\n');console.log(name);
}
