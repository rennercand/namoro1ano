export const start = '2026-11-20';
export const together = '2025-11-20';
export const eyes = 'MUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUITOOOOOOOOOOOOOOOOOOOOOOOOOOOOO';
export const titles = ['Perfil dos suspeitos','Cronologia adulterada','O interrogatório','Laboratório fotográfico','Mensagem interceptada','Sala de evidências','O veredito final'];
export const notes = Array(7).fill('Bilhete do Renner em preparação.');
export const fragments = ['Que','a','gente','continue','rindo','assim','juntos.'];
export function dayNumber(date = new Date(), origin = start) {
  const civil = new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
  return (Date.parse(civil)-Date.parse(origin))/86400000;
}
