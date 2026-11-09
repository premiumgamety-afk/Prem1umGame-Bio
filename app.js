/* ============================================================
   Общий код сайта-портфолио (ядро).  Версия 1.0
   Подключается так:
     <link rel="stylesheet" href="https://ТВОЙ-САЙТ/style.css">
     <script src="config.js"></script>
     <script src="https://ТВОЙ-САЙТ/app.js"></script>
   Всё личное (ник, ссылки, проекты, навыки) лежит в config.js.
   ============================================================ */
(function(){
'use strict';
var CORE_VERSION='1.2';
var BASE=(document.currentScript&&document.currentScript.src||'').replace(/[^\/]*$/,'');

function fail(msg){
  var d=document.createElement('div');
  d.style.cssText='position:fixed;left:0;top:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;padding:24px;color:#f3f0ec;font:16px/1.6 sans-serif;text-align:center;z-index:99999;background:#0a0a0a';
  d.textContent=msg;(document.body||document.documentElement).appendChild(d);
}

function run(){
var C=window.SITE;
if(!C){fail('Не загрузился config.js. Проверь, что файл лежит рядом с index.html, называется именно config.js и подключён до app.js.');return;}

function E(x){return String(x==null?'':x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
var A=C.about||{},M=C.music||{},D=C.discord||{},SV=C.server||{},K=C.skills||{},F=C.footer||{};
K.backend=K.backend||{};K.frontend=K.frontend||{};
M.title=M.title||'';M.artist=M.artist||'';

/* ---------- страница ---------- */
document.documentElement.lang=C.lang||'ru';
if(C.title)document.title=C.title;
if(C.favicon&&!document.querySelector('link[rel~="icon"]')){var ic=document.createElement('link');ic.rel='icon';ic.href=C.favicon;document.head.appendChild(ic)}

var TAGS={owner:"<div class=\"tag\"><u><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M7 3h10v2h3v3a4 4 0 0 1-4 4 5 5 0 0 1-3 2.900V18h3v3H8v-3h3v-3.100A5 5 0 0 1 8 12a4 4 0 0 1-4-4V5h3zM6 7a2 2 0 0 0 1 1.700V7zm12 0h-1v1.700A2 2 0 0 0 18 7z\"/></svg></u>Владелец</div>",design:"<div class=\"tag\"><u><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M4 3h7v10a5 5 0 0 1-10 0V6zm10 6h7v9a3 3 0 0 1-3 3h-4zm0-6h7v4h-7z\"/></svg></u>Дизайн</div>",coder:"<div class=\"tag\"><u>&lt;/&gt;</u>Кодер</div>"};
var CUSTOM_TAGS={'co-owner':{label:'Совладелец',icon:'owner'}};
for(var ck in (C.customTags||{}))CUSTOM_TAGS[ck]=C.customTags[ck];
function tagHTML(t){
  var c=CUSTOM_TAGS[t];
  if(c){var base=TAGS[c.icon]||TAGS.owner;return base.replace(/(<\/u>)[^<]*(<\/div>)/,function(m,a,b){return a+E(c.label||t)+b})}
  return TAGS[t]||'<div class="tag"><u>&#9733;</u>'+E(t)+'</div>';
}
var projects=(C.projects||[]).map(function(p){
  return '<a class="projlink" href="'+E(p.url)+'" target="_blank" rel="noopener"><div class="card proj" style="--c:'+E(p.color||'#ff9af5')+'"><div class="head"><img class="pl" src="'+E(p.icon)+'" alt=""><h3>'+E(p.name)+'</h3></div><div class="dom">'+E(p.domain)+'<small>'+E(p.tld)+'</small></div><div class="tags">'+(p.tags||[]).map(tagHTML).join('')+'</div></div></a>\n  ';
}).join('');

document.body.insertAdjacentHTML('afterbegin',`
<audio id="au" preload="metadata" src="${E(M.src)}"></audio>
<div id="music"><div class="modal" role="dialog" aria-labelledby="mt">
  <h2 id="mt">Включить музыку?</h2>
  <button class="btn yes" id="yes"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z"/></svg>Включить</button>
  <button class="btn" id="no"><svg width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#d8d4cf"/><path d="M8 8l8 8M16 8l-8 8" stroke="#111" stroke-width="2.4" stroke-linecap="round"/></svg>Не сейчас</button>
</div></div>

<header>
  <div class="logo"><svg width="38" height="38" viewBox="0 0 24 24" fill="#ff9af5"><path d="M12 1.5l2.9 7 7.6.6-5.8 4.9 1.8 7.4L12 17.4l-6.5 4 1.8-7.4L1.5 9.1l7.6-.6z"/></svg>${E(C.logo)}</div>
  <div class="pill"><svg width="26" height="26" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#d8d4cf"/><path d="M12 6v6l4 2.5" stroke="#111" stroke-width="2" fill="none" stroke-linecap="round"/></svg><span id="clock">00:00</span></div>
</header>

<main>
<div class="grid wrap-bg"><section id="hero">
  <h1>Привет, я <span class="hl-peach">${E(C.nick)}</span>, <span class="hl-pink">${E(C.role)}</span> разработчик.</h1>
  <div class="bubble">${E(C.hero)}</div>
  <div class="btns">
    <a class="btn" href="${E(C.telegram)}" target="_blank" rel="noopener"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 3.2L2.6 10.6c-.9.4-.9 1.1-.2 1.3l4.8 1.5 1.9 5.7c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8L22.9 4.4c.3-1.2-.4-1.7-1.4-1.2zM9 13.2l9.600-6c.5-.3.9-.1.5.2l-7.900 7.100-.3 3.300z"/></svg>Связаться со мной</a>
    <a class="btn" href="#projects"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 6.500v11L12 22l9-4.500v-11zM12 4.200l6 3L12 10 6 7.200zM5 8.900l6 2.900v7.800l-6-3zm8 10.700v-7.800l6-2.900v7.700z"/></svg>Мои работы</a>
    <a class="btn" href="#skills"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12a2 2 0 0 1 2 2v18l-8-5-8 5V4a2 2 0 0 1 2-2z"/></svg>Навыки</a>
  </div>
</section></div>

<div class="dots wrap-bg"><section id="about">
  <div class="title"><div class="avatar"><img src="${E(A.avatar)}" alt=""></div><h2>Немного о <em style="color:var(--lime)">себе</em>.</h2></div>
  <p class="lead">${E(A.intro)}</p>
  <p class="lead">${E(A.text)}</p>
  <div class="socials">
    <a class="btn" href="${E(C.telegram)}" target="_blank" rel="noopener"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 3.2L2.6 10.6c-.9.4-.9 1.1-.2 1.3l4.8 1.5 1.9 5.7c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8L22.9 4.4c.3-1.2-.4-1.7-1.4-1.2z"/></svg>Telegram</a>
    <a class="btn" href="#discord"><svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M19.5 5.3A16 16 0 0 0 15.5 4l-.5 1a15 15 0 0 0-4 0L10.5 4a16 16 0 0 0-4 1.3C4 9 3.3 12.6 3.6 16.2a16 16 0 0 0 4.9 2.5l1-1.6c-.6-.2-1.100-.5-1.600-.9l.4-.3a11.500 11.500 0 0 0 9.400 0l.4.3c-.5.4-1 .7-1.600.9l1 1.600a16 16 0 0 0 4.900-2.500c.4-4.200-.7-7.800-2.900-10.900zM9.200 14c-.9 0-1.600-.8-1.600-1.800s.7-1.800 1.600-1.800 1.600.8 1.600 1.800-.7 1.800-1.600 1.800zm5.600 0c-.9 0-1.600-.8-1.600-1.800s.7-1.800 1.600-1.800 1.600.8 1.600 1.800-.7 1.800-1.600 1.800z"/></svg>Discord</a>
  </div>

  <div class="card">
    <div class="row"><span><i class="dot" style="background:#4ade5a;color:#4ade5a"></i><span id="online" style="font-size:1.5rem">? онлайн</span></span><span class="muted">пик: <span id="peak">1</span></span></div>
    <svg id="chart" viewBox="0 0 400 190" preserveAspectRatio="none"></svg>
    <div class="xl" id="xl"></div>
    <div class="srv">${E(SV.display||SV.host)}</div>
  </div>

  <div class="card">
    <div class="player"><img class="cover" src="${E(M.cover)}" alt=""><div><h3 id="tn">${E(M.title)}</h3><p class="muted" style="font-size:1.4rem" id="ta">${E(M.artist)}</p></div></div>
    <div class="ctrl">
      <button id="prev" aria-label="Назад"><svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h2v14H6zM20 5.500v13a1 1 0 0 1-1.600.8l-9-6.500a1 1 0 0 1 0-1.600l9-6.500A1 1 0 0 1 20 5.500z"/></svg></button>
      <button class="play" id="play" aria-label="Играть"><svg id="pi" width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.500v15a1 1 0 0 0 1.500.9l12-7.500a1 1 0 0 0 0-1.800l-12-7.500A1 1 0 0 0 7 4.500z"/></svg></button>
      <button id="next" aria-label="Вперёд"><svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M16 5h2v14h-2zM4 5.500v13a1 1 0 0 0 1.600.8l9-6.500a1 1 0 0 0 0-1.600l-9-6.500A1 1 0 0 0 4 5.500z"/></svg></button>
    </div>
    <div class="prog"><span id="cur">0:00</span><div class="bar" id="bar"><i id="fill"></i><b id="knob"></b></div><span id="dur">0:00</span></div>
  </div>

  <div class="card" id="discord" style="min-height:420px">
    <div class="row"><span style="display:flex;align-items:center;gap:16px;font-size:1.6rem;font-weight:500"><svg width="40" height="40" viewBox="0 0 24 24" fill="#7b86ff"><path d="M19.5 5.3A16 16 0 0 0 15.5 4l-.5 1a15 15 0 0 0-4 0L10.5 4a16 16 0 0 0-4 1.3C4 9 3.3 12.6 3.6 16.2a16 16 0 0 0 4.900 2.500l1-1.600c-.6-.2-1.100-.5-1.600-.9l.4-.3a11.500 11.500 0 0 0 9.400 0l.4.300c-.5.400-1 .700-1.600.900l1 1.600a16 16 0 0 0 4.900-2.500c.4-4.200-.7-7.800-2.900-10.900z"/></svg>Discord</span><span class="muted" style="font-size:1.2rem"><i class="dot" id="st" style="background:#6b6b6b;color:#6b6b6b"></i><span id="stt">Загрузка</span></span></div>
    <div class="dc"><div class="avatar"><img id="dimg" src="${E(D.avatar||A.avatar)}" alt=""></div><div><h3 id="dn" style="font-size:2rem;font-weight:500">${E(D.name)}</h3><p class="muted" style="font-size:1.4rem" id="du">${E(D.username)}</p><button class="copy" id="cp"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 2h10a2 2 0 0 1 2 2v12h-2V4H8zM4 6h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/></svg><span id="cpt">ID не указан</span></button></div></div>
    <p class="muted" style="text-align:center;font-size:1.3rem;margin-top:70px" id="act">Сейчас ничем не занят</p>
  </div>
</section></div>

<div class="grid wrap-bg"><section id="projects">
  <div class="title"><div class="ticon"><svg width="34" height="34" viewBox="0 0 24 24" fill="#d8d4cf"><path d="M12 2L3 6.500v11L12 22l9-4.500v-11zM12 4.200l6 3L12 10 6 7.200zM5 8.900l6 2.900v7.800l-6-3zm8 10.700v-7.800l6-2.900v7.700z"/></svg></div><h2>Мои <em style="color:#ffa99b">проекты</em>.</h2></div>
  <p class="lead">${E(C.projectsIntro)}</p>
  ${projects}
</section></div>

<div class="dots wrap-bg"><section id="skills">
  <div class="title"><div class="ticon"><svg width="30" height="30" viewBox="0 0 24 24" fill="#d8d4cf"><path d="M6 2h12a2 2 0 0 1 2 2v18l-8-5-8 5V4a2 2 0 0 1 2-2z"/></svg></div><h2>Мои <em style="color:var(--cyan)">навыки</em>.</h2></div>
  <p class="lead">${E(K.intro)}</p>

  <div class="sub"><div class="ticon" style="background:#1b1722;color:#a99bff;font-size:1.3rem">&lt;/&gt;</div><h3><em style="color:var(--pink)">Backend</em> разработка.</h3></div>
  <p class="muted" style="font-size:1.1rem">${E(K.backend.text)}</p>
  <div class="chips" id="back"></div>

  <div class="sub"><div class="ticon" style="background:#16251a;border-color:#2a4a30;color:#7ee08a;font-size:1.3rem">&lt;/&gt;</div><h3><em style="color:var(--green)">Frontend</em> разработка.</h3></div>
  <p class="muted" style="font-size:1.1rem">${E(K.frontend.text)}</p>
  <div class="chips" id="front"></div>
</section></div>
</main>

<footer><div class="logo"><svg width="40" height="40" viewBox="0 0 24 24" fill="#ff9af5"><path d="M12 1.500l2.900 7 7.600.6-5.800 4.900 1.800 7.400L12 17.400l-6.500 4 1.800-7.400L1.500 9.100l7.600-.6z"/></svg>${E(F.logo)}</div><p>${E(F.note)}</p></footer>

<nav>
  <a href="#about" data-s="about"><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="7" r="4.500"/><path d="M3.500 21c.3-4.500 3.500-7 8.500-7s8.200 2.500 8.500 7z"/></svg>Обо мне</a>
  <a href="#projects" data-s="projects"><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 6.500v11L12 22l9-4.500v-11z"/></svg>Проекты</a>
  <a href="#skills" data-s="skills"><svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h12a2 2 0 0 1 2 2v18l-8-5-8 5V4a2 2 0 0 1 2-2z"/></svg>Навыки</a>
</nav>
<div class="touch-glow" id="touchGlow"></div>
`);

/* ---------- логика ---------- */
(function(){
var $=function(i){return document.getElementById(i)};
function hm(ms){var d=new Date(ms);return String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')}
// clock
function tick(){$('clock').textContent=hm(Date.now())}
tick();setInterval(tick,10000);
// chips
function chips(id,list){$(id).innerHTML=(list||[]).map(function(c){var u=/[\/.]/.test(c[1])?c[1]:BASE+'assets/'+c[1]+'.svg';return '<div class="chip"><img src="'+E(u)+'" alt="">'+E(c[0])+'</div>'}).join('')}
chips('back',K.backend.chips);
chips('front',K.frontend.chips);

// ---- реальный онлайн сервера (Minecraft Java) ----
var HOST=SV.host,KEY='srv-hist-v1',DAY=864e5;
function load(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return []}}
function save(a){try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}}
function getStatus(){
 return fetch('https://api.mcstatus.io/v2/status/java/'+HOST).then(function(r){return r.json()}).then(function(j){
  if(j&&j.online===true)return {on:true,n:(j.players&&j.players.online)||0,max:(j.players&&j.players.max)||0};
  if(j&&j.online===false)return {on:false,n:0,max:0};
  throw new Error('bad');
 }).catch(function(){
  return fetch('https://api.mcsrvstat.us/3/'+HOST).then(function(r){return r.json()}).then(function(j){
   return j&&j.online?{on:true,n:(j.players&&j.players.online)||0,max:(j.players&&j.players.max)||0}:{on:false,n:0,max:0};
  });
 });
}
function draw(a){
 var W=400,H=190,x0=14,x1=374,vals=a.map(function(p){return p[1]}),pk=Math.max.apply(null,vals.concat([0]));
 $('peak').textContent=pk;
 var max=Math.max(pk,1)*1.15,t0=a[0][0],span=Math.max(a[a.length-1][0]-t0,1);
 var p=a.map(function(q){return [a.length>1?x0+(q[0]-t0)/span*(x1-x0):x1,H-10-q[1]/max*(H-30)]});
 var g='',i;for(i=0;i<6;i++){var x=x0+i*(x1-x0)/5;g+='<line x1="'+x+'" x2="'+x+'" y1="4" y2="'+(H-6)+'" stroke="#222"/>'}
 var l=p[p.length-1],line='',area='';
 if(p.length>1){var d='M'+p.map(function(q){return q[0].toFixed(1)+' '+q[1].toFixed(1)}).join(' L');
  line='<path d="'+d+'" fill="none" stroke="#ff9af5" stroke-width="2.5" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>';
  area='<path d="'+d+' L'+l[0]+' '+H+' L'+p[0][0]+' '+H+'Z" fill="url(#gr)"/>'}
 $('chart').innerHTML='<defs><linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7ef0" stop-opacity=".25"/><stop offset="1" stop-color="#ff7ef0" stop-opacity="0"/></linearGradient></defs>'+g+area+line+'<circle cx="'+l[0]+'" cy="'+l[1]+'" r="6" fill="#ff9af5"/>';
 if(a.length>1){var xs='';for(i=0;i<6;i++)xs+='<span>'+hm(t0+span*i/5)+'</span>';$('xl').innerHTML=xs}
 else $('xl').innerHTML='<span style="margin:auto">история копится, пока сайт открыт</span>';
}
function setOnline(s){
 var dot=$('online').previousSibling;
 if(!s){$('online').textContent='нет данных';dot.style.background=dot.style.color='#6b6b6b';return}
 $('online').textContent=s.on?s.n+' онлайн':'сервер офлайн';
 dot.style.background=dot.style.color=s.on?'#4ade5a':'#ef4444';
}
function poll(){
 getStatus().then(function(s){
  setOnline(s);
  var a=load().filter(function(p){return Date.now()-p[0]<DAY}),now=Date.now();
  if(!a.length||now-a[a.length-1][0]>45000)a.push([now,s.n]);else a[a.length-1][1]=s.n;
  save(a);draw(a);
 }).catch(function(){setOnline(null);var a=load();if(a.length)draw(a)});
}
poll();setInterval(poll,60000);

// scroll spy
var links=document.querySelectorAll('nav a'),secs=['about','projects','skills'];
function spy(){var y=window.scrollY+window.innerHeight*.4,cur='';secs.forEach(function(s){if($(s).offsetTop<=y)cur=s});links.forEach(function(a){a.classList.toggle('on',a.dataset.s===cur)})}
addEventListener('scroll',spy,{passive:true});spy();

// ---- Discord (Lanyard) ----
var DISCORD_ID=D.id;
var ST={online:['#4ade5a','В сети'],idle:['#f5b83d','Не активен'],dnd:['#ef4444','Не беспокоить'],offline:['#6b6b6b','Не в сети']};
function setSt(k){var s=ST[k]||ST.offline;$('st').style.background=s[0];$('st').style.color=s[0];$('stt').textContent=s[1]}
function lan(){
 if(!/^\d{15,22}$/.test(DISCORD_ID)){setSt('offline');$('act').textContent='Укажи свой Discord ID в config.js (discord.id)';return}
 $('cpt').textContent=DISCORD_ID;
 fetch('https://api.lanyard.rest/v1/users/'+DISCORD_ID).then(function(r){return r.json()}).then(function(j){
  if(!j.success){setSt('offline');$('act').textContent='Нет данных: зайди на сервер discord.gg/lanyard';return}
  var d=j.data,u=d.discord_user;setSt(d.discord_status);
  $('dn').textContent=u.global_name||u.username;$('du').textContent='@'+u.username;
  if(u.avatar)$('dimg').src='https://cdn.discordapp.com/avatars/'+u.id+'/'+u.avatar+'.png?size=256';
  var a=(d.activities||[]).filter(function(x){return x.type!==4})[0],t='Сейчас ничем не занят';
  if(d.listening_to_spotify&&d.spotify)t='Слушает: '+d.spotify.song+' — '+d.spotify.artist;
  else if(a)t=(a.type===0?'Играет в ':'')+a.name+(a.details?' · '+a.details:'');
  $('act').textContent=t;
 }).catch(function(){setSt('offline');$('act').textContent='Не удалось загрузить статус'});
}
lan();setInterval(lan,30000);
$('cp').onclick=function(){var t=$('cpt');if(!/^\d+$/.test(t.textContent))return;try{navigator.clipboard.writeText(t.textContent)}catch(e){}var o=t.textContent;t.textContent='Скопировано';setTimeout(function(){t.textContent=o},1200)};

// ---- плеер: assets/meant-to-be.mp3 ----
var au=$('au');au.loop=true;au.volume=.6;
var PLAY='<path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5z"/>',PAUSE='<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>';
function fmt(s){if(!isFinite(s))return '0:00';return Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0')}
function ui(){var d=au.duration,r=d?au.currentTime/d*100:0;$('fill').style.width=r+'%';$('knob').style.left=r+'%';$('cur').textContent=fmt(au.currentTime);$('dur').textContent=fmt(d)}
function icon(){$('pi').innerHTML=au.paused?PLAY:PAUSE}
au.addEventListener('timeupdate',ui);au.addEventListener('loadedmetadata',ui);au.addEventListener('play',icon);au.addEventListener('pause',icon);
var ARTIST=M.artist;
function diag(){
 $('ta').textContent='проверяю файл…';
 fetch(au.getAttribute('src'),{method:'HEAD',cache:'no-store'}).then(function(r){
  $('ta').textContent=r.ok?'файл найден, но браузер не может его воспроизвести: нужен настоящий MP3':'файл не найден на сервере ('+r.status+'), подожди 1–2 минуты и обнови страницу';
 }).catch(function(){$('ta').textContent='не удалось проверить файл'});
}
au.addEventListener('error',diag);
au.addEventListener('loadedmetadata',function(){$('ta').textContent=ARTIST});
$('play').onclick=function(){if(au.error)au.load();if(au.paused){var p=au.play();if(p&&p.catch)p.catch(function(){})}else au.pause()};
$('prev').onclick=$('next').onclick=function(){au.currentTime=0};
var bar=$('bar'),drag=false;
function seek(e){var r=bar.getBoundingClientRect(),k=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width));if(au.duration)au.currentTime=k*au.duration}
bar.addEventListener('pointerdown',function(e){drag=true;bar.setPointerCapture(e.pointerId);seek(e)});
bar.addEventListener('pointermove',function(e){if(drag)seek(e)});
bar.addEventListener('pointerup',function(){drag=false});
$('yes').onclick=function(){$('music').classList.add('off');var p=au.play();if(p&&p.catch)p.catch(function(){})};
$('no').onclick=function(){$('music').classList.add('off')};
ui();icon();
})();

/* ---------- огонёк под пальцем ---------- */
(function(){
var g=document.getElementById('touchGlow');if(!g)return;
var tx=-300,ty=-300,mx=-300,my=-300,cx=-300,cy=-300,run=false,first=true,last=0,fade=0;
function loop(t){
  var dt=Math.min(t-last,50);last=t;if(dt<=0)dt=16;
  var k1=1-Math.exp(-dt/60),k2=1-Math.exp(-dt/110);
  mx+=(tx-mx)*k1;my+=(ty-my)*k1;
  cx+=(mx-cx)*k2;cy+=(my-cy)*k2;
  g.style.transform='translate3d('+cx.toFixed(2)+'px,'+cy.toFixed(2)+'px,0)';
  var moving=Math.abs(tx-cx)>.05||Math.abs(ty-cy)>.05;
  if(g.classList.contains('on')||moving||fade>0){
    fade=g.classList.contains('on')?700:Math.max(0,fade-dt);
    requestAnimationFrame(loop);
  }else{run=false;}
}
function go(){if(!run){run=true;last=performance.now();requestAnimationFrame(loop);}}
function show(x,y,snap){tx=x;ty=y;if(snap||first){cx=mx=x;cy=my=y;first=false;}g.classList.add('on');go();}
function hide(){g.classList.remove('on');fade=700;go();}
document.addEventListener('touchstart',function(e){var t=e.touches[0];show(t.clientX,t.clientY,true);},{passive:true});
document.addEventListener('touchmove',function(e){var t=e.touches[0];tx=t.clientX;ty=t.clientY;go();},{passive:true});
document.addEventListener('touchend',hide,{passive:true});
document.addEventListener('touchcancel',hide,{passive:true});
document.addEventListener('mousemove',function(e){show(e.clientX,e.clientY,false);});
document.addEventListener('mouseleave',hide);
})();

/* ---------- 3D-наклон карточек ---------- */
(function(){
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var SEL='.card,.bubble,.pill,.chip,.modal',HOVER=6,PRESS=12;
var st=[],active=null,px=0,py=0,down=false,run=false,last=0;
function get(el){
  for(var i=0;i<st.length;i++)if(st[i].el===el)return st[i];
  if(getComputedStyle(el).position==='static')el.style.position='relative';
  var o={el:el,rx:0,ry:0,sc:1,ga:0,trx:0,try_:0,tsc:1,tga:0,gx:50,gy:50};
  st.push(o);return o;
}
function pick(t){return t&&t.closest?t.closest(SEL):null;}
function go(){if(!run){run=true;last=performance.now();requestAnimationFrame(loop);}}
function loop(t){
  var dt=Math.min(t-last,50);last=t;if(dt<=0)dt=16;
  var k=1-Math.exp(-dt/90),busy=false;
  for(var i=st.length-1;i>=0;i--){
    var o=st[i],isA=(o.el===active);
    if(isA){
      var r=o.el.getBoundingClientRect();
      var nx=Math.max(0,Math.min(1,(px-r.left)/(r.width||1))),ny=Math.max(0,Math.min(1,(py-r.top)/(r.height||1)));
      var m=down?PRESS:HOVER;
      o.try_=(0.5-ny)*2*m;o.trx=(nx-0.5)*2*m;
      o.tsc=down?0.975:1.0;o.tga=down?1:0.7;
      o.gx=nx*100;o.gy=ny*100;
    }else{o.try_=0;o.trx=0;o.tsc=1;o.tga=0;}
    o.rx+=(o.try_-o.rx)*k;o.ry+=(o.trx-o.ry)*k;o.sc+=(o.tsc-o.sc)*k;o.ga+=(o.tga-o.ga)*k;
    var rest=!isA&&Math.abs(o.rx)<.01&&Math.abs(o.ry)<.01&&Math.abs(o.sc-1)<.0005&&o.ga<.01;
    if(rest){o.el.style.transform='';o.el.style.setProperty('--ga','0');}
    else{
      busy=true;
      o.el.style.transform='perspective(900px) rotateX('+o.rx.toFixed(3)+'deg) rotateY('+o.ry.toFixed(3)+'deg) scale('+o.sc.toFixed(4)+')';
      o.el.style.setProperty('--ga',o.ga.toFixed(3));
      o.el.style.setProperty('--gx',o.gx.toFixed(1)+'%');
      o.el.style.setProperty('--gy',o.gy.toFixed(1)+'%');
    }
  }
  if(busy||active)requestAnimationFrame(loop);else run=false;
}
function setActive(c){active=c;if(c)get(c);}
document.addEventListener('mousemove',function(e){px=e.clientX;py=e.clientY;setActive(pick(e.target));go();});
document.addEventListener('mouseleave',function(){active=null;down=false;go();});
document.addEventListener('mousedown',function(e){var c=pick(e.target);if(c){setActive(c);down=true;px=e.clientX;py=e.clientY;go();}});
document.addEventListener('mouseup',function(){down=false;go();});
document.addEventListener('touchstart',function(e){var t=e.touches[0],c=pick(e.target);if(c){setActive(c);down=true;px=t.clientX;py=t.clientY;go();}},{passive:true});
document.addEventListener('touchmove',function(e){if(!active)return;var t=e.touches[0];px=t.clientX;py=t.clientY;go();},{passive:true});
function end(){down=false;active=null;go();}
document.addEventListener('touchend',end,{passive:true});
document.addEventListener('touchcancel',end,{passive:true});
})();

/* ---------- защита от копирования ---------- */
if(C.protect!==false){
(function(){
// защита от копирования текста и картинок
['contextmenu','dragstart','copy','cut','selectstart'].forEach(function(e){
 document.addEventListener(e,function(ev){ev.preventDefault()});
});
document.addEventListener('keydown',function(e){
 var k=(e.key||'').toLowerCase();
 if((e.ctrlKey||e.metaKey)&&['c','x','a','s','u'].indexOf(k)>-1)e.preventDefault();
});
})();
}

/* ---------- анимация названия вкладки ---------- */
if(C.titleAnimation){
(function(){
// анимация названия вкладки: P, Pr, ... Prem1umGame bio, назад, затем $
var T=C.titleAnimation,f=[],i;
for(i=1;i<=T.length;i++)f.push(T.slice(0,i));
for(i=T.length-1;i>=1;i--)f.push(T.slice(0,i));
f.push('$');
var n=0;
function step(){
 var s=f[n];document.title=s;
 var d=s===T?1200:(s==='$'?700:220);
 n=(n+1)%f.length;setTimeout(step,d);
}
step();

})();
}
}

function start(){
  try{run()}catch(e){console.error(e);fail('Ошибка на сайте: '+(e&&e.message||e)+'. Проверь config.js (кавычки, запятые, скобки).')}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
