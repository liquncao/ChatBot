import { formatReply } from './chatbot/format.js';
import { SPECIAL_OFFERS } from './chatbot/catalogue.js';
import { chatConfig } from './chatbot/config.js';

const chat = document.getElementById('demo-chat');
const input = document.getElementById('demo-input');
const send = document.getElementById('demo-send');
const form = document.getElementById('chat-form');
const status = document.getElementById('demo-status');
const reset = document.getElementById('chat-reset');
const prompts = [...document.querySelectorAll('[data-topic]')];
const topics = {
  all: {text:'Explore these sample products. Select a category to narrow the range.', codes:SPECIAL_OFFERS.map(p=>p.code), question:'What products can you show me?'},
  tiling: {text:'A bathroom floor starts with the right substrate, adhesive and waterproofing. These are examples from the catalogue; suitability depends on your tiles and surface.',codes:['CTA20FW','5571'], question:'I am tiling a bathroom floor. What do I need to consider?'},
  garden: {text:'Planning a garden job? Here are sample paving and timbercare products. Check the surface, finish and coverage before choosing.',codes:['37628','FOG40040S'],question:'I am working on my garden. Can you help me choose materials?'},
  tools: {text:'A few tools from the sample range. Match the tool to the material, task and equipment you already use.',codes:['21282','DEWDT1963QZ','BAH24422PN'],question:'Help me choose tools for my next job.'}
};
let messages = [];
let busy = false;
let controller;
const known = new Map(SPECIAL_OFFERS.map(p=>[p.code,p]));
function bubble(text, role='assistant') {
  const el=document.createElement('div');
  el.className='demo-msg '+(role==='user'?'user':'bot');
  if(role==='user') el.textContent=text;
  else el.innerHTML=formatReply(text);
  chat.append(el);
}
function cards(products) {
  const grid=document.createElement('div');grid.className='chat-products';
  for(const product of products) {
    // Only display known catalogue assets, never arbitrary model-provided image URLs.
    const p=known.get(product.code);if(!p)continue;
    const card=document.createElement('article');card.className='chat-product';
    const img=document.createElement('img');img.src='/chatbot/img/'+p.img;img.alt=p.name;img.loading='lazy';img.width=180;img.height=130;
    const title=document.createElement('h3');title.textContent=p.name;
    const desc=document.createElement('p');desc.textContent=p.blurb;
    const price=document.createElement('strong');price.textContent='€'+Number(p.price).toFixed(2)+' ex VAT';
    const note=document.createElement('small');note.textContent='Sample guide price';
    card.append(img,title,desc,price,note);grid.append(card);
  }
  if(grid.childElementCount)chat.append(grid);
}
function preview(key) {
  const topic=topics[key];chat.replaceChildren();bubble(topic.text);cards(topic.codes.map(code=>known.get(code)));
  prompts.forEach(b=>{const selected=b.dataset.topic===key;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});
  chat.scrollTop=0;
}
function setBusy(value) {
  busy=value;send.disabled=value;input.disabled=value;reset.disabled=value;
  prompts.forEach(b=>b.disabled=value);chat.setAttribute('aria-busy',String(value));
}
async function submit(text) {
  const content=text.trim();if(!content||busy)return;
  if(messages.length>=38){status.textContent='Please start a new conversation.';return;}
  const next=[...messages,{role:'user',content}];
  bubble(content,'user');input.value='';setBusy(true);status.textContent='Finding an answer…';
  controller=new AbortController();const timer=setTimeout(()=>controller.abort(),30000);
  try {
    const response=await fetch(chatConfig.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:next}),signal:controller.signal,credentials:'omit'});
    if(!response.ok)throw Error('unavailable');
    const data=await response.json();if(typeof data.reply!=='string'||!data.reply.trim())throw Error('invalid');
    messages=[...next,{role:'assistant',content:data.reply}];bubble(data.reply);cards(Array.isArray(data.products)?data.products:[]);status.textContent='Ready';
  } catch {
    bubble('The chat is unavailable at the moment. Please try again, or book a guided demo.');
    input.value=content;status.textContent='Message not sent — you can retry.';
  } finally {
    clearTimeout(timer);setBusy(false);chat.scrollTop=chat.scrollHeight;
    // Do not reopen the phone keyboard after a user has moved elsewhere.
    if(document.activeElement===send)input.focus();
  }
}
prompts.forEach(b=>b.addEventListener('click',()=>chatConfig.liveEnabled?submit(topics[b.dataset.topic].question):preview(b.dataset.topic)));
form.addEventListener('submit',e=>{e.preventDefault();submit(input.value);});
function start() {messages=[];chat.replaceChildren();bubble('Hi, what are you working on? I’ll help you find suitable materials.');status.textContent='Ready';}
reset.addEventListener('click',()=>{if(!busy){start();input.value='';input.focus();}});
if(chatConfig.liveEnabled) {
  form.hidden=false;reset.hidden=false;
  document.getElementById('chat-description').textContent='Ask a question or choose a starting point. This AI demo uses sample products and guide prices excluding VAT; stock and ordering are not connected.';
  document.getElementById('chat-privacy').textContent='AI demo using a sample catalogue. Messages are processed by our AI provider. Please don’t share personal details. No orders or enquiries are submitted here.';
  start();
} else preview('all');
document.querySelectorAll('[data-scroll-demo]').forEach(b=>b.addEventListener('click',()=>document.getElementById('demo').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})));
