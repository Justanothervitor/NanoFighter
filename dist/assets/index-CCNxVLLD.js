(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))r(e);new MutationObserver(e=>{for(let n of e)if(n.type===`childList`)for(let e of n.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&r(e)}).observe(document,{childList:!0,subtree:!0});function n(e){let n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),n.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,n}function r(e){if(e.ep)return;e.ep=!0;let r=n(e);fetch(e.href,r)}})();var e=Object.freeze({verde:9,amarela:1,vermelha:0}),n=Object.freeze({1:e,2:Object.freeze({verde:7,amarela:8,vermelha:0}),3:Object.freeze({verde:4,amarela:13,vermelha:3}),4:Object.freeze({verde:0,amarela:18,vermelha:7})}),r=Object.freeze({verde:10,amarela:15,vermelha:30}),i=Object.freeze({verde:1,amarela:2,vermelha:3}),a=Object.freeze({verde:2,amarela:3,vermelha:5}),o=Object.freeze({1:10,2:15,3:20,4:25,5:1/0}),s=Object.freeze({Vírus:.65,"Terapia Fotodinâmica":.99,"Medicamento com IA":.5}),c=Object.freeze({VIRUS:`Vírus`,TERAPIA_FOTODINAMICA:`Terapia Fotodinâmica`,MEDICAMENTO_IA:`Medicamento com IA`}),l=Object.freeze({NIVEL_1:.025,NIVEL_10:.5}),u=`./data/medicamentos.csv`,d=`player`,f=Object.freeze({verde:`amarela`,amarela:`vermelha`,vermelha:`vermelha`}),p=Object.freeze({x:0,y:0}),m=Object.freeze({CIMA:`cima`,BAIXO:`baixo`,ESQUERDA:`esquerda`,DIREITA:`direita`}),h=Object.freeze({[m.CIMA]:Object.freeze({dx:0,dy:-1}),[m.BAIXO]:Object.freeze({dx:0,dy:1}),[m.ESQUERDA]:Object.freeze({dx:-1,dy:0}),[m.DIREITA]:Object.freeze({dx:1,dy:0})}),g=Object.freeze({KeyW:m.CIMA,KeyS:m.BAIXO,KeyA:m.ESQUERDA,KeyD:m.DIREITA,ArrowUp:m.CIMA,ArrowDown:m.BAIXO,ArrowLeft:m.ESQUERDA,ArrowRight:m.DIREITA}),_=Object.freeze({ESQUERDA:[`KeyA`,`ArrowLeft`],DIREITA:[`KeyD`,`ArrowRight`],CONFIRMAR:[`Enter`,`NumpadEnter`]}),v=Object.freeze({1:0,2:50,3:120,4:210,5:320,6:450,7:600,8:770,9:960,10:1200}),y=`./data/pontuacaoMockada.csv`,ee=Object.freeze({verde:Object.freeze({escala:`horas`,bolinhas:1,rotulo:`Horas`}),amarela:Object.freeze({escala:`minutos`,bolinhas:2,rotulo:`Minutos`}),vermelha:Object.freeze({escala:`segundos`,bolinhas:3,rotulo:`Segundos`})});function b(e={}){let n=e.jogador||{};return{jogador:{username:n.username||e.username||`player`,pv:n.pv===void 0?10:n.pv,pvMax:n.pvMax===void 0?10:n.pvMax,nivelXp:n.nivelXp===void 0?1:n.nivelXp,xp:n.xp===void 0?0:n.xp,pontuacao:n.pontuacao===void 0?0:n.pontuacao,posicao:{...p,...e.posicao||{},...n.posicao||{}}},fase:e.fase||1,eliminadasNaFase:e.eliminadasNaFase||0,bacteriasNoMapa:e.bacteriasNoMapa?S(e.bacteriasNoMapa):[],confronto:e.confronto?S(e.confronto):null}}var x=b();function S(e){return typeof structuredClone==`function`?structuredClone(e):JSON.parse(JSON.stringify(e))}function C(){return S(x)}var w=new Set;function te(e){return w.add(e),()=>w.delete(e)}function T(){let e=C();w.forEach(n=>n(e))}function E(e){if(typeof e==`function`){let n=e(S(x));n&&typeof n==`object`&&(x=S(n))}else e&&typeof e==`object`&&(x={...x,...S(e),jogador:{...x.jogador,...e.jogador?S(e.jogador):{}}});return T(),C()}function D(e={}){return x=b(e),T(),C()}var O=Object.freeze({CONFRONTO_INICIADO:`confronto:iniciado`,MEDICAMENTO_SORTEADO:`medicamento:sorteado`,MEDICAMENTO_ESCOLHIDO:`medicamento:escolhido`,MEDICAMENTO_USADO:`medicamento:usado`,BACTERIA_MUTADA:`bacteria:mutada`,BACTERIA_DERROTADA:`bacteria:derrotada`,JOGADOR_DANIFICADO:`jogador:danificado`,XP_GANHO:`xp:ganho`,NIVEL_XP_SUBIU:`nivelXp:subiu`,FASE_INICIADA:`fase:iniciada`,FASE_CONCLUIDA:`fase:concluida`,JOGO_ENCERRADO:`jogo:encerrado`});function ne(){let e=new Map;function n(n,i){return e.has(n)||e.set(n,new Set),e.get(n).add(i),()=>r(n,i)}function r(n,r){let i=e.get(n);i&&(i.delete(r),i.size===0&&e.delete(n))}function i(n,r){let i=e.get(n);if(i)for(let e of Array.from(i))e(r)}function a(){e.clear()}return{ouvir:n,remover:r,emitir:i,limpar:a}}var k=ne(),A=k.ouvir;k.remover;var j=k.emitir;k.limpar;function re(e){if(typeof e==`object`&&e&&`dx`in e&&`dy`in e)return{dx:Math.sign(e.dx),dy:Math.sign(e.dy)};if(typeof e==`string`){let n=e.toLowerCase();if(n===`cima`||n===`w`||n===`arrowup`||n===`keyw`)return h[m.CIMA];if(n===`baixo`||n===`s`||n===`arrowdown`||n===`keys`)return h[m.BAIXO];if(n===`esquerda`||n===`a`||n===`arrowleft`||n===`keya`)return h[m.ESQUERDA];if(n===`direita`||n===`d`||n===`arrowright`||n===`keyd`)return h[m.DIREITA]}return null}function ie(e,n=10,r=10){return!e||typeof e.x!=`number`||typeof e.y!=`number`?!1:e.x>=0&&e.x<n&&e.y>=0&&e.y<r}function ae(e,n=[]){return!e||!Array.isArray(n)?null:n.find(n=>n&&n.posicao&&n.posicao.x===e.x&&n.posicao.y===e.y)||null}function oe(e,n,r={}){if(!e||e.confronto!==null&&e.confronto!==void 0)return e;let i=re(n);if(!i)return e;let a=e.jogador?.posicao||{x:0,y:0},o={x:a.x+i.dx,y:a.y+i.dy};if(!ie(o,r.largura===void 0?10:r.largura,r.altura===void 0?10:r.altura))return e;let s=ae(o,e.bacteriasNoMapa);return{...e,jogador:{...e.jogador,posicao:o},confronto:s?{bacteria:s,opcoes:[],turno:1,indiceSelecionado:0}:null}}function M(e,n={}){let r=n.obterEstado||C,i=n.atualizarEstado||E,a=n.emitir||j,o=r();if(o.jogador?.pv<=0||o.confronto!=null)return null;let s=oe(o,e,n.limites||{largura:10,altura:10});return s.jogador?.posicao?.x===o.jogador?.posicao?.x&&s.jogador?.posicao?.y===o.jogador?.posicao?.y?null:(i(s),s.confronto&&a(O.CONFRONTO_INICIADO,{bacteria:s.confronto.bacteria}),s)}function N(e){return+((e||C()).confronto?.indiceSelecionado===1)}function se(e,n={}){let r=n.obterEstado||C,i=n.atualizarEstado||E;if(!r().confronto)return 0;let a=+(e===1);return i(e=>e.confronto?{...e,confronto:{...e.confronto,indiceSelecionado:a}}:e),a}function ce(e,n={}){let r=typeof e==`string`?e.toLowerCase():``,i=0;return i=r===`direita`||r===`d`||r===`arrowright`||r===`keyd`?1:r===`esquerda`||r===`a`||r===`arrowleft`||r===`keya`?0:+(N(n.obterEstado?.()||C())===0),se(i,n)}function le(e,n={}){let r=n.emitir||j,i=+(Number(e)===1);se(i,n),r(O.MEDICAMENTO_ESCOLHIDO,{indice:i})}function ue(e={}){let n=(e.obterEstado||C)();n.confronto&&le(N(n),e)}function de(e,n={}){let r=n.obterEstado||C,i=n.executarMovimento||M,a=n.alternarIndiceSelecionado||ce,o=n.confirmarEscolhaMedicamento||ue,s=r(),c=e,l=c.length===1?`Key${c.toUpperCase()}`:c;if(s&&s.confronto)return _.ESQUERDA.includes(l)||c.toLowerCase()===`a`?{acao:`selecionar_medicamento`,detalhe:{indice:a(`esquerda`,n)}}:_.DIREITA.includes(l)||c.toLowerCase()===`d`?{acao:`selecionar_medicamento`,detalhe:{indice:a(`direita`,n)}}:_.CONFIRMAR.includes(l)||c===`Enter`?(o(n),{acao:`confirmar_medicamento`}):null;let u=g[l]||g[c]||(c.toLowerCase()===`w`?`cima`:null)||(c.toLowerCase()===`s`?`baixo`:null)||(c.toLowerCase()===`a`?`esquerda`:null)||(c.toLowerCase()===`d`?`direita`:null);return u?{acao:`mover_mapa`,detalhe:{direcao:u,movido:i(u,n)!==null}}:null}function fe(e,n={}){let r=e||(typeof window<`u`?window:null);if(!r)return()=>{};function i(e){de(e.code||e.key,n)&&typeof e.preventDefault==`function`&&e.preventDefault()}return r.addEventListener(`keydown`,i),function(){r.removeEventListener(`keydown`,i)}}function pe(e){let n=ee[e]||{escala:`horas`,bolinhas:1,rotulo:`Horas`},r=`●`.repeat(n.bolinhas),i=`Bactéria ${e}, escala ${n.escala}, ${n.bolinhas} ${n.bolinhas===1?`bolinha`:`bolinhas`}`;return{cor:e,escala:n.escala,bolinhas:n.bolinhas,textoBolinhas:r,rotuloAcessivel:i}}function me(e){let n=pe(e.cor),r=document.createElement(`div`);r.className=`marcador-bacteria bacteria-${n.cor}`,r.setAttribute(`role`,`img`),r.setAttribute(`aria-label`,n.rotuloAcessivel);let i=document.createElement(`span`);i.className=`bacteria-letra`,i.textContent=n.cor[0].toUpperCase();let a=document.createElement(`span`);return a.className=`bacteria-bolinhas`,a.setAttribute(`aria-hidden`,`true`),a.textContent=n.textoBolinhas,r.appendChild(i),r.appendChild(a),r}function he(e,n,r={}){if(!e)return;let i=r.largura??10,a=r.altura??10;e.innerHTML=``,e.className=`container-mapa`;let o=document.createElement(`div`);o.className=`grade-mapa`,o.style.display=`grid`,o.style.gridTemplateColumns=`repeat(${i}, 1fr)`,o.style.gridTemplateRows=`repeat(${a}, 1fr)`;let s=n.jogador?.posicao||{x:0,y:0},c=n.bacteriasNoMapa||[];for(let e=0;e<a;e++)for(let n=0;n<i;n++){let r=document.createElement(`div`);r.className=`celula-grade`,r.dataset.x=String(n),r.dataset.y=String(e),s.x===n&&s.y===e&&(r.classList.add(`celula-jogador`),r.textContent=`P`,r.setAttribute(`aria-label`,`Jogador`));let i=c.find(r=>r.posicao.x===n&&r.posicao.y===e);if(i){r.classList.add(`celula-bacteria`,`bacteria-${i.cor}`);let e=me(i);r.appendChild(e)}o.appendChild(r)}e.appendChild(o)}var P={"pt-BR":Object.freeze({"batalha.titulo":`Batalha em Andamento`,"batalha.alvo":`Alvo: Bactéria {cor} [{bolinhas} {escala}]`,"batalha.painel":`Painel de Batalha`,"carta.eficacia":`Eficácia`,"carta.atalho":`[Teclar {tecla}]`,"carta.rotulo":`{nome}, eficácia de {eficacia}, atalho tecla {tecla}.`,"carta.selecionada":`Atualmente selecionado.`,"cor.verde":`verde`,"cor.amarela":`amarela`,"cor.vermelha":`vermelha`,"escala.horas":`Horas`,"escala.minutos":`Minutos`,"escala.segundos":`Segundos`,"medicamento.virus":`Bacteriógrafo`,"medicamento.terapia_fotodinamica":`Terapia Fotodinâmica`,"medicamento.medicamento_com_ia":`Medicamento com IA`,"carta.padrao":`Medicamento {numero}`,"ranking.titulo":`Top 10 - Ranking Geral`,"ranking.pos":`Pos`,"ranking.jogador":`Jogador`,"ranking.pontuacao":`Pontuação`,"ranking.voce":`(Você)`,"ranking.posicao":`{numero}º`,"fim.titulo":`Fim de jogo`,"fim.jogarNovamente":`Jogar novamente`,"username.rotulo":`Seu Username ({min} a {max} caracteres): `,"username.botao":`Jogar`,"username.erro.minimo":`Username deve possuir no mínimo {min} caracteres.`,"username.erro.maximo":`Username deve possuir no máximo {max} caracteres.`,"username.erro.caracteres":`Username deve conter apenas letras, números ou underline (_).`,"username.titulo":`Escolha seu nome de usuário`,"idioma.rotulo":`Idioma`}),en:Object.freeze({"batalha.titulo":`Battle in Progress`,"batalha.alvo":`Target: {cor} bacterium [{bolinhas} {escala}]`,"batalha.painel":`Battle panel`,"carta.eficacia":`Efficacy`,"carta.atalho":`[Press {tecla}]`,"carta.rotulo":`{nome}, efficacy {eficacia}, shortcut key {tecla}.`,"carta.selecionada":`Currently selected.`,"cor.verde":`green`,"cor.amarela":`yellow`,"cor.vermelha":`red`,"escala.horas":`Hours`,"escala.minutos":`Minutes`,"escala.segundos":`Seconds`,"medicamento.virus":`bacteriograph`,"medicamento.terapia_fotodinamica":`Photodynamic Therapy`,"medicamento.medicamento_com_ia":`AI Drug`,"carta.padrao":`Drug {numero}`,"ranking.titulo":`Top 10 - Global Ranking`,"ranking.pos":`Pos`,"ranking.jogador":`Player`,"ranking.pontuacao":`Score`,"ranking.voce":`(You)`,"ranking.posicao":`#{numero}`,"fim.titulo":`Game over`,"fim.jogarNovamente":`Play again`,"username.rotulo":`Your username ({min} to {max} characters): `,"username.botao":`Play`,"username.erro.minimo":`Username must have at least {min} characters.`,"username.erro.maximo":`Username must have at most {max} characters.`,"username.erro.caracteres":`Username may only contain letters, numbers or underscore (_).`,"username.titulo":`Choose your username`,"idioma.rotulo":`Language`})},F=`pt-BR`,ge=`nanofighter_idioma`;Object.freeze([{codigo:`pt-BR`,rotulo:`Português`},{codigo:`en`,rotulo:`English`}]);function _e(){try{let e=localStorage.getItem(ge);if(e&&P[e])return e}catch{}return(navigator.language||``).toLowerCase().startsWith(`en`)?`en`:F}var I=_e();typeof document<`u`&&(document.documentElement.lang=I);function ve(e){return e in P[I]||e in P[F]}function L(e,n={}){return(P[I][e]??P[F][e]??e).replace(/\{(\w+)\}/g,(e,r)=>n[r]??`{${r}}`)}function ye(e){let n=`medicamento.${String(e).normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().trim().replace(/\s+/g,`_`)}`;return ve(n)?L(n):e}function be(e,n,r=!1){let i=e?.nome?ye(e.nome):L(`carta.padrao`,{numero:n+1}),a=typeof e?.eficacia==`number`?e.eficacia:.5,o=`${Math.round(a*100)}%`,s=n===0?`A`:`D`;return{nome:i,eficaciaPercentual:o,atalho:s,destacado:r,rotuloAcessivel:L(`carta.rotulo`,{nome:i,eficacia:o,tecla:s})+(r?` `+L(`carta.selecionada`):``)}}function xe(e,n=[],r=0,i=()=>{}){e&&(e.innerHTML=``,e.className=`container-cartas-medicamento`,(n&&n.length===2?n:[{nome:``,eficacia:.5},{nome:``,eficacia:.5}]).forEach((n,a)=>{let o=be(n,a,a===r),s=document.createElement(`button`);s.type=`button`,s.className=`carta-medicamento ${o.destacado?`carta-destacada`:``}`,s.dataset.indice=String(a),s.setAttribute(`role`,`option`),s.setAttribute(`aria-selected`,String(o.destacado)),s.setAttribute(`aria-label`,o.rotuloAcessivel);let c=document.createElement(`div`);c.className=`carta-titulo`,c.textContent=o.nome;let l=document.createElement(`div`);l.className=`carta-eficacia`,l.append(`${L(`carta.eficacia`)}: `);let u=document.createElement(`strong`);u.textContent=o.eficaciaPercentual,l.appendChild(u);let d=document.createElement(`div`);d.className=`carta-atalho`,d.setAttribute(`aria-hidden`,`true`),d.textContent=L(`carta.atalho`,{tecla:o.atalho}),s.append(c,l,d),s.addEventListener(`click`,e=>{e.preventDefault(),i(a)}),s.addEventListener(`pointerdown`,e=>{e.pointerType===`touch`&&(e.preventDefault(),i(a))}),e.appendChild(s)}))}function Se(e,n,r={}){if(!e)return;let i=r.escolherMedicamento||le;if(!n.confronto){e.innerHTML=``,e.style.display=`none`;return}e.innerHTML=``,e.style.display=`block`,e.className=`painel-batalha`,e.setAttribute(`role`,`region`),e.setAttribute(`aria-label`,L(`batalha.painel`));let a=n.confronto.bacteria,o=pe(a.cor),s=document.createElement(`div`);s.className=`batalha-cabecalho`;let c=document.createElement(`h3`);c.textContent=L(`batalha.titulo`);let l=document.createElement(`p`),u=document.createElement(`span`);u.className=`bacteria-alvo ${a.cor}`,u.setAttribute(`aria-label`,o.rotuloAcessivel),u.textContent=L(`batalha.alvo`,{cor:L(`cor.${a.cor}`),bolinhas:o.textoBolinhas,escala:L(`escala.${o.escala}`)}),l.appendChild(u),s.append(c,l),e.appendChild(s);let d=document.createElement(`div`),f=N(n);xe(d,n.confronto.opcoes,f,e=>i(e,r.dependencias)),e.appendChild(d)}function Ce(e){let n=Math.max(1,Number(e)||1);return n>=5?1/0:o[n]===void 0?10+5*(n-1):o[n]}function we(e){return(e||C())?.fase||1}function Te(e){return typeof e==`number`?e>=5:we(e)>=5}function Ee(e,n={}){if(!e)return e;let r=n.emitir||j,i=we(e),a=(e.eliminadasNaFase||0)+1,o=Ce(i);if(Te(i))return{...e,eliminadasNaFase:a};if(a>=o){let n=i+1,a={...e,fase:n,eliminadasNaFase:0};return r(O.FASE_CONCLUIDA,{fase:i}),r(O.FASE_INICIADA,{fase:n}),a}return{...e,eliminadasNaFase:a}}function De(e={}){let n=e.obterEstado||C,r=e.atualizarEstado||E,i=e.emitir||j,a=[],o=(e,n)=>a.push([e,n]),s=Ee(n(),{...e,emitir:o});return r(s),a.forEach(([e,n])=>i(e,n)),s}function Oe(e={}){return(e.ouvir||A)(O.BACTERIA_DERROTADA,()=>{De(e)})}function ke(e){let n=e?.jogador||{},r=e?.fase||1,i=e?.eliminadasNaFase||0,a=Ce(r),o=Te(r),s=o?`Eliminadas: ${i} (Modo Infinito)`:`${i}/${a}`;return{pontuacao:n.pontuacao||0,xp:n.xp||0,nivelXp:n.nivelXp||1,pv:n.pv===void 0?10:n.pv,pvMax:n.pvMax===void 0?10:n.pvMax,fase:r,eliminadas:i,meta:a,textoProgresso:s,modoInfinito:o}}function Ae(e,n){if(!e)return;let r=ke(n);e.innerHTML=``,e.className=`hud-container`,e.setAttribute(`role`,`region`),e.setAttribute(`aria-label`,`Status do Jogo e do Jogador`);let i=document.createElement(`div`);i.className=`hud-item hud-pv`,i.setAttribute(`aria-label`,`Pontos de Vida: ${r.pv} de ${r.pvMax}`),i.innerHTML=`
    <span class="hud-rotulo">PV</span>
    <span class="hud-valor">${r.pv}/${r.pvMax}</span>
  `;let a=document.createElement(`div`);a.className=`hud-item hud-pontos`,a.setAttribute(`aria-label`,`Pontuação: ${r.pontuacao} pontos`),a.innerHTML=`
    <span class="hud-rotulo">Pontos</span>
    <span class="hud-valor">${r.pontuacao}</span>
  `;let o=document.createElement(`div`);o.className=`hud-item hud-xp`,o.setAttribute(`aria-label`,`Nível de XP: ${r.nivelXp}, total de ${r.xp} XP`),o.innerHTML=`
    <span class="hud-rotulo">Nível</span>
    <span class="hud-valor">${r.nivelXp} <small>(${r.xp} XP)</small></span>
  `;let s=document.createElement(`div`);s.className=`hud-item hud-fase`,s.setAttribute(`aria-label`,`Fase ${r.fase}, progresso: ${r.textoProgresso}`),s.innerHTML=`
    <span class="hud-rotulo">Fase ${r.fase}</span>
    <span class="hud-valor">${r.textoProgresso}</span>
  `,e.appendChild(i),e.appendChild(a),e.appendChild(o),e.appendChild(s)}function je(){if(typeof window>`u`)return!1;let e=typeof window.matchMedia==`function`&&window.matchMedia(`(pointer: coarse)`).matches,n=`ontouchstart`in window,r=typeof navigator<`u`&&navigator.maxTouchPoints!==void 0&&navigator.maxTouchPoints>0;return!!(e||n||r)}function Me(e,n={}){let r=n.executarMovimento||M,i=n.forcarExibicao||!1;if(!je()&&!i)return{elemento:null,destruir:()=>{}};let a=document.createElement(`div`);a.className=`joystick-direcional`,a.setAttribute(`role`,`region`),a.setAttribute(`aria-label`,`Controles de Movimento`);let o=[{direcao:m.CIMA,rotulo:`↑`,classe:`btn-cima`},{direcao:m.ESQUERDA,rotulo:`←`,classe:`btn-esquerda`},{direcao:m.DIREITA,rotulo:`→`,classe:`btn-direita`},{direcao:m.BAIXO,rotulo:`↓`,classe:`btn-baixo`}],s=[];o.forEach(({direcao:e,rotulo:i,classe:o})=>{let c=document.createElement(`button`);c.type=`button`,c.className=`btn-direcao ${o}`,c.textContent=i,c.setAttribute(`aria-label`,`Mover para ${e}`);function l(i){i&&(typeof i.preventDefault==`function`&&i.preventDefault(),typeof i.stopPropagation==`function`&&i.stopPropagation()),r(e,n.dependencias)}c.addEventListener(`pointerdown`,l),s.push({btn:c,acionar:l}),a.appendChild(c)}),e&&typeof e.appendChild==`function`&&e.appendChild(a);function c(){s.forEach(({btn:e,acionar:n})=>{e.removeEventListener(`pointerdown`,n)}),a.parentNode&&a.parentNode.removeChild(a)}return{elemento:a,destruir:c}}function Ne(e,n=[]){if(!e)return;e.innerHTML=``,e.className=`painel-ranking`;let r=document.createElement(`h2`);r.textContent=L(`ranking.titulo`),e.appendChild(r);let i=document.createElement(`table`);i.className=`tabela-ranking`;let a=document.createElement(`thead`),o=document.createElement(`tr`);[`ranking.pos`,`ranking.jogador`,`ranking.pontuacao`].forEach(e=>{let n=document.createElement(`th`);n.textContent=L(e),o.appendChild(n)}),a.appendChild(o),i.appendChild(a);let s=document.createElement(`tbody`);n.forEach(e=>{let n=document.createElement(`tr`);e.ehJogadorAtual&&n.classList.add(`linha-jogador-atual`);let r=document.createElement(`td`);r.textContent=L(`ranking.posicao`,{numero:e.posicao});let i=document.createElement(`td`);i.textContent=e.ehJogadorAtual?`${e.nomeJogador} ${L(`ranking.voce`)}`:e.nomeJogador;let a=document.createElement(`td`);a.textContent=String(e.pontuacao),n.append(r,i,a),s.appendChild(n)}),i.appendChild(s),e.appendChild(i)}function Pe(e,n=d,r=()=>{}){if(!e)return;e.innerHTML=``,e.className=`formulario-username`;let i=document.createElement(`label`);i.textContent=L(`username.rotulo`,{min:3,max:8}),i.setAttribute(`for`,`input-username`);let a=document.createElement(`input`);a.id=`input-username`,a.type=`text`,a.maxLength=8,a.value=n,a.placeholder=d,a.autocomplete=`off`;let o=document.createElement(`button`);o.type=`button`,o.textContent=L(`username.botao`);let s=document.createElement(`span`);s.className=`feedback-username`,s.setAttribute(`role`,`alert`);let c=()=>{let e=r(a.value);s.textContent=e||``,e&&a.focus()};o.addEventListener(`click`,c),a.addEventListener(`keydown`,e=>{e.stopPropagation(),e.key===`Enter`&&(e.preventDefault(),c())}),e.append(i,a,o,s),a.focus()}var R=null;function Fe(){if(typeof document>`u`||document.getElementById(`estilos-nanofighter`))return;let e=document.createElement(`style`);e.id=`estilos-nanofighter`,e.textContent=`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      width: 100%;
      min-height: 100%;
      background: #0f172a;
      color: #f8fafc;
      font-family: system-ui, -apple-system, sans-serif;
      overflow-x: hidden;
    }
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
    }
    #app {
      width: 100%;
      max-width: 480px;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      align-items: center;
      overflow-x: hidden;
    }

    /* HUD com alto contraste WCAG 2.1 AA */
    .hud-container {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
      background: #1e293b;
      border: 1px solid #475569;
      border-radius: 8px;
      padding: 0.6rem;
    }
    .hud-item {
      display: flex;
      flex-direction: column;
      background: #0f172a;
      padding: 0.4rem 0.6rem;
      border-radius: 6px;
      border: 1px solid #334155;
    }
    .hud-rotulo {
      font-size: 0.75rem;
      color: #94a3b8; /* Contraste 5.5:1 contra #0f172a (Passa WCAG AA) */
      text-transform: uppercase;
      font-weight: 600;
    }
    .hud-valor {
      font-size: 1rem;
      font-weight: bold;
      color: #f8fafc; /* Contraste 15.8:1 (Passa WCAG AAA) */
    }
    .hud-pv .hud-valor { color: #38bdf8; }
    .hud-pontos .hud-valor { color: #facc15; }

    /* Mapa */
    .container-mapa {
      width: 100%;
      aspect-ratio: 1 / 1;
      max-width: 450px;
      background: #1e293b;
      border: 2px solid #334155;
      border-radius: 8px;
      padding: 4px;
    }
    .grade-mapa {
      width: 100%;
      height: 100%;
      gap: 2px;
    }
    .celula-grade {
      background: #0f172a;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      user-select: none;
      position: relative;
    }
    .celula-jogador {
      background: #38bdf8;
      color: #0f172a;
      font-size: 1.1rem;
    }

    /* Marcador de bactérias com bolinhas de escala */
    .marcador-bacteria {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: 1;
      width: 100%;
      height: 100%;
    }
    .bacteria-letra {
      font-size: 0.85rem;
      font-weight: bold;
    }
    .bacteria-bolinhas {
      font-size: 0.5rem;
      letter-spacing: 0.5px;
      margin-top: 1px;
    }
    .celula-bacteria.bacteria-verde {
      background: #166534;
      color: #dcfce7;
    }
    .celula-bacteria.bacteria-amarela {
      background: #854d0e;
      color: #fef08a;
    }
    .celula-bacteria.bacteria-vermelha {
      background: #991b1b;
      color: #fee2e2;
    }

    /* Painel de batalha e cartas */
    .painel-batalha {
      width: 100%;
      background: #1e293b;
      border: 2px solid #eab308;
      border-radius: 8px;
      padding: 0.75rem;
      text-align: center;
    }
    .batalha-cabecalho h3 {
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
      color: #facc15;
    }
    .container-cartas-medicamento {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin-top: 0.75rem;
      width: 100%;
    }
    .carta-medicamento {
      flex: 1 1 120px;
      max-width: 180px;
      padding: 0.75rem 0.5rem;
      background: #334155;
      color: #f8fafc;
      border: 2px solid transparent;
      border-radius: 8px;
      cursor: pointer;
      touch-action: manipulation;
      transition: border-color 0.15s, transform 0.15s;
    }
    .carta-destacada {
      border-color: #38bdf8;
      background: #1e3a5f;
      transform: scale(1.03);
      outline: 2px solid #38bdf8;
    }
    .carta-titulo {
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    .carta-eficacia {
      font-size: 0.8rem;
      color: #cbd5e1;
    }
    .carta-atalho {
      font-size: 0.7rem;
      color: #94a3b8;
      margin-top: 0.25rem;
    }

    /* Joystick virtual */
    .joystick-direcional {
      display: grid;
      grid-template-columns: repeat(3, 48px);
      grid-template-rows: repeat(3, 48px);
      gap: 4px;
      margin-top: 0.5rem;
      justify-content: center;
    }
    .btn-direcao {
      background: #334155;
      color: #f8fafc;
      border: 1px solid #475569;
      border-radius: 8px;
      font-size: 1.25rem;
      font-weight: bold;
      cursor: pointer;
      touch-action: manipulation;
    }
    .btn-direcao:active { background: #64748b; }
    .btn-cima { grid-column: 2; grid-row: 1; }
    .btn-esquerda { grid-column: 1; grid-row: 2; }
    .btn-direita { grid-column: 3; grid-row: 2; }
    .btn-baixo { grid-column: 2; grid-row: 3; }

    /* Ranking */
    .painel-ranking {
      width: 100%;
      background: #1e293b;
      border: 2px solid #38bdf8;
      border-radius: 8px;
      padding: 0.75rem;
      text-align: center;
    }
    .tabela-ranking {
      width: 100%;
      border-collapse: collapse;
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }
    .tabela-ranking th, .tabela-ranking td {
      padding: 0.4rem;
      border-bottom: 1px solid #334155;
    }
    .linha-jogador-atual {
      background: #0369a1;
      font-weight: bold;
      color: #f0f9ff;
    }
    .formulario-username {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.5rem;
      width: 100%;
    }
    .formulario-username input {
      padding: 0.4rem;
      border-radius: 4px;
      border: 1px solid #475569;
      background: #0f172a;
      color: #f8fafc;
      width: 120px;
    }
    .formulario-username button {
      padding: 0.4rem 0.8rem;
      background: #38bdf8;
      color: #0f172a;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .tela-fim-de-jogo {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  overflow-y: auto;
}

.botao-jogar-novamente {
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;
}
.tela-usuario {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
}
.tela-usuario form { display: flex; flex-direction: column; gap: 0.5rem; max-width: 22rem; }
.tela-usuario input { padding: 0.5rem; border-radius: 4px; border: 1px solid #475569; background: #0f172a; color: #f8fafc; }
.erro-username { color: #ff6b6b; min-height: 1.2em; }
.feedback-username { color: #ff6b6b; width: 100%; text-align: center; }
.seletor-idioma {
  position: fixed;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 1200;
  display: flex;
  gap: 0.4rem;
  align-items: center;
  font-size: 0.8rem;
}
.seletor-idioma select {
  background: #1e293b;
  color: #f8fafc;
  border: 1px solid #475569;
  border-radius: 4px;
  padding: 0.2rem;
}
  `,document.head.appendChild(e)}function Ie(e,n,r={}){if(!e)return;Fe();let i=e.querySelector(`.hud-container`);i||(i=document.createElement(`div`),e.insertBefore(i,e.firstChild)),Ae(i,n);let a=e.querySelector(`.container-mapa`);a||(a=document.createElement(`div`),e.appendChild(a)),he(a,n,r);let o=e.querySelector(`.painel-batalha`);o||(o=document.createElement(`div`),e.appendChild(o)),Se(o,n,r);let s=e.querySelector(`.joystick-container-wrapper`);if(s||(s=document.createElement(`div`),s.className=`joystick-container-wrapper`,e.appendChild(s),R&&R.destruir(),R=Me(s,r)),r.ranking){let n=e.querySelector(`.painel-ranking`);n||(n=document.createElement(`div`),e.appendChild(n)),renderizarRanking(n,r.ranking)}}function Le(e){if(typeof e!=`string`&&typeof e!=`number`)throw Error(`Valor de eficácia inválido: ${e}`);let n=String(e).trim().replace(`%`,``).replace(`,`,`.`),r=parseFloat(n);if(Number.isNaN(r)||r<0||r>100)throw Error(`Eficácia fora dos limites válidos [0, 100]: "${e}"`);let i=r>1?r/100:r;return Math.min(Math.max(i,0),1)}function Re(e){if(!e||typeof e!=`string`)throw Error(`Conteúdo CSV vazio ou inválido.`);let n=e.split(/\r?\n/).map(e=>e.trim()).filter(e=>e.length>0);if(n.length<2)throw Error(`O CSV deve conter ao menos a linha de cabeçalho e um registro.`);let r=n[0].split(`,`).map(e=>e.trim().toLowerCase()),i=r.findIndex(e=>e===`nomemedicamento`),a=r.findIndex(e=>e===`eficácia`||e===`eficacia`);if(i===-1||a===-1)throw Error(`Cabeçalho CSV inválido: esperado conter "nomeMedicamento,eficácia", recebido "${n[0]}"`);let o=[];for(let e=1;e<n.length;e++){let r=n[e].split(`,`).map(e=>e.trim());if(r.length<2)throw Error(`Linha inválida ${e+1} no CSV de medicamentos: "${n[e]}"`);let s=r[i],c=r[a];if(!s)throw Error(`Nome de medicamento ausente na linha ${e+1}.`);let l=Le(c);o.push({nome:s,eficacia:l})}return o}var z=null;async function ze(e=u,n={}){if(z&&!n.forcarRecarga)return z;let r=n.fetch||globalThis.fetch;if(typeof r!=`function`)throw Error(`Ambiente sem suporte a fetch disponível.`);let i;try{i=await r(e)}catch(n){throw Error(`Erro de rede ao buscar o arquivo "${e}": ${n.message||n}`)}if(!i.ok)throw Error(`Falha HTTP ao carregar "${e}": ${i.status} ${i.statusText}`);let a=Re(await i.text());return z=a,a}var B=()=>Math.random(),V=Object.freeze([{nome:c.VIRUS,eficacia:s[c.VIRUS]},{nome:c.TERAPIA_FOTODINAMICA,eficacia:s[c.TERAPIA_FOTODINAMICA]},{nome:c.MEDICAMENTO_IA,eficacia:s[c.MEDICAMENTO_IA]}]);function Be(e){let n=Math.max(1,Math.min(10,Number(e)||1)),r=l.NIVEL_1,i=l.NIVEL_10;return r+(n-1)/9*(i-r)}function Ve(e){let n=Be(e),r=1-n;return{terapia:n,virus:r/2,ia:r/2}}function H(e,n){let r=n.toLowerCase();return e.find(e=>e.nome.toLowerCase().includes(r))||{nome:n,eficacia:s[n]||.5}}function U(e,n=V,r=B){let i=Ve(e),a=r(),o=H(n,c.TERAPIA_FOTODINAMICA),s=H(n,c.VIRUS),l=H(n,c.MEDICAMENTO_IA);return a<i.terapia?{...o}:a<i.terapia+i.virus?{...s}:{...l}}function He(e,n=V,r=B){return[U(e,n,r),U(e,n,r)]}function W(e={}){let n=e.ouvir||A,r=e.emitir||j,i=e.obterEstado||C,a=e.atualizarEstado||E,o=e.rng||B,s=e.medicamentos||V;function c(){let e=i();if(!e.confronto)return;let n=He(e.jogador?.nivelXp||1,s,o);a(e=>e.confronto?{...e,confronto:{...e.confronto,opcoes:n}}:e),r(O.MEDICAMENTO_SORTEADO,{opcoes:n})}let l=n(O.CONFRONTO_INICIADO,()=>{c()}),u=n(O.MEDICAMENTO_USADO,()=>{c()});return function(){l(),u()}}function Ue(e,n,r=B,a={}){if(!e||!e.confronto)return e;let o=a.emitir||j,s=+(Number(n)===1),c=(e.confronto.opcoes||[])[s];if(!c)return e;let l=e.confronto.bacteria,u=(e.confronto.turno||1)+1;if(r()<c.eficacia){let n=(e.bacteriasNoMapa||[]).filter(e=>e.id!==l.id),r={...e,bacteriasNoMapa:n,confronto:null};return o(O.MEDICAMENTO_USADO,{medicamento:{...c},sucesso:!0,bacteria:{...l}}),o(O.BACTERIA_DERROTADA,{bacteria:{...l}}),r}let d=l.cor,p=i[d]===void 0?1:i[d],m=e.jogador?.pv===void 0?10:e.jogador.pv,h=Math.max(0,m-p);o(O.JOGADOR_DANIFICADO,{dano:p,pv:h});let g=l.cor,_=f[g]||`vermelha`,v={...l,cor:_},y=(e.bacteriasNoMapa||[]).map(e=>e.id===l.id?v:e);g!==_&&o(O.BACTERIA_MUTADA,{bacteria:{...v},corAnterior:g,corNova:_});let ee={...e.confronto,bacteria:v,turno:u,opcoes:[]},b={...e,jogador:{...e.jogador,pv:h},bacteriasNoMapa:y,confronto:h===0?null:ee};return o(O.MEDICAMENTO_USADO,{medicamento:{...c},sucesso:!1,bacteria:{...v}}),h===0&&o(O.JOGO_ENCERRADO,{pontuacao:e.jogador?.pontuacao||0,fase:e.fase||1}),b}function We(e,n={}){let r=n.obterEstado||C,i=n.atualizarEstado||E,a=n.emitir||j,o=n.rng||B,s=r();if(!s.confronto)return null;let c=[],l=(e,n)=>{c.push([e,n])},u=Ue(s,e,o,{...n,emitir:l});return i(u),c.forEach(([e,n])=>a(e,n)),u}function Ge(e={}){return(e.ouvir||A)(O.MEDICAMENTO_ESCOLHIDO,({indice:n})=>{We(n,e)})}function Ke(r){let i=Number(r)||1;return i>=5?null:n?.[i]||e}function G(e,n){let r=[...e];for(let e=r.length-1;e>0;e--){let i=Math.floor(n()*(e+1));[r[e],r[i]]=[r[i],r[e]]}return r}function K(e={},n={x:0,y:0}){let r=e.largura,i=e.altura,a=[];for(let e=0;e<i;e++)for(let i=0;i<r;i++)n&&n.x===i&&n.y===e||a.push({x:i,y:e});return a}function qe(e,n){if((n.verde||0)+(n.amarela||0)+(n.vermelha||0)>1.0001)return{verde:Math.round(n.verde||0),amarela:Math.round(n.amarela||0),vermelha:Math.round(n.vermelha||0)};let r=o[e]??10,i=Math.round(r*(n.amarela||0)),a=Math.round(r*(n.vermelha||0));return{verde:Math.max(0,r-i-a),amarela:i,vermelha:a}}function Je(e={},n=B,r={x:0,y:0}){let i=Math.floor(n()*25)+1,a=G(K(e,r),n),o=Math.min(i,a.length),s=[];for(let e=0;e<o;e++){let r=n()<.6?`amarela`:`vermelha`;s.push({id:`bact-inf-${Date.now()}-${e+1}`,cor:r,posicao:a[e]})}return s}function Ye(e,n={},r=B,i={x:0,y:0}){let a=Number(e)||1;if(a>=5)return Je(n,r,i);let o=qe(a,Ke(a)),s=[];for(let e=0;e<o.verde;e++)s.push(`verde`);for(let e=0;e<o.amarela;e++)s.push(`amarela`);for(let e=0;e<o.vermelha;e++)s.push(`vermelha`);let c=G(K(n,i),r),l=[],u=Math.min(s.length,c.length);for(let e=0;e<u;e++)l.push({id:`bact-f${a}-${e+1}`,cor:s[e],posicao:c[e]});return l}function q(e,n={}){let r=n.obterEstado||C,i=n.atualizarEstado||E,a=n.rng||B,o=Ye(e,n.dimensoes||{largura:10,altura:10},a,r().jogador?.posicao||{x:0,y:0});return i(e=>({...e,bacteriasNoMapa:o})),o}function Xe(e={}){let n=e.ouvir||A,r=e.obterEstado||C,i=n(O.FASE_INICIADA,({fase:n})=>{(e.atualizarEstado||E)(e=>({...e,jogador:{...e.jogador,posicao:{...p}},confronto:null})),q(n,e)}),a=n(O.BACTERIA_DERROTADA,()=>{let n=r();n.fase>=5&&(!n.bacteriasNoMapa||n.bacteriasNoMapa.length===0)&&q(n.fase,e)});return function(){i(),a()}}function Ze(e){return r[e]===void 0?10:r[e]}function Qe(e){return a[e]===void 0?2:a[e]}function $e(e,n){return 2*(Math.max(1,Number(e)||1)*Qe(n))}function et(e){return Math.max(1,Number(e)||1)}function tt(e,n,r={}){if(!e||!n)return e;let i=r.emitir||j,a=e.jogador||{},o=a.nivelXp||1,s=n.cor||`verde`,c=Ze(s)*et(o),l=(a.pontuacao||0)+c,u=$e(o,s),d=(a.xp||0)+u;i(O.XP_GANHO,{xp:u});let f=o,p=a.pvMax===void 0?10:a.pvMax,m=a.pv===void 0?10:a.pv;for(;f<10;){let e=f+1,n=v[e];if(n!==void 0&&d>=n)f=e,p+=10,m+=10,i(O.NIVEL_XP_SUBIU,{nivel:f});else break}return{...e,jogador:{...a,pontuacao:l,xp:d,nivelXp:f,pv:m,pvMax:p}}}function nt(e,n={}){let r=n.obterEstado||C,i=n.atualizarEstado||E,a=tt(r(),e,n);return i(a),a}function rt(e={}){return(e.ouvir||A)(O.BACTERIA_DERROTADA,({bacteria:n})=>{nt(n,e)})}function it(e){if(e==null)return{valido:!0,vazio:!0,username:USERNAME_PADRAO};let n=String(e).trim();return n.length===0?{valido:!0,vazio:!0,username:USERNAME_PADRAO}:n.length<TAMANHO_MIN_USERNAME?{valido:!1,codigoErro:`minimo`,parametros:{min:TAMANHO_MIN_USERNAME},erro:`Username deve possuir no mínimo ${TAMANHO_MIN_USERNAME} caracteres.`}:n.length>TAMANHO_MAX_USERNAME?{valido:!1,codigoErro:`maximo`,parametros:{max:TAMANHO_MAX_USERNAME},erro:`Username deve possuir no máximo ${TAMANHO_MAX_USERNAME} caracteres.`}:PROVISORIO_REGEX_USERNAME.test(n)?{valido:!0,vazio:!1,username:n}:{valido:!1,codigoErro:`caracteres`,parametros:{},erro:`Username deve conter apenas letras, números ou underline (_).`}}function at(e){if(!e||typeof e!=`string`)throw Error(`Conteúdo CSV de ranking vazio ou inválido.`);let n=e.split(/\r?\n/).map(e=>e.trim()).filter(e=>e.length>0);if(n.length<2)throw Error(`O CSV de ranking deve conter ao menos a linha de cabeçalho e um registro.`);let r=n[0].split(`,`).map(e=>e.trim().toLowerCase()),i=r.findIndex(e=>e===`nomejogador`),a=r.findIndex(e=>e===`pontuacao`||e===`pontuação`);if(i===-1||a===-1)throw Error(`Cabeçalho CSV inválido: esperado conter "nomeJogador,pontuacao", recebido "${n[0]}"`);let o=[];for(let e=1;e<n.length;e++){let r=n[e].split(`,`).map(e=>e.trim());if(r.length<2)throw Error(`Linha inválida ${e+1} no CSV de ranking: "${n[e]}"`);let s=r[i],c=r[a];if(!s)throw Error(`Nome de jogador ausente na linha ${e+1}.`);let l=parseInt(c,10);if(Number.isNaN(l)||l<0)throw Error(`Pontuação inválida na linha ${e+1}: "${c}"`);o.push({nomeJogador:s,pontuacao:l})}return o}var J=null;async function ot(e=y,n={}){if(J&&!n.forcarRecarga)return J;let r=n.fetch||globalThis.fetch;if(typeof r!=`function`)throw Error(`Ambiente sem suporte a fetch disponível.`);let i;try{i=await r(e)}catch(n){throw Error(`Erro de rede ao buscar o ranking "${e}": ${n.message||n}`)}if(!i.ok)throw Error(`Falha HTTP ao carregar "${e}": ${i.status} ${i.statusText}`);let a=at(await i.text());return J=a,a}function st(e,n={},r=10){let i=it(n.username||n.nomeJogador||``),a=i.valido?i.username:d,o=Math.max(0,Number(n.pontuacao)||0),s=(e||[]).filter(e=>e&&e.nomeJogador).map(e=>({nomeJogador:String(e.nomeJogador),pontuacao:Number(e.pontuacao)||0,ehJogadorAtual:!1})),c={nomeJogador:a,pontuacao:o,ehJogadorAtual:!0},l=[...s,c];return l.sort((e,n)=>n.pontuacao-e.pontuacao),l.slice(0,r).map((e,n)=>({posicao:n+1,nomeJogador:e.nomeJogador,pontuacao:e.pontuacao,ehJogadorAtual:e.ehJogadorAtual}))}function ct(e={}){if(e.storage!==void 0)return e.storage;try{if(typeof window<`u`&&window.sessionStorage)return window.sessionStorage}catch{}return null}function lt(e,n={}){try{let r=ct(n);if(!r)return!1;let i=n.chave||`nanofighter_pontuacoes`,a=[...ut(n),{username:e.username,pontuacao:Number(e.pontuacao)||0,timestamp:Date.now()}];return r.setItem(i,JSON.stringify(a)),!0}catch(e){return console.warn(`Aviso: falha ao salvar pontuação no sessionStorage:`,e.message||e),!1}}function ut(e={}){try{let n=ct(e);if(!n)return[];let r=e.chave||`nanofighter_pontuacoes`,i=n.getItem(r);if(!i)return[];let a=JSON.parse(i);return Array.isArray(a)?a:[]}catch(e){return console.warn(`Aviso: falha ao ler pontuações do sessionStorage:`,e.message||e),[]}}var dt=[];ot().then(e=>{dt=e,console.info(`Jogadores simulados do ranking carregados:`,e.length)}).catch(e=>{console.warn(`Aviso: erro ao carregar simulados do ranking:`,e)}),W({medicamentos:V}),Ge(),Oe(),Xe(),rt();var Y=C();Y.bacteriasNoMapa.length===0&&q(Y.fase||1),ze().then(e=>{W({medicamentos:e}),console.info(`Medicamentos carregados do CSV com sucesso:`,e)}).catch(e=>{console.warn(`Aviso: usando medicamentos padrão de fallback devido a erro de carregamento:`,e)});var ft=document.getElementById(`app`);function X(){if(ft){let e=performance.now();Ie(ft,C());let n=performance.now()-e;n>200&&console.warn(`[PERFORMANCE] Tempo de renderização excedeu 200ms: ${n.toFixed(2)}ms`)}}te(()=>X()),fe(window),A(O.CONFRONTO_INICIADO,e=>{console.info(`Confronto iniciado:`,e),X()}),A(O.MEDICAMENTO_SORTEADO,e=>{console.info(`Medicamentos sorteados:`,e),X()}),A(O.MEDICAMENTO_USADO,e=>{console.info(`Medicamento usado:`,e),X()}),A(O.BACTERIA_DERROTADA,e=>{console.info(`Bactéria derrotada:`,e),X()}),A(O.BACTERIA_MUTADA,e=>{console.info(`Bactéria mutada:`,e),X()}),A(O.JOGADOR_DANIFICADO,e=>{console.info(`Jogador danificado:`,e),X()}),A(O.JOGO_ENCERRADO,e=>{let n=C().jogador?.username||`player`;lt({username:n,pontuacao:e.pontuacao||0});let r=st(dt,{username:n,pontuacao:e.pontuacao||0});X(),mt(r,n)});var Z=null;function pt(e){Z&&=(Z.remove(),null),D({username:e}),q(1)}function mt(e,n){Z&&Z.remove(),Z=document.createElement(`div`),Z.className=`tela-fim-de-jogo`,Z.setAttribute(`role`,`dialog`),Z.setAttribute(`aria-modal`,`true`),Z.setAttribute(`aria-label`,`Fim de jogo`);let r=document.createElement(`h2`);r.textContent=`Fim de jogo`;let i=document.createElement(`div`);Ne(i,e);let a=document.createElement(`button`);a.type=`button`,a.className=`botao-jogar-novamente`,a.textContent=`Jogar novamente`,a.addEventListener(`click`,()=>pt(n)),Z.append(r,i,a),document.body.appendChild(Z),a.focus()}A(O.FASE_CONCLUIDA,e=>{console.info(`Fase concluída:`,e),X()}),A(O.FASE_INICIADA,e=>{console.info(`Fase iniciada:`,e),X()}),A(O.XP_GANHO,e=>{console.info(`XP ganho:`,e),X()}),A(O.NIVEL_XP_SUBIU,e=>{console.info(`Nível de XP subiu:`,e),X()}),X(),console.info(`Project NanoFighter - Etapa P2 carregada.`);var Q=null,$=``;function ht(){let e=Q?.querySelector(`input`)?.value;e!==void 0&&($=e),Q&&Q.remove(),Q=document.createElement(`div`),Q.className=`tela-usuario`,Q.setAttribute(`role`,`dialog`),Q.setAttribute(`aria-modal`,`true`),Q.setAttribute(`aria-label`,t(`username.titulo`));let n=document.createElement(`h2`);n.textContent=`NanoFighter`;let r=document.createElement(`div`);Pe(r,$,e=>{let n=it(e);return n.valido?(Q.remove(),Q=null,$=``,gt(n.username),null):t(`username.erro.${n.codigoErro}`,n.parametros)}),Q.append(n,r),document.body.appendChild(Q),r.querySelector(`input`)?.focus()}ht();function gt(e){D({username:e}),q(1)}