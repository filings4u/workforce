
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-pricing-tab]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.pricingTab;
      document.querySelectorAll("[data-pricing-tab]").forEach(b => b.classList.toggle("active", b === btn));
      document.querySelectorAll("[data-price-group]").forEach(g => g.hidden = g.dataset.priceGroup !== target);
    });
  });

  const params = new URLSearchParams(location.search);
  const audience = params.get("audience");
  if(audience){
    const btn = document.querySelector(`[data-pricing-tab="${audience}"]`);
    if(btn) btn.click();
  }

  const plan=params.get("plan");
  const planField=document.querySelector('[name="plan"]');
  if(plan && planField){
    [...planField.options].forEach(o => o.selected = o.value === plan);
  }

  const form=document.querySelector("[data-lead-form]");
  if(form){
    form.addEventListener("submit", e => {
      e.preventDefault();
      const msg=document.querySelector("[data-form-message]");
      if(msg) msg.textContent="This form is ready for the checkout / CRM connection in the next phase.";
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const plans = {
    employer_essential:{name:"Employer Essential",price:"$85",type:"employer"},
    employer_professional:{name:"Employer Professional",price:"$145",type:"employer"},
    employer_enterprise:{name:"Employer Enterprise",price:"$245",type:"employer"},
    owner_operator_essential:{name:"Owner-Operator Essential",price:"$45",type:"owner_operator"},
    owner_operator_plus:{name:"Owner-Operator Plus",price:"$125",type:"owner_operator"},
    owner_operator_complete:{name:"Owner-Operator Complete",price:"$225",type:"owner_operator"},
    ctpa_essential:{name:"C/TPA Essential",price:"$125",type:"ctpa"},
    ctpa_professional:{name:"C/TPA Professional",price:"$225",type:"ctpa"},
    ctpa_enterprise:{name:"C/TPA Enterprise",price:"$375",type:"ctpa"}
  };
  const select=document.getElementById("planSelect");
  const type=document.getElementById("accountType");
  if(select){
    const requested=new URLSearchParams(location.search).get("plan");
    if(requested && plans[requested]) select.value=requested;
    const sync=()=>{
      const p=plans[select.value];
      if(!p) return;
      const n=document.getElementById("summaryPlan");
      const pr=document.getElementById("summaryPrice");
      if(n) n.textContent=p.name;
      if(pr) pr.textContent=p.price;
      if(type) type.value=p.type;
    };
    select.addEventListener("change",sync);
    sync();
  }
  const checkoutForm=document.getElementById("checkoutForm");
  if(checkoutForm){
    checkoutForm.addEventListener("submit", e=>{
      e.preventDefault();
      alert("The checkout page is ready. We will connect the live payment and automatic account provisioning next.");
    });
  }
});
