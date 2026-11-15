(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=Object.freeze({verde:9,amarela:1,vermelha:0}),t=Object.freeze({1:e,2:Object.freeze({verde:7,amarela:8,vermelha:0}),3:Object.freeze({verde:4,amarela:13,vermelha:3}),4:Object.freeze({verde:0,amarela:18,vermelha:7})}),n=Object.freeze({verde:10,amarela:15,vermelha:30}),r=Object.freeze({verde:1,amarela:2,vermelha:3}),i=Object.freeze({verde:2,amarela:3,vermelha:5}),a=Object.freeze({1:10,2:15,3:20,4:25,5:1/0}),o=Object.freeze({Vírus:.65,"Terapia Fotodinâmica":.99,"Medicamento com IA":.5}),s=Object.freeze({VIRUS:`Vírus`,TERAPIA_FOTODINAMICA:`Terapia Fotodinâmica`,MEDICAMENTO_IA:`Medicamento com IA`}),c=Object.freeze({NIVEL_1:.025,NIVEL_10:.5}),l=`../../public/data/medicamentos.csv`,u=`player`,d=Object.freeze({verde:`amarela`,amarela:`vermelha`,vermelha:`vermelha`}),f=Object.freeze({x:0,y:0}),p=Object.freeze({CIMA:`cima`,BAIXO:`baixo`,ESQUERDA:`esquerda`,DIREITA:`direita`}),m=Object.freeze({[p.CIMA]:Object.freeze({dx:0,dy:-1}),[p.BAIXO]:Object.freeze({dx:0,dy:1}),[p.ESQUERDA]:Object.freeze({dx:-1,dy:0}),[p.DIREITA]:Object.freeze({dx:1,dy:0})}),h=Object.freeze({KeyW:p.CIMA,KeyS:p.BAIXO,KeyA:p.ESQUERDA,KeyD:p.DIREITA,ArrowUp:p.CIMA,ArrowDown:p.BAIXO,ArrowLeft:p.ESQUERDA,ArrowRight:p.DIREITA}),g=Object.freeze({ESQUERDA:[`KeyA`,`ArrowLeft`],DIREITA:[`KeyD`,`ArrowRight`],CONFIRMAR:[`Enter`,`NumpadEnter`]}),_=Object.freeze({1:0,2:50,3:120,4:210,5:320,6:450,7:600,8:770,9:960,10:1200}),v=`../../public/data/pontuaçãoMockada.csv`,y=/^[a-zA-Z0-9_]{3,8}$/,ee=Object.freeze({verde:Object.freeze({escala:`horas`,bolinhas:1,rotulo:`Horas`}),amarela:Object.freeze({escala:`minutos`,bolinhas:2,rotulo:`Minutos`}),vermelha:Object.freeze({escala:`segundos`,bolinhas:3,rotulo:`Segundos`})});function b(e={}){let t=e.jogador||{};return{jogador:{username:t.username||e.username||`player`,pv:t.pv===void 0?10:t.pv,pvMax:t.pvMax===void 0?10:t.pvMax,nivelXp:t.nivelXp===void 0?1:t.nivelXp,xp:t.xp===void 0?0:t.xp,pontuacao:t.pontuacao===void 0?0:t.pontuacao,posicao:{...f,...e.posicao||{},...t.posicao||{}}},fase:e.fase||1,eliminadasNaFase:e.eliminadasNaFase||0,bacteriasNoMapa:e.bacteriasNoMapa?S(e.bacteriasNoMapa):[],confronto:e.confronto?S(e.confronto):null}}var x=b();function S(e){return typeof structuredClone==`function`?structuredClone(e):JSON.parse(JSON.stringify(e))}function C(){return S(x)}var w=new Set;function te(e){return w.add(e),()=>w.delete(e)}function T(){let e=C();w.forEach(t=>t(e))}function E(e){if(typeof e==`function`){let t=e(S(x));t&&typeof t==`object`&&(x=S(t))}else e&&typeof e==`object`&&(x={...x,...S(e),jogador:{...x.jogador,...e.jogador?S(e.jogador):{}}});return T(),C()}function D(e={}){return x=b(e),T(),C()}var O=Object.freeze({CONFRONTO_INICIADO:`confronto:iniciado`,MEDICAMENTO_SORTEADO:`medicamento:sorteado`,MEDICAMENTO_ESCOLHIDO:`medicamento:escolhido`,MEDICAMENTO_USADO:`medicamento:usado`,BACTERIA_MUTADA:`bacteria:mutada`,BACTERIA_DERROTADA:`bacteria:derrotada`,JOGADOR_DANIFICADO:`jogador:danificado`,XP_GANHO:`xp:ganho`,NIVEL_XP_SUBIU:`nivelXp:subiu`,FASE_INICIADA:`fase:iniciada`,FASE_CONCLUIDA:`fase:concluida`,JOGO_ENCERRADO:`jogo:encerrado`});function ne(){let e=new Map;function t(t,r){return e.has(t)||e.set(t,new Set),e.get(t).add(r),()=>n(t,r)}function n(t,n){let r=e.get(t);r&&(r.delete(n),r.size===0&&e.delete(t))}function r(t,n){let r=e.get(t);if(r)for(let e of Array.from(r))e(n)}function i(){e.clear()}return{ouvir:t,remover:n,emitir:r,limpar:i}}var k=ne(),A=k.ouvir;k.remover;var j=k.emitir;k.limpar;function re(e){if(typeof e==`object`&&e&&`dx`in e&&`dy`in e)return{dx:Math.sign(e.dx),dy:Math.sign(e.dy)};if(typeof e==`string`){let t=e.toLowerCase();if(t===`cima`||t===`w`||t===`arrowup`||t===`keyw`)return m[p.CIMA];if(t===`baixo`||t===`s`||t===`arrowdown`||t===`keys`)return m[p.BAIXO];if(t===`esquerda`||t===`a`||t===`arrowleft`||t===`keya`)return m[p.ESQUERDA];if(t===`direita`||t===`d`||t===`arrowright`||t===`keyd`)return m[p.DIREITA]}return null}function ie(e,t=10,n=10){return!e||typeof e.x!=`number`||typeof e.y!=`number`?!1:e.x>=0&&e.x<t&&e.y>=0&&e.y<n}function ae(e,t=[]){return!e||!Array.isArray(t)?null:t.find(t=>t&&t.posicao&&t.posicao.x===e.x&&t.posicao.y===e.y)||null}function oe(e,t,n={}){if(!e||e.confronto!==null&&e.confronto!==void 0)return e;let r=re(t);if(!r)return e;let i=e.jogador?.posicao||{x:0,y:0},a={x:i.x+r.dx,y:i.y+r.dy};if(!ie(a,n.largura===void 0?10:n.largura,n.altura===void 0?10:n.altura))return e;let o=ae(a,e.bacteriasNoMapa);return{...e,jogador:{...e.jogador,posicao:a},confronto:o?{bacteria:o,opcoes:[],turno:1,indiceSelecionado:0}:null}}function se(e,t={}){let n=t.obterEstado||C,r=t.atualizarEstado||E,i=t.emitir||j,a=n();if(a.jogador?.pv<=0||a.confronto!=null)return null;let o=oe(a,e,t.limites||{largura:10,altura:10});return o.jogador?.posicao?.x===a.jogador?.posicao?.x&&o.jogador?.posicao?.y===a.jogador?.posicao?.y?null:(r(o),o.confronto&&i(O.CONFRONTO_INICIADO,{bacteria:o.confronto.bacteria}),o)}function M(e){return+((e||C()).confronto?.indiceSelecionado===1)}function N(e,t={}){let n=t.obterEstado||C,r=t.atualizarEstado||E;if(!n().confronto)return 0;let i=+(e===1);return r(e=>e.confronto?{...e,confronto:{...e.confronto,indiceSelecionado:i}}:e),i}function ce(e,t={}){let n=typeof e==`string`?e.toLowerCase():``,r=0;return r=n===`direita`||n===`d`||n===`arrowright`||n===`keyd`?1:n===`esquerda`||n===`a`||n===`arrowleft`||n===`keya`?0:+(M(t.obterEstado?.()||C())===0),N(r,t)}function P(e,t={}){let n=t.emitir||j,r=+(Number(e)===1);N(r,t),n(O.MEDICAMENTO_ESCOLHIDO,{indice:r})}function le(e={}){let t=(e.obterEstado||C)();t.confronto&&P(M(t),e)}function ue(e,t={}){let n=t.obterEstado||C,r=t.executarMovimento||se,i=t.alternarIndiceSelecionado||ce,a=t.confirmarEscolhaMedicamento||le,o=n(),s=e,c=s.length===1?`Key${s.toUpperCase()}`:s;if(o&&o.confronto)return g.ESQUERDA.includes(c)||s.toLowerCase()===`a`?{acao:`selecionar_medicamento`,detalhe:{indice:i(`esquerda`,t)}}:g.DIREITA.includes(c)||s.toLowerCase()===`d`?{acao:`selecionar_medicamento`,detalhe:{indice:i(`direita`,t)}}:g.CONFIRMAR.includes(c)||s===`Enter`?(a(t),{acao:`confirmar_medicamento`}):null;let l=h[c]||h[s]||(s.toLowerCase()===`w`?`cima`:null)||(s.toLowerCase()===`s`?`baixo`:null)||(s.toLowerCase()===`a`?`esquerda`:null)||(s.toLowerCase()===`d`?`direita`:null);return l?{acao:`mover_mapa`,detalhe:{direcao:l,movido:r(l,t)!==null}}:null}function de(e,t={}){let n=e||(typeof window<`u`?window:null);if(!n)return()=>{};function r(e){ue(e.code||e.key,t)&&typeof e.preventDefault==`function`&&e.preventDefault()}return n.addEventListener(`keydown`,r),function(){n.removeEventListener(`keydown`,r)}}function F(e){let t=ee[e]||{escala:`horas`,bolinhas:1,rotulo:`Horas`},n=`●`.repeat(t.bolinhas),r=`Bactéria ${e}, escala ${t.escala}, ${t.bolinhas} ${t.bolinhas===1?`bolinha`:`bolinhas`}`;return{cor:e,escala:t.escala,bolinhas:t.bolinhas,textoBolinhas:n,rotuloAcessivel:r}}function fe(e){let t=F(e.cor),n=document.createElement(`div`);n.className=`marcador-bacteria bacteria-${t.cor}`,n.setAttribute(`role`,`img`),n.setAttribute(`aria-label`,t.rotuloAcessivel);let r=document.createElement(`span`);r.className=`bacteria-letra`,r.textContent=t.cor[0].toUpperCase();let i=document.createElement(`span`);return i.className=`bacteria-bolinhas`,i.setAttribute(`aria-hidden`,`true`),i.textContent=t.textoBolinhas,n.appendChild(r),n.appendChild(i),n}function pe(e,t,n={}){if(!e)return;let r=n.largura??10,i=n.altura??10;e.innerHTML=``,e.className=`container-mapa`;let a=document.createElement(`div`);a.className=`grade-mapa`,a.style.display=`grid`,a.style.gridTemplateColumns=`repeat(${r}, 1fr)`,a.style.gridTemplateRows=`repeat(${i}, 1fr)`;let o=t.jogador?.posicao||{x:0,y:0},s=t.bacteriasNoMapa||[];for(let e=0;e<i;e++)for(let t=0;t<r;t++){let n=document.createElement(`div`);n.className=`celula-grade`,n.dataset.x=String(t),n.dataset.y=String(e),o.x===t&&o.y===e&&(n.classList.add(`celula-jogador`),n.textContent=`P`,n.setAttribute(`aria-label`,`Jogador`));let r=s.find(n=>n.posicao.x===t&&n.posicao.y===e);if(r){n.classList.add(`celula-bacteria`,`bacteria-${r.cor}`);let e=fe(r);n.appendChild(e)}a.appendChild(n)}e.appendChild(a)}function me(e,t,n=!1){let r=e?.nome||`Medicamento ${t+1}`,i=typeof e?.eficacia==`number`?e.eficacia:.5,a=`${Math.round(i*100)}%`,o=t===0?`A`:`D`;return{nome:r,eficaciaPercentual:a,atalho:o,destacado:n,rotuloAcessivel:`${r}, eficácia de ${a}, atalho tecla ${o}. ${n?`Atualmente selecionado.`:``}`}}function he(e,t=[],n=0,r=()=>{}){e&&(e.innerHTML=``,e.className=`container-cartas-medicamento`,(t&&t.length===2?t:[{nome:`Opção 1`,eficacia:.5},{nome:`Opção 2`,eficacia:.5}]).forEach((t,i)=>{let a=me(t,i,i===n),o=document.createElement(`button`);o.type=`button`,o.className=`carta-medicamento ${a.destacado?`carta-destacada`:``}`,o.dataset.indice=String(i),o.setAttribute(`role`,`option`),o.setAttribute(`aria-selected`,String(a.destacado)),o.setAttribute(`aria-label`,a.rotuloAcessivel),o.innerHTML=`
      <div class="carta-titulo">${a.nome}</div>
      <div class="carta-eficacia">Eficácia: <strong>${a.eficaciaPercentual}</strong></div>
      <div class="carta-atalho" aria-hidden="true">[Teclar ${a.atalho}]</div>
    `,o.addEventListener(`click`,e=>{e.preventDefault(),r(i)}),o.addEventListener(`pointerdown`,e=>{e.pointerType===`touch`&&(e.preventDefault(),r(i))}),e.appendChild(o)}))}function ge(e,t,n={}){if(!e)return;let r=n.escolherMedicamento||P;if(!t.confronto){e.innerHTML=``,e.style.display=`none`;return}e.innerHTML=``,e.style.display=`block`,e.className=`painel-batalha`,e.setAttribute(`role`,`region`),e.setAttribute(`aria-label`,`Painel de Batalha`);let i=document.createElement(`div`);i.className=`batalha-cabecalho`;let a=t.confronto.bacteria,o=F(a.cor);i.innerHTML=`
    <h3>Batalha em Andamento</h3>
    <p>Alvo: <span class="bacteria-alvo ${a.cor}" aria-label="${o.rotuloAcessivel}">Bactéria ${a.cor} [${o.textoBolinhas} ${o.escala}]</span></p>
  `,e.appendChild(i);let s=t.confronto.resultado;if(s){let t=document.createElement(`p`);t.className=`batalha-resultado batalha-${s}`,t.setAttribute(`role`,`status`),t.textContent=s===`vitoria`?`Vitória! A bactéria foi eliminada.`:`Derrota! A bactéria sofreu mutação e você perdeu PV.`,e.appendChild(t);return}let c=document.createElement(`div`),l=M(t);he(c,t.confronto.opcoes,l,e=>r(e,n.dependencias)),e.appendChild(c)}function I(e){let t=Math.max(1,Number(e)||1);return t>=5?1/0:a[t]===void 0?10+5*(t-1):a[t]}function L(e){return(e||C())?.fase||1}function R(e){return typeof e==`number`?e>=5:L(e)>=5}function _e(e,t={}){if(!e)return e;let n=t.emitir||j,r=L(e),i=(e.eliminadasNaFase||0)+1,a=I(r);if(R(r))return{...e,eliminadasNaFase:i};if(i>=a){let t=r+1,i={...e,fase:t,eliminadasNaFase:0};return n(O.FASE_CONCLUIDA,{fase:r}),n(O.FASE_INICIADA,{fase:t}),i}return{...e,eliminadasNaFase:i}}function ve(e={}){let t=e.obterEstado||C,n=e.atualizarEstado||E,r=e.emitir||j,i=[],a=(e,t)=>i.push([e,t]),o=_e(t(),{...e,emitir:a});return n(o),i.forEach(([e,t])=>r(e,t)),o}function ye(e={}){return(e.ouvir||A)(O.BACTERIA_DERROTADA,()=>{ve(e)})}function be(e){let t=e?.jogador||{},n=e?.fase||1,r=e?.eliminadasNaFase||0,i=I(n),a=R(n),o=a?`Eliminadas: ${r} (Modo Infinito)`:`${r}/${i}`;return{pontuacao:t.pontuacao||0,xp:t.xp||0,nivelXp:t.nivelXp||1,pv:t.pv===void 0?10:t.pv,pvMax:t.pvMax===void 0?10:t.pvMax,fase:n,eliminadas:r,meta:i,textoProgresso:o,modoInfinito:a}}function xe(e,t){if(!e)return;let n=be(t);e.innerHTML=``,e.className=`hud-container`,e.setAttribute(`role`,`region`),e.setAttribute(`aria-label`,`Status do Jogo e do Jogador`);let r=document.createElement(`div`);r.className=`hud-item hud-pv`,r.setAttribute(`aria-label`,`Pontos de Vida: ${n.pv} de ${n.pvMax}`),r.innerHTML=`
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
  `,e.appendChild(r),e.appendChild(i),e.appendChild(a),e.appendChild(o)}function Se(){if(typeof window>`u`)return!1;let e=typeof window.matchMedia==`function`&&window.matchMedia(`(pointer: coarse)`).matches,t=`ontouchstart`in window,n=typeof navigator<`u`&&navigator.maxTouchPoints!==void 0&&navigator.maxTouchPoints>0;return!!(e||t||n)}function Ce(e,t={}){let n=t.executarMovimento||se,r=t.forcarExibicao||!1;if(!Se()&&!r)return{elemento:null,destruir:()=>{}};let i=document.createElement(`div`);i.className=`joystick-direcional`,i.setAttribute(`role`,`region`),i.setAttribute(`aria-label`,`Controles de Movimento`);let a=[{direcao:p.CIMA,rotulo:`↑`,classe:`btn-cima`},{direcao:p.ESQUERDA,rotulo:`←`,classe:`btn-esquerda`},{direcao:p.DIREITA,rotulo:`→`,classe:`btn-direita`},{direcao:p.BAIXO,rotulo:`↓`,classe:`btn-baixo`}],o=[];a.forEach(({direcao:e,rotulo:r,classe:a})=>{let s=document.createElement(`button`);s.type=`button`,s.className=`btn-direcao ${a}`,s.textContent=r,s.setAttribute(`aria-label`,`Mover para ${e}`);function c(r){r&&(typeof r.preventDefault==`function`&&r.preventDefault(),typeof r.stopPropagation==`function`&&r.stopPropagation()),n(e,t.dependencias)}s.addEventListener(`pointerdown`,c),o.push({btn:s,acionar:c}),i.appendChild(s)}),e&&typeof e.appendChild==`function`&&e.appendChild(i);function s(){o.forEach(({btn:e,acionar:t})=>{e.removeEventListener(`pointerdown`,t)}),i.parentNode&&i.parentNode.removeChild(i)}return{elemento:i,destruir:s}}function z(e){if(e==null)return{valido:!0,vazio:!0,username:u};let t=String(e).trim();return t.length===0?{valido:!0,vazio:!0,username:u}:t.length<3?{valido:!1,erro:`Username deve possuir no mínimo 3 caracteres.`}:t.length>8?{valido:!1,erro:`Username deve possuir no máximo 8 caracteres.`}:y.test(t)?{valido:!0,vazio:!1,username:t}:{valido:!1,erro:`Username deve conter apenas letras, números ou underline (_).`}}function we(e){let t=z(e);if(!t.valido)throw Error(t.erro||`Username inválido.`);return t.username||`player`}function Te(e,t=[]){if(!e)return;e.innerHTML=``,e.className=`painel-ranking`;let n=document.createElement(`h2`);n.textContent=`Top 10 - Ranking Geral`,e.appendChild(n);let r=document.createElement(`table`);r.className=`tabela-ranking`;let i=document.createElement(`thead`);i.innerHTML=`
    <tr>
      <th>Pos</th>
      <th>Jogador</th>
      <th>Pontuação</th>
    </tr>
  `,r.appendChild(i);let a=document.createElement(`tbody`);t.forEach(e=>{let t=document.createElement(`tr`);e.ehJogadorAtual&&t.classList.add(`linha-jogador-atual`);let n=document.createElement(`td`);n.textContent=`${e.posicao}º`;let r=document.createElement(`td`);r.textContent=e.nomeJogador,e.ehJogadorAtual&&(r.textContent+=` (Você)`);let i=document.createElement(`td`);i.textContent=String(e.pontuacao),t.appendChild(n),t.appendChild(r),t.appendChild(i),a.appendChild(t)}),r.appendChild(a),e.appendChild(r)}function Ee(e,t=`player`,n=()=>{}){if(!e)return;e.innerHTML=``,e.className=`formulario-username`;let r=document.createElement(`label`);r.textContent=`Seu Username (3 a 8 caracteres): `,r.setAttribute(`for`,`input-username`);let i=document.createElement(`input`);i.id=`input-username`,i.type=`text`,i.maxLength=8,i.value=t,i.placeholder=`player`,i.autocomplete=`off`;let a=document.createElement(`button`);a.type=`button`,a.textContent=`Jogar`;let o=document.createElement(`span`);o.className=`feedback-username`,o.setAttribute(`role`,`alert`);let s=()=>{let e=n(i.value);o.textContent=e||``,e&&i.focus()};a.addEventListener(`click`,s),i.addEventListener(`keydown`,e=>{e.stopPropagation(),e.key===`Enter`&&(e.preventDefault(),s())}),e.append(r,i,a,o),i.focus()}var B=null;function De(){if(typeof document>`u`||document.getElementById(`estilos-nanofighter`))return;let e=document.createElement(`style`);e.id=`estilos-nanofighter`,e.textContent=`
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
  `,document.head.appendChild(e)}function Oe(e,t,n={}){if(!e)return;De();let r=e.querySelector(`.hud-container`);r||(r=document.createElement(`div`),e.insertBefore(r,e.firstChild)),xe(r,t);let i=e.querySelector(`.container-mapa`);i||(i=document.createElement(`div`),e.appendChild(i)),pe(i,t,n);let a=e.querySelector(`.painel-batalha`);a||(a=document.createElement(`div`),e.appendChild(a)),ge(a,t,n);let o=e.querySelector(`.joystick-container-wrapper`);if(o||(o=document.createElement(`div`),o.className=`joystick-container-wrapper`,e.appendChild(o),B&&B.destruir(),B=Ce(o,n)),n.ranking){let t=e.querySelector(`.painel-ranking`);t||(t=document.createElement(`div`),e.appendChild(t)),renderizarRanking(t,n.ranking)}}function ke(e){if(typeof e!=`string`&&typeof e!=`number`)throw Error(`Valor de eficácia inválido: ${e}`);let t=String(e).trim().replace(`%`,``).replace(`,`,`.`),n=parseFloat(t);if(Number.isNaN(n)||n<0||n>100)throw Error(`Eficácia fora dos limites válidos [0, 100]: "${e}"`);let r=n>1?n/100:n;return Math.min(Math.max(r,0),1)}function Ae(e){if(!e||typeof e!=`string`)throw Error(`Conteúdo CSV vazio ou inválido.`);let t=e.split(/\r?\n/).map(e=>e.trim()).filter(e=>e.length>0);if(t.length<2)throw Error(`O CSV deve conter ao menos a linha de cabeçalho e um registro.`);let n=t[0].split(`,`).map(e=>e.trim().toLowerCase()),r=n.findIndex(e=>e===`nomemedicamento`),i=n.findIndex(e=>e===`eficácia`||e===`eficacia`);if(r===-1||i===-1)throw Error(`Cabeçalho CSV inválido: esperado conter "nomeMedicamento,eficácia", recebido "${t[0]}"`);let a=[];for(let e=1;e<t.length;e++){let n=t[e].split(`,`).map(e=>e.trim());if(n.length<2)throw Error(`Linha inválida ${e+1} no CSV de medicamentos: "${t[e]}"`);let o=n[r],s=n[i];if(!o)throw Error(`Nome de medicamento ausente na linha ${e+1}.`);let c=ke(s);a.push({nome:o,eficacia:c})}return a}var V=null;async function je(e=l,t={}){if(V&&!t.forcarRecarga)return V;let n=t.fetch||globalThis.fetch;if(typeof n!=`function`)throw Error(`Ambiente sem suporte a fetch disponível.`);let r;try{r=await n(e)}catch(t){throw Error(`Erro de rede ao buscar o arquivo "${e}": ${t.message||t}`)}if(!r.ok)throw Error(`Falha HTTP ao carregar "${e}": ${r.status} ${r.statusText}`);let i=Ae(await r.text());return V=i,i}var H=()=>Math.random(),U=Object.freeze([{nome:s.VIRUS,eficacia:o[s.VIRUS]},{nome:s.TERAPIA_FOTODINAMICA,eficacia:o[s.TERAPIA_FOTODINAMICA]},{nome:s.MEDICAMENTO_IA,eficacia:o[s.MEDICAMENTO_IA]}]);function Me(e){let t=Math.max(1,Math.min(10,Number(e)||1)),n=c.NIVEL_1,r=c.NIVEL_10;return n+(t-1)/9*(r-n)}function Ne(e){let t=Me(e),n=1-t;return{terapia:t,virus:n/2,ia:n/2}}function W(e,t){let n=t.toLowerCase();return e.find(e=>e.nome.toLowerCase().includes(n))||{nome:t,eficacia:o[t]||.5}}function G(e,t=U,n=H){let r=Ne(e),i=n(),a=W(t,s.TERAPIA_FOTODINAMICA),o=W(t,s.VIRUS),c=W(t,s.MEDICAMENTO_IA);return i<r.terapia?{...a}:i<r.terapia+r.virus?{...o}:{...c}}function Pe(e,t=U,n=H){return[G(e,t,n),G(e,t,n)]}function K(e={}){let t=e.ouvir||A,n=e.emitir||j,r=e.obterEstado||C,i=e.atualizarEstado||E,a=e.rng||H,o=e.medicamentos||U;function s(){let e=r();if(!e.confronto)return;let t=Pe(e.jogador?.nivelXp||1,o,a);i(e=>e.confronto?{...e,confronto:{...e.confronto,opcoes:t}}:e),n(O.MEDICAMENTO_SORTEADO,{opcoes:t})}let c=t(O.CONFRONTO_INICIADO,()=>{s()}),l=t(O.MEDICAMENTO_USADO,()=>{s()});return function(){c(),l()}}function Fe(e,t,n=H,i={}){if(!e||!e.confronto)return e;let a=i.emitir||j,o=+(Number(t)===1),s=(e.confronto.opcoes||[])[o];if(!s)return e;let c=e.confronto.bacteria,l=(e.confronto.turno||1)+1;if(n()<s.eficacia){let t=(e.bacteriasNoMapa||[]).filter(e=>e.id!==c.id),n={...e,bacteriasNoMapa:t,confronto:null};return a(O.MEDICAMENTO_USADO,{medicamento:{...s},sucesso:!0,bacteria:{...c}}),a(O.BACTERIA_DERROTADA,{bacteria:{...c}}),n}let u=c.cor,f=r[u]===void 0?1:r[u],p=e.jogador?.pv===void 0?10:e.jogador.pv,m=Math.max(0,p-f);a(O.JOGADOR_DANIFICADO,{dano:f,pv:m});let h=c.cor,g=d[h]||`vermelha`,_={...c,cor:g},v=(e.bacteriasNoMapa||[]).map(e=>e.id===c.id?_:e);h!==g&&a(O.BACTERIA_MUTADA,{bacteria:{..._},corAnterior:h,corNova:g});let y={...e.confronto,bacteria:_,turno:l,opcoes:[]},ee={...e,jogador:{...e.jogador,pv:m},bacteriasNoMapa:v,confronto:m===0?null:y};return a(O.MEDICAMENTO_USADO,{medicamento:{...s},sucesso:!1,bacteria:{..._}}),m===0&&a(O.JOGO_ENCERRADO,{pontuacao:e.jogador?.pontuacao||0,fase:e.fase||1}),ee}function Ie(e,t={}){let n=t.obterEstado||C,r=t.atualizarEstado||E,i=t.emitir||j,a=t.rng||H,o=n();if(!o.confronto)return null;let s=[],c=(e,t)=>{s.push([e,t])},l=Fe(o,e,a,{...t,emitir:c});return r(l),s.forEach(([e,t])=>i(e,t)),l}function Le(e={}){return(e.ouvir||A)(O.MEDICAMENTO_ESCOLHIDO,({indice:t})=>{Ie(t,e)})}function Re(n){let r=Number(n)||1;return r>=5?null:t?.[r]||e}function q(e,t){let n=[...e];for(let e=n.length-1;e>0;e--){let r=Math.floor(t()*(e+1));[n[e],n[r]]=[n[r],n[e]]}return n}function J(e={},t={x:0,y:0}){let n=e.largura,r=e.altura,i=[];for(let e=0;e<r;e++)for(let r=0;r<n;r++)t&&t.x===r&&t.y===e||i.push({x:r,y:e});return i}function ze(e,t){if((t.verde||0)+(t.amarela||0)+(t.vermelha||0)>1.0001)return{verde:Math.round(t.verde||0),amarela:Math.round(t.amarela||0),vermelha:Math.round(t.vermelha||0)};let n=a[e]??10,r=Math.round(n*(t.amarela||0)),i=Math.round(n*(t.vermelha||0));return{verde:Math.max(0,n-r-i),amarela:r,vermelha:i}}function Be(e={},t=H,n={x:0,y:0}){let r=Math.floor(t()*25)+1,i=q(J(e,n),t),a=Math.min(r,i.length),o=[];for(let e=0;e<a;e++){let n=t()<.6?`amarela`:`vermelha`;o.push({id:`bact-inf-${Date.now()}-${e+1}`,cor:n,posicao:i[e]})}return o}function Ve(e,t={},n=H,r={x:0,y:0}){let i=Number(e)||1;if(i>=5)return Be(t,n,r);let a=ze(i,Re(i)),o=[];for(let e=0;e<a.verde;e++)o.push(`verde`);for(let e=0;e<a.amarela;e++)o.push(`amarela`);for(let e=0;e<a.vermelha;e++)o.push(`vermelha`);let s=q(J(t,r),n),c=[],l=Math.min(o.length,s.length);for(let e=0;e<l;e++)c.push({id:`bact-f${i}-${e+1}`,cor:o[e],posicao:s[e]});return c}function Y(e,t={}){let n=t.obterEstado||C,r=t.atualizarEstado||E,i=t.rng||H,a=Ve(e,t.dimensoes||{largura:10,altura:10},i,n().jogador?.posicao||{x:0,y:0});return r(e=>({...e,bacteriasNoMapa:a})),a}function He(e={}){let t=e.ouvir||A,n=e.obterEstado||C,r=t(O.FASE_INICIADA,({fase:t})=>{(e.atualizarEstado||E)(e=>({...e,jogador:{...e.jogador,posicao:{...f}},confronto:null})),Y(t,e)}),i=t(O.BACTERIA_DERROTADA,()=>{let t=n();t.fase>=5&&(!t.bacteriasNoMapa||t.bacteriasNoMapa.length===0)&&Y(t.fase,e)});return function(){r(),i()}}function Ue(e){return n[e]===void 0?10:n[e]}function We(e){return i[e]===void 0?2:i[e]}function Ge(e,t){return 2*(Math.max(1,Number(e)||1)*We(t))}function Ke(e){return Math.max(1,Number(e)||1)}function qe(e,t,n={}){if(!e||!t)return e;let r=n.emitir||j,i=e.jogador||{},a=i.nivelXp||1,o=t.cor||`verde`,s=Ue(o)*Ke(a),c=(i.pontuacao||0)+s,l=Ge(a,o),u=(i.xp||0)+l;r(O.XP_GANHO,{xp:l});let d=a,f=i.pvMax===void 0?10:i.pvMax,p=i.pv===void 0?10:i.pv;for(;d<10;){let e=d+1,t=_[e];if(t!==void 0&&u>=t)d=e,f+=10,p+=10,r(O.NIVEL_XP_SUBIU,{nivel:d});else break}return{...e,jogador:{...i,pontuacao:c,xp:u,nivelXp:d,pv:p,pvMax:f}}}function Je(e,t={}){let n=t.obterEstado||C,r=t.atualizarEstado||E,i=qe(n(),e,t);return r(i),i}function Ye(e={}){return(e.ouvir||A)(O.BACTERIA_DERROTADA,({bacteria:t})=>{Je(t,e)})}function Xe(e){if(!e||typeof e!=`string`)throw Error(`Conteúdo CSV de ranking vazio ou inválido.`);let t=e.split(/\r?\n/).map(e=>e.trim()).filter(e=>e.length>0);if(t.length<2)throw Error(`O CSV de ranking deve conter ao menos a linha de cabeçalho e um registro.`);let n=t[0].split(`,`).map(e=>e.trim().toLowerCase()),r=n.findIndex(e=>e===`nomejogador`),i=n.findIndex(e=>e===`pontuacao`||e===`pontuação`);if(r===-1||i===-1)throw Error(`Cabeçalho CSV inválido: esperado conter "nomeJogador,pontuacao", recebido "${t[0]}"`);let a=[];for(let e=1;e<t.length;e++){let n=t[e].split(`,`).map(e=>e.trim());if(n.length<2)throw Error(`Linha inválida ${e+1} no CSV de ranking: "${t[e]}"`);let o=n[r],s=n[i];if(!o)throw Error(`Nome de jogador ausente na linha ${e+1}.`);let c=parseInt(s,10);if(Number.isNaN(c)||c<0)throw Error(`Pontuação inválida na linha ${e+1}: "${s}"`);a.push({nomeJogador:o,pontuacao:c})}return a}var X=null;async function Ze(e=v,t={}){if(X&&!t.forcarRecarga)return X;let n=t.fetch||globalThis.fetch;if(typeof n!=`function`)throw Error(`Ambiente sem suporte a fetch disponível.`);let r;try{r=await n(e)}catch(t){throw Error(`Erro de rede ao buscar o ranking "${e}": ${t.message||t}`)}if(!r.ok)throw Error(`Falha HTTP ao carregar "${e}": ${r.status} ${r.statusText}`);let i=Xe(await r.text());return X=i,i}function Qe(e=[],t={},n=10){let r=we(t.username||t.nomeJogador||``),i=Math.max(0,Number(t.pontuacao)||0),a=e.map(e=>({nomeJogador:e.nomeJogador,pontuacao:Number(e.pontuacao)||0,ehJogadorAtual:!1})),o={nomeJogador:r,pontuacao:i,ehJogadorAtual:!0},s=[...a,o];return s.sort((e,t)=>t.pontuacao-e.pontuacao),s.slice(0,n).map((e,t)=>({posicao:t+1,nomeJogador:e.nomeJogador,pontuacao:e.pontuacao,ehJogadorAtual:e.ehJogadorAtual}))}function $e(e={}){if(e.storage!==void 0)return e.storage;try{if(typeof window<`u`&&window.sessionStorage)return window.sessionStorage}catch{}return null}function et(e,t={}){try{let n=$e(t);if(!n)return!1;let r=t.chave||`nanofighter_pontuacoes`,i=[...tt(t),{username:e.username,pontuacao:Number(e.pontuacao)||0,timestamp:Date.now()}];return n.setItem(r,JSON.stringify(i)),!0}catch(e){return console.warn(`Aviso: falha ao salvar pontuação no sessionStorage:`,e.message||e),!1}}function tt(e={}){try{let t=$e(e);if(!t)return[];let n=e.chave||`nanofighter_pontuacoes`,r=t.getItem(n);if(!r)return[];let i=JSON.parse(r);return Array.isArray(i)?i:[]}catch(e){return console.warn(`Aviso: falha ao ler pontuações do sessionStorage:`,e.message||e),[]}}var nt=[];Ze().then(e=>{nt=e,console.info(`Jogadores simulados do ranking carregados:`,e.length)}).catch(e=>{console.warn(`Aviso: erro ao carregar simulados do ranking:`,e)}),K({medicamentos:U}),Le(),ye(),He(),Ye();var rt=C();rt.bacteriasNoMapa.length===0&&Y(rt.fase||1),je().then(e=>{K({medicamentos:e}),console.info(`Medicamentos carregados do CSV com sucesso:`,e)}).catch(e=>{console.warn(`Aviso: usando medicamentos padrão de fallback devido a erro de carregamento:`,e)});var it=document.getElementById(`app`);function Z(){if(it){let e=performance.now();Oe(it,C());let t=performance.now()-e;t>200&&console.warn(`[PERFORMANCE] Tempo de renderização excedeu 200ms: ${t.toFixed(2)}ms`)}}te(()=>Z()),de(window),A(O.CONFRONTO_INICIADO,e=>{console.info(`Confronto iniciado:`,e),Z()}),A(O.MEDICAMENTO_SORTEADO,e=>{console.info(`Medicamentos sorteados:`,e),Z()}),A(O.MEDICAMENTO_USADO,e=>{console.info(`Medicamento usado:`,e),Z()}),A(O.BACTERIA_DERROTADA,e=>{console.info(`Bactéria derrotada:`,e),Z()}),A(O.BACTERIA_MUTADA,e=>{console.info(`Bactéria mutada:`,e),Z()}),A(O.JOGADOR_DANIFICADO,e=>{console.info(`Jogador danificado:`,e),Z()}),A(O.JOGO_ENCERRADO,e=>{let t=C().jogador?.username||`player`;et({username:t,pontuacao:e.pontuacao||0});let n=Qe(nt,{username:t,pontuacao:e.pontuacao||0});Z(),ot(n,t)});var Q=null;function at(e){Q&&=(Q.remove(),null),D({username:e}),Y(1)}function ot(e,t){Q&&Q.remove(),Q=document.createElement(`div`),Q.className=`tela-fim-de-jogo`,Q.setAttribute(`role`,`dialog`),Q.setAttribute(`aria-modal`,`true`),Q.setAttribute(`aria-label`,`Fim de jogo`);let n=document.createElement(`h2`);n.textContent=`Fim de jogo`;let r=document.createElement(`div`);Te(r,e);let i=document.createElement(`button`);i.type=`button`,i.className=`botao-jogar-novamente`,i.textContent=`Jogar novamente`,i.addEventListener(`click`,()=>at(t)),Q.append(n,r,i),document.body.appendChild(Q),i.focus()}A(O.FASE_CONCLUIDA,e=>{console.info(`Fase concluída:`,e),Z()}),A(O.FASE_INICIADA,e=>{console.info(`Fase iniciada:`,e),Z()}),A(O.XP_GANHO,e=>{console.info(`XP ganho:`,e),Z()}),A(O.NIVEL_XP_SUBIU,e=>{console.info(`Nível de XP subiu:`,e),Z()}),Z(),console.info(`Project NanoFighter - Etapa P2 carregada.`);var $=null;function st(){$&&$.remove(),$=document.createElement(`div`),$.className=`tela-usuario`,$.setAttribute(`role`,`dialog`),$.setAttribute(`aria-modal`,`true`),$.setAttribute(`aria-label`,`Escolha seu nome de usuário`);let e=document.createElement(`h2`);e.textContent=`NanoFighter`;let t=document.createElement(`div`);Ee(t,u,e=>{let t=z(e);return t.valido?($.remove(),$=null,ct(t.username),null):t.erro}),$.append(e,t),document.body.appendChild($),t.querySelector(`input`)?.focus()}st();function ct(e){D({username:e}),Y(1)}