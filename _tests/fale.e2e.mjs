// Teste E2E de /fale no Chromium (desktop, mobile, sem JS). Não roda no build do site.
// Requer Playwright: PW=$(npm root -g)/playwright node _tests/fale.e2e.mjs
// Ajuste executablePath se o Chromium estiver em outro local.
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium, devices } = require(process.env.PW);
import http from 'http'; import fs from 'fs';
const html = fs.readFileSync(new URL('../fale.html', import.meta.url));
const srv = http.createServer((q,r)=>{ if(q.url.split('?')[0]==='/fale'){r.writeHead(200,{'content-type':'text/html; charset=utf-8'});r.end(html);} else {r.writeHead(404);r.end();} }).listen(8765);
const BASE='https://wa.me/5519981800221?text=';
const M={def:'Olá! Vim pelo site da Zethic e gostaria de conhecer melhor os serviços de consultoria em cibersegurança, GRC e governança de IA.',
google:'Olá! Encontrei a Zethic no Google e gostaria de conhecer melhor os serviços.',
instagram:'Olá! Vim pelo Instagram da Zethic e gostaria de conhecer melhor os serviços.',
grc:'Olá! Tenho interesse em estruturar GRC na minha empresa e gostaria de conversar.'};
const cases=[['',M.def],['?utm_source=google',M.google],['?utm_source=instagram',M.instagram],['?utm_source=GRC&utm_medium=post&utm_campaign=x&utm_content=y&utm_term=z',M.grc],
['?utm_source=desconhecido',M.def],['?url=https://evil.example&utm_source=%3Cscript%3E',M.def],['?utm_source=__proto__',M.def],['?utm_source=toString',M.def]];
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}); let fail=0;
async function run(ctxOpts,label){ for(const [qs,msg] of cases){ const ctx=await b.newContext(ctxOpts); const p=await ctx.newPage(); let target=null, errs=[];
  p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await p.route('https://wa.me/**',r=>{target=target||r.request().url(); r.fulfill({status:200,body:'ok'});});
  await p.goto('http://localhost:8765/fale'+qs).catch(()=>{}); await p.waitForTimeout(400);
  const exp=BASE+encodeURIComponent(msg); const ok=target===exp && errs.length===0;
  if(!ok)fail++; console.log(ok?'PASS':'FAIL',label,qs||'(sem params)', ok?'':`\n  got=${target}\n  exp=${exp}\n  errs=${errs}`); await ctx.close(); } }
await run({},'desktop'); await run({...devices['iPhone 13']},'mobile');
// sem JS: só meta refresh com mensagem padrão, independente de utm
for(const qs of ['','?utm_source=google']){ const ctx=await b.newContext({javaScriptEnabled:false}); const p=await ctx.newPage(); let target=null;
  await p.route('https://wa.me/**',r=>{target=target||r.request().url(); r.fulfill({status:200,body:'ok'});});
  await p.goto('http://localhost:8765/fale'+qs).catch(()=>{}); await p.waitForTimeout(1500);
  const ok=target===BASE+encodeURIComponent(M.def); if(!ok)fail++; console.log(ok?'PASS':'FAIL','no-js',qs||'(sem params)',ok?'':target); await ctx.close(); }
await b.close(); srv.close(); console.log(fail?`${fail} FALHAS`:'TODOS OS TESTES PASSARAM'); process.exit(fail?1:0);
