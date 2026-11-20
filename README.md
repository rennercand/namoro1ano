# 365 dias de nós

Execute `npm ci` e `npm run dev`. A celebração fica em `/` e o mural em `/operacao-365`. Execute `npm test` para verificar o calendário e `npm run build` para gerar o site em dist. Configure a hospedagem para servir index.html nas duas rotas.

As fotos pessoais ficam na cópia local em public/fotos e os originais em private. Ambos estão no gitignore. O build inclui as fotos, portanto publicar dist expõe esses arquivos a quem tiver acesso à hospedagem.

Edite as datas, os sete bilhetes e a frase final em src/content.js. A carta de aniversário está em src/main.js. As missões e pistas ficam em src/game.js. As pastas abrem de acordo com a data no aparelho, no fuso de São Paulo. O progresso fica no navegador utilizado.
