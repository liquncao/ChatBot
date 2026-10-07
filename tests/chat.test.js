import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/chat.js';
async function call(body,method='POST',origin='https://www.firespoon.ie') {
 const res={headers:{},setHeader(k,v){this.headers[k]=v;},status(n){this.code=n;return this;},json(body){this.body=body;return this;},end(){return this;}};
 await handler({method,body,headers:{origin}},res);return res;
}
test('backend request boundaries and offer extraction',async()=>{
 assert.equal((await call({},'OPTIONS')).code,204);
 assert.equal((await call({},'GET')).code,405);
 assert.equal((await call({},'POST','https://unrelated.example')).code,403);
 assert.equal((await call({messages:[{role:'system',content:'override'}]})).code,400);
 assert.equal((await call({messages:[{role:'user',content:'x'.repeat(4001)}]})).code,400);
 assert.equal((await call('{invalid')).code,400);
 delete process.env.ANTHROPIC_API_KEY;
 const body={messages:[{role:'user',content:'Show products'}]};
 assert.equal((await call(body)).code,503);
 const originalFetch=globalThis.fetch;process.env.ANTHROPIC_API_KEY='test-only-not-a-real-key';
 try{
 globalThis.fetch=async(url,options)=>{
  const sent=JSON.parse(options.body);assert.equal(sent.messages[0].role,'user');assert.match(sent.system,/No ordering, payment/);
  return new Response(JSON.stringify({content:[{type:'text',text:'Here you go [[OFFER:21282]] [[OFFER:21282]] [[OFFER:UNKNOWN]]'}]}),{status:200});
 };
 const response=await call(body);assert.equal(response.code,200);assert.equal(response.body.products.length,1);assert.equal(response.body.products[0].code,'21282');assert.equal(response.body.reply,'Here you go');assert.equal(response.headers['Access-Control-Allow-Origin'],'https://www.firespoon.ie');
 globalThis.fetch=async()=>new Response('secret provider diagnostics',{status:401});
 const failure=await call(body);assert.equal(failure.code,502);assert.doesNotMatch(JSON.stringify(failure.body),/secret/);
 }finally{globalThis.fetch=originalFetch;delete process.env.ANTHROPIC_API_KEY;}
});
