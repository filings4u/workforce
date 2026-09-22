(()=>{
const ENDPOINT='https://wyezpseboxbmkedvbmyx.supabase.co/functions/v1/workforce-checkout';
const plans={
 employer_essential:{name:'Employer Essential',price:85,type:'employer'},employer_professional:{name:'Employer Professional',price:145,type:'employer'},employer_enterprise:{name:'Employer Enterprise',price:245,type:'employer'},
 owner_operator_essential:{name:'Owner-Operator Essential',price:45,type:'owner_operator'},owner_operator_plus:{name:'Owner-Operator Plus',price:125,type:'owner_operator'},owner_operator_complete:{name:'Owner-Operator Complete',price:225,type:'owner_operator'},
 ctpa_essential:{name:'C/TPA Essential',price:125,type:'ctpa'},ctpa_professional:{name:'C/TPA Professional',price:225,type:'ctpa'},ctpa_enterprise:{name:'C/TPA Enterprise',price:375,type:'ctpa'}
};

const form=document.getElementById('checkoutForm');
const sel=document.getElementById('planSelect');
const type=document.getElementById('accountType');
const btn=document.getElementById('checkoutButton');
const msg=document.getElementById('checkoutMessage');
const summaryPlan=document.getElementById('summaryPlan');
const summaryPrice=document.getElementById('summaryPrice');

if(!form||!sel||!type||!btn){
 console.error('Workforce checkout could not initialize because a required checkout element is missing.',{
  checkoutForm:!!form,
  planSelect:!!sel,
  accountType:!!type,
  checkoutButton:!!btn
 });
 return;
}

function setMessage(text=''){
 if(msg) msg.textContent=text;
 else if(text) console.error(text);
}

function sync(){
 const p=plans[sel.value]||plans.employer_essential;
 type.value=p.type;
 if(summaryPlan) summaryPlan.textContent=p.name;
 if(summaryPrice) summaryPrice.textContent=`$${p.price}`;
}

const qp=new URLSearchParams(location.search).get('plan');
if(qp&&plans[qp]) sel.value=qp;
sync();

sel.addEventListener('change',sync);
type.addEventListener('change',()=>{
 const first=Object.keys(plans).find(k=>plans[k].type===type.value);
 if(first){
  sel.value=first;
  sync();
 }
});

form.addEventListener('submit',async e=>{
 e.preventDefault();
 if(!form.reportValidity()) return;

 btn.disabled=true;
 btn.textContent='Opening Secure Payment…';
 setMessage('');

 const fd=new FormData(form);
 const body=Object.fromEntries(fd.entries());

 try{
  const r=await fetch(ENDPOINT,{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify(body)
  });

  const j=await r.json();
  if(!r.ok||!j.checkout_url){
   throw new Error(j.error||'Unable to start secure checkout.');
  }

  location.href=j.checkout_url;
 }catch(err){
  const text=err instanceof Error?err.message:'Unable to start secure checkout.';
  setMessage(text);
  btn.disabled=false;
  btn.textContent='Continue to Secure Payment';
 }
});
})();
