
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

});
