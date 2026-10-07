import test from 'node:test';
import assert from 'node:assert/strict';
import {formatReply} from '../chatbot/format.js';
import handler from '../api/chat.js';
test('assistant formatting supports bold and lists while escaping markup',()=>{
 const html=formatReply('**Floor type**\n\n1. Concrete\n2. Timber\n\n- Tiles\n<img src=x onerror=alert(1)>');
 assert.match(html,/<strong>Floor type<\/strong>/);assert.match(html,/<ol><li>Concrete<\/li><li>Timber<\/li><\/ol>/);assert.match(html,/<ul><li>Tiles<\/li><\/ul>/);assert.ok(!html.includes('<img'));assert.match(html,/&lt;img/);
 assert.ok(!formatReply('**<script>alert(1)</script>**').includes('<script>'));
});
test('browse starter returns three catalogue cards without an AI call',async()=>{
 const old=globalThis.fetch;globalThis.fetch=()=>{throw Error('Unexpected AI call');};
 const res={setHeader(){},status(n){this.code=n;return this;},json(b){this.body=b;return this;}};
 try{await handler({method:'POST',headers:{},body:{messages:[{role:'user',content:'What products can you show me?'}]}},res);assert.equal(res.code,200);assert.equal(res.body.products.length,3);assert.ok(res.body.reply.split(' ').length<25);}finally{globalThis.fetch=old;}
});
