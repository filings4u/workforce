let ctx,orders=[],employees=[];

document.addEventListener("DOMContentLoaded",async()=>{
  try{
    ctx=await CC.init();

    const searchInput=document.getElementById("search");
    const statusSelect=document.getElementById("statusFilter");

    if(searchInput) searchInput.addEventListener("input",render);
    if(statusSelect) statusSelect.addEventListener("change",render);

    await load();
  }catch(e){
    CC.fail(e);
  }
});

async function load(){
  const [o,e]=await Promise.all([
    ctx.c.from("compliance_test_orders")
      .select("*")
      .eq("account_id",ctx.accountId)
      .order("ordered_at",{ascending:false}),
    ctx.c.from("employer_employees")
      .select("id,first_name,last_name,employee_number")
      .eq("employer_id",ctx.account.employer_id)
      .order("last_name")
  ]);

  if(o.error) throw o.error;
  if(e.error) throw e.error;

  orders=o.data||[];
  employees=e.data||[];
  render();
}

function render(){
  const searchInput=document.getElementById("search");
  const statusSelect=document.getElementById("statusFilter");
  const tbody=document.getElementById("body");
  if(!tbody) return;

  const q=(searchInput?.value||"").trim().toLowerCase();
  const sf=statusSelect?.value||"";
  const em=new Map(employees.map(x=>[x.id,x]));

  const rows=orders.filter(x=>{
    if(sf && x.status!==sf) return false;
    if(!q) return true;
    const employee=em.get(x.employee_id);
    return [
      employee?.first_name,
      employee?.last_name,
      employee?.employee_number,
      x.test_reason,
      x.test_type,
      x.status,
      x.dot_agency
    ].filter(Boolean).join(" ").toLowerCase().includes(q);
  });

  tbody.innerHTML=rows.map(x=>{
    const e=em.get(x.employee_id);
    const employeeName=[e?.first_name,e?.last_name].filter(Boolean).join(" ")||"Employee";
    const employeeNumber=e?.employee_number?`<small>${CC.esc(e.employee_number)}</small>`:"";
    return `<tr>
      <td><strong>${CC.esc(employeeName)}</strong>${employeeNumber}</td>
      <td>${CC.pill(x.test_reason)}</td>
      <td>${CC.pill(x.test_type)}</td>
      <td>${CC.pill(x.status)}</td>
      <td>${CC.dt(x.collection_deadline)}</td>
      <td>${CC.dt(x.ordered_at)}</td>
      <td><a class="cc-btn cc-btn-light" href="testing-order.html?id=${x.id}">View</a></td>
    </tr>`;
  }).join("")||'<tr><td colspan="7" class="cc-empty">No testing orders match these filters.</td></tr>';
}
