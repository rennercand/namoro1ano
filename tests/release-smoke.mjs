import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {notes,fragments} from '../src/content.js';
const base=process.argv[2] || 'http://127.0.0.1:5173';
const browser=await chromium.launch({channel:'msedge'});
async function check(width,mobile){
 const p=await browser.newPage({viewport:{width,height:mobile?844:768},isMobile:mobile,hasTouch:mobile,reducedMotion:mobile?'reduce':'no-preference'});
 const errors=[];p.on('pageerror',e=>errors.push(e.message));
 const press=l=>mobile?l.tap():l.click();
 const button=t=>press(p.getByRole('button',{name:t,exact:true}));
 const fits=async()=>assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow '+width);
 await p.goto(base);await press(p.locator('.pull'));await press(p.locator('.hero .action'));await p.locator('dialog img').evaluate(im=>im.decode());await button('Fotografia seguinte');await fits();await button('Fechar álbum');await press(p.locator('#carta summary'));await p.locator('.letter-body').waitFor();await fits();
 await p.clock.setFixedTime(new Date('2026-11-20T12:00:00Z'));await press(p.locator('.case-tab'));
 await p.locator('.folders button').first().waitFor();assert.equal(await p.locator('.folders button:enabled').count(),1);await fits();
 await p.evaluate(()=>localStorage.setItem('caso365-v1','quebrado'));await p.reload();
 await p.clock.setFixedTime(new Date('2026-11-27T12:00:00Z'));await p.reload();
 for(let d=0;d<7;d++){
  await press(p.locator('.folders button').nth(d));
  for(let r=0;r<5;r++){
   const title=await p.locator('h2').innerText();
   if(title==='Depoimentos cruzados'||title==='Arquivos fora de ordem'){
    const s=await p.locator('main div p').first().innerText();
    const [,a,b,c,x]=s.match(/provas\. (\w+) vem imediatamente antes de (\w+)\. (\w+) está antes de \w+\. (\w+) vem logo/);
    await button(b);await p.getByRole('status').getByText('Essa peça entra mais tarde.').waitFor();
    for(const w of [c,x,a,b])await button(w);
   }else if(title==='Memória fotográfica'){
    const vals=await p.locator('.memory button').evaluateAll(bs=>bs.map(b=>b.dataset.value));
    for(const v of new Set(vals)){const pair=p.locator('.memory button[data-value="'+v+'"]');await press(pair.first());await press(pair.last())}
   }else if(title==='Fotografia rasgada'){
    const tiles=p.locator('.puzzle button');
    for(let i=0;i<9 && await tiles.count();i++){const n=await tiles.evaluateAll(bs=>bs.map(b=>Number(b.ariaLabel.match(/Peça (\d+)/)[1])));const j=n.indexOf(i+1);if(i!==j){await press(tiles.nth(i));await press(tiles.nth(j))}}
   }else if(title==='Interrogatório')await button('Os dois, com certeza');
   else if(title==='Mensagem secreta'){for(const w of fragments)await button(w)}
   else if(title==='Veredito'){
    const input=p.getByLabel('Sua assinatura');await input.fill('   ');await button('Assinar e guardar no coração');assert.equal(await input.evaluate(i=>i.validity.valueMissing),true);
    await input.fill('Sofia');await button('Assinar e guardar no coração');await p.locator('.sealed').waitFor();await fits();await button('Ver nossa última foto →');
   }else{
    await p.locator('input').fill('errado');await button('Conferir');await p.getByText(/Ainda não encaixou/).waitFor();
    const answer=title==='Cofre de evidências'?String(d+2)+String(9-d):['ABRACO','CARINHO','SORRISO','ENCONTRO'][(d*5+r)%4];
    await p.locator('input').fill(answer);await button('Conferir');
   }
   if(d===0&&r===0){await p.reload();await press(p.locator('.folders button').first());assert.equal(await p.locator('h2').innerText(),'Memória fotográfica')}
  }
  await p.getByText(notes[d],{exact:true}).waitFor();await p.locator('.reward').evaluate(im=>im.decode());await button('Voltar ao mural');
 }
 await p.reload();await p.getByText('35 / 35 evidências').waitFor();assert.deepEqual(errors,[]);await p.close();console.log(width+'px: carta, álbum, 35 desafios, assinatura e persistência OK');
}
async function checkFallbacks(){
 const p=await browser.newPage({viewport:{width:390,height:844},hasTouch:true,reducedMotion:'reduce'});
 await p.addInitScript(()=>{
  const original=HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext=function(type,...options){return type==='webgl2'?null:original.call(this,type,...options)};
  Storage.prototype.setItem=function(){throw new DOMException('Full','QuotaExceededError')};
 });
 await p.goto(base+'/#album');
 const first=p.locator('.helix li button').first();await first.tap();
 await p.locator('dialog img').evaluate(im=>im.decode());await p.getByLabel('Fechar álbum').tap();
 await p.clock.setFixedTime(new Date('2026-11-20T12:00:00Z'));
 await p.goto(base+'/operacao-365');await p.locator('.folders button').first().tap();
 const [,a,b,c,x]=(await p.locator('main div p').first().innerText()).match(/provas\. (\w+) vem imediatamente antes de (\w+)\. (\w+) está antes de \w+\. (\w+) vem logo/);
 for(const w of [c,x,a,b])await p.getByRole('button',{name:w,exact:true}).tap();
 await p.locator('#save-warning').waitFor();await p.locator('.memory').waitFor();
 await p.close();console.log('390px: álbum sem WebGL e jogo com armazenamento bloqueado OK');
}
try{await Promise.all([check(320,true),check(1366,false),checkFallbacks()])}finally{await browser.close()}
