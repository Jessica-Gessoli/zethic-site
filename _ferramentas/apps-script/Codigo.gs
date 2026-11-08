/**
 * Pedidos, lembretes, fluxo de caixa e tela de pedidos — Pode Curtir, Jéssica Gessoli e Zethic.
 * Roda grátis no Google Apps Script da conta Google da Jéssica. Sem n8n e sem serviço pago.
 *
 * Instalação: veja LEIA-ME.md, nesta mesma pasta.
 * Propriedades do script (Configurações do projeto → Propriedades do script):
 *   ASAAS_API_KEY  chave de API do Asaas (só você coloca; nunca vai para o site nem para o chat)
 * As demais (PLANILHA_ID, DONO_EMAIL, SEGREDO) são criadas pela função configurar().
 */

var ASAAS_URL = "https://api.asaas.com/v3";
var TETO_MEI = 81000; // conferir o valor vigente com a contabilidade antes de usar como alerta
var ABAS = {
  pedidos: ["Número", "Recebido em", "Nome", "E-mail", "WhatsApp", "Itens", "Valor", "Avisos", "Situação", "Lembretes enviados", "Último lembrete", "Parar", "Página", "Links"],
  vendas: ["Cobrança", "Criada em", "Paga em", "Marca", "Item", "Cliente", "E-mail", "Forma", "Situação no Asaas", "Valor", "Taxa", "Líquido", "Crédito previsto", "Pedido", "Etapa"],
  saidas: ["Data", "Marca", "Descrição", "Categoria", "Valor"],
  whatsapp: ["Data", "Pedido", "Nome", "WhatsApp", "Lembrete", "Mensagem", "Abrir conversa", "Enviado"],
  desistencias: ["Recebida em", "Nome", "E-mail", "Pedido ou data", "Motivo", "Página", "Respondida"],
  resumo: ["Mês", "Marca", "Bruto recebido", "Taxas", "Líquido recebido", "A receber", "Saídas", "Saldo do mês"]
};
var NOMES_ABAS = { pedidos: "Pedidos", vendas: "Vendas", saidas: "Saídas", whatsapp: "WhatsApp", desistencias: "Desistências", resumo: "Resumo" };
var MARCAS = ["Pode Curtir", "Jéssica Gessoli", "Zethic"];
var PAGO = ["RECEIVED", "CONFIRMED", "RECEIVED_IN_CASH"];

/* ---------- Instalação ---------- */

function configurar() {
  var props = PropertiesService.getScriptProperties();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error("Abra o script pela planilha: Extensões → Apps Script.");
  props.setProperty("PLANILHA_ID", ss.getId());
  props.setProperty("DONO_EMAIL", Session.getEffectiveUser().getEmail());
  if (!props.getProperty("SEGREDO")) props.setProperty("SEGREDO", Utilities.getUuid() + Utilities.getUuid());
  Object.keys(ABAS).forEach(function (k) {
    var sh = ss.getSheetByName(NOMES_ABAS[k]) || ss.insertSheet(NOMES_ABAS[k]);
    if (sh.getLastRow() === 0) { sh.appendRow(ABAS[k]); sh.setFrozenRows(1); sh.getRange(1, 1, 1, ABAS[k].length).setFontWeight("bold"); }
  });
  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger("rotina").timeBased().everyMinutes(10).create();
  ScriptApp.newTrigger("limpezaDiaria").timeBased().everyDays(1).atHour(3).create();
  Logger.log("Pronto. Planilha: " + ss.getUrl());
}

/** Rode uma vez depois de colocar a chave do Asaas: mostra no registro os campos de uma cobrança real. */
function testarAsaas() {
  var r = asaas_("/payments?limit=1");
  Logger.log(JSON.stringify(r, null, 2));
}

