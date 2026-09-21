document.getElementById("year").textContent=new Date().getFullYear();
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",()=>{const n=document.querySelector("nav");if(innerWidth<900)n.style.display="none"}));
const reveals=document.querySelectorAll(".reveal"),io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.12});reveals.forEach(x=>io.observe(x));setTimeout(()=>document.querySelectorAll(".hero .reveal").forEach(x=>x.classList.add("show")),100);

const SB_URL="https://rciscmvvfancpwsmpbtn.supabase.co",SB_KEY="sb_publishable_wbr5LFOBL0sPiNqBB43irw_W9Or5tvu",BUSINESS_ID="ca3d746f-3e73-4f7f-8377-f60d231745f3";
const db=window.supabase?.createClient(SB_URL,SB_KEY,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
function track(event_name){if(!db)return;db.from("mf_web_events").insert({business_id:BUSINESS_ID,event_name,page_path:location.pathname}).then(()=>{}).catch(()=>{})}
track("page_view");
document.querySelectorAll('a[href^="tel:"]').forEach(a=>a.addEventListener("click",()=>track("call_click")));
document.querySelectorAll('a[href^="sms:"]').forEach(a=>a.addEventListener("click",()=>track("text_click")));

const form=document.getElementById("quoteForm");let vehicle="",service="",started=false;
function step(n){form.querySelectorAll(".step").forEach(x=>x.classList.toggle("active",+x.dataset.step===n))}
function startQuote(){if(!started){started=true;track("quote_start")}}
form.querySelectorAll('[data-step="1"] [data-choice]').forEach(b=>b.onclick=()=>{startQuote();vehicle=b.dataset.choice;step(2)});
form.querySelectorAll('[data-step="2"] [data-choice]').forEach(b=>b.onclick=()=>{service=b.dataset.choice;step(3)});
form.querySelectorAll(".back").forEach((b,i)=>b.onclick=()=>step(i?2:1));
document.querySelectorAll(".service button").forEach(b=>b.onclick=()=>{service=b.dataset.service;document.getElementById("book").scrollIntoView();step(1)});
form.onsubmit=async e=>{
 e.preventDefault();const n=document.getElementById("name").value.trim(),p=document.getElementById("phone").value.trim(),c=document.getElementById("city").value.trim(),submit=form.querySelector('button[type="submit"]');
 if(!n||!p||!c||!vehicle||!service)return;
 submit.disabled=true;submit.textContent="Sending Request…";
 let saved=false;
 if(db){const {error}=await db.from("mf_estimate_requests").insert({business_id:BUSINESS_ID,name:n,phone:p,city:c,vehicle_size:vehicle,service,status:"new"});saved=!error;if(error)console.error("Estimate request could not be saved",error)}
 if(saved)track("estimate_submit");
 document.getElementById("summary").textContent=saved?n+", your estimate request was sent to Mighty Fine. You can also text us below if you'd like.":n+", your request is ready to text to Mighty Fine.";
 const msg=encodeURIComponent("Hi! I'm "+n+". I'd like a quote for a "+service+" on my "+vehicle+". I'm located in "+c+".");
 document.getElementById("textRequest").href="sms:+13306415559?&body="+msg;step(4);submit.disabled=false;submit.textContent="Send My Estimate Request →";
};
document.querySelector(".restart").onclick=()=>{vehicle="";service="";started=false;form.reset();step(1)};

const cmp=document.getElementById("compare"),bef=document.getElementById("before"),hand=document.getElementById("handle");function slide(x){const r=cmp.getBoundingClientRect(),pct=Math.max(2,Math.min(98,(x-r.left)/r.width*100));bef.style.width=pct+"%";hand.style.left=pct+"%"}cmp.addEventListener("pointermove",e=>{if(e.buttons)slide(e.clientX)});cmp.addEventListener("pointerdown",e=>{cmp.setPointerCapture(e.pointerId);slide(e.clientX)});
document.querySelector(".hamb").onclick=()=>{const nav=document.querySelector("nav");nav.style.display=nav.style.display==="flex"?"none":"flex";Object.assign(nav.style,{position:"absolute",top:"84px",left:"0",right:"0",padding:"25px",background:"#0b0e12",flexDirection:"column"})};
