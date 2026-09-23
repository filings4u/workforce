document.addEventListener("DOMContentLoaded",()=>{
  const buttons=[...document.querySelectorAll("[data-pricing-tab]")];
  const groups=[...document.querySelectorAll("[data-price-group]")];
  const bottoms=[...document.querySelectorAll("[data-bottom-price-group]")];
  const sticky=document.getElementById('pricingSticky');
  const stickyPlans=document.getElementById('stickyPlans');
  const stickyAudience=document.getElementById('stickyAudience');
  let audience='employer';
  const planData={
    employer:[['workforce_employer_essential','Essential',85],['workforce_employer_professional','Professional',145],['workforce_employer_enterprise','Enterprise',245]],
    ctpa:[['workforce_ctpa_essential','Essential',125],['workforce_ctpa_professional','Professional',225],['workforce_ctpa_enterprise','Enterprise',375]]
  };
  function renderSticky(){if(!stickyPlans)return;stickyAudience.textContent=audience==='ctpa'?'C/TPA plans':'Employer plans';stickyPlans.innerHTML=planData[audience].map(([code,name,price])=>`<a href="checkout.html?plan=${code}"><span>${name}</span><strong>$${price}<small>/mo</small></strong></a>`).join('')}
  function select(target){audience=target;buttons.forEach(b=>b.classList.toggle('active',b.dataset.pricingTab===target));groups.forEach(g=>g.hidden=g.dataset.priceGroup!==target);bottoms.forEach(g=>g.hidden=g.dataset.bottomPriceGroup!==target);renderSticky();updateSticky()}
  buttons.forEach(btn=>btn.addEventListener('click',()=>select(btn.dataset.pricingTab)));
  const msg=sessionStorage.getItem('s4uPricingMessage');if(msg){sessionStorage.removeItem('s4uPricingMessage');setTimeout(()=>window.S4UUI?.message(msg,{title:'Choose a Workforce plan',type:'info'}),80)}
  const params=new URLSearchParams(location.search), requested=params.get('audience');if(requested==='ctpa'||requested==='employer')audience=requested;select(audience);
  function updateSticky(){if(!sticky)return;const top=document.getElementById('pricingTopAnchor'),bottom=document.getElementById('pricingBottomAnchor');if(!top||!bottom)return;const topY=top.getBoundingClientRect().top,bottomY=bottom.getBoundingClientRect().top;const show=topY<90&&bottomY>window.innerHeight*.78;sticky.classList.toggle('is-visible',show);sticky.setAttribute('aria-hidden',String(!show))}
  addEventListener('scroll',updateSticky,{passive:true});addEventListener('resize',updateSticky);updateSticky();
});