/* ---------- Endereço público: recebe pedidos do site e o "parar avisos" ---------- */

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var raw = (e && e.postData && e.postData.contents) || "";
    if (raw.length > 20000) return json_({ ok: false, erro: "grande" });
    var p = JSON.parse(raw);
    if (p.tipo === "desistencia") return desistencia_(p);
    var cli = p.cliente || {};
    if (!/^[A-Z]{2}-[A-Z0-9-]{6,40}$/.test(String(p.id || "")) || !/^\S+@\S+\.\S+$/.test(String(cli.email || ""))) return json_({ ok: false, erro: "dados" });
    var sh = aba_("pedidos");
    if (sh.getLastRow() > 1 && sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().some(function (r) { return r[0] === p.id; })) return json_({ ok: true, repetido: true });
    var itens = (p.itens || []).map(function (i) { return String(i.nome || i.id || "").slice(0, 80); });
    var valor = (p.itens || []).reduce(function (s, i) { return s + (Number(i.valor) || 0); }, 0);
    var links = (p.links || []).filter(function (l) { return /^https:\/\/(www\.)?asaas\.com\//.test(String(l.url || "")); })
      .map(function (l) { return String(l.nome || "").slice(0, 80) + " | " + l.url; });
    var situacao = (p.itens || []).length ? "Aguardando pagamento" : "Pedido de proposta";
    sh.appendRow([p.id, new Date(), limpa_(cli.nome, 120), limpa_(cli.email, 120).toLowerCase(), limpa_(cli.whats, 30), itens.join(" + "), valor,
      p.avisos === true ? "Sim" : "Não", situacao, 0, "", "Não", limpa_(p.pagina, 80), links.join("\n")]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, erro: "falha" });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

/** Direito de arrependimento: grava o pedido e avisa a dona por e-mail na hora. */
function desistencia_(p) {
  if (!String(p.nome || "").trim() || !/^\S+@\S+\.\S+$/.test(String(p.email || ""))) return json_({ ok: false, erro: "dados" });
  var linha = [new Date(), limpa_(p.nome, 120), limpa_(p.email, 120).toLowerCase(), limpa_(p.pedido, 120), limpa_(p.motivo, 1000), limpa_(p.pagina, 80), false];
  var sh = aba_("desistencias");
  sh.appendRow(linha);
  sh.getRange(sh.getLastRow(), 7).insertCheckboxes();
  var dono = PropertiesService.getScriptProperties().getProperty("DONO_EMAIL");
  if (dono && MailApp.getRemainingDailyQuota() > 0) {
    MailApp.sendEmail({ to: dono, replyTo: linha[2], subject: "Pedido de desistência: " + linha[1],
      body: "Chegou um pedido de desistência pelo site.\n\nNome: " + linha[1] + "\nE-mail: " + linha[2] + "\nPedido ou data: " + linha[3] +
        "\nMotivo: " + (linha[4] || "(não informado)") + "\n\nPrazo legal de 7 dias corridos. Está na aba Desistências da planilha." });
  }
  return json_({ ok: true });
}

function doGet(e) {
  var q = (e && e.parameter) || {};
  if (q.parar) {
    var ok = q.t === assinatura_(q.parar) && marcarParar_(q.parar);
    return HtmlService.createHtmlOutput('<meta name="viewport" content="width=device-width,initial-scale=1"><p style="font-family:sans-serif;font-size:18px;padding:24px">' +
      (ok ? "Pronto. Você não vai mais receber avisos sobre este pedido." : "Não encontramos este pedido. Se precisar, escreva para podecurtir@zethic.net.") + "</p>");
  }
  if (!ehDono_()) return HtmlService.createHtmlOutput('<p style="font-family:sans-serif;padding:24px">Acesso restrito.</p>');
  return HtmlService.createHtmlOutputFromFile("Painel").setTitle("Pedidos").addMetaTag("viewport", "width=device-width, initial-scale=1");
}

/* ---------- Rotina automática (a cada 10 minutos) ---------- */

function rotina() {
  sincronizar_();
  lembretes_();
  resumo_();
}

function limpezaDiaria() {
  // Privacidade: pedidos não pagos são apagados em até 90 dias.
  var sh = aba_("pedidos"), dados = sh.getDataRange().getValues(), limite = Date.now() - 90 * 864e5;
  for (var i = dados.length - 1; i >= 1; i--) {
    if (dados[i][8] !== "Pago" && new Date(dados[i][1]).getTime() < limite) sh.deleteRow(i + 1);
  }
}

/** Busca cobranças no Asaas (criadas nos últimos 40 dias) e atualiza a aba Vendas. Devolve as que viraram pagas agora. */
function sincronizar_() {
  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty("ASAAS_API_KEY")) return [];
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(15000)) return []; // outra sincronização já está rodando
  try { return sincronizarAgora_(props); } finally { lock.releaseLock(); }
}

