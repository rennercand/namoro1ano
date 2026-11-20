import './contract.css';

export function contract(host, save, reveal) {
  host.innerHTML = `<form class="contract"><small>TERMO DE RENOVAÇÃO · CASO 365</small>
    <h3>Mais uma vida com você.</h3>
    <p>Sofia, já que a gente chegou até aqui, tenho uma última proposta. Eu entro com os planos pro futuro, você escolhe o próximo filme e a gente continua rindo das fotos que só nós dois entendemos.</p>
    <p><strong>Assine aqui pra renovar nosso contrato de namoro pro resto da vida.</strong></p>
    <label>Sua assinatura<input name="signature" required maxlength="60" placeholder="Seu nome" autocomplete="off"></label>
    <button>Assinar e guardar no coração</button></form>`;
  const form = host.querySelector('form');
  form.onsubmit = event => {
    event.preventDefault();
    const input = form.elements.signature;
    if (!input.value.trim()) { input.value=''; input.reportValidity(); return; }
    save();
    host.innerHTML = `<div class="sealed" tabindex="-1"><svg aria-hidden="true" viewBox="0 0 300 220">
      <ellipse cx="150" cy="201" rx="65" ry="6" fill="#463026" opacity=".22"/>
      <g class="signed-sheet" stroke="#4c2a30" stroke-width="3"><rect x="119" y="6" width="62" height="70" rx="4" fill="#fff2d6"/><path d="M130 24h39m-39 9h32m-30 22q6-18 9-5t9-2q5 4 15-1" fill="none"/></g>
      <path class="heart-pocket" d="M150 191Q45 123 82 88Q113 62 150 100Q187 62 218 88Q255 123 150 191Z" fill="#be395e" stroke="#522135" stroke-width="5"/>
      <g class="heart-lock" stroke="#522135" stroke-width="4"><path d="M140 137v-9a10 10 0 0 1 20 0v9" fill="none"/><rect x="132" y="134" width="36" height="29" rx="6" fill="#ffce78"/><path d="M150 145v7"/></g></svg>
      <h3>Contrato renovado.</h3><p class="receipt"></p><button>Ver nossa última foto →</button></div>`;
    host.querySelector('.receipt').textContent='Assinado por '+input.value.trim()+'. Validade: pro resto da vida.';
    host.querySelector('.sealed').focus();
    host.querySelector('button').onclick=reveal;
  };
}
