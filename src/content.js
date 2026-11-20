export const start = '2026-11-20';
export const together = '2025-11-20';
export const eyes = 'MUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUITOOOOOOOOOOOOOOOOOOOOOOOOOOOOO';
export const titles = ['Perfil dos suspeitos','Cronologia adulterada','O interrogatório','Laboratório fotográfico','Mensagem interceptada','Sala de evidências','O veredito final'];
export const notes = [
  "Lembra desse dia que  eu tinha bebido?, espero que você não lembre do bafo de chopp kkkk",
  "Esse dia eu gostei bastante de ir ao cinema com você e minha mãe e irmã, por sinal ela tava te chamando pra ir novamente um tempo atras",
  "Eu lembro bastante desse dia eu tava bem cansadão (quase sempre né kakakakak) se é que me recordo bem vc tava fugindo da foto kakakaka",
  "Esse dia minha mãe ficou louca cmg pra voltar logo kakakakaka escutei um monte mas nunca te falei isso",
  "você provavelmente ja viu essa foto mas quase nunca se lembra, você odeia essa foto quando te mostrei vc ficou maluca cmg e tentou apagar mas adivinha? eu nunca apaguei",
  "Nessa chamada você disse que tava com muita cólica se eu não estiver louco, sinceramente? nn lembro muito mas tenho essa foto no celular kakakakaka",
  "Você me pediu para apagar essa foto a qualquer custo e adivinha? não fiz kkkk, eu gostei muito dela esse dia fui muito feliz mesmo o bobo do amigo do seu irmão arrebentando o coco no chão KAKAKAKAKAKAKAKA",
];
export const fragments = ['Que','a','gente','continue','rindo','assim','juntos.'];
export function dayNumber(date = new Date(), origin = start) {
  const civil = new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
  return (Date.parse(civil)-Date.parse(origin))/86400000;
}