function sincronizarAgora_(props) {
  var desde = Utilities.formatDate(new Date(Date.now() - 40 * 864e5), "America/Sao_Paulo", "yyyy-MM-dd");
  var lista = [], offset = 0, pag;
  do {
    pag = asaas_("/payments?dateCreated%5Bge%5D=" + desde + "&limit=100&offset=" + offset);
    lista = lista.concat(pag.data || []);
    offset += 100;
  } while (pag.hasMore && offset < 1000);

  var sh = aba_("vendas"), dados = sh.getDataRange().getValues(), linhaPorId = {};
  for (var i = 1; i < dados.length; i++) linhaPorId[dados[i][0]] = i + 1;
  var novasPagas = [];
  lista.forEach(function (c) {
    var cli = cliente_(c.customer), link = c.paymentLink ? linkNome_(c.paymentLink) : "";
    var mi = marcaEItem_(link || c.description || "");
    var pago = PAGO.indexOf(c.status) >= 0;
    var linha = linhaPorId[c.id];
    var antes = linha ? dados[linha - 1] : null;
    var etapa = antes ? antes[14] : (pago ? "Novo" : "Aguardando");
    if (antes && antes[14] === "Aguardando" && pago) etapa = "Novo";
    var valores = [c.id, data_(c.dateCreated), data_(c.paymentDate || c.clientPaymentDate || c.confirmedDate), antes && antes[3] ? antes[3] : mi.marca,
      mi.item, cli.nome, cli.email, forma_(c.billingType), c.status, Number(c.value) || 0, (Number(c.value) || 0) - (Number(c.netValue) || 0),
      Number(c.netValue) || 0, data_(c.estimatedCreditDate || c.creditDate), antes ? antes[13] : "", etapa];
    if (linha) sh.getRange(linha, 1, 1, valores.length).setValues([valores]);
    else sh.appendRow(valores);
    if (pago && (!antes || PAGO.indexOf(antes[8]) < 0)) novasPagas.push(valores);
  });
  if (novasPagas.length) marcarPedidosPagos_(novasPagas);
  props.setProperty("ULTIMA_SINC", String(Date.now()));
  return novasPagas;
}

function marcarPedidosPagos_(pagas) {
  var sh = aba_("pedidos"), dados = sh.getDataRange().getValues();
  pagas.forEach(function (v) {
    var email = String(v[6] || "").toLowerCase();
    if (!email) return;
    for (var i = dados.length - 1; i >= 1; i--) {
      if (String(dados[i][3]).toLowerCase() === email && dados[i][8] === "Aguardando pagamento") {
        sh.getRange(i + 1, 9).setValue("Pago");
        dados[i][8] = "Pago";
        ligarVendaAoPedido_(v[0], dados[i][0]);
        break;
      }
    }
  });
}

function ligarVendaAoPedido_(cobranca, pedido) {
  var sh = aba_("vendas"), ids = sh.getRange(1, 1, sh.getLastRow(), 1).getValues();
  for (var i = 1; i < ids.length; i++) if (ids[i][0] === cobranca) { sh.getRange(i + 1, 14).setValue(pedido); return; }
}

/* ---------- Lembretes: 1h, 24h e 72h, só para quem marcou a opção ---------- */

function etapaDevida_(horas) { return horas >= 72 ? 3 : horas >= 24 ? 2 : horas >= 1 ? 1 : 0; }

