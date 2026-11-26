(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){return`/portfolio_lana/`+e.replace(/^\//,``)}function t(){let e=`/`+window.location.pathname.slice(16);return e===`/index.html`?`/`:e}var n=[{label:`Accueil`,href:`/`},{label:`Projets`,href:`/projets.html`},{label:`À propos`,href:`/a-propos.html`},{label:`Contact`,href:`/contact.html`}];function r(){let e=t();return e.startsWith(`/projets/`)?`/projets.html`:e}function i(){let t=document.querySelector(`[data-header]`);if(!t)return;let i=r();t.outerHTML=`
    <header class="site-header">
      <nav class="main-nav" aria-label="Navigation principale">${n.map((t,n)=>{let r=String(n+1).padStart(2,`0`),a=t.href===i?` aria-current="page"`:``;return`<a href="${e(t.href)}"${a}><span class="num" aria-hidden="true">${r}</span>${t.label}</a>`}).join(``)}</nav>
    </header>
  `}function a(){let e=document.querySelector(`.site-header`);if(!e)return;let t=()=>{e.dataset.scrolled=String(window.scrollY>24)};window.addEventListener(`scroll`,t,{passive:!0}),t()}var o=[{label:`Accueil`,href:`/`},{label:`Projets`,href:`/projets.html`},{label:`À propos`,href:`/a-propos.html`},{label:`Contact`,href:`/contact.html`}],s=[{label:`LinkedIn ↗`,href:`https://www.linkedin.com/in/lana-gilbart-lagy27061401`,external:!0},{label:`GitHub ↗`,href:`https://github.com/lanature00`,external:!0},{label:`CV (PDF) ↓`,href:`/cv/lana-gilbart-cv.pdf`}];function c(t){return t.map(t=>{let n=t.external?` target="_blank" rel="noopener"`:``;return`<a class="lnk" href="${t.external?t.href:e(t.href)}"${n}>${t.label}</a>`}).join(``)}function l(){return new Date().toLocaleTimeString(`fr-FR`,{timeZone:`Europe/Paris`,hour:`2-digit`,minute:`2-digit`})}function u(){let e=document.querySelector(`[data-footer]`);if(!e)return;e.outerHTML=`
    <footer class="site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__top">
          <div>
            <p class="site-footer__thanks">Merci pour la visite</p>
            <p class="site-footer__ask">Une question, une alternance, un projet ? <a class="lnk site-footer__mail" href="mailto:lanagilbart@gmail.com">lanagilbart@gmail.com</a></p>
          </div>
          <a href="#top" class="site-footer__up" aria-label="Revenir en haut de la page">
            <svg width="20" height="20" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
        </div>

        <div class="site-footer__cols">
          <nav aria-label="Pied de page">
            <span class="eyebrow">Pages</span>
            ${c(o)}
          </nav>
          <nav aria-label="Réseaux">
            <span class="eyebrow">Réseaux</span>
            ${c(s)}
          </nav>
          <div>
            <span class="eyebrow">En ce moment</span>
            <span class="site-footer__status">En recherche d'alternance</span>
            <span class="site-footer__time">Paris · <time data-clock>${l()}</time></span>
          </div>
          <div>
            <span class="eyebrow">Les couleurs</span>
            <ul class="site-footer__colors">
              <li><span class="dot dot--graphisme" aria-hidden="true"></span>Graphisme</li>
              <li><span class="dot dot--ui" aria-hidden="true"></span>UI/UX</li>
              <li><span class="dot dot--code" aria-hidden="true"></span>Code</li>
              <li><span class="dot dot--data" aria-hidden="true"></span>Data</li>
            </ul>
          </div>
        </div>

        <div class="site-footer__bottom">
          <span>© 2026 Lana Gilbart</span>
          <span class="site-footer__motto">Coder sa créativité</span>
          <span>Maquetté dans Figma · codé à la main</span>
        </div>
      </div>
    </footer>
  `;let t=document.querySelector(`[data-clock]`);t&&window.setInterval(()=>{t.textContent=l()},3e4)}i(),a(),u();export{e as n,l as t};