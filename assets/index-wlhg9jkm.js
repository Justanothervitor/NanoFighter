(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=Object.freeze({verde:9,amarela:1,vermelha:0}),t=Object.freeze({1:e,2:Object.freeze({verde:7,amarela:8,vermelha:0}),3:Object.freeze({verde:4,amarela:13,vermelha:3}),4:Object.freeze({verde:0,amarela:18,vermelha:7})}),n=Object.freeze({verde:10,amarela:15,vermelha:30}),r=Object.freeze({verde:1,amarela:2,vermelha:3}),i=Object.freeze({verde:2,amarela:3,vermelha:5}),a=Object.freeze({1:10,2:15,3:20,4:25,5:1/0}),o=Object.freeze({Vírus:.65,"Terapia Fotodinâmica":.99,"Medicamento com IA":.5}),s=Object.freeze({VIRUS:`Vírus`,TERAPIA_FOTODINAMICA:`Terapia Fotodinâmica`,MEDICAMENTO_IA:`Medicamento com IA`}),c=Object.freeze({NIVEL_1:.025,NIVEL_10:.5}),l=`./data/medicamentos.csv`,u=`player`,d=Object.freeze({verde:`amarela`,amarela:`vermelha`,vermelha:`vermelha`}),f=Object.freeze({x:0,y:0}),p=Object.freeze({CIMA:`cima`,BAIXO:`baixo`,ESQUERDA:`esquerda`,DIREITA:`direita`}),m=Object.freeze({[p.CIMA]:Object.freeze({dx:0,dy:-1}),[p.BAIXO]:Object.freeze({dx:0,dy:1}),[p.ESQUERDA]:Object.freeze({dx:-1,dy:0}),[p.DIREITA]:Object.freeze({dx:1,dy:0})}),h=Object.freeze({KeyW:p.CIMA,KeyS:p.BAIXO,KeyA:p.ESQUERDA,KeyD:p.DIREITA,ArrowUp:p.CIMA,ArrowDown:p.BAIXO,ArrowLeft:p.ESQUERDA,ArrowRight:p.DIREITA}),g=Object.freeze({ESQUERDA:[`KeyA`,`ArrowLeft`],DIREITA:[`KeyD`,`ArrowRight`],CONFIRMAR:[`Enter`,`NumpadEnter`]}),_=Object.freeze({1:0,2:50,3:120,4:210,5:320,6:450,7:600,8:770,9:960,10:1200}),v=`./data/pontuacaoMockada.csv`,ee=/^[a-zA-Z0-9_]{3,8}$/,te=Object.freeze({verde:Object.freeze({escala:`horas`,bolinhas:1,rotulo:`Horas`}),amarela:Object.freeze({escala:`minutos`,bolinhas:2,rotulo:`Minutos`}),vermelha:Object.freeze({escala:`segundos`,bolinhas:3,rotulo:`Segundos`})});function ne(e={}){let t=e.jogador||{};return{jogador:{username:t.username||e.username||`player`,pv:t.pv===void 0?10:t.pv,pvMax:t.pvMax===void 0?10:t.pvMax,nivelXp:t.nivelXp===void 0?1:t.nivelXp,xp:t.xp===void 0?0:t.xp,pontuacao:t.pontuacao===void 0?0:t.pontuacao,posicao:{...f,...e.posicao||{},...t.posicao||{}}},fase:e.fase||1,eliminadasNaFase:e.eliminadasNaFase||0,bacteriasNoMapa:e.bacteriasNoMapa?b(e.bacteriasNoMapa):[],confronto:e.confronto?b(e.confronto):null}}var y=ne();function b(e){return typeof structuredClone==`function`?structuredClone(e):JSON.parse(JSON.stringify(e))}function x(){return b(y)}var S=new Set;function re(e){return S.add(e),()=>S.delete(e)}function C(){let e=x();S.forEach(t=>t(e))}function w(e){if(typeof e==`function`){let t=e(b(y));t&&typeof t==`object`&&(y=b(t))}else e&&typeof e==`object`&&(y={...y,...b(e),jogador:{...y.jogador,...e.jogador?b(e.jogador):{}}});return C(),x()}function ie(e={}){return y=ne(e),C(),x()}var T=Object.freeze({CONFRONTO_INICIADO:`confronto:iniciado`,MEDICAMENTO_SORTEADO:`medicamento:sorteado`,MEDICAMENTO_ESCOLHIDO:`medicamento:escolhido`,MEDICAMENTO_USADO:`medicamento:usado`,BACTERIA_MUTADA:`bacteria:mutada`,BACTERIA_DERROTADA:`bacteria:derrotada`,JOGADOR_DANIFICADO:`jogador:danificado`,XP_GANHO:`xp:ganho`,NIVEL_XP_SUBIU:`nivelXp:subiu`,FASE_INICIADA:`fase:iniciada`,FASE_CONCLUIDA:`fase:concluida`,JOGO_ENCERRADO:`jogo:encerrado`});function ae(){let e=new Map;function t(t,r){return e.has(t)||e.set(t,new Set),e.get(t).add(r),()=>n(t,r)}function n(t,n){let r=e.get(t);r&&(r.delete(n),r.size===0&&e.delete(t))}function r(t,n){let r=e.get(t);if(r)for(let e of Array.from(r))e(n)}function i(){e.clear()}return{ouvir:t,remover:n,emitir:r,limpar:i}}var E=ae(),D=E.ouvir;E.remover;var O=E.emitir;E.limpar;function oe(e){if(typeof e==`object`&&e&&`dx`in e&&`dy`in e)return{dx:Math.sign(e.dx),dy:Math.sign(e.dy)};if(typeof e==`string`){let t=e.toLowerCase();if(t===`cima`||t===`w`||t===`arrowup`||t===`keyw`)return m[p.CIMA];if(t===`baixo`||t===`s`||t===`arrowdown`||t===`keys`)return m[p.BAIXO];if(t===`esquerda`||t===`a`||t===`arrowleft`||t===`keya`)return m[p.ESQUERDA];if(t===`direita`||t===`d`||t===`arrowright`||t===`keyd`)return m[p.DIREITA]}return null}function se(e,t=10,n=10){return!e||typeof e.x!=`number`||typeof e.y!=`number`?!1:e.x>=0&&e.x<t&&e.y>=0&&e.y<n}function ce(e,t=[]){return!e||!Array.isArray(t)?null:t.find(t=>t&&t.posicao&&t.posicao.x===e.x&&t.posicao.y===e.y)||null}function le(e,t,n={}){if(!e||e.confronto!==null&&e.confronto!==void 0)return e;let r=oe(t);if(!r)return e;let i=e.jogador?.posicao||{x:0,y:0},a={x:i.x+r.dx,y:i.y+r.dy};if(!se(a,n.largura===void 0?10:n.largura,n.altura===void 0?10:n.altura))return e;let o=ce(a,e.bacteriasNoMapa);return{...e,jogador:{...e.jogador,posicao:a},confronto:o?{bacteria:o,opcoes:[],turno:1,indiceSelecionado:0}:null}}function k(e,t={}){let n=t.obterEstado||x,r=t.atualizarEstado||w,i=t.emitir||O,a=n();if(a.jogador?.pv<=0||a.confronto!=null)return null;let o=le(a,e,t.limites||{largura:10,altura:10});return o.jogador?.posicao?.x===a.jogador?.posicao?.x&&o.jogador?.posicao?.y===a.jogador?.posicao?.y?null:(r(o),o.confronto&&i(T.CONFRONTO_INICIADO,{bacteria:o.confronto.bacteria}),o)}function A(e){return+((e||x()).confronto?.indiceSelecionado===1)}function j(e,t={}){let n=t.obterEstado||x,r=t.atualizarEstado||w;if(!n().confronto)return 0;let i=+(e===1);return r(e=>e.confronto?{...e,confronto:{...e.confronto,indiceSelecionado:i}}:e),i}function ue(e,t={}){let n=typeof e==`string`?e.toLowerCase():``,r=0;return r=n===`direita`||n===`d`||n===`arrowright`||n===`keyd`?1:n===`esquerda`||n===`a`||n===`arrowleft`||n===`keya`?0:+(A(t.obterEstado?.()||x())===0),j(r,t)}function M(e,t={}){let n=t.emitir||O,r=+(Number(e)===1);j(r,t),n(T.MEDICAMENTO_ESCOLHIDO,{indice:r})}function de(e={}){let t=(e.obterEstado||x)();t.confronto&&M(A(t),e)}function fe(e,t={}){let n=t.obterEstado||x,r=t.executarMovimento||k,i=t.alternarIndiceSelecionado||ue,a=t.confirmarEscolhaMedicamento||de,o=n(),s=e,c=s.length===1?`Key${s.toUpperCase()}`:s;if(o&&o.confronto)return g.ESQUERDA.includes(c)||s.toLowerCase()===`a`?{acao:`selecionar_medicamento`,detalhe:{indice:i(`esquerda`,t)}}:g.DIREITA.includes(c)||s.toLowerCase()===`d`?{acao:`selecionar_medicamento`,detalhe:{indice:i(`direita`,t)}}:g.CONFIRMAR.includes(c)||s===`Enter`?(a(t),{acao:`confirmar_medicamento`}):null;let l=h[c]||h[s]||(s.toLowerCase()===`w`?`cima`:null)||(s.toLowerCase()===`s`?`baixo`:null)||(s.toLowerCase()===`a`?`esquerda`:null)||(s.toLowerCase()===`d`?`direita`:null);return l?{acao:`mover_mapa`,detalhe:{direcao:l,movido:r(l,t)!==null}}:null}function pe(e,t={}){let n=e||(typeof window<`u`?window:null);if(!n)return()=>{};function r(e){fe(e.code||e.key,t)&&typeof e.preventDefault==`function`&&e.preventDefault()}return n.addEventListener(`keydown`,r),function(){n.removeEventListener(`keydown`,r)}}function me(e){let t=te[e]||{escala:`horas`,bolinhas:1,rotulo:`Horas`},n=`●`.repeat(t.bolinhas),r=`Bactéria ${e}, escala ${t.escala}, ${t.bolinhas} ${t.bolinhas===1?`bolinha`:`bolinhas`}`;return{cor:e,escala:t.escala,bolinhas:t.bolinhas,textoBolinhas:n,rotuloAcessivel:r}}function he(e){let t=me(e.cor),n=document.createElement(`div`);n.className=`marcador-bacteria bacteria-${t.cor}`,n.setAttribute(`role`,`img`),n.setAttribute(`aria-label`,t.rotuloAcessivel);let r=document.createElement(`span`);r.className=`bacteria-letra`,r.textContent=t.cor[0].toUpperCase();let i=document.createElement(`span`);return i.className=`bacteria-bolinhas`,i.setAttribute(`aria-hidden`,`true`),i.textContent=t.textoBolinhas,n.appendChild(r),n.appendChild(i),n}function ge(e,t,n={}){if(!e)return;let r=n.largura??10,i=n.altura??10;e.innerHTML=``,e.className=`container-mapa`;let a=document.createElement(`div`);a.className=`grade-mapa`,a.style.display=`grid`,a.style.gridTemplateColumns=`repeat(${r}, 1fr)`,a.style.gridTemplateRows=`repeat(${i}, 1fr)`;let o=t.jogador?.posicao||{x:0,y:0},s=t.bacteriasNoMapa||[];for(let e=0;e<i;e++)for(let t=0;t<r;t++){let n=document.createElement(`div`);n.className=`celula-grade`,n.dataset.x=String(t),n.dataset.y=String(e),o.x===t&&o.y===e&&(n.classList.add(`celula-jogador`),n.textContent=`P`,n.setAttribute(`aria-label`,`Jogador`));let r=s.find(n=>n.posicao.x===t&&n.posicao.y===e);if(r){n.classList.add(`celula-bacteria`,`bacteria-${r.cor}`);let e=he(r);n.appendChild(e)}a.appendChild(n)}e.appendChild(a)}var N={"pt-BR":Object.freeze({"batalha.titulo":`Batalha em Andamento`,"batalha.alvo":`Alvo: Bactéria {cor} [{bolinhas} {escala}]`,"batalha.painel":`Painel de Batalha`,"carta.eficacia":`Eficácia`,"carta.atalho":`[Teclar {tecla}]`,"carta.rotulo":`{nome}, eficácia de {eficacia}, atalho tecla {tecla}.`,"carta.selecionada":`Atualmente selecionado.`,"cor.verde":`verde`,"cor.amarela":`amarela`,"cor.vermelha":`vermelha`,"escala.horas":`Horas`,"escala.minutos":`Minutos`,"escala.segundos":`Segundos`,"medicamento.virus":`Bacteriógrafo`,"medicamento.terapia_fotodinamica":`Terapia Fotodinâmica`,"medicamento.medicamento_com_ia":`Medicamento com IA`,"carta.padrao":`Medicamento {numero}`,"ranking.titulo":`Top 10 - Ranking Geral`,"ranking.pos":`Pos`,"ranking.jogador":`Jogador`,"ranking.pontuacao":`Pontuação`,"ranking.voce":`(Você)`,"ranking.posicao":`{numero}º`,"fim.titulo":`Fim de jogo`,"fim.jogarNovamente":`Jogar novamente`,"username.rotulo":`Seu Username ({min} a {max} caracteres): `,"username.botao":`Jogar`,"username.erro.minimo":`Username deve possuir no mínimo {min} caracteres.`,"username.erro.maximo":`Username deve possuir no máximo {max} caracteres.`,"username.erro.caracteres":`Username deve conter apenas letras, números ou underline (_).`,"username.titulo":`Escolha seu nome de usuário`,"idioma.rotulo":`Idioma`}),en:Object.freeze({"batalha.titulo":`Battle in Progress`,"batalha.alvo":`Target: {cor} bacterium [{bolinhas} {escala}]`,"batalha.painel":`Battle panel`,"carta.eficacia":`Efficacy`,"carta.atalho":`[Press {tecla}]`,"carta.rotulo":`{nome}, efficacy {eficacia}, shortcut key {tecla}.`,"carta.selecionada":`Currently selected.`,"cor.verde":`green`,"cor.amarela":`yellow`,"cor.vermelha":`red`,"escala.horas":`Hours`,"escala.minutos":`Minutes`,"escala.segundos":`Seconds`,"medicamento.virus":`bacteriograph`,"medicamento.terapia_fotodinamica":`Photodynamic Therapy`,"medicamento.medicamento_com_ia":`AI Drug`,"carta.padrao":`Drug {numero}`,"ranking.titulo":`Top 10 - Global Ranking`,"ranking.pos":`Pos`,"ranking.jogador":`Player`,"ranking.pontuacao":`Score`,"ranking.voce":`(You)`,"ranking.posicao":`#{numero}`,"fim.titulo":`Game over`,"fim.jogarNovamente":`Play again`,"username.rotulo":`Your username ({min} to {max} characters): `,"username.botao":`Play`,"username.erro.minimo":`Username must have at least {min} characters.`,"username.erro.maximo":`Username must have at most {max} characters.`,"username.erro.caracteres":`Username may only contain letters, numbers or underscore (_).`,"username.titulo":`Choose your username`,"idioma.rotulo":`Language`})},P=`pt-BR`,_e=`nanofighter_idioma`,ve=Object.freeze([{codigo:`pt-BR`,rotulo:`Português`},{codigo:`en`,rotulo:`English`}]),F=new Set;function ye(){try{let e=localStorage.getItem(_e);if(e&&N[e])return e}catch{}return(navigator.language||``).toLowerCase().startsWith(`en`)?`en`:P}var I=ye();typeof document<`u`&&(document.documentElement.lang=I);function be(){return I}function xe(e){if(N[e]&&e!==I){I=e;try{localStorage.setItem(_e,e)}catch{}document.documentElement.lang=e,F.forEach(t=>t(e))}}function L(e){return F.add(e),()=>F.delete(e)}function Se(e){return e in N[I]||e in N[P]}function R(e,t={}){return(N[I][e]??N[P][e]??e).replace(/\{(\w+)\}/g,(e,n)=>t[n]??`{${n}}`)}function Ce(e){let t=`medicamento.${String(e).normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase().trim().replace(/\s+/g,`_`)}`;return Se(t)?R(t):e}function we(e,t,n=!1){let r=e?.nome?Ce(e.nome):R(`carta.padrao`,{numero:t+1}),i=typeof e?.eficacia==`number`?e.eficacia:.5,a=`${Math.round(i*100)}%`,o=t===0?`A`:`D`;return{nome:r,eficaciaPercentual:a,atalho:o,destacado:n,rotuloAcessivel:R(`carta.rotulo`,{nome:r,eficacia:a,tecla:o})+(n?` `+R(`carta.selecionada`):``)}}function Te(e,t=[],n=0,r=()=>{}){e&&(e.innerHTML=``,e.className=`container-cartas-medicamento`,(t&&t.length===2?t:[{nome:``,eficacia:.5},{nome:``,eficacia:.5}]).forEach((t,i)=>{let a=we(t,i,i===n),o=document.createElement(`button`);o.type=`button`,o.className=`carta-medicamento ${a.destacado?`carta-destacada`:``}`,o.dataset.indice=String(i),o.setAttribute(`role`,`option`),o.setAttribute(`aria-selected`,String(a.destacado)),o.setAttribute(`aria-label`,a.rotuloAcessivel);let s=document.createElement(`div`);s.className=`carta-titulo`,s.textContent=a.nome;let c=document.createElement(`div`);c.className=`carta-eficacia`,c.append(`${R(`carta.eficacia`)}: `);let l=document.createElement(`strong`);l.textContent=a.eficaciaPercentual,c.appendChild(l);let u=document.createElement(`div`);u.className=`carta-atalho`,u.setAttribute(`aria-hidden`,`true`),u.textContent=R(`carta.atalho`,{tecla:a.atalho}),o.append(s,c,u),o.addEventListener(`click`,e=>{e.preventDefault(),r(i)}),o.addEventListener(`pointerdown`,e=>{e.pointerType===`touch`&&(e.preventDefault(),r(i))}),e.appendChild(o)}))}function Ee(e,t,n={}){if(!e)return;let r=n.escolherMedicamento||M;if(!t.confronto){e.innerHTML=``,e.style.display=`none`;return}e.innerHTML=``,e.style.display=`block`,e.className=`painel-batalha`,e.setAttribute(`role`,`region`),e.setAttribute(`aria-label`,R(`batalha.painel`));let i=t.confronto.bacteria,a=me(i.cor),o=document.createElement(`div`);o.className=`batalha-cabecalho`;let s=document.createElement(`h3`);s.textContent=R(`batalha.titulo`);let c=document.createElement(`p`),l=document.createElement(`span`);l.className=`bacteria-alvo ${i.cor}`,l.setAttribute(`aria-label`,a.rotuloAcessivel),l.textContent=R(`batalha.alvo`,{cor:R(`cor.${i.cor}`),bolinhas:a.textoBolinhas,escala:R(`escala.${a.escala}`)}),c.appendChild(l),o.append(s,c),e.appendChild(o);let u=document.createElement(`div`),d=A(t);Te(u,t.confronto.opcoes,d,e=>r(e,n.dependencias)),e.appendChild(u)}function De(e){let t=Math.max(1,Number(e)||1);return t>=5?1/0:a[t]===void 0?10+5*(t-1):a[t]}function z(e){return(e||x())?.fase||1}function B(e){return typeof e==`number`?e>=5:z(e)>=5}function Oe(e,t={}){if(!e)return e;let n=t.emitir||O,r=z(e),i=(e.eliminadasNaFase||0)+1,a=De(r);if(B(r))return{...e,eliminadasNaFase:i};if(i>=a){let t=r+1,i={...e,fase:t,eliminadasNaFase:0};return n(T.FASE_CONCLUIDA,{fase:r}),n(T.FASE_INICIADA,{fase:t}),i}return{...e,eliminadasNaFase:i}}function ke(e={}){let t=e.obterEstado||x,n=e.atualizarEstado||w,r=e.emitir||O,i=[],a=(e,t)=>i.push([e,t]),o=Oe(t(),{...e,emitir:a});return n(o),i.forEach(([e,t])=>r(e,t)),o}function Ae(e={}){return(e.ouvir||D)(T.BACTERIA_DERROTADA,()=>{ke(e)})}function je(e){let t=e?.jogador||{},n=e?.fase||1,r=e?.eliminadasNaFase||0,i=De(n),a=B(n),o=a?`Eliminadas: ${r} (Modo Infinito)`:`${r}/${i}`;return{pontuacao:t.pontuacao||0,xp:t.xp||0,nivelXp:t.nivelXp||1,pv:t.pv===void 0?10:t.pv,pvMax:t.pvMax===void 0?10:t.pvMax,fase:n,eliminadas:r,meta:i,textoProgresso:o,modoInfinito:a}}function Me(e,t){if(!e)return;let n=je(t);e.innerHTML=``,e.className=`hud-container`,e.setAttribute(`role`,`region`),e.setAttribute(`aria-label`,`Status do Jogo e do Jogador`);let r=document.createElement(`div`);r.className=`hud-item hud-pv`,r.setAttribute(`aria-label`,`Pontos de Vida: ${n.pv} de ${n.pvMax}`),r.innerHTML=`
    <span class="hud-rotulo">PV</span>
    <span class="hud-valor">${n.pv}/${n.pvMax}</span>
  `;let i=document.createElement(`div`);i.className=`hud-item hud-pontos`,i.setAttribute(`aria-label`,`Pontuação: ${n.pontuacao} pontos`),i.innerHTML=`
    <span class="hud-rotulo">Pontos</span>
    <span class="hud-valor">${n.pontuacao}</span>
  `;let a=document.createElement(`div`);a.className=`hud-item hud-xp`,a.setAttribute(`aria-label`,`Nível de XP: ${n.nivelXp}, total de ${n.xp} XP`),a.innerHTML=`
    <span class="hud-rotulo">Nível</span>
    <span class="hud-valor">${n.nivelXp} <small>(${n.xp} XP)</small></span>
  `;let o=document.createElement(`div`);o.className=`hud-item hud-fase`,o.setAttribute(`aria-label`,`Fase ${n.fase}, progresso: ${n.textoProgresso}`),o.innerHTML=`
    <span class="hud-rotulo">Fase ${n.fase}</span>
    <span class="hud-valor">${n.textoProgresso}</span>
  `,e.appendChild(r),e.appendChild(i),e.appendChild(a),e.appendChild(o)}function Ne(){if(typeof window>`u`)return!1;let e=typeof window.matchMedia==`function`&&window.matchMedia(`(pointer: coarse)`).matches,t=`ontouchstart`in window,n=typeof navigator<`u`&&navigator.maxTouchPoints!==void 0&&navigator.maxTouchPoints>0;return!!(e||t||n)}function Pe(e,t={}){let n=t.executarMovimento||k,r=t.forcarExibicao||!1;if(!Ne()&&!r)return{elemento:null,destruir:()=>{}};let i=document.createElement(`div`);i.className=`joystick-direcional`,i.setAttribute(`role`,`region`),i.setAttribute(`aria-label`,`Controles de Movimento`);let a=[{direcao:p.CIMA,rotulo:`↑`,classe:`btn-cima`},{direcao:p.ESQUERDA,rotulo:`←`,classe:`btn-esquerda`},{direcao:p.DIREITA,rotulo:`→`,classe:`btn-direita`},{direcao:p.BAIXO,rotulo:`↓`,classe:`btn-baixo`}],o=[];a.forEach(({direcao:e,rotulo:r,classe:a})=>{let s=document.createElement(`button`);s.type=`button`,s.className=`btn-direcao ${a}`,s.textContent=r,s.setAttribute(`aria-label`,`Mover para ${e}`);function c(r){r&&(typeof r.preventDefault==`function`&&r.preventDefault(),typeof r.stopPropagation==`function`&&r.stopPropagation()),n(e,t.dependencias)}s.addEventListener(`pointerdown`,c),o.push({btn:s,acionar:c}),i.appendChild(s)}),e&&typeof e.appendChild==`function`&&e.appendChild(i);function s(){o.forEach(({btn:e,acionar:t})=>{e.removeEventListener(`pointerdown`,t)}),i.parentNode&&i.parentNode.removeChild(i)}return{elemento:i,destruir:s}}function Fe(e,t=[]){if(!e)return;e.innerHTML=``,e.className=`painel-ranking`;let n=document.createElement(`h2`);n.textContent=R(`ranking.titulo`),e.appendChild(n);let r=document.createElement(`table`);r.className=`tabela-ranking`;let i=document.createElement(`thead`),a=document.createElement(`tr`);[`ranking.pos`,`ranking.jogador`,`ranking.pontuacao`].forEach(e=>{let t=document.createElement(`th`);t.textContent=R(e),a.appendChild(t)}),i.appendChild(a),r.appendChild(i);let o=document.createElement(`tbody`);t.forEach(e=>{let t=document.createElement(`tr`);e.ehJogadorAtual&&t.classList.add(`linha-jogador-atual`);let n=document.createElement(`td`);n.textContent=R(`ranking.posicao`,{numero:e.posicao});let r=document.createElement(`td`);r.textContent=e.ehJogadorAtual?`${e.nomeJogador} ${R(`ranking.voce`)}`:e.nomeJogador;let i=document.createElement(`td`);i.textContent=String(e.pontuacao),t.append(n,r,i),o.appendChild(t)}),r.appendChild(o),e.appendChild(r)}function Ie(e,t=u,n=()=>{}){if(!e)return;e.innerHTML=``,e.className=`formulario-username`;let r=document.createElement(`label`);r.textContent=R(`username.rotulo`,{min:3,max:8}),r.setAttribute(`for`,`input-username`);let i=document.createElement(`input`);i.id=`input-username`,i.type=`text`,i.maxLength=8,i.value=t,i.placeholder=u,i.autocomplete=`off`;let a=document.createElement(`button`);a.type=`button`,a.textContent=R(`username.botao`);let o=document.createElement(`span`);o.className=`feedback-username`,o.setAttribute(`role`,`alert`);let s=()=>{let e=n(i.value);o.textContent=e||``,e&&i.focus()};a.addEventListener(`click`,s),i.addEventListener(`keydown`,e=>{e.stopPropagation(),e.key===`Enter`&&(e.preventDefault(),s())}),e.append(r,i,a,o),i.focus()}var V=null;function Le(){if(typeof document>`u`||document.getElementById(`estilos-nanofighter`))return;let e=document.createElement(`style`);e.id=`estilos-nanofighter`,e.textContent=`
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
  `,document.head.appendChild(e)}function Re(e,t,n={}){if(!e)return;Le();let r=e.querySelector(`.hud-container`);r||(r=document.createElement(`div`),e.insertBefore(r,e.firstChild)),Me(r,t);let i=e.querySelector(`.container-mapa`);i||(i=document.createElement(`div`),e.appendChild(i)),ge(i,t,n);let a=e.querySelector(`.painel-batalha`);a||(a=document.createElement(`div`),e.appendChild(a)),Ee(a,t,n);let o=e.querySelector(`.joystick-container-wrapper`);if(o||(o=document.createElement(`div`),o.className=`joystick-container-wrapper`,e.appendChild(o),V&&V.destruir(),V=Pe(o,n)),n.ranking){let t=e.querySelector(`.painel-ranking`);t||(t=document.createElement(`div`),e.appendChild(t)),renderizarRanking(t,n.ranking)}}function ze(e){if(typeof e!=`string`&&typeof e!=`number`)throw Error(`Valor de eficácia inválido: ${e}`);let t=String(e).trim().replace(`%`,``).replace(`,`,`.`),n=parseFloat(t);if(Number.isNaN(n)||n<0||n>100)throw Error(`Eficácia fora dos limites válidos [0, 100]: "${e}"`);let r=n>1?n/100:n;return Math.min(Math.max(r,0),1)}function Be(e){if(!e||typeof e!=`string`)throw Error(`Conteúdo CSV vazio ou inválido.`);let t=e.split(/\r?\n/).map(e=>e.trim()).filter(e=>e.length>0);if(t.length<2)throw Error(`O CSV deve conter ao menos a linha de cabeçalho e um registro.`);let n=t[0].split(`,`).map(e=>e.trim().toLowerCase()),r=n.findIndex(e=>e===`nomemedicamento`),i=n.findIndex(e=>e===`eficácia`||e===`eficacia`);if(r===-1||i===-1)throw Error(`Cabeçalho CSV inválido: esperado conter "nomeMedicamento,eficácia", recebido "${t[0]}"`);let a=[];for(let e=1;e<t.length;e++){let n=t[e].split(`,`).map(e=>e.trim());if(n.length<2)throw Error(`Linha inválida ${e+1} no CSV de medicamentos: "${t[e]}"`);let o=n[r],s=n[i];if(!o)throw Error(`Nome de medicamento ausente na linha ${e+1}.`);let c=ze(s);a.push({nome:o,eficacia:c})}return a}var H=null;async function Ve(e=l,t={}){if(H&&!t.forcarRecarga)return H;let n=t.fetch||globalThis.fetch;if(typeof n!=`function`)throw Error(`Ambiente sem suporte a fetch disponível.`);let r;try{r=await n(e)}catch(t){throw Error(`Erro de rede ao buscar o arquivo "${e}": ${t.message||t}`)}if(!r.ok)throw Error(`Falha HTTP ao carregar "${e}": ${r.status} ${r.statusText}`);let i=Be(await r.text());return H=i,i}var U=()=>Math.random(),W=Object.freeze([{nome:s.VIRUS,eficacia:o[s.VIRUS]},{nome:s.TERAPIA_FOTODINAMICA,eficacia:o[s.TERAPIA_FOTODINAMICA]},{nome:s.MEDICAMENTO_IA,eficacia:o[s.MEDICAMENTO_IA]}]);function He(e){let t=Math.max(1,Math.min(10,Number(e)||1)),n=c.NIVEL_1,r=c.NIVEL_10;return n+(t-1)/9*(r-n)}function Ue(e){let t=He(e),n=1-t;return{terapia:t,virus:n/2,ia:n/2}}function G(e,t){let n=t.toLowerCase();return e.find(e=>e.nome.toLowerCase().includes(n))||{nome:t,eficacia:o[t]||.5}}function K(e,t=W,n=U){let r=Ue(e),i=n(),a=G(t,s.TERAPIA_FOTODINAMICA),o=G(t,s.VIRUS),c=G(t,s.MEDICAMENTO_IA);return i<r.terapia?{...a}:i<r.terapia+r.virus?{...o}:{...c}}function We(e,t=W,n=U){return[K(e,t,n),K(e,t,n)]}function q(e={}){let t=e.ouvir||D,n=e.emitir||O,r=e.obterEstado||x,i=e.atualizarEstado||w,a=e.rng||U,o=e.medicamentos||W;function s(){let e=r();if(!e.confronto)return;let t=We(e.jogador?.nivelXp||1,o,a);i(e=>e.confronto?{...e,confronto:{...e.confronto,opcoes:t}}:e),n(T.MEDICAMENTO_SORTEADO,{opcoes:t})}let c=t(T.CONFRONTO_INICIADO,()=>{s()}),l=t(T.MEDICAMENTO_USADO,()=>{s()});return function(){c(),l()}}function Ge(e,t,n=U,i={}){if(!e||!e.confronto)return e;let a=i.emitir||O,o=+(Number(t)===1),s=(e.confronto.opcoes||[])[o];if(!s)return e;let c=e.confronto.bacteria,l=(e.confronto.turno||1)+1;if(n()<s.eficacia){let t=(e.bacteriasNoMapa||[]).filter(e=>e.id!==c.id),n={...e,bacteriasNoMapa:t,confronto:null};return a(T.MEDICAMENTO_USADO,{medicamento:{...s},sucesso:!0,bacteria:{...c}}),a(T.BACTERIA_DERROTADA,{bacteria:{...c}}),n}let u=c.cor,f=r[u]===void 0?1:r[u],p=e.jogador?.pv===void 0?10:e.jogador.pv,m=Math.max(0,p-f);a(T.JOGADOR_DANIFICADO,{dano:f,pv:m});let h=c.cor,g=d[h]||`vermelha`,_={...c,cor:g},v=(e.bacteriasNoMapa||[]).map(e=>e.id===c.id?_:e);h!==g&&a(T.BACTERIA_MUTADA,{bacteria:{..._},corAnterior:h,corNova:g});let ee={...e.confronto,bacteria:_,turno:l,opcoes:[]},te={...e,jogador:{...e.jogador,pv:m},bacteriasNoMapa:v,confronto:m===0?null:ee};return a(T.MEDICAMENTO_USADO,{medicamento:{...s},sucesso:!1,bacteria:{..._}}),m===0&&a(T.JOGO_ENCERRADO,{pontuacao:e.jogador?.pontuacao||0,fase:e.fase||1}),te}function Ke(e,t={}){let n=t.obterEstado||x,r=t.atualizarEstado||w,i=t.emitir||O,a=t.rng||U,o=n();if(!o.confronto)return null;let s=[],c=(e,t)=>{s.push([e,t])},l=Ge(o,e,a,{...t,emitir:c});return r(l),s.forEach(([e,t])=>i(e,t)),l}function qe(e={}){return(e.ouvir||D)(T.MEDICAMENTO_ESCOLHIDO,({indice:t})=>{Ke(t,e)})}function Je(n){let r=Number(n)||1;return r>=5?null:t?.[r]||e}function Ye(e,t){let n=[...e];for(let e=n.length-1;e>0;e--){let r=Math.floor(t()*(e+1));[n[e],n[r]]=[n[r],n[e]]}return n}function Xe(e={},t={x:0,y:0}){let n=e.largura,r=e.altura,i=[];for(let e=0;e<r;e++)for(let r=0;r<n;r++)t&&t.x===r&&t.y===e||i.push({x:r,y:e});return i}function Ze(e,t){if((t.verde||0)+(t.amarela||0)+(t.vermelha||0)>1.0001)return{verde:Math.round(t.verde||0),amarela:Math.round(t.amarela||0),vermelha:Math.round(t.vermelha||0)};let n=a[e]??10,r=Math.round(n*(t.amarela||0)),i=Math.round(n*(t.vermelha||0));return{verde:Math.max(0,n-r-i),amarela:r,vermelha:i}}function Qe(e={},t=U,n={x:0,y:0}){let r=Math.floor(t()*25)+1,i=Ye(Xe(e,n),t),a=Math.min(r,i.length),o=[];for(let e=0;e<a;e++){let n=t()<.6?`amarela`:`vermelha`;o.push({id:`bact-inf-${Date.now()}-${e+1}`,cor:n,posicao:i[e]})}return o}function $e(e,t={},n=U,r={x:0,y:0}){let i=Number(e)||1;if(i>=5)return Qe(t,n,r);let a=Ze(i,Je(i)),o=[];for(let e=0;e<a.verde;e++)o.push(`verde`);for(let e=0;e<a.amarela;e++)o.push(`amarela`);for(let e=0;e<a.vermelha;e++)o.push(`vermelha`);let s=Ye(Xe(t,r),n),c=[],l=Math.min(o.length,s.length);for(let e=0;e<l;e++)c.push({id:`bact-f${i}-${e+1}`,cor:o[e],posicao:s[e]});return c}function J(e,t={}){let n=t.obterEstado||x,r=t.atualizarEstado||w,i=t.rng||U,a=$e(e,t.dimensoes||{largura:10,altura:10},i,n().jogador?.posicao||{x:0,y:0});return r(e=>({...e,bacteriasNoMapa:a})),a}function et(e={}){let t=e.ouvir||D,n=e.obterEstado||x,r=t(T.FASE_INICIADA,({fase:t})=>{(e.atualizarEstado||w)(e=>({...e,jogador:{...e.jogador,posicao:{...f}},confronto:null})),J(t,e)}),i=t(T.BACTERIA_DERROTADA,()=>{let t=n();t.fase>=5&&(!t.bacteriasNoMapa||t.bacteriasNoMapa.length===0)&&J(t.fase,e)});return function(){r(),i()}}function tt(e){return n[e]===void 0?10:n[e]}function nt(e){return i[e]===void 0?2:i[e]}function rt(e,t){return 2*(Math.max(1,Number(e)||1)*nt(t))}function it(e){return Math.max(1,Number(e)||1)}function at(e,t,n={}){if(!e||!t)return e;let r=n.emitir||O,i=e.jogador||{},a=i.nivelXp||1,o=t.cor||`verde`,s=tt(o)*it(a),c=(i.pontuacao||0)+s,l=rt(a,o),u=(i.xp||0)+l;r(T.XP_GANHO,{xp:l});let d=a,f=i.pvMax===void 0?10:i.pvMax,p=i.pv===void 0?10:i.pv;for(;d<10;){let e=d+1,t=_[e];if(t!==void 0&&u>=t)d=e,f+=10,p+=10,r(T.NIVEL_XP_SUBIU,{nivel:d});else break}return{...e,jogador:{...i,pontuacao:c,xp:u,nivelXp:d,pv:p,pvMax:f}}}function ot(e,t={}){let n=t.obterEstado||x,r=t.atualizarEstado||w,i=at(n(),e,t);return r(i),i}function st(e={}){return(e.ouvir||D)(T.BACTERIA_DERROTADA,({bacteria:t})=>{ot(t,e)})}function ct(e){if(e==null)return{valido:!0,vazio:!0,username:u};let t=String(e).trim();return t.length===0?{valido:!0,vazio:!0,username:u}:t.length<3?{valido:!1,codigoErro:`minimo`,parametros:{min:3},erro:`Username deve possuir no mínimo 3 caracteres.`}:t.length>8?{valido:!1,codigoErro:`maximo`,parametros:{max:8},erro:`Username deve possuir no máximo 8 caracteres.`}:ee.test(t)?{valido:!0,vazio:!1,username:t}:{valido:!1,codigoErro:`caracteres`,parametros:{},erro:`Username deve conter apenas letras, números ou underline (_).`}}function lt(e){if(!e||typeof e!=`string`)throw Error(`Conteúdo CSV de ranking vazio ou inválido.`);let t=e.split(/\r?\n/).map(e=>e.trim()).filter(e=>e.length>0);if(t.length<2)throw Error(`O CSV de ranking deve conter ao menos a linha de cabeçalho e um registro.`);let n=t[0].split(`,`).map(e=>e.trim().toLowerCase()),r=n.findIndex(e=>e===`nomejogador`),i=n.findIndex(e=>e===`pontuacao`||e===`pontuação`);if(r===-1||i===-1)throw Error(`Cabeçalho CSV inválido: esperado conter "nomeJogador,pontuacao", recebido "${t[0]}"`);let a=[];for(let e=1;e<t.length;e++){let n=t[e].split(`,`).map(e=>e.trim());if(n.length<2)throw Error(`Linha inválida ${e+1} no CSV de ranking: "${t[e]}"`);let o=n[r],s=n[i];if(!o)throw Error(`Nome de jogador ausente na linha ${e+1}.`);let c=parseInt(s,10);if(Number.isNaN(c)||c<0)throw Error(`Pontuação inválida na linha ${e+1}: "${s}"`);a.push({nomeJogador:o,pontuacao:c})}return a}var Y=null;async function ut(e=v,t={}){if(Y&&!t.forcarRecarga)return Y;let n=t.fetch||globalThis.fetch;if(typeof n!=`function`)throw Error(`Ambiente sem suporte a fetch disponível.`);let r;try{r=await n(e)}catch(t){throw Error(`Erro de rede ao buscar o ranking "${e}": ${t.message||t}`)}if(!r.ok)throw Error(`Falha HTTP ao carregar "${e}": ${r.status} ${r.statusText}`);let i=lt(await r.text());return Y=i,i}function dt(e,t={},n=10){let r=ct(t.username||t.nomeJogador||``),i=r.valido?r.username:u,a=Math.max(0,Number(t.pontuacao)||0),o=(e||[]).filter(e=>e&&e.nomeJogador).map(e=>({nomeJogador:String(e.nomeJogador),pontuacao:Number(e.pontuacao)||0,ehJogadorAtual:!1})),s={nomeJogador:i,pontuacao:a,ehJogadorAtual:!0},c=[...o,s];return c.sort((e,t)=>t.pontuacao-e.pontuacao),c.slice(0,n).map((e,t)=>({posicao:t+1,nomeJogador:e.nomeJogador,pontuacao:e.pontuacao,ehJogadorAtual:e.ehJogadorAtual}))}function ft(e={}){if(e.storage!==void 0)return e.storage;try{if(typeof window<`u`&&window.sessionStorage)return window.sessionStorage}catch{}return null}function pt(e,t={}){try{let n=ft(t);if(!n)return!1;let r=t.chave||`nanofighter_pontuacoes`,i=[...mt(t),{username:e.username,pontuacao:Number(e.pontuacao)||0,timestamp:Date.now()}];return n.setItem(r,JSON.stringify(i)),!0}catch(e){return console.warn(`Aviso: falha ao salvar pontuação no sessionStorage:`,e.message||e),!1}}function mt(e={}){try{let t=ft(e);if(!t)return[];let n=e.chave||`nanofighter_pontuacoes`,r=t.getItem(n);if(!r)return[];let i=JSON.parse(r);return Array.isArray(i)?i:[]}catch(e){return console.warn(`Aviso: falha ao ler pontuações do sessionStorage:`,e.message||e),[]}}function ht(){let e=document.createElement(`div`);e.className=`seletor-idioma`;let t=document.createElement(`label`);t.htmlFor=`seletor-idioma`;let n=document.createElement(`select`);n.id=`seletor-idioma`,ve.forEach(({codigo:e,rotulo:t})=>{let r=document.createElement(`option`);r.value=e,r.textContent=t,n.appendChild(r)});let r=()=>{t.textContent=R(`idioma.rotulo`),n.value=be()};return n.addEventListener(`keydown`,e=>e.stopPropagation()),n.addEventListener(`change`,()=>{xe(n.value),n.blur()}),L(r),r(),e.append(t,n),e}var gt=[];ut().then(e=>{gt=e,console.info(`Jogadores simulados do ranking carregados:`,e.length)}).catch(e=>{console.warn(`Aviso: erro ao carregar simulados do ranking:`,e)}),document.body.appendChild(ht()),L(()=>{X(),Q&&xt()}),q({medicamentos:W}),qe(),Ae(),et(),st();var _t=x();_t.bacteriasNoMapa.length===0&&J(_t.fase||1),Ve().then(e=>{q({medicamentos:e}),console.info(`Medicamentos carregados do CSV com sucesso:`,e)}).catch(e=>{console.warn(`Aviso: usando medicamentos padrão de fallback devido a erro de carregamento:`,e)});var vt=document.getElementById(`app`);function X(){if(vt){let e=performance.now();Re(vt,x());let t=performance.now()-e;t>200&&console.warn(`[PERFORMANCE] Tempo de renderização excedeu 200ms: ${t.toFixed(2)}ms`)}}re(()=>X()),pe(window),D(T.CONFRONTO_INICIADO,e=>{console.info(`Confronto iniciado:`,e),X()}),D(T.MEDICAMENTO_SORTEADO,e=>{console.info(`Medicamentos sorteados:`,e),X()}),D(T.MEDICAMENTO_USADO,e=>{console.info(`Medicamento usado:`,e),X()}),D(T.BACTERIA_DERROTADA,e=>{console.info(`Bactéria derrotada:`,e),X()}),D(T.BACTERIA_MUTADA,e=>{console.info(`Bactéria mutada:`,e),X()}),D(T.JOGADOR_DANIFICADO,e=>{console.info(`Jogador danificado:`,e),X()}),D(T.JOGO_ENCERRADO,e=>{let t=x().jogador?.username||`player`;pt({username:t,pontuacao:e.pontuacao||0});let n=dt(gt,{username:t,pontuacao:e.pontuacao||0});X(),bt(n,t)});var Z=null;function yt(e){Z&&=(Z.remove(),null),ie({username:e}),J(1)}function bt(e,t){Z&&Z.remove(),Z=document.createElement(`div`),Z.className=`tela-fim-de-jogo`,Z.setAttribute(`role`,`dialog`),Z.setAttribute(`aria-modal`,`true`),Z.setAttribute(`aria-label`,`Fim de jogo`);let n=document.createElement(`h2`);n.textContent=`Fim de jogo`;let r=document.createElement(`div`);Fe(r,e);let i=document.createElement(`button`);i.type=`button`,i.className=`botao-jogar-novamente`,i.textContent=`Jogar novamente`,i.addEventListener(`click`,()=>yt(t)),Z.append(n,r,i),document.body.appendChild(Z),i.focus()}D(T.FASE_CONCLUIDA,e=>{console.info(`Fase concluída:`,e),X()}),D(T.FASE_INICIADA,e=>{console.info(`Fase iniciada:`,e),X()}),D(T.XP_GANHO,e=>{console.info(`XP ganho:`,e),X()}),D(T.NIVEL_XP_SUBIU,e=>{console.info(`Nível de XP subiu:`,e),X()}),X(),console.info(`Project NanoFighter - Etapa P2 carregada.`);var Q=null,$=``;function xt(){let e=Q?.querySelector(`input`)?.value;e!==void 0&&($=e),Q&&Q.remove(),Q=document.createElement(`div`),Q.className=`tela-usuario`,Q.setAttribute(`role`,`dialog`),Q.setAttribute(`aria-modal`,`true`),Q.setAttribute(`aria-label`,R(`username.titulo`));let t=document.createElement(`h2`);t.textContent=`NanoFighter`;let n=document.createElement(`div`);Ie(n,$,e=>{console.log(`[nome] clique, valor =`,JSON.stringify(e));let t=ct(e);if(console.log(`[nome] validação`,t),!t.valido)return R(`username.erro.${t.codigoErro}`,t.parametros);try{St(t.username)}catch(e){return console.error(`[nome] erro ao iniciar partida:`,e),`Erro ao iniciar: `+e.message}return Q.remove(),Q=null,$=``,null}),Q.append(t,n),document.body.appendChild(Q),n.querySelector(`input`)?.focus()}xt();function St(e){ie({username:e}),J(1)}