function lembretes_() {
  var sh = aba_("pedidos"), dados = sh.getDataRange().getValues(), agora = Date.now();
  for (var i = 1; i < dados.length; i++) {
    var r = dados[i];
    if (r[8] !== "Aguardando pagamento" || r[7] !== "Sim" || r[11] === "Sim") continue;
    var horas = (agora - new Date(r[1]).getTime()) / 36e5;
    if (horas > 24 * 7) { sh.getRange(i + 1, 9).setValue("Não concluído"); continue; }
    var devida = etapaDevida_(horas), enviados = Number(r[9]) || 0;
    if (devida <= enviados) continue;
    if (MailApp.getRemainingDailyQuota() < 1) return;
    var msg = mensagem_(devida, { numero: r[0], nome: r[2], itens: r[5], valor: r[6], links: r[13] });
    MailApp.sendEmail({ to: r[3], subject: msg.assunto, htmlBody: msg.html, body: msg.texto, name: "Pode Curtir", replyTo: "podecurtir@zethic.net" });
    sh.getRange(i + 1, 10, 1, 2).setValues([[devida, new Date()]]);
    filaWhatsApp_(r, devida, msg.whats);
  }
}

function mensagem_(etapa, p) {
  var primeiro = String(p.nome || "").split(" ")[0] || "tudo bem";
  var valor = "R$ " + Number(p.valor || 0).toLocaleString("pt-BR");
  var links = String(p.links || "").split("\n").filter(String).map(function (l) {
    var x = l.split(" | "); return { nome: x[0], url: x[1] };
  });
  var lista = links.length ? links.map(function (l) { return "• " + l.nome + ": " + l.url; }).join("\n") : "• Loja: https://podecurtir.zethic.net/loja/";
  var parar = urlParar_(p.numero);
  var textos = {
    1: { assunto: "Seu pedido na Pode Curtir ficou em aberto", corpo: "Oi, " + primeiro + "! Você começou um pedido (" + p.itens + ", " + valor + ") e o pagamento ainda não apareceu aqui. Se quiser concluir, é só pagar pelo link:" },
    2: { assunto: "Ficou alguma dúvida sobre o seu pedido?", corpo: "Oi, " + primeiro + ". O seu pedido (" + p.itens + ") continua separado. Se travou em alguma dúvida: você paga por Pix, boleto ou cartão, e tem 7 dias para desistir com devolução integral. É só responder este e-mail ou chamar no WhatsApp (19) 98331-0769. Para concluir:" },
    3: { assunto: "Último aviso sobre o seu pedido", corpo: "Oi, " + primeiro + ". Este é o último aviso sobre o pedido " + p.numero + " (" + p.itens + "). Depois dele, não mandamos mais mensagens sobre este pedido. Se ainda quiser concluir:" }
  };
  var t = textos[etapa];
  var rodape = "Pedido " + p.numero + " · Pode Curtir · CNPJ 67.678.226/0001-17 · podecurtir@zethic.net · WhatsApp (19) 98331-0769";
  var texto = t.corpo + "\n\n" + lista + "\n\nNão quer mais receber avisos sobre este pedido? " + parar + "\n\n" + rodape;
  var html = '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#1d1b20;max-width:560px">' +
    "<p>" + esc_(t.corpo) + "</p><ul>" +
    (links.length ? links.map(function (l) { return '<li><a href="' + esc_(l.url) + '">' + esc_(l.nome) + "</a></li>"; }).join("") : '<li><a href="https://podecurtir.zethic.net/loja/">Loja Pode Curtir</a></li>') +
    '</ul><p style="font-size:13px;color:#5f5e5a"><a href="' + esc_(parar) + '">Não quero mais receber avisos sobre este pedido</a> · ou responda PARAR.</p>' +
    '<p style="font-size:12px;color:#888780">' + esc_(rodape) + "</p></div>";
  var whats = t.corpo + "\n" + lista;
  return { assunto: t.assunto, html: html, texto: texto, whats: whats };
}

