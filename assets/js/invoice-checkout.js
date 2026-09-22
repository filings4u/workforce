"use strict";

(function(){
  const params=new URLSearchParams(location.search);
  if(params.get('type')!=='workforce_invoice')return;

  const SUPABASE_URL='https://wyezpseboxbmkedvbmyx.supabase.co';
  const SUPABASE_KEY='sb_publishable__BLewZS6h2V4yUczky-BTQ_EemiOdDL';
  const invoiceId=params.get('invoice')||'';
  const token=params.get('token')||'';
  let stripe=null,elements=null,paymentElement=null,invoice=null;

  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money=(v,c='USD')=>new Intl.NumberFormat('en-US',{style:'currency',currency:String(c||'USD')}).format(Number(v||0));
  const fmt=v=>{if(!v)return'—';const d=new Date(v);return Number.isNaN(d.getTime())?String(v):new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric'}).format(d)};
  async function call(action){
    const r=await fetch(`${SUPABASE_URL}/functions/v1/workforce-invoice-public`,{method:'POST',headers:{'Content-Type':'application/json','apikey':SUPABASE_KEY},body:JSON.stringify({type:'workforce_invoice',invoice_id:invoiceId,token,action})});
    const d=await r.json().catch(()=>({}));if(!r.ok||d.error)throw new Error(d.error||`Invoice request failed (${r.status}).`);return d;
  }
  function error(msg){const e=document.getElementById('paymentError');if(e){e.textContent=msg;e.style.display='block'}else{const m=document.querySelector('main');if(m)m.innerHTML=`<div class="container"><div class="card"><div class="pad"><h1>Invoice checkout unavailable</h1><p>${esc(msg)}</p></div></div></div>`}}
  function render(){
    const grid=document.getElementById('checkoutGrid');if(grid)grid.style.display='grid';
    const form=document.getElementById('checkoutForm');
    if(form){form.innerHTML=`<div class="invoice-checkout-copy"><div class="category">ADMIN INVOICE</div><h1 style="margin:8px 0 4px">Invoice ${esc(invoice.invoice_number||'')}</h1><p class="sub">Issued ${esc(fmt(invoice.issued_at))} · Due ${esc(fmt(invoice.due_at))}</p></div><div class="payment-section" id="paymentSection" aria-hidden="false" style="display:block;visibility:visible"><hr><h2>Payment</h2><p class="sub">Secure payment powered by Stripe.</p><div class="payment"><div id="payment-element"></div></div><div class="error" id="paymentError"></div><div class="notice" id="setupNotice" style="display:block">Amount due: <strong>${esc(money(invoice.amount_due,invoice.currency))}</strong></div><div class="secure">Your card information is handled by Stripe and is not stored in this website.</div></div><button id="payButton" type="submit">Pay ${esc(money(invoice.amount_due,invoice.currency))}</button>`;}
    const pad=document.querySelector('.summary .pad');if(pad){const items=(invoice.items||[]).map(x=>`<li>${esc(x.description||'Invoice item')} — ${esc(money(x.amount,invoice.currency))}</li>`).join('');pad.innerHTML=`<div class="category">Invoice Summary</div><div class="service">${esc(invoice.invoice_title||('Invoice '+(invoice.invoice_number||'')))}</div><hr><div class="label">Invoice Items</div><ul>${items||'<li>Invoice balance</li>'}</ul><hr><div class="price"><span>Total</span><strong>${esc(money(invoice.total,invoice.currency))}</strong></div><div class="price" style="margin-top:8px"><span>Balance Due</span><strong>${esc(money(invoice.amount_due,invoice.currency))}</strong></div>`;}
  }
  async function mount(){
    const p=await call('payment_intent');
    if(!window.Stripe)throw new Error('Stripe could not be loaded.');
    stripe=window.Stripe(p.publishable_key);elements=stripe.elements({clientSecret:p.client_secret,appearance:{theme:'stripe',variables:{colorPrimary:'#24467f',colorText:'#1d2d45',borderRadius:'8px',fontFamily:'Inter, Arial, sans-serif'}}});paymentElement=elements.create('payment');paymentElement.mount('#payment-element');
    document.getElementById('checkoutForm').addEventListener('submit',async ev=>{ev.preventDefault();const btn=document.getElementById('payButton');btn.disabled=true;btn.textContent='Processing Payment...';const returnUrl=`${location.origin}${location.pathname}?type=workforce_invoice&invoice=${encodeURIComponent(invoiceId)}&token=${encodeURIComponent(token)}&paid=1`;const {error:stripeError}=await stripe.confirmPayment({elements,confirmParams:{return_url:returnUrl},redirect:'if_required'});if(stripeError){btn.disabled=false;btn.textContent=`Pay ${money(invoice.amount_due,invoice.currency)}`;error(stripeError.message||'Payment could not be completed.');return;}const note=document.getElementById('setupNotice');if(note){note.textContent='Payment submitted successfully. Your invoice status will update automatically.';note.style.display='block'}btn.textContent='Payment Submitted';});
  }
  async function init(){
    try{
      if(!invoiceId||!token)throw new Error('The invoice payment link is incomplete.');
      const v=await call('view');invoice=v.invoice;if(!invoice)throw new Error('Invoice could not be loaded.');render();if(params.get('paid')==='1'){const note=document.getElementById('setupNotice');if(note){note.textContent='Payment received. The invoice status will update after confirmation.';note.style.display='block'}}if(Number(invoice.amount_due||0)>0&&!['paid','void','refunded'].includes(String(invoice.status)))await mount();else{const btn=document.getElementById('payButton');if(btn){btn.disabled=true;btn.textContent='No Balance Due'}}
    }catch(e){console.error(e);error(e?.message||String(e));}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
