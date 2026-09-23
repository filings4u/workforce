(() => {
  "use strict";

  if(!window.S4UUI){
    const css=`.s4u-ui-backdrop{position:fixed;inset:0;background:rgba(8,25,48,.58);display:flex;align-items:center;justify-content:center;padding:20px;z-index:99999}.s4u-ui-modal{width:min(520px,100%);background:#fff;border:1px solid #dbe4ef;border-radius:18px;box-shadow:0 28px 70px rgba(9,30,66,.26);overflow:hidden}.s4u-ui-head{padding:22px 24px 12px}.s4u-ui-head h2{margin:0;color:#173d78;font-size:22px}.s4u-ui-body{padding:0 24px 20px;color:#52657a;line-height:1.6}.s4u-ui-body input{width:100%;box-sizing:border-box;border:1px solid #cbd5e1;border-radius:10px;padding:12px;margin-top:10px;font:inherit}.s4u-ui-actions{padding:14px 24px 22px;display:flex;justify-content:flex-end;gap:10px}.s4u-ui-actions button{border:0;border-radius:9px;padding:11px 16px;font-weight:800;cursor:pointer}.s4u-ui-secondary{background:#edf2f7;color:#24467f}.s4u-ui-primary{background:#ff6b00;color:#fff}.s4u-ui-success{border-left:4px solid #178a57;padding-left:12px}.s4u-ui-warning{border-left:4px solid #ef6c00;padding-left:12px}.s4u-ui-error{border-left:4px solid #b42318;padding-left:12px}`;
    const style=document.createElement('style');style.textContent=css;document.head.appendChild(style);
    const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    function open({title='screenings4u',message='',type='info',confirmText='Continue',cancelText='',inputValue=null}={}){return new Promise(resolve=>{const b=document.createElement('div');b.className='s4u-ui-backdrop';const input=inputValue!==null?`<input data-input value="${esc(inputValue)}" autocomplete="off">`:'';b.innerHTML=`<section class="s4u-ui-modal" role="dialog" aria-modal="true"><div class="s4u-ui-head"><h2>${esc(title)}</h2></div><div class="s4u-ui-body"><div class="${type==='success'?'s4u-ui-success':type==='error'?'s4u-ui-error':type==='warning'?'s4u-ui-warning':''}">${esc(message)}</div>${input}</div><div class="s4u-ui-actions">${cancelText?`<button type="button" class="s4u-ui-secondary" data-cancel>${esc(cancelText)}</button>`:''}<button type="button" class="s4u-ui-primary" data-ok>${esc(confirmText)}</button></div></section>`;document.body.appendChild(b);const done=v=>{b.remove();resolve(v)};b.querySelector('[data-cancel]')?.addEventListener('click',()=>done(inputValue!==null?null:false));b.querySelector('[data-ok]').addEventListener('click',()=>done(inputValue!==null?(b.querySelector('[data-input]').value):true));b.addEventListener('click',e=>{if(e.target===b&&cancelText)done(inputValue!==null?null:false)});b.querySelector('[data-input]')?.focus()})}
    window.S4UUI={message:(message,o={})=>open({title:o.title||'screenings4u',message,type:o.type||'info',confirmText:o.confirmText||'Continue'}),confirm:(message,o={})=>open({title:o.title||'Please confirm',message,type:o.type||'warning',confirmText:o.confirmText||'Continue',cancelText:o.cancelText||'Cancel'}),prompt:(message,o={})=>open({title:o.title||'Enter information',message,type:o.type||'info',confirmText:o.confirmText||'Continue',cancelText:o.cancelText||'Cancel',inputValue:o.defaultValue??''})};
  }

  const desktopMarkup = `
    <div class="nav-item"><a class="nav-link" href="index.html">Home</a></div>
    <div class="nav-item">
      <a class="nav-link" href="platform.html">Platform <span class="chevron">▼</span></a>
      <div class="dropdown">
        <a href="platform.html">Platform Overview</a>
        <a href="platform.html#workforce">Workforce Management</a>
        <a href="platform.html#programs">NON-DOT Programs</a>
        <a href="platform.html#random">Random Pools</a>
        <a href="platform.html#testing">Testing Management</a>
        <a href="platform.html#records">Documents &amp; Reporting</a>
      </div>
    </div>
    <div class="nav-item">
      <a class="nav-link" href="employers.html">Solutions <span class="chevron">▼</span></a>
      <div class="dropdown">
        <a href="employers.html">For Employers</a>
        <a href="ctpa.html">For C/TPAs</a>
      </div>
    </div>
    <div class="nav-item"><a class="nav-link" href="pricing.html">Pricing</a></div>
    <div class="nav-item"><a class="nav-link" href="blog.html">Blog</a></div>
    <div class="nav-item"><a class="nav-link" href="contact.html">Contact</a></div>`;

  const mobileMarkup = `
    <div class="mobile-nav-item"><a class="mobile-nav-link" href="index.html">Home</a></div>
    <div class="mobile-nav-item">
      <a class="mobile-nav-link" href="platform.html">Platform <span class="chevron">▼</span></a>
      <div class="mobile-dropdown">
        <a href="platform.html">Platform Overview</a>
        <a href="platform.html#workforce">Workforce Management</a>
        <a href="platform.html#programs">NON-DOT Programs</a>
        <a href="platform.html#random">Random Pools</a>
        <a href="platform.html#testing">Testing Management</a>
        <a href="platform.html#records">Documents &amp; Reporting</a>
      </div>
    </div>
    <div class="mobile-nav-item">
      <a class="mobile-nav-link" href="employers.html">Solutions <span class="chevron">▼</span></a>
      <div class="mobile-dropdown"><a href="employers.html">Employers</a><a href="ctpa.html">C/TPAs</a></div>
    </div>
    <div class="mobile-nav-item"><a class="mobile-nav-link" href="pricing.html">Pricing</a></div>
    <div class="mobile-nav-item"><a class="mobile-nav-link" href="blog.html">Blog</a></div>
    <div class="mobile-nav-item"><a class="mobile-nav-link" href="contact.html">Contact</a></div>
    <div class="mobile-nav-actions"><a class="btn btn-blue" href="login.html">Sign In</a><a class="btn btn-orange" href="pricing.html">Start Your Account</a></div>`;

  function init(){
    const root=document.getElementById('siteNavigation');
    if(root){
      root.innerHTML=`<div class="topbar"><div class="container topbar-inner"><div class="topbar-left"><span>Workforce Compliance Software by screenings4u</span><span>•</span><span>Serving Customers Nationwide</span></div><div class="topbar-right"><a href="tel:7732457009">(773) 245-7009</a><a href="mailto:support@screenings4u.com">support@screenings4u.com</a></div></div></div><header class="site-header"><div class="container nav-inner" id="navInner"><a class="brand" href="index.html" aria-label="screenings4u Workforce Compliance"><img src="images/logo.png" alt="screenings4u" class="site-logo"><span class="brand-workforce"><span class="brand-rule"></span><span class="brand-title">Workforce Compliance</span></span></a><nav id="desktopNav" aria-label="Primary navigation"></nav><div class="nav-actions"><a class="btn btn-outline" href="login.html">Sign In</a><a class="btn btn-orange" href="pricing.html">Start Your Account</a><button id="mobileToggle" type="button" aria-label="Open navigation" aria-expanded="false">☰</button></div><nav id="mobileNav" aria-label="Mobile navigation"></nav></div></header>`;
    }
    const desktop=document.getElementById('desktopNav'), mobile=document.getElementById('mobileNav'), toggle=document.getElementById('mobileToggle');
    if(!desktop||!mobile||!toggle)return;
    desktop.innerHTML=desktopMarkup; mobile.innerHTML=mobileMarkup;
    const page=(location.pathname.split('/').pop()||'index.html').toLowerCase();
    [...desktop.querySelectorAll('a'),...mobile.querySelectorAll('a')].forEach(a=>{const href=(a.getAttribute('href')||'').split('#')[0].toLowerCase();if(href===page)a.classList.add('active')});
    toggle.addEventListener('click',()=>{const open=mobile.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰';document.body.classList.toggle('s4u-mobile-nav-open',open)});
    mobile.querySelectorAll('.mobile-nav-item').forEach(item=>{const link=item.querySelector(':scope > .mobile-nav-link'),drop=item.querySelector(':scope > .mobile-dropdown');if(!link||!drop)return;link.addEventListener('click',e=>{if(window.innerWidth<=1120){e.preventDefault();item.classList.toggle('open')}})});
    document.addEventListener('click',e=>{if(window.innerWidth>1120)return;if(!mobile.contains(e.target)&&e.target!==toggle&&mobile.classList.contains('is-open')){mobile.classList.remove('is-open');document.body.classList.remove('s4u-mobile-nav-open');toggle.textContent='☰';toggle.setAttribute('aria-expanded','false')}});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
