import React from 'react';
import {createRoot} from 'react-dom/client';
import DitherHelixCarousel from './components/ui/dither-helix-carousel';
export function mountEyes(host:HTMLElement){
 createRoot(host).render(<DitherHelixCarousel items={[{image:'/fotos/olhinhos.png',title:'Os olhos que amo'}]} cardRatio={2.715} entry={false} cell={3} focusBand={0.72} accent="#a60d3d"/>);
}
const items=[14,15,7,0,2,3,4,5,6,8,9,10,11,12,13,1].map((id,i)=>({image:'/fotos/site'+id+'.webp',title:'Fotografia '+String(i+1).padStart(2,'0')}));
let front=0;
export function openAlbum(index=front){
 if(document.querySelector('.photo-reader'))return;
 const dialog=document.createElement('dialog');
 dialog.className='photo-reader';
 dialog.setAttribute('aria-label','Álbum de Renner e Sofia');
 dialog.innerHTML='<div class="reader-head"><span>Renner e Sofia</span><button autofocus aria-label="Fechar álbum">Fechar ×</button></div><div class="reader-stage"><img alt=""></div><div class="reader-tools"><button aria-label="Fotografia anterior">←</button><output></output><button aria-label="Fotografia seguinte">→</button></div>';
 document.body.append(dialog);
 const img=dialog.querySelector('img')!, counter=dialog.querySelector('output')!;
 function show(next:number){
   index=(next+items.length)%items.length;
   img.src=items[index].image;img.alt=items[index].title;
   counter.textContent=String(index+1).padStart(2,'0')+' / '+items.length;
   if(!matchMedia('(prefers-reduced-motion: reduce)').matches)img.animate([{opacity:.75,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:220,easing:'ease-out'});
 }
 const [close,prev,next]=dialog.querySelectorAll('button');
 close.onclick=()=>dialog.close();prev.onclick=()=>show(index-1);next.onclick=()=>show(index+1);
 dialog.onkeydown=e=>{if(e.key==='ArrowRight')next.click();if(e.key==='ArrowLeft')prev.click()};
 let start:number|null=null;
 img.ontouchstart=e=>{start=e.touches[0].clientX};
 img.ontouchend=e=>{const dx=e.changedTouches[0].clientX-(start??e.changedTouches[0].clientX);if(Math.abs(dx)>45)show(index-Math.sign(dx));start=null};
 dialog.onclose=()=>dialog.remove();
 show(index);dialog.showModal();
}
export function mountAlbum(host:HTMLElement){
  createRoot(host).render(<DitherHelixCarousel items={items} onFrontChange={i=>{front=i}} onPhotoOpen={openAlbum} brand="Arquivo de nós dois" cardRatio={1.18} accent="#ae1246" cell={4} focusBand={0.48}/>);
}
