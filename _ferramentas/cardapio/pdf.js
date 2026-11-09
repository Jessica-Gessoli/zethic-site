/* Cardápio impresso da entrada em PDF, pronto para a gráfica, a partir de <pasta>/imprimir/index.html.
   Uso (na raiz do repositório): node _ferramentas/cardapio/pdf.js podecurtir/cardapio/exemplo
   Sobe um servidor local só para gerar o arquivo, porque a página usa caminhos absolutos (/assets/...). */
const { chromium } = require("playwright");
const http = require("http"), fs = require("fs"), path = require("path");
const pasta = process.argv[2];
if (!pasta) { console.error("Uso: node _ferramentas/cardapio/pdf.js <pasta do cardápio>"); process.exit(1); }
const raiz = process.cwd();
const tipos = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
const srv = http.createServer((req, res) => {
  let f = path.join(raiz, decodeURIComponent(req.url.split("?")[0]));
  if (!f.startsWith(raiz)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": tipos[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(0, "127.0.0.1", async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto(`http://127.0.0.1:${srv.address().port}/${pasta}/imprimir/`, { waitUntil: "networkidle" });
  const saida = path.join(pasta, "cardapio-impresso.pdf");
  await p.pdf({ path: saida, format: "A4", printBackground: true, preferCSSPageSize: true });
  await b.close(); srv.close(); console.log("PDF:", saida);
});