function filaWhatsApp_(r, etapa, texto) {
  var numero = String(r[4] || "").replace(/\D/g, "");
  if (numero.length < 10) return;
  if (numero.indexOf("55") !== 0) numero = "55" + numero;
  var url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(texto);
  aba_("whatsapp").appendRow([new Date(), r[0], r[2], r[4], etapa + "º", texto, '=HYPERLINK("' + url + '";"Abrir")', false]);
  var sh = aba_("whatsapp");
  sh.getRange(sh.getLastRow(), 8).insertCheckboxes();
}

/* ---------- Fluxo de caixa ---------- */

function resumo_() {
  var vendas = aba_("vendas").getDataRange().getValues().slice(1);
  var saidas = aba_("saidas").getDataRange().getValues().slice(1);
  var mapa = {};
  function chave(mes, marca) { var k = mes + "|" + marca; if (!mapa[k]) mapa[k] = { mes: mes, marca: marca, bruto: 0, taxa: 0, liquido: 0, receber: 0, saidas: 0 }; return mapa[k]; }
  vendas.forEach(function (v) {
    if (PAGO.indexOf(v[8]) < 0) return;
    var quando = v[2] || v[1]; if (!quando) return;
    var m = chave(Utilities.formatDate(new Date(quando), "America/Sao_Paulo", "yyyy-MM"), v[3] || "Sem marca");
    m.bruto += Number(v[9]) || 0; m.taxa += Number(v[10]) || 0;
    if (v[8] === "CONFIRMED") m.receber += Number(v[11]) || 0; else m.liquido += Number(v[11]) || 0;
  });
  saidas.forEach(function (s) {
    if (!s[0]) return;
    chave(Utilities.formatDate(new Date(s[0]), "America/Sao_Paulo", "yyyy-MM"), s[1] || "Sem marca").saidas += Number(s[4]) || 0;
  });
  var linhas = Object.keys(mapa).sort().map(function (k) {
    var m = mapa[k]; return [m.mes, m.marca, m.bruto, m.taxa, m.liquido, m.receber, m.saidas, m.liquido - m.saidas];
  });
  var sh = aba_("resumo");
  sh.getRange(2, 1, Math.max(sh.getMaxRows() - 1, 1), 10).clearContent();
  if (linhas.length) sh.getRange(2, 1, linhas.length, 8).setValues(linhas);
  var ano = Utilities.formatDate(new Date(), "America/Sao_Paulo", "yyyy");
  var brutoAno = linhas.filter(function (l) { return l[0].indexOf(ano) === 0; }).reduce(function (s, l) { return s + l[2]; }, 0);
  sh.getRange(1, 10).setValue("Faturamento bruto de " + ano + " (as três marcas, um CNPJ)");
  sh.getRange(2, 10).setValue(brutoAno);
  sh.getRange(3, 10).setValue("Teto do MEI usado: " + Math.round(brutoAno / TETO_MEI * 100) + "% de R$ " + TETO_MEI.toLocaleString("pt-BR"));
}

/* ---------- Tela de pedidos (só abre com a conta da dona) ---------- */

function painelDados() {
  if (!ehDono_()) throw new Error("Acesso restrito.");
  var props = PropertiesService.getScriptProperties();
  var novas = [];
  if (Date.now() - Number(props.getProperty("ULTIMA_SINC") || 0) > 25000) novas = sincronizar_();
  var limite = Date.now() - 30 * 864e5;
  var vendas = aba_("vendas").getDataRange().getValues().slice(1)
    .filter(function (v) { return PAGO.indexOf(v[8]) >= 0 && new Date(v[2] || v[1]).getTime() > limite; })
    .map(function (v) { return { id: v[0], quando: v[2] || v[1] ? new Date(v[2] || v[1]).toISOString() : "", marca: v[3], item: v[4], cliente: v[5], forma: v[7], valor: v[9], etapa: v[14] || "Novo", pedido: v[13] }; });
  var aguardando = aba_("pedidos").getDataRange().getValues().slice(1)
    .filter(function (p) { return p[8] === "Aguardando pagamento"; })
    .map(function (p) { return { numero: p[0], quando: new Date(p[1]).toISOString(), nome: p[2], itens: p[5], valor: p[6], avisos: p[7] }; });
  return { vendas: vendas, aguardando: aguardando, novas: novas.map(function (v) { return v[0]; }), agora: new Date().toISOString() };
}

