/* Jéssica Gessoli — loja com carrinho (/jessicagessoli/loja). Valores aprovados pela Jéssica em 03/11/2026:
   consultoria R$ 400 por hora, mentoria de posicionamento (sessão avulsa R$ 400; programa de 3 meses com 8 sessões
   R$ 3.200) e aula ao vivo "IA segura para o seu Negócio" (R$ 97). Checkup Black Friday Segura (R$ 297), aprovado em
   06/11/2026: 8 vagas, vendido de 13/11 a 25/11/2026 (CHECKUP_VENDAS_DE e CHECKUP_VENDAS_ATE na configuração). Os outros serviços entram como pedido de proposta.
   Pagamento pelo link do Asaas de cada item (ASAAS_LINKS em jessicagessoli-config.js). Com vários itens pagos,
   usa o CHECKOUT_ENDPOINT (n8n) se estiver preenchido; senão, mostra o link de cada item.
   04/11/2026 (decisão da Jéssica, como na loja da Pode Curtir): no site o pagamento é integral. O programa de
   3 meses tem dois links: _pix (Pix ou boleto, à vista) e _cartao (cartão em até 3x sem juros).
   06/11/2026: entram a conversa de escopo, a proteção das contas, os pacotes Essenciais e a palestra online.
   07/11/2026 (aprovado pela Jéssica): compra rápida do Checkup e da aula. O botão "Comprar agora" e o endereço
   ?comprar=<id> (usado nos anúncios e na página do Checkup) vão direto ao resumo do contrato, sem passar pelo pedido.
   Num pedido só com itens rápidos, o WhatsApp é opcional: o Asaas já pede o telefone no pagamento. */
