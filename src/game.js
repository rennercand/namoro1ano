import {dayNumber,titles,notes,fragments} from './content.js';
const files=['Retrato','Bilhete','Chave','Envelope'];
const types=[
 ['logic','memory','cipher','puzzle','lock'],['order','logic','puzzle','memory','lock'],
 ['logic','vote','order','cipher','lock'],['puzzle','memory','logic','order','puzzle'],
 ['cipher','order','logic','vote','cipher'],['memory','logic','puzzle','cipher','lock'],
 ['logic','memory','puzzle','final','verdict']
];
const names={logic:'Depoimentos cruzados',memory:'Memória fotográfica',cipher:'Mensagem interceptada',puzzle:'Fotografia rasgada',lock:'Cofre de evidências',order:'Arquivos fora de ordem',vote:'Interrogatório',final:'Mensagem secreta',verdict:'Veredito'};
const photo=i=>'/fotos/game'+i+'.webp';
function shuffled(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
export function investigate(app){
 document.title='Operação 365';document.body.classList.add('detective');
 let progress=Array(7).fill(0),d=0,r=0;
 try{const saved=JSON.parse(localStorage.getItem('caso365-v1'));if(Array.isArray(saved)&&saved.length===7&&saved.every(n=>Number.isInteger(n)&&n>=0&&n<=5))progress=saved}catch{}
 const el=(tag,body,parent=app)=>{const node=document.createElement(tag);node.textContent=body;parent.append(node);return node};
 const button=(body,fn,parent)=>{const b=el('button',body,parent);b.onclick=fn;return b};
 const page=()=>{app.replaceChildren();const a=el('a','← Álbum de aniversário');a.href='/';window.scrollTo(0,0)};
 function board(){page();el('small','DOSSIÊ CONFIDENCIAL · R + ♡');el('h1','Operação 365');el('p','Investigue uma pasta por dia. Cada caso guarda uma foto que só vocês entendem.');el('p',progress.reduce((a,b)=>a+b,0)+' / 35 evidências');const grid=el('div','');grid.className='folders';titles.forEach((title,i)=>{const b=button((20+i)+'/11  ·  '+progress[i]+'/5\n'+title,()=>{d=i;r=progress[i];r===5?reward():play()},grid);b.disabled=i>dayNumber()});}
 function reward(){page();el('small','CASO ARQUIVADO');el('h2','Prova irrefutável de fofura');const im=el('img','');im.className='reward';im.src=photo(d*2);im.alt='Fotografia revelada na missão '+(d+1);el('p',notes[d]);el('p','Fragmento recolhido · '+fragments[d]);button('Revisitar o caso',()=>{r=0;play()});button('Voltar ao mural',board)}
 function play(){
  page();button('← Mural',board);const type=types[d][r];el('small',titles[d]+' · '+(r+1)+'/5');el('h2',names[type]);
  const content=el('div',''),status=el('p','');status.setAttribute('role','status');
  const finish=()=>{progress[d]=Math.max(progress[d],r+1);try{localStorage.setItem('caso365-v1',JSON.stringify(progress))}catch{}r++;r===5?reward():play()};
  const form=(question,answer,hint)=>{const f=el('form','',content);const label=el('label',question,f);const input=el('input','',label);input.required=true;input.autocomplete='off';el('button','Conferir',f);f.onsubmit=e=>{e.preventDefault();if(input.value.trim().toUpperCase()===answer)finish();else status.textContent='Ainda não encaixou. Confira as pistas e tente outra vez.'};button('Abrir pista',()=>status.textContent=hint,content)};
  const pieces=(sequence,description)=>{el('p',description,content);let n=0;const options=el('div','',content);for(const word of shuffled(sequence))button(word,e=>{if(word!==sequence[n]){status.textContent='Essa peça entra mais tarde.';return}e.currentTarget.disabled=true;n++;status.textContent=sequence.slice(0,n).join(' → ');if(n===sequence.length)finish()},options)};
  const key=d*5+r;
  if(type==='logic'||type==='order'){const seq=shuffled(files);pieces(seq,'Reconstrua a ordem das provas. '+seq[2]+' vem imediatamente antes de '+seq[3]+'. '+seq[0]+' está antes de '+seq[2]+'. '+seq[1]+' vem logo depois de '+seq[0]+'. Toque na sequência correta.')}
  if(type==='final')pieces(fragments,'Ordene os sete fragmentos do dossiê. '+fragments.join(' · '));
  if(type==='cipher'){const word=['ABRACO','CARINHO','SORRISO','ENCONTRO'][key%4],shift=2+d;const code=[...word].map(c=>String.fromCharCode(65+(c.charCodeAt(0)-65+shift)%26)).join('');form('O bilhete diz '+code+'. Cada letra avançou '+shift+' casas no alfabeto. Qual era a palavra?',word,'Volte '+shift+' letras para cada símbolo. A primeira é '+word[0]+'.')}
  if(type==='lock'){const a=2+d,b=9-d;form('A senha tem dois dígitos. A soma é '+(a+b)+' e o primeiro menos o segundo dá '+(a-b)+'. Qual é a senha?',String(a)+b,'Some a diferença à soma e divida por dois para achar o primeiro dígito.')}
  if(type==='vote'){el('p','Quem começaria a rir no meio de um interrogatório sério?',content);['Eu','Renner','Os dois, com certeza'].forEach(x=>button(x,finish,content))}
  if(type==='verdict'){el('p','Dois suspeitos declarados culpados de se apaixonarem. Sentença: continuar colecionando momentos juntos.',content);button('Assinar o veredito',finish,content)}
  if(type==='puzzle'){el('p','Reconstrua a fotografia. Toque em duas peças para trocar suas posições.',content);const grid=el('div','',content);grid.className='puzzle';let tiles=shuffled([...Array(9).keys()]),selected=null;if(tiles.every((v,i)=>v===i))tiles.reverse();
   const draw=()=>{grid.replaceChildren();tiles.forEach((v,i)=>{const b=button('',()=>{if(selected===null){selected=i;b.classList.add('selected');return}[tiles[selected],tiles[i]]=[tiles[i],tiles[selected]];selected=null;if(tiles.every((n,k)=>n===k))finish();else draw()},grid);b.style.backgroundImage='url('+photo(key%16)+')';b.style.backgroundPosition=(v%3*50)+'% '+(Math.floor(v/3)*50)+'%';b.setAttribute('aria-label','Peça '+(v+1)+', posição '+(i+1))})};draw();
   const hint=el('details','',content);el('summary','Consultar fotografia',hint);const im=el('img','',hint);im.src=photo(key%16);im.className='reward';im.alt='Referência para a montagem'}
  if(type==='memory'){el('p','Encontre os seis pares. Toque em duas fichas para investigar.',content);const grid=el('div','',content);grid.className='memory';let first=null,count=0,busy=false;for(const v of shuffled([...Array(12).keys()].map(i=>(i%6+key)%16))){const b=button('?',()=>{if(busy||b===first)return;b.style.backgroundImage='url('+photo(v)+')';b.textContent='';if(!first){first=b;return}const old=first;first=null;if(old.dataset.value===String(v)){old.disabled=b.disabled=true;if(++count===6)finish()}else{busy=true;setTimeout(()=>{for(const tile of [old,b]){tile.style.backgroundImage='';tile.textContent='?'}busy=false},850)}},grid);b.dataset.value=v;b.setAttribute('aria-label','Ficha '+grid.children.length)}}
 }
 board();
}
