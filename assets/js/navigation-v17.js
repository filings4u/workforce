(()=>{
const menus={
admin:[
  ["OVERVIEW",[["Admin Command Center","admin-dashboard.html","admin-dashboard"]]],
  ["PLATFORM",[["Employers","admin-employers.html","admin-employers"],["Subscriptions","admin-subscriptions.html","admin-subscriptions"]]],
  ["WORKSPACE",[
    ["Employer Workspace","dashboard.html","dashboard"],
    ["Employees / Drivers","employees.html","employees"],
    ["Locations & Departments","locations.html","locations"],
    ["Users, Roles & Access","company-users.html","company-users"],
    ["Role Permissions","role-permissions.html","role-permissions"],
    ["Testing Programs","programs.html","programs"],
    ["Testing Pools","pools.html","pools"],
    ["Pool Enrollment","pool-enrollment.html","pool-enrollment"],
    ["Random Selections","random-program.html","random-program"]
  ]],
  ["TESTING",[["Testing Orders","testing-orders.html","testing-orders"],["Collections","collections.html","collections"],["Collection Sites","collection-sites.html","collection-sites"],["Results","results.html","results"]]],
  ["COMPLIANCE",[["Certificates","certificates.html","certificates"],["Documents","documents.html","documents"],["Work Queue","work-queue.html","work-queue"]]],
  ["COMMUNICATIONS",[["Communications","communications.html","communications"],["Notification Center","notification-center.html","notification-center"],["Templates","communication-templates.html","communication-templates"]]],
  ["REPORTING",[["Reports & MIS","reports.html","reports"],["Audit Log","audit-log.html","audit-log"]]],
  ["INTEGRATIONS",[["Integrations","integrations.html","integrations"],["Workflow Automation","workflow-automation.html","workflow-automation"],["Integration Events","integration-events.html","integration-events"]]],
  ["ADMINISTRATION",[["Security & Retention","security-settings.html","security-settings"],["Platform Health","platform-health.html","platform-health"]]]
],
employer:[
  ["OVERVIEW",[["Dashboard","dashboard.html","dashboard"]]],
  ["WORKFORCE",[["Employees / Drivers","employees.html","employees"],["Locations & Departments","locations.html","locations"],["Users, Roles & Access","company-users.html","company-users"],["Role Permissions","role-permissions.html","role-permissions"]]],
  ["PROGRAMS",[["Testing Programs","programs.html","programs"],["Testing Pools","pools.html","pools"],["Pool Enrollment","pool-enrollment.html","pool-enrollment"]]],
  ["RANDOM TESTING",[["Random Selections","random-program.html","random-program"]]],
  ["TESTING",[["Testing Orders","testing-orders.html","testing-orders"],["Collections","collections.html","collections"],["Collection Sites","collection-sites.html","collection-sites"],["Results","results.html","results"]]],
  ["COMPLIANCE",[["Certificates","certificates.html","certificates"],["Documents","documents.html","documents"],["Work Queue","work-queue.html","work-queue"]]],
  ["COMMUNICATIONS",[["Communications","communications.html","communications"],["Notification Center","notification-center.html","notification-center"],["Templates","communication-templates.html","communication-templates"]]],
  ["REPORTING",[["Reports & MIS","reports.html","reports"],["Audit Log","audit-log.html","audit-log"]]],
  ["INTEGRATIONS",[["Integrations","integrations.html","integrations"],["Workflow Automation","workflow-automation.html","workflow-automation"]]],
  ["ADMINISTRATION",[["Security & Retention","security-settings.html","security-settings"],["Account Health","platform-health.html","platform-health"]]],
  ["ACCOUNT",[["Company","company.html","company"],["Subscription & Billing","subscription.html","subscription"]]]
],
employee:[
  ["MY COMPLIANCE",[["My Dashboard","employee-dashboard.html","employee-dashboard"],["My Profile","employee-profile.html","employee-profile"],["My Programs","employee-programs.html","employee-programs"],["My Tests","employee-tests.html","employee-tests"],["My Certificates","employee-certificates.html","employee-certificates"],["My Documents","employee-documents.html","employee-documents"]]]
]
};

const mq=window.matchMedia("(max-width: 900px)");

function ensureMobileShell(){
  const side=document.querySelector(".cc-side");
  const top=document.querySelector(".cc-top");
  if(!side||!top)return;

  if(!side.id) side.id="cc-navigation-drawer";

  let trigger=document.querySelector(".cc-mobile-nav-trigger");
  if(!trigger){
    trigger=document.createElement("button");
    trigger.type="button";
    trigger.className="cc-mobile-nav-trigger";
    trigger.setAttribute("aria-controls",side.id);
    trigger.setAttribute("aria-expanded","false");
    trigger.setAttribute("aria-label","Open navigation");
    trigger.innerHTML='<span></span><span></span><span></span>';
    top.insertBefore(trigger,top.firstChild);
    trigger.addEventListener("click",()=>toggleMobileNav());
  }

  let close=document.querySelector(".cc-mobile-nav-close");
  if(!close){
    close=document.createElement("button");
    close.type="button";
    close.className="cc-mobile-nav-close";
    close.setAttribute("aria-label","Close navigation");
    close.innerHTML="×";
    side.insertBefore(close,side.firstChild);
    close.addEventListener("click",()=>closeMobileNav());
  }

  let shade=document.querySelector(".cc-mobile-nav-shade");
  if(!shade){
    shade=document.createElement("button");
    shade.type="button";
    shade.className="cc-mobile-nav-shade";
    shade.setAttribute("aria-label","Close navigation");
    document.body.appendChild(shade);
    shade.addEventListener("click",()=>closeMobileNav());
  }

  side.addEventListener("click",e=>{
    if(mq.matches && e.target.closest(".cc-nav a")) closeMobileNav();
  });
}

function setMobileNav(open){
  const side=document.querySelector(".cc-side");
  const trigger=document.querySelector(".cc-mobile-nav-trigger");
  if(!side||!trigger)return;
  document.body.classList.toggle("cc-nav-open",!!open);
  side.classList.toggle("mobile-open",!!open);
  trigger.classList.toggle("active",!!open);
  trigger.setAttribute("aria-expanded",String(!!open));
  trigger.setAttribute("aria-label",open?"Close navigation":"Open navigation");
}
function toggleMobileNav(){setMobileNav(!document.body.classList.contains("cc-nav-open"))}
function closeMobileNav(){setMobileNav(false)}

function draw(ctx){
  const mode=ctx?.mode||"employer";
  document.querySelectorAll("[data-compliance-navigation]").forEach(nav=>{
    const active=nav.dataset.active||document.body.dataset.nav||"";
    nav.innerHTML=(menus[mode]||menus.employer).map(([group,items])=>
      `<div class="cc-nav-group"><span>${group}</span>${items.map(([label,href,key])=>
        `<a${key===active?' class="active"':''} href="${href}">${label}</a>`).join("")}</div>`
    ).join("");
  });

  document.querySelectorAll("[data-compliance-logo]").forEach(el=>{
    el.innerHTML='<img src="images/logo2.png" alt="screenings4u"><small>'+
      ({admin:"Compliance Administration",employer:"Workforce Compliance",employee:"Employee Compliance"}[mode]||"Workforce Compliance")+
      '</small>';
  });

  ensureMobileShell();
  renderSwitcher(ctx);

  requestAnimationFrame(()=>{
    document.querySelectorAll(".cc-side").forEach(side=>{
      const activeLink=side.querySelector(".cc-nav a.active");
      if(!activeLink) return;
      const sideRect=side.getBoundingClientRect();
      const linkRect=activeLink.getBoundingClientRect();
      if(linkRect.top<sideRect.top+70 || linkRect.bottom>sideRect.bottom-30){
        side.scrollTo({
          top:Math.max(0,activeLink.offsetTop-(side.clientHeight/2)+(activeLink.clientHeight/2)),
          behavior:"auto"
        });
      }
    });
  });
}

function renderSwitcher(ctx){
  document.querySelectorAll(".cc-account-switcher,.cc-mobile-account-switcher").forEach(x=>x.remove());
  if(!ctx?.isAdmin||!ctx.accounts?.length)return;

  const options=ctx.accounts.map(a=>
    `<option value="${a.account_id}"${a.account_id===ctx.accountId?' selected':''}>${a.employer_name}</option>`
  ).join("");

  const top=document.querySelector(".cc-top");
  if(top){
    const wrap=document.createElement("div");
    wrap.className="cc-account-switcher";
    wrap.innerHTML=`<label>Employer Workspace</label><select aria-label="Employer workspace">${options}</select>`;
    wrap.querySelector("select").onchange=e=>CC.switchAccount(e.target.value,"dashboard.html");
    const user=top.querySelector(".cc-top-user");
    top.insertBefore(wrap,user||null);
  }

  const side=document.querySelector(".cc-side");
  const nav=document.querySelector("[data-compliance-navigation]");
  if(side&&nav){
    const mobile=document.createElement("div");
    mobile.className="cc-mobile-account-switcher";
    mobile.innerHTML=`<label>Employer Workspace</label><select aria-label="Employer workspace">${options}</select>`;
    mobile.querySelector("select").onchange=e=>CC.switchAccount(e.target.value,"dashboard.html");
    side.insertBefore(mobile,nav);
  }
}

document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMobileNav()});
mq.addEventListener?.("change",e=>{if(!e.matches)closeMobileNav()});
window.addEventListener("compliance:context",e=>draw(e.detail));
document.addEventListener("DOMContentLoaded",()=>{
  ensureMobileShell();
  if(window.CC?.context)draw(CC.context);
});
window.ComplianceNavigation={draw,menus,open:()=>setMobileNav(true),close:closeMobileNav};
})();