(function(){
  const key = 'homepage_config';
  function qs(id){return document.getElementById(id);} 
  function getVal(id){ const el=qs(id); return el?el.value:''; }
  function setVal(id, v){ const el=qs(id); if(el) el.value = v ?? ''; }

  function toLines(text){ return (text||'').split(/\n+/).filter(Boolean); }
  function fromLines(arr){ return (arr||[]).join('\n'); }

  function parseTags(text){ return (text||'').split(',').map(s=>s.trim()).filter(Boolean); }
  function joinTags(arr){ return (arr||[]).join(', '); }

  function itemRow(type, item, idx, onRemove){
    const row = document.createElement('div');
    row.className = 'item';
    row.innerHTML = `
      <input placeholder="Title" value="${item.title||''}">
      <input placeholder="Desc" value="${item.desc||''}">
      <input placeholder="Icon URL" value="${item.icon||''}">
      <input placeholder="URL" value="${item.url||''}">
      <button>删除</button>
    `;
    const inputs = row.querySelectorAll('input');
    const btn = row.querySelector('button');
    btn.addEventListener('click', ()=> onRemove(idx));
    return {row, inputs};
  }

  function faqRow(item, idx, onRemove){
    const row = document.createElement('div');
    row.className = 'item';
    row.style.gridTemplateColumns = '1fr 2fr auto';
    row.innerHTML = `
      <input placeholder="Question" value="${item.q||''}">
      <input placeholder="Answer（可含链接文本，如 this vid）" value="${item.a||''}">
      <button>删除</button>
    `;
    const inputs = row.querySelectorAll('input');
    const btn = row.querySelector('button');
    btn.addEventListener('click', ()=> onRemove(idx));
    return {row, inputs};
  }

  function linkHelper(note){
    alert('若需要在 FAQ 答案内插入链接，可在“links”里添加：\n'+
      '[{text:"this vid", href:"https://..."}]，导出后也可手动编辑 JSON。');
  }

  async function loadDefault(){
    const res = await fetch('./static/config.json', {cache:'no-store'});
    if(!res.ok) throw new Error('default config http '+res.status);
    return await res.json();
  }

  function getStored(){ try{ const raw=localStorage.getItem(key); return raw?JSON.parse(raw):null; }catch(e){return null;} }
  function setStored(cfg){ localStorage.setItem(key, JSON.stringify(cfg, null, 2)); }

  function collectList(container){
    const rows = Array.from(container.querySelectorAll('.item'));
    return rows.map(r=>{
      const ins = r.querySelectorAll('input');
      return { title: ins[0].value, desc: ins[1].value, icon: ins[2].value, url: ins[3].value };
    }).filter(i=>i.title || i.url);
  }

  function collectFaq(container){
    const rows = Array.from(container.querySelectorAll('.item'));
    return rows.map(r=>{
      const ins = r.querySelectorAll('input');
      return { q: ins[0].value, a: ins[1].value };
    }).filter(i=>i.q || i.a);
  }

  function fill(cfg){
    setVal('profile-name', cfg.profile?.name);
    setVal('profile-title', cfg.profile?.title);
    setVal('profile-motto', cfg.profile?.motto);
    setVal('profile-avatar', cfg.profile?.avatar);
    setVal('profile-location', cfg.profile?.location);
    setVal('profile-school', cfg.profile?.school);
    setVal('profile-tags', joinTags(cfg.profile?.tags));

    setVal('hero-snakeLight', cfg.hero?.snakeLight);
    setVal('hero-snakeDark', cfg.hero?.snakeDark);

    const wBox = document.getElementById('websites-list-editor');
    const pBox = document.getElementById('projects-list-editor');
    const fBox = document.getElementById('faq-list-editor');
    wBox.innerHTML=''; pBox.innerHTML=''; fBox.innerHTML='';

    (cfg.websites||[]).forEach((it, i)=>{
      const {row} = itemRow('website', it, i, (idx)=>{ (cfg.websites||[]).splice(idx,1); fill(cfg); });
      wBox.appendChild(row);
    });
    (cfg.projects||[]).forEach((it, i)=>{
      const {row} = itemRow('project', it, i, (idx)=>{ (cfg.projects||[]).splice(idx,1); fill(cfg); });
      pBox.appendChild(row);
    });
    (cfg.faq||[]).forEach((it, i)=>{
      const {row} = faqRow(it, i, (idx)=>{ (cfg.faq||[]).splice(idx,1); fill(cfg); });
      fBox.appendChild(row);
    });

    setVal('intro-lines', fromLines(cfg.intro?.lines));
    setVal('intro-bullets', fromLines(cfg.intro?.bullets));
    setVal('intro-interests', fromLines(cfg.intro?.interests));
    setVal('intro-languages', cfg.intro?.languages);

    // actions
    document.getElementById('btn-add-website').onclick = ()=>{ (cfg.websites||(cfg.websites=[])).push({}); fill(cfg); };
    document.getElementById('btn-add-project').onclick = ()=>{ (cfg.projects||(cfg.projects=[])).push({}); fill(cfg); };
    document.getElementById('btn-add-faq').onclick = ()=>{ (cfg.faq||(cfg.faq=[])).push({}); fill(cfg); };

    document.getElementById('btn-save').onclick = ()=>{
      const next = buildFromUI(cfg);
      setStored(next);
      alert('已保存到 localStorage。返回首页刷新即可看到效果。');
    };

    document.getElementById('btn-export').onclick = ()=>{
      const next = buildFromUI(cfg);
      const blob = new Blob([JSON.stringify(next, null, 2)], {type:'application/json'});
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'homepage-config.json';
      a.click();
    };

    const file = document.getElementById('file-import');
    document.getElementById('btn-import').onclick = ()=> file.click();
    file.onchange = async ()=>{
      const f = file.files[0]; if(!f) return;
      const text = await f.text();
      try{ const json = JSON.parse(text); setStored(json); fill(json); alert('已导入并保存。'); }catch(e){ alert('导入失败：'+e.message); }
    };

    document.getElementById('btn-load-default').onclick = async ()=>{
      const d = await loadDefault();
      fill(d);
    };
  }

  function buildFromUI(base){
    const cfg = JSON.parse(JSON.stringify(base||{}));
    cfg.profile = cfg.profile || {};
    cfg.hero = cfg.hero || {};
    cfg.intro = cfg.intro || {};

    cfg.profile.name = getVal('profile-name');
    cfg.profile.title = getVal('profile-title');
    cfg.profile.motto = getVal('profile-motto');
    cfg.profile.avatar = getVal('profile-avatar');
    cfg.profile.location = getVal('profile-location');
    cfg.profile.school = getVal('profile-school');
    cfg.profile.tags = parseTags(getVal('profile-tags'));

    cfg.hero.snakeLight = getVal('hero-snakeLight');
    cfg.hero.snakeDark = getVal('hero-snakeDark');

    const wBox = document.getElementById('websites-list-editor');
    const pBox = document.getElementById('projects-list-editor');
    const fBox = document.getElementById('faq-list-editor');
    cfg.websites = collectList(wBox);
    cfg.projects = collectList(pBox);
    cfg.faq = collectFaq(fBox);

    cfg.intro.lines = toLines(getVal('intro-lines'));
    cfg.intro.bullets = toLines(getVal('intro-bullets'));
    cfg.intro.interests = toLines(getVal('intro-interests'));
    cfg.intro.languages = getVal('intro-languages');

    cfg.footer = cfg.footer || {};
    cfg.footer.copyright = getVal('footer-copyright');
    cfg.footer.sourceUrl = getVal('footer-sourceUrl');

    return cfg;
  }

  async function init(){
    let cfg = getStored();
    if(!cfg){ cfg = await loadDefault(); }
    fill(cfg);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
