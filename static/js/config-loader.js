(function(){
  function byId(id){return document.getElementById(id);} 
  function setText(id, text){ const el = byId(id); if(el) el.textContent = text; }
  function setHtml(id, html){ const el = byId(id); if(el) el.innerHTML = html; }
  function setBgImage(sel, url){ const el = document.querySelector(sel); if(el) el.style.backgroundImage = 'url(' + url + ')'; }

  function getLocalConfig(){
    try{ const raw = localStorage.getItem('homepage_config'); if(!raw) return null; return JSON.parse(raw);}catch(e){ console.error(e); return null; }
  }

  async function fetchDefault(){
    try{ const res = await fetch('./static/config.json', {cache:'no-store'}); if(!res.ok) throw new Error('config http '+res.status); return await res.json(); }catch(e){ console.error('Load default config failed', e); return null; }
  }

  function applyProfile(cfg){
    if(!cfg || !cfg.profile) return;
    setText('welcome-name', cfg.profile.name || '');
    setText('welcome-title', cfg.profile.title || '');
    if(cfg.profile.motto){ setText('welcome-motto', cfg.profile.motto); }
    setBgImage('.logo', cfg.profile.avatar || 'favicon.ico');
    setText('profile-location', cfg.profile.location || '');
    setText('profile-school', cfg.profile.school || '');
    if(Array.isArray(cfg.profile.tags)){
      const html = cfg.profile.tags.map(t=>'<div class="left-tag-item">'+t+'</div>').join('');
      setHtml('profile-tags', html);
    }
  }

  function applyHero(cfg){
    if(!cfg || !cfg.hero) return;
    const snake = document.getElementById('tanChiShe');
    if(!snake) return;
    const theme = document.documentElement.getAttribute('data-theme');
    if(theme==='dark' && cfg.hero.snakeDark){ snake.src = cfg.hero.snakeDark; }
    else if(cfg.hero.snakeLight){ snake.src = cfg.hero.snakeLight; }
  }

  function applyList(containerId, list){
    const el = byId(containerId); if(!el || !Array.isArray(list)) return;
    const html = list.map(item=>{
      return (
        '<a class="projectItem" target="_blank" href="'+(item.url||'#')+'">'+
          '<div class="projectItemLeft">'+
            '<h1>'+(item.title||'')+'</h1>'+ 
            '<p>'+(item.desc||'')+'</p>'+ 
          '</div>'+ 
          '<div class="projectItemRight">'+ 
            (item.icon?('<img src="'+item.icon+'" alt="">'):'')+ 
          '</div>'+ 
        '</a>'
      );
    }).join('');
    el.innerHTML = html;
  }

  function applyIntro(cfg){
    const box = document.querySelector('#tab2 .intro-content');
    if(!box || !cfg || !cfg.intro) return;
    const lines = (cfg.intro.lines||[]).map(p=>'<p>'+p+'</p>').join('');
    const bullets = (cfg.intro.bullets||[]).map(li=>'<li>'+li+'</li>').join('');
    const interests = (cfg.intro.interests||[]).map(li=>'<li>'+li+'</li>').join('');
    const lang = cfg.intro.languages?('<p>'+cfg.intro.languages+'</p>'):'';
    box.innerHTML = lines +
      '<ul class="intro-ul">'+bullets+'</ul>'+
      '<h3>MY INTERESTS</h3>'+
      '<ul class="intro-ul">'+interests+'</ul>'+
      '<h3>LANGUAGE PROFICIENCY</h3>'+ lang;
  }

  function applyFaq(cfg){
    const box = document.querySelector('#tab3 .faq-container');
    if(!box || !cfg || !Array.isArray(cfg.faq)) return;
    const html = cfg.faq.map(q=>{
      const ans = (q.a||'');
      let answer = ans;
      if(q.links && q.links.length){
        q.links.forEach(l=>{ answer = answer.replace(l.text, '<a class="highlight-link" target="_blank" href="'+l.href+'">'+l.text+'</a>'); });
      }
      return (
        '<div class="faq-item">'+
          '<div class="faq-question" onclick="toggleFAQ(this)">'+
            '<span>'+(q.q||'')+'</span>'+
            '<svg class="faq-arrow" viewBox="0 0 24 24" width="20" height="20">\n  <path fill="currentColor" d="M7 10l5 5 5-5z"/>\n</svg>'+ 
          '</div>'+ 
          '<div class="faq-answer"><p>'+answer+'</p></div>'+ 
        '</div>'
      );
    }).join('');
    box.innerHTML = html;
  }

  function applyFooter(cfg){
    const a = document.querySelector('footer a.footer-links');
    if(cfg && cfg.footer){
      if(cfg.footer.sourceUrl && a){ a.href = cfg.footer.sourceUrl; }
      const f = document.querySelector('footer');
      if(f && cfg.footer.copyright){ f.childNodes[0].nodeValue = cfg.footer.copyright + ' \u00A0|\u00A0 '; }
    }
  }

  async function init(){
    const override = getLocalConfig();
    const base = override || await fetchDefault();
    if(!base) return;
    applyProfile(base);
    applyHero(base);
    applyList('websites-list', base.websites);
    applyList('projects-list', base.projects);
    applyIntro(base);
    applyFaq(base);
    applyFooter(base);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
