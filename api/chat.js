import {SYSTEM_PROMPT, SPECIAL_OFFERS} from '../catalogue.js';
const defaults=['https://firespoon.netlify.app','https://irishhardware.vercel.app','https://firespoon.ie','https://www.firespoon.ie','https://firespoon-redesign.liqun-cao.chatgpt.site'];
export default async function handler(req,res) {
  const origin=req.headers?.origin;
  const allowed=(process.env.ALLOWED_ORIGINS||defaults.join(',')).split(',').map(s=>s.trim()).filter(Boolean);
  res.setHeader('Vary','Origin');res.setHeader('Cache-Control','no-store');
  const sameOrigin=origin&&req.headers?.host&&origin===`https://${req.headers.host}`;
  if(origin&&!sameOrigin&&!allowed.includes(origin))return res.status(403).json({error:'Origin not allowed'});
  if(origin)res.setHeader('Access-Control-Allow-Origin',origin);
  res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(req.method==='OPTIONS')return res.status(204).end();
  if(req.method!=='POST')return res.status(405).json({error:'Method not allowed'});
  let body=req.body;
  try{if(typeof body==='string')body=JSON.parse(body);}catch{return res.status(400).json({error:'Invalid request'});}
  const messages=body?.messages;
  if(!Array.isArray(messages)||!messages.length||messages.length>40||messages.some((m,i)=>!m||m.role!==(i%2===0?'user':'assistant')||typeof m.content!=='string'||!m.content.trim()||m.content.length>4000)||messages.at(-1).role!=='user'||messages.reduce((n,m)=>n+m.content.length,0)>24000)return res.status(400).json({error:'Invalid conversation'});
  const browse=/^(what products can you show me|show me (some )?products|browse products)[?.!]*$/i.test(messages.at(-1).content.trim());
  if(browse){
    const products=['CTA20FW','21282','37628'].map(code=>SPECIAL_OFFERS.find(p=>p.code===code)).filter(Boolean).map(p=>({code:p.code,name:p.name,price:p.price,img:'/img/'+p.img,blurb:p.blurb}));
    return res.status(200).json({reply:'Here are a few examples from the sample catalogue. What are you working on?',products});
  }
  if(!process.env.ANTHROPIC_API_KEY)return res.status(503).json({error:'Assistant unavailable'});
  try {
    const upstream=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':process.env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01'},body:JSON.stringify({model:process.env.ANTHROPIC_MODEL||'claude-haiku-4-5-20251001',max_tokens:700,system:SYSTEM_PROMPT,messages:messages.map(({role,content})=>({role,content}))}),signal:AbortSignal.timeout(25000)});
    if(!upstream.ok)return res.status(upstream.status===429?429:502).json({error:'Assistant unavailable. Please try again.'});
    const data=await upstream.json();let reply=(data.content||[]).filter(b=>b.type==='text').map(b=>b.text).join('\n').trim();
    const products=[],seen=new Set();
    reply=reply.replace(/\[\[OFFER:\s*([A-Za-z0-9]+)\s*\]\]/g,(_,code)=>{const p=SPECIAL_OFFERS.find(p=>p.code.toUpperCase()===code.toUpperCase());if(p&&!seen.has(p.code)){seen.add(p.code);products.push({code:p.code,name:p.name,price:p.price,img:'/img/'+p.img,blurb:p.blurb});}return '';}).trim();
    if(!reply&&!products.length)return res.status(502).json({error:'Assistant unavailable'});
    return res.status(200).json({reply:reply||'Here are some sample products to explore.',products});
  }catch{return res.status(502).json({error:'Assistant unavailable. Please try again.'});}
}