function moverVenda(id, etapa) {
  if (!ehDono_()) throw new Error("Acesso restrito.");
  if (["Novo", "Em produção", "Entregue"].indexOf(etapa) < 0) throw new Error("Etapa inválida.");
  var sh = aba_("vendas"), ids = sh.getRange(1, 1, sh.getLastRow(), 1).getValues();
  for (var i = 1; i < ids.length; i++) if (ids[i][0] === id) { sh.getRange(i + 1, 15).setValue(etapa); return true; }
  return false;
}

/* ---------- Apoio ---------- */

function asaas_(caminho) {
  var key = PropertiesService.getScriptProperties().getProperty("ASAAS_API_KEY");
  var r = UrlFetchApp.fetch(ASAAS_URL + caminho, { headers: { access_token: key, "User-Agent": "PodeCurtir-AppsScript" }, muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) throw new Error("Asaas respondeu " + r.getResponseCode() + " em " + caminho.split("?")[0]);
  return JSON.parse(r.getContentText());
}

function cliente_(id) {
  if (!id) return { nome: "", email: "" };
  var cache = CacheService.getScriptCache(), k = "cli_" + id, c = cache.get(k);
  if (c) return JSON.parse(c);
  var r = asaas_("/customers/" + id), v = { nome: r.name || "", email: String(r.email || "").toLowerCase() };
  cache.put(k, JSON.stringify(v), 21600);
  return v;
}

function linkNome_(id) {
  var props = PropertiesService.getScriptProperties(), k = "link_" + id, v = props.getProperty(k);
  if (v) return v;
  try { v = asaas_("/paymentLinks/" + id).name || ""; } catch (e) { v = ""; }
  if (v) props.setProperty(k, v);
  return v;
}

function marcaEItem_(nome) {
  nome = String(nome || "");
  for (var i = 0; i < MARCAS.length; i++) {
    if (nome.indexOf(MARCAS[i] + " · ") === 0) return { marca: MARCAS[i], item: nome.slice(MARCAS[i].length + 3) };
  }
  return { marca: "Sem marca", item: nome };
}

function forma_(b) { return { PIX: "Pix", BOLETO: "Boleto", CREDIT_CARD: "Cartão", UNDEFINED: "A escolher" }[b] || b || ""; }
function data_(s) { return s ? new Date(String(s).length === 10 ? s + "T12:00:00-03:00" : s.replace(" ", "T") + "-03:00") : ""; }
function limpa_(s, n) { return String(s || "").replace(/^[=+\-@]/, "'$&").slice(0, n); }
function esc_(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function aba_(k) { return SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty("PLANILHA_ID")).getSheetByName(NOMES_ABAS[k]); }

function ehDono_() {
  var dono = PropertiesService.getScriptProperties().getProperty("DONO_EMAIL");
  var quem = Session.getActiveUser().getEmail();
  return !!dono && !!quem && quem.toLowerCase() === dono.toLowerCase();
}

function assinatura_(numero) {
  var seg = PropertiesService.getScriptProperties().getProperty("SEGREDO");
  return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(String(numero), seg)).slice(0, 22);
}

function urlParar_(numero) {
  // URL_PUBLICA: endereço /exec da implantação "Qualquer pessoa" (passo 6 do LEIA-ME).
  var base = PropertiesService.getScriptProperties().getProperty("URL_PUBLICA") || ScriptApp.getService().getUrl() || "";
  return base + "?parar=" + encodeURIComponent(numero) + "&t=" + assinatura_(numero);
}

function marcarParar_(numero) {
  var sh = aba_("pedidos"), ids = sh.getRange(1, 1, sh.getLastRow(), 1).getValues();
  for (var i = 1; i < ids.length; i++) if (ids[i][0] === numero) { sh.getRange(i + 1, 12).setValue("Sim"); return true; }
  return false;
}