(function () {
  var C = window.JESSICAGESSOLI || {};
  var LINKS = C.ASAAS_LINKS || {};
  var brl = function (v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 2 }); };
  var $ = function (id) { return document.getElementById(id); };
  var AULA_DATA = String(C.AULA_DATA || "").trim();
  /* Datas de venda do Checkup, comparadas no horário de Brasília (AAAA-MM-DD).
     A data é conferida de novo a cada cálculo do pedido: com a página aberta de um dia para o outro, o Checkup
     sai do total e do pagamento quando a venda fecha. */
  var hoje = function () { return new Date(Date.now() - 3 * 3600 * 1000).toISOString().slice(0, 10); };
  var HOJE = hoje();
  var CK_DE = String(C.CHECKUP_VENDAS_DE || "").trim(), CK_ATE = String(C.CHECKUP_VENDAS_ATE || "").trim();
  var dataBR = function (d) { return d.split("-").reverse().slice(0, 2).join("/"); };
  var ckAberto = function () { var h = hoje(); return (!CK_DE || h >= CK_DE) && (!CK_ATE || h <= CK_ATE); };
  var ckEncerrado = !!CK_ATE && HOJE > CK_ATE;
  /* Aula (07/11/2026): abre e fecha sozinha pelas datas da configuração, como o Checkup. */
  var AU_DE = String(C.AULA_VENDAS_DE || "").trim(), AU_ATE = String(C.AULA_VENDAS_ATE || "").trim();
  var aulaAberta = function () { var h = hoje(); return !!AULA_DATA && (!AU_DE || h >= AU_DE) && (!AU_ATE || h <= AU_ATE); };
  var aulaPassou = !!AU_ATE && HOJE > AU_ATE;

  var ITENS = [
    /* 09/11/2026 (decisão da Jéssica): a consultoria vira um pacote de 2 horas pelo preço de 1, como a consulta com advogado:
       1 hora de consulta + 1 hora de retorno, em até 30 dias, sobre o mesmo tema. */
    { id: "consultoria", nome: "Consulta com retorno · 1 hora + 1 hora de retorno", preco: 400, agora: 1, quando: "Consulta com data combinada por e-mail ou WhatsApp depois do pagamento; retorno em até 30 dias",
      desc: "Uma hora por videochamada para levar uma decisão de cibersegurança ou de IA e mais uma hora de retorno, em até 30 dias, para as dúvidas que surgirem quando você aplicar a orientação. Se você fechar um projeto em até 30 dias, os R$ 400 são abatidos." },
    { id: "checkup", nome: "Checkup Black Friday Segura", preco: 297, agora: 1, checkup: true, rapido: true, quando: "8 vagas, com agendamento até 25/11/2026, por videochamada",
      desc: "Revisão, antes da Black Friday, dos pontos por onde o golpe entra: contas e perfis da loja, pagamentos e comprovantes, e a equipe que atende. Você sai sabendo o que corrigir primeiro." },
    { id: "sessao", nome: "Mentoria de posicionamento · sessão avulsa", preco: 400, agora: 1, quando: "Data combinada por e-mail ou WhatsApp depois do pagamento",
      desc: "Uma sessão individual de 1 hora, por videochamada, para destravar uma decisão de carreira ou do seu Negócio." },
    { id: "programa", nome: "Mentoria de posicionamento · programa de 3 meses", preco: 3200, agora: 1, parcelas: 3, em: "no", quando: "8 sessões individuais em 3 meses, com datas combinadas por e-mail ou WhatsApp",
      desc: "Para definir com clareza onde você ou o seu Negócio quer chegar e como se posicionar para chegar lá." },
    { id: "aula", nome: "Aula ao vivo · IA segura para o seu Negócio", preco: 97, agora: 1, aula: true, rapido: true, quando: AULA_DATA && !aulaPassou ? AULA_DATA + ", online" : "",
      desc: "Como usar IA no dia a dia do Negócio sem expor dados de clientes. Online e ao vivo." },
    /* 06/11/2026 (decisão da Jéssica: o máximo possível em compra online): pacotes de escopo fechado e a conversa de escopo paga.
       O que passa do limite de cada pacote continua como pedido de proposta. */
    { id: "escopo", nome: "Conversa de escopo · 1 hora", preco: 400, agora: 1, quando: "Data e horário escolhidos depois do pagamento",
      desc: "Uma hora por videochamada para entender o seu caso e montar a proposta de um projeto. Se você fechar o projeto em até 30 dias, os R$ 400 são abatidos do valor." },
    { id: "antigolpe_essencial", nome: "Programa Antigolpe Essencial · até 20 pessoas", preco: 2500, agora: 1, parcelas: 3, em: "no", quando: "Datas combinadas por escrito depois do pagamento",
      desc: "Para o Negócio com até 20 pessoas: 1 treinamento ao vivo online de 2 horas sobre os golpes mais comuns, regras escritas contra pagamento indevido e 1 hora com o dono para ajustar as regras." },
    { id: "diagnostico_essencial", nome: "Diagnóstico de Cibersegurança e IA Essencial · até 20 pessoas", preco: 7500, agora: 1, parcelas: 6, em: "no", quando: "Prazo combinado por escrito depois do pagamento",
      desc: "Para o Negócio com até 20 pessoas: entrevistas online, levantamento de contas, pagamentos, dados e uso de IA, relatório em linguagem de dono com o que resolver primeiro e reunião de apresentação." },
    { id: "palestra_online", nome: "Palestra online · 1 hora", preco: 5000, agora: 1, quando: "Data combinada por escrito depois do pagamento",
      desc: "Palestra ao vivo e online sobre golpes digitais, risco cibernético ou uso seguro de IA, com perguntas do público." }
  ];
  var PROPOSTAS = [
    { id: "diagnostico", nome: "Diagnóstico de Cibersegurança e IA · acima de 20 pessoas", desc: "Onde o seu Negócio pode perder dinheiro com golpe, vazamento de dados ou IA sem regra, e o que resolver primeiro." },
    { id: "antigolpe", nome: "Programa Antigolpe · acima de 20 pessoas", desc: "Equipe que reconhece golpes, regras que impedem pagamento indevido e cultura em que reportar não gera culpa." },
    { id: "governanca", nome: "Governança de IA, de segurança, privacidade e LGPD", desc: "IA usada com regras e controles, dados pessoais tratados com responsabilidade e respostas aos questionários de segurança dos clientes." },
    { id: "ia", nome: "Mentoria e consultoria em IA", desc: "Você aprende a fazer com IA, no seu próprio projeto. Exemplo: montar o seu fluxo de edição de vídeo." },
    { id: "conselheira", nome: "Conselheira de Risco", desc: "Acompanhamento mensal da diretoria nas decisões de risco cibernético e de IA." },
    { id: "projetos", nome: "Projetos para grandes organizações", desc: "Tecnologia operacional, infraestrutura crítica e programas de governança em operações reguladas." },
    { id: "capacitacao", nome: "Capacitação em IA para empresas", desc: "Treinamento da equipe para usar IA com regras claras e sem expor dados da empresa." },
    { id: "treinamento", nome: "Treinamento técnico", desc: "Cibersegurança e IA para equipes técnicas, adaptado à operação da empresa." },
    { id: "palestra", nome: "Palestra presencial, painéis e eventos", desc: "Palestra presencial, painel, mediação ou apresentação de palco. O deslocamento entra na proposta." }
  ];
  /* Sem data marcada, a aula não é vendida: vira um pedido de aviso da próxima turma. */
  /* Depois do último dia de venda, o Checkup sai da loja. */
  if (ckEncerrado) ITENS = ITENS.filter(function (p) { return !p.checkup; });
  if (!aulaAberta()) PROPOSTAS.push({ id: "aula-aviso", nome: "Aviso da próxima turma da aula ao vivo", aviso: true, desc: "Sem pagamento. Você recebe a data por e-mail quando as inscrições abrirem." });

  var CHAVE = "jessicagessoli-carrinho-v1";
  var cart = { itens: [], prop: [] };
  try {
    var salvo = JSON.parse(sessionStorage.getItem(CHAVE) || "null");
    if (salvo && Array.isArray(salvo.itens) && Array.isArray(salvo.prop)) cart = { itens: salvo.itens, prop: salvo.prop };
  } catch (e) {}
  function salvar() { try { sessionStorage.setItem(CHAVE, JSON.stringify(cart)); } catch (e) {} }
  var resumoAceito = null;

  function tem(lista, id) { return lista.indexOf(id) >= 0; }
  function alterna(lista, id) { var i = lista.indexOf(id); if (i >= 0) lista.splice(i, 1); else lista.push(id); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function vendivel(p) { return (!p.aula || aulaAberta()) && (!p.checkup || ckAberto()); }
  /* Formas de pagamento de cada item. Parcelado só no cartão; Pix e boleto sempre à vista. */
  function formas(p) { return p.parcelas ? "Pix ou boleto à vista, ou cartão em até " + p.parcelas + "x sem juros" : "Pix, boleto ou cartão, à vista"; }
  function forma() { var r = document.querySelector('input[name="forma"]:checked'); return r ? r.value : ""; }
  function linkDe(p) { return LINKS[p.parcelas ? p.id + "_" + forma() : p.id]; }
  function comoPaga(p) { return p.parcelas ? (forma() === "cartao" ? "no cartão, em até " + p.parcelas + "x sem juros" : "no Pix ou boleto, à vista") : ""; }
  function pagamento(p) { return "Integral, " + brl(p.preco) + ": " + formas(p); }

  /* Volta para o serviço na página principal. O endereço vem do link do cabeçalho, que muda no site próprio da marca. */
  var SOBRE = { consultoria: "ia", checkup: "checkup", sessao: "mentoria", programa: "mentoria", aula: "checkup", escopo: "consultoria",
    antigolpe_essencial: "antigolpe", diagnostico_essencial: "diagnostico", palestra_online: "palestras",
    diagnostico: "diagnostico", antigolpe: "antigolpe", governanca: "governanca", ia: "ia", conselheira: "comecar",
    projetos: "consultoria", capacitacao: "capacitacao", treinamento: "treinamento", palestra: "palestras" };
  function saiba(id) {
    var marca = document.querySelector(".top .mark");
    return SOBRE[id] && marca ? '<a class="saiba" href="' + marca.getAttribute("href") + "#" + SOBRE[id] + '">Saiba mais sobre o serviço</a>' : "";
  }
  /* Quem chega por um link de serviço (#item-checkup, #proposta-ia) vê o item destacado. */
  function destacar(suave) {
    var h = (location.hash || "").slice(1);
    if (!/^(item|proposta)-[\w-]+$/.test(h)) return;
    var el = document.getElementById(h);
    if (!el) return;
    el.classList.add("destaque");
    var reduz = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: suave && !reduz ? "smooth" : "auto", block: "center" });
  }

  function catalogo() {
    $("grade-itens").innerHTML = ITENS.map(function (p) {
      var on = tem(cart.itens, p.id);
      var botao = p.checkup && !vendivel(p)
        ? '<button class="por por-aviso" type="button" disabled>Vendas a partir de ' + dataBR(CK_DE) + "</button>"
        : vendivel(p)
        ? (p.rapido ? '<button class="por por-agora" type="button" data-comprar="' + p.id + '">Comprar agora</button>' : "") +
          '<button class="por' + (p.rapido ? " por-linha" : "") + '" type="button" data-item="' + p.id + '" aria-pressed="' + on + '">' + (on ? "No pedido · tirar" : "Pôr no pedido") + "</button>"
        : '<button class="por por-aviso" type="button" data-prop="aula-aviso" aria-pressed="' + tem(cart.prop, "aula-aviso") + '">' + (tem(cart.prop, "aula-aviso") ? "Aviso pedido · tirar" : "Avise-me quando abrir") + "</button>";
      return '<article class="item" id="item-' + p.id + '"><h3>' + p.nome + '</h3><p class="preco num">' + brl(p.preco) + "</p><p>" + p.desc + "</p>" +
        '<dl class="meta"><div><dt>' + (p.aula ? "Data" : "Quando") + "</dt><dd>" + (vendivel(p) || p.checkup || (p.aula && AULA_DATA && !aulaPassou) ? esc(p.quando) + (p.aula && !vendivel(p) && AU_DE ? " · vendas a partir de " + dataBR(AU_DE) : "") : "Data em breve") + "</dd></div>" +
        '<div><dt>Pagamento</dt><dd>' + pagamento(p) + "</dd></div></dl>" + saiba(p.id) + botao + "</article>";
    }).join("");
    $("lista-propostas").innerHTML = PROPOSTAS.filter(function (a) { return !a.aviso; }).map(function (a) {
      var on = tem(cart.prop, a.id);
      return '<div class="proposta" id="proposta-' + a.id + '"><div><strong>' + a.nome + "</strong><p>" + a.desc + "</p>" + saiba(a.id) + "</div>" +
        '<button class="pedir" type="button" data-prop="' + a.id + '" aria-pressed="' + on + '">' + (on ? "Pedido · tirar" : "Pedir proposta") + "</button></div>";
    }).join("");
  }

  function totais() {
    var hoje = 0, pagos = [];
    ITENS.forEach(function (p) {
      if (tem(cart.itens, p.id) && vendivel(p)) { hoje += p.preco; pagos.push({ id: p.id, nome: p.nome, valor: p.preco, parcelas: p.parcelas || 0, em: p.em || "" }); }
    });
    var props = cart.prop.filter(function (id) { return PROPOSTAS.some(function (a) { return a.id === id; }); }).length;
    return { hoje: hoje, pagos: pagos, props: props, total: pagos.length + props };
  }

  function linhas(comTirar) {
    var out = [];
    ITENS.forEach(function (p) {
      if (!tem(cart.itens, p.id) || !vendivel(p)) return;
      out.push("<li><span>" + p.nome + '</span><span class="num">' + brl(p.preco) + "</span><small>Pagamento integral · " + formas(p) + "</small>" +
        (comTirar ? '<button class="tirar" type="button" data-item="' + p.id + '">Tirar</button>' : "") + "</li>");
    });
    PROPOSTAS.forEach(function (a) {
      if (!tem(cart.prop, a.id)) return;
      out.push("<li><span>" + a.nome + "</span><span>" + (a.aviso ? "aviso" : "proposta") + "</span><small>Sem valor agora</small>" +
        (comTirar ? '<button class="tirar" type="button" data-prop="' + a.id + '">Tirar</button>' : "") + "</li>");
    });
    return out.join("");
  }

  function blocoTotais(t) {
    var h = "";
    if (t.pagos.length) h += '<div class="hoje"><span>Paga hoje</span><span class="num">' + brl(t.hoje) + "</span></div>";
    if (t.props) h += '<div><span>Pedidos sem pagamento</span><span class="num">' + t.props + "</span></div>";
    return h;
  }

  function carrinho() {
    var t = totais();
    $("contador").textContent = t.total;
    $("linhas").innerHTML = linhas(true);
    $("vazio").hidden = t.total > 0;
    $("totais").innerHTML = blocoTotais(t);
    $("totais").hidden = t.total === 0;
    $("continuar").disabled = t.total === 0;
    $("continuar").textContent = t.pagos.length ? "Continuar para o pagamento" : (t.total ? "Continuar para enviar o pedido" : "Continuar");
  }

  function tudo() { catalogo(); carrinho(); salvar(); }

  document.addEventListener("click", function (e) {
    var r = e.target.closest && e.target.closest("[data-comprar]");
    if (r && !$("vista-loja").hidden) { comprarAgora(r.dataset.comprar); return; }
    var b = e.target.closest && e.target.closest("[data-item],[data-prop]");
    if (!b || $("vista-loja").hidden) return;
    if (b.dataset.item) alterna(cart.itens, b.dataset.item);
    if (b.dataset.prop) alterna(cart.prop, b.dataset.prop);
    tudo();
  });

  $("ir-carrinho").addEventListener("click", function () {
    mostrar("loja");
    var reduz = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    $("carrinho").scrollIntoView({ behavior: reduz ? "auto" : "smooth", block: "start" });
  });

  function resumoContrato(t) {
    var itens = [];
    ITENS.forEach(function (p) {
      if (!tem(cart.itens, p.id) || !vendivel(p)) return;
      itens.push("<li><strong>" + p.nome + "</strong>: " + p.desc + " " + esc(p.quando) + ". Valor de " + brl(p.preco) +
        ", pago hoje por inteiro: " + formas(p) + ".</li>");
    });
    PROPOSTAS.forEach(function (a) {
      if (!tem(cart.prop, a.id)) return;
      itens.push("<li><strong>" + a.nome + "</strong>: " + (a.aviso ? "pedido de aviso, sem pagamento e sem compromisso." :
        "pedido de proposta, sem valor e sem compromisso. A proposta chega por escrito depois da conversa de escopo, que você compra nesta loja e é abatida se fechar o projeto em até 30 dias.") + "</li>");
    });
    return "<h3>O QUE VOCÊ ESTÁ CONTRATANDO</h3><ul>" + itens.join("") + "</ul>" +
      "<h3>CONDIÇÕES</h3><ul>" +
      "<li>As sessões, a aula, a palestra online e os encontros dos pacotes são online, por videochamada. Você recebe o link por e-mail.</li>" +
      "<li>Para remarcar uma sessão, avise com pelo menos 24 horas de antecedência; sem aviso, a sessão conta como feita.</li>" +
      "<li>O que você contar fica em sigilo e não vira exemplo sem a sua autorização por escrito.</li>" +
      "<li>A consultoria e a mentoria orientam; as decisões e a execução continuam com você. Nenhum serviço garante contratação, vendas ou ausência de incidentes.</li></ul>" +
      '<p class="limite"><strong>Desistência:</strong> em até 7 dias corridos da compra, pela página Desistir de uma compra, com devolução integral, menos as sessões ou a aula já feitas (R$ 400 por sessão do programa). Depois desse prazo e antes da primeira sessão ou da aula, devolução do valor pago menos 25% do valor total do serviço. Depois de 7 dias, com o programa em andamento, as sessões que faltam são devolvidas; fica retido o maior valor entre 25% do total e as sessões feitas, a R$ 400 cada.</p>';
  }

  function mostrar(v) {
    $("vista-loja").hidden = v !== "loja";
    $("vista-checkout").hidden = v !== "checkout";
    window.scrollTo(0, 0);
  }

  /* Compra rápida: põe o item no pedido (sem tirar o que já estava) e abre o resumo do contrato. */
  function comprarAgora(id) {
    var p = ITENS.filter(function (x) { return x.id === id && x.rapido && vendivel(x); })[0];
    if (!p) return false;
    if (!tem(cart.itens, id)) cart.itens.push(id);
    tudo(); abrirCheckout();
    return true;
  }
  function soRapidos(t) { return t.pagos.length > 0 && !t.props && t.pagos.every(function (x) { return ITENS.some(function (p) { return p.id === x.id && p.rapido; }); }); }

  function abrirCheckout() {
    var t = totais();
    var resumo = resumoContrato(t);
    /* O aceite vale para o pedido que a pessoa leu: se o resumo mudou, o aceite volta a ficar em branco. */
    if (resumo !== resumoAceito) { $("aceite").checked = false; resumoAceito = resumo; }
    $("resumo").innerHTML = resumo;
    $("linhas-2").innerHTML = linhas(false);
    $("totais-2").innerHTML = blocoTotais(t);
    $("pagar").textContent = t.pagos.length ? "Ir para o pagamento de " + brl(t.hoje) : "Enviar pedido";
    var parc = t.pagos.filter(function (p) { return p.parcelas; });
    $("forma-campo").hidden = !parc.length;
    $("forma-cartao-txt").textContent = "Cartão de crédito, sem juros: " + parc.map(function (p) { return "até " + p.parcelas + "x " + p.em + " " + p.nome; }).join(" e ");
    $("erro").hidden = true; $("resultado").hidden = true; $("form-checkout").hidden = false;
    var opc = soRapidos(t);
    $("whats-rotulo").textContent = opc ? "WhatsApp, com DDD (opcional)" : "WhatsApp, com DDD";
    $("whats").required = !opc;
    mostrar("checkout");
    if (window.jgEvento) window.jgEvento("InitiateCheckout", { value: t.hoje, currency: "BRL" });
  }
  $("continuar").addEventListener("click", abrirCheckout);
  $("voltar").addEventListener("click", function () { mostrar("loja"); });

  function mensagem(t, d) {
    var l = ["Olá! Quero contratar pela loja da Jéssica Gessoli:"];
    t.pagos.forEach(function (p) { l.push("- " + p.nome + " (" + brl(p.valor) + " hoje" + (p.parcelas ? ", " + comoPaga(p) : "") + ")"); });
    PROPOSTAS.forEach(function (a) { if (tem(cart.prop, a.id)) l.push("- " + (a.aviso ? "Aviso: " : "Proposta: ") + a.nome); });
    l.push("Nome: " + d.nome, "E-mail: " + d.email, "WhatsApp: " + (d.whats || "não informado"));
    l.push("Li e aceito o resumo do contrato em " + window.jgAgora() + ".");
    return l.join("\n");
  }

  function registrar(dados) {
    if (!C.FORM_ENDPOINT) return Promise.resolve(false);
    // text/plain evita a verificação prévia do navegador, que o Google Apps Script não atende.
    // keepalive: o envio continua mesmo se a cliente tocar no link de pagamento antes de ele terminar.
    return fetch(C.FORM_ENDPOINT, { method: "POST", keepalive: true, headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(dados) })
      .then(function (r) { return r.ok ? r.json() : null; }).then(function (j) { return !!(j && j.ok); }).catch(function () { return false; });
  }

  function obrigado(tipo) {
    var a = $("link-obrigado");
    location.href = a.getAttribute("href") + (tipo ? "?tipo=" + tipo : "");
  }

  function manual(titulo, texto, t) {
    $("resultado-titulo").textContent = titulo;
    $("resultado-texto").value = texto;
    $("resultado-whats").href = window.jgWhats(texto);
    var links = t.pagos.map(function (p) {
      var url = linkDe(p);
      return url ? '<li><a class="pagar-item" href="' + esc(url) + '" rel="noopener">Pagar ' + esc(p.nome) + (p.parcelas ? " " + comoPaga(p) : "") + " · " + brl(p.valor) + "</a></li>"
        : "<li>" + esc(p.nome) + " · " + brl(p.valor) + ": pagamento em configuração</li>";
    });
    $("resultado-links").innerHTML = links.join("");
    $("resultado-links").hidden = !links.length;
    $("resultado").hidden = false; $("form-checkout").hidden = true;
    $("resultado").scrollIntoView({ block: "start" });
  }

  $("form-checkout").addEventListener("submit", function (e) {
    e.preventDefault();
    var t = totais();
    var d = { nome: $("nome").value.trim(), email: $("email").value.trim(), whats: $("whats").value.trim() };
    var falta = [];
    if (!d.nome) falta.push("nome");
    if (!/^\S+@\S+\.\S+$/.test(d.email)) falta.push("e-mail válido");
    var digitos = d.whats.replace(/\D/g, "").length;
    if (soRapidos(t) ? digitos > 0 && digitos < 10 : digitos < 10) falta.push("WhatsApp com DDD");
    if (!$("aceite").checked) falta.push("aceite do resumo do contrato");
    if (t.pagos.some(function (p) { return p.parcelas; }) && !forma()) falta.push("forma de pagamento");
    if (falta.length) { $("erro").textContent = "Falta preencher: " + falta.join(", ") + "."; $("erro").hidden = false; return; }
    $("erro").hidden = true;
    var pedido = {
      id: "JG-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase(),
      marca: "jessicagessoli", tipo: t.pagos.length ? "compra" : "proposta", cliente: d, novidades: $("novidades").checked,
      avisos: $("avisos").checked,
      itens: t.pagos, propostas: cart.prop.slice(), hoje: t.hoje, forma: forma() || null,
      aceite: { contrato: true, em: new Date().toISOString() }, pagina: location.pathname,
      links: t.pagos.filter(function (p) { return !!linkDe(p); }).map(function (p) { return { nome: p.nome, valor: p.valor, url: linkDe(p) }; })
    };
    var texto = mensagem(t, d) + "\nNúmero do pedido: " + pedido.id;

    if (!t.pagos.length) {
      if (window.jgEvento) window.jgEvento("Lead");
      registrar(pedido).then(function (ok) {
        if (ok) { cart = { itens: [], prop: [] }; salvar(); obrigado("proposta"); }
        else manual("Envie o seu pedido", texto, t);
      });
      return;
    }
    if (t.pagos.length === 1) {
      var url = linkDe(t.pagos[0]);
      if (url) {
        /* Sem registro (FORM_ENDPOINT vazio ou fora do ar), as propostas e o aceite iriam se perder no redirecionamento:
           mostra a mensagem pronta junto com o link de pagamento. */
        registrar(pedido).then(function (ok) {
          if (ok) location.href = url;
          else manual("Falta um passo: envie o pedido e pague pelo link", texto, t);
        });
        return;
      }
      manual("Pagamento em configuração", texto, t);
      return;
    }
    if (C.CHECKOUT_ENDPOINT) {
      fetch(C.CHECKOUT_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(pedido) })
        .then(function (r) { if (!r.ok) throw new Error("status " + r.status); return r.json(); })
        .then(function (j) { if (j && /^https:\/\//.test(j.url)) location.href = j.url; else throw new Error("sem url"); })
        .catch(function () { manual("Pague cada item pelo link", texto, t); });
      return;
    }
    /* Pedido com mais de um item: registra antes de mostrar os links, para a recuperação de pedido saber quem quase comprou. */
    registrar(pedido);
    manual(t.pagos.every(function (p) { return linkDe(p); }) ? "Pague cada item pelo link" : "Pagamento em configuração", texto, t);
  });

  tudo();
  var pedidoUrl = new URLSearchParams(location.search).get("comprar");
  if (!(pedidoUrl && comprarAgora(pedidoUrl))) destacar();
  window.addEventListener("hashchange", function () { mostrar("loja"); destacar(true); });
})();
