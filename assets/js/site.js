document.addEventListener("DOMContentLoaded",()=>{
  const sticky=document.getElementById('pricingSticky');
  if(!sticky)return;

  const msg=sessionStorage.getItem('s4uPricingMessage');
  if(msg){
    sessionStorage.removeItem('s4uPricingMessage');
    setTimeout(()=>window.S4UUI?.message(msg,{title:'Choose a Workforce plan',type:'info'}),80);
  }

  const top=document.getElementById('pricingTopAnchor');
  const end=document.getElementById('pricingComparisonEnd');
  function updateSticky(){
    if(!top||!end)return;
    const topY=top.getBoundingClientRect().top;
    const endY=end.getBoundingClientRect().top;
    const show=topY<72 && endY>window.innerHeight*.82;
    sticky.classList.toggle('is-visible',show);
    sticky.setAttribute('aria-hidden',String(!show));
  }
  addEventListener('scroll',updateSticky,{passive:true});
  addEventListener('resize',updateSticky);
  updateSticky();
});
