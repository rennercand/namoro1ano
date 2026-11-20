import {scroll} from 'motion';
import './style.css';
import './celebration.css';
import {eyes,dayNumber,together} from './content.js';
import {investigate} from './game.js';
const app=document.querySelector('#app');
if(location.pathname.replace(/\/$/,'')==='/operacao-365') investigate(app);
else {
 document.body.classList.add('celebration');
 app.innerHTML=`<header><a href="#" class="signature">Renner e Sofia<span>♡</span></a><nav><a href="#album">Álbum</a><a href="#olhinhos">Olhinhos</a><a href="#carta">Carta</a></nav></header>
 <section class="hero"><div class="intro"><small>20 . 11 . 2026</small><h1>365 dias<br><em>de nós.</em></h1><p>Um ano de uma história que está só começando.</p><a class="action" href="#album">Folhear o álbum <span>↓</span></a></div>
 <div class="stack"><figure class="back-print"><img src="/fotos/site15.webp" alt="Buquê de girassóis"></figure><figure class="cover"><img src="/fotos/site1.webp" alt="Nós dois sob as luzes da noite"><figcaption>Renner e Sofia</figcaption></figure></div></section>
 <section id="album"><div class="album-copy"><small>${dayNumber(new Date(),together)} DIAS JUNTOS</small><h2>Nosso<br><em>álbum.</em></h2><p>Arraste as fotos para folhear.</p><div class="controls"><button aria-label="Foto anterior">↑</button><button aria-label="Próxima foto">↓</button></div></div><div class="helix"></div></section>
 <section class="eyes" id="olhinhos"><div class="sticky"><p>uma atenção especial nos <em>olhinhos</em> que amo</p><img class="eye-photo" src="/fotos/olhinhos.png" alt="Os olhinhos que eu amo"><div class="ribbon" role="img" aria-label="${eyes}"><svg aria-hidden="true" viewBox="0 0 760 188"><defs><path id="wave" d="M-40 108 C80 108 110 30 210 66 S360 152 452 107 S590 45 670 77 S752 123 810 90"/></defs><use href="#wave" class="thread"/><text><textPath href="#wave"></textPath></text></svg></div></div></section>
 <section id="carta"><h2>Pra você, <em>Sofia.</em></h2><details class="love-envelope"><summary><span class="postmark" aria-hidden="true">20 NOV<br>2026</span><span class="envelope-label"><span class="closed-label">Abrir minha carta</span><span class="open-label">Guardar a carta</span></span></summary><article class="letter-body">
 <p>Meu amor,</p>
 <p>Você sabe o quanto eu penso no futuro e faço planos pra tudo. Mas de todas as coisas que quero conquistar, nenhuma me faz tão feliz quanto imaginar você ao meu lado vivendo cada uma delas.</p>
 <p>As vezes queria conseguir guardar alguns segundos da nossa vida pra reviver sempre que sentisse saudade. Foi um pouco por isso que fiz tudo isso pra você.</p>
 <p>Obrigado por ser minha pessoa favorita durante esses 365 dias.</p>
 <p>Que sorte a minha poder chamar você de meu amor.</p>
 </article></details></section>
 <footer class="postscript"><div class="ps-note"><span class="ps-initials" aria-hidden="true">P.S.</span><h2>As fotos zoadas eu guardei em outra pasta.</h2><a class="case-tab" href="/operacao-365"><span>Abrir a pasta</span><i aria-hidden="true">↗</i></a></div><div class="endline"><span>Renner e Sofia</span><a href="#presente">Voltar ao início ↑</a></div></footer>`;
 const album=document.querySelector('.helix');
 const header=app.querySelector('header');header.id='presente';
 header.insertAdjacentHTML('beforebegin',`<section class="overture" aria-label="Abertura"><div class="mast"><span>Renner e Sofia <i>♡</i></span><small>20 NOV 2026</small></div><div class="portrait" aria-hidden="true" inert></div><h2>OLHOS <em>QUE AMO</em><strong>TANTO</strong></h2><button class="pull">Arraste para baixo <b>↓</b></button></section>`);
 const gate=document.querySelector('.overture'),pull=gate.querySelector('.pull');
 let origin=null;
 const enter=()=>header.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 pull.onclick=enter;
 gate.onpointerdown=e=>{if(e.button!==0)return;origin=e.clientY;gate.setPointerCapture(e.pointerId)};
 gate.onpointermove=e=>{if(origin===null)return;const distance=e.clientY-origin;gate.style.setProperty('--pull',Math.min(45,Math.max(0,distance*.32))+'px');if(Math.abs(distance)>55){origin=null;enter()}};
 gate.onpointerup=e=>{if(origin!==null&&document.elementFromPoint(e.clientX,e.clientY)?.closest('.pull'))enter();origin=null;gate.style.removeProperty('--pull')};
 gate.onpointercancel=()=>{origin=null;gate.style.removeProperty('--pull')};
 const {mountAlbum,mountEyes,openAlbum}=await import('./helix.tsx');mountAlbum(album);mountEyes(gate.querySelector('.portrait'));
 document.querySelectorAll('a[href="#album"]').forEach(link=>link.addEventListener('click',()=>openAlbum()));
 document.querySelector('.album-copy').insertAdjacentHTML('beforeend','<button class="expand-album">Ver foto inteira ↗</button>');
 document.querySelector('.expand-album').onclick=()=>openAlbum();
 document.querySelectorAll('.controls button').forEach((button,i)=>button.onclick=()=>{
   const canvas=album.querySelector('canvas');
   if(canvas)canvas.dispatchEvent(new KeyboardEvent('keydown',{key:i?'ArrowDown':'ArrowUp',bubbles:true}));
   else {const list=album.querySelector('ul');list?.scrollBy({top:(i?1:-1)*(list.firstElementChild?.clientHeight||200),behavior:'smooth'})}
 });
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const path=document.querySelector('.ribbon textPath');
 path.textContent=eyes;
 function lettering(){
   if(reduced.matches){path.textContent='MUUUUITOOOO';path.setAttribute('startOffset','60');return}
   path.textContent=eyes;
   const width=path.getComputedTextLength(),length=document.querySelector('#wave').getTotalLength();
   return scroll(p=>path.setAttribute('startOffset',String(length*.86-p*(width+length*.70))),{target:document.querySelector('.eyes'),offset:['start start','end end']});
 }
 await document.fonts.ready;let stop=lettering();reduced.onchange=()=>{stop?.();stop=lettering()};
 const stack=document.querySelector('.stack');
 stack.onpointermove=e=>{if(reduced.matches||e.pointerType==='touch')return;const rect=stack.getBoundingClientRect();stack.style.setProperty('--yaw',((e.clientX-rect.left)/rect.width-.5)*21+'deg');stack.style.setProperty('--pitch',(.5-(e.clientY-rect.top)/rect.height)*16+'deg')};
 stack.onpointerleave=()=>{stack.style.removeProperty('--yaw');stack.style.removeProperty('--pitch')};
}
