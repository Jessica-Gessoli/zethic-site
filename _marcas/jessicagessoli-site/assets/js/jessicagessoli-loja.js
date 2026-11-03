/* Jéssica Gessoli — loja com carrinho (/jessicagessoli/loja). Valores aprovados pela Jéssica em 03/11/2026:
   consultoria R$ 400 por hora, mentoria de posicionamento (sessão avulsa R$ 400; programa de 3 meses com 8 sessões
   R$ 3.200) e aula ao vivo "IA segura para o seu Negócio" (R$ 97). Os outros serviços entram como pedido de proposta.
   Pagamento pelo link do Asaas de cada item (ASAAS_LINKS em jessicagessoli-config.js). Com vários itens pagos,
   usa o CHECKOUT_ENDPOINT (n8n) se estiver preenchido; senão, mostra o link de cada item. */
(function () {
  var C = window.JESSICAGESSOLI || {};
  var LINKS = C.ASAAS_LINKS || {};
  var brl = function (v) { return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 2 }); };
  var $ = function (id) { return document.getElementById(id); };
  var AULA_DATA = String(C.AULA_DATA || "").trim();

  var ITENS = [
    { id: "consultoria", nome: "Consultoria · 1 hora", preco: 400, agora: 1, quando: "Data combinada por e-mail ou WhatsApp depois do pagamento",
      desc: "Uma hora por videochamada para levar uma decisão de cibersegurança ou de IA, com orientação clara do que fazer." },
    { id: "sessao", nome: "Mentoria de posicionamento · sessão avulsa", preco: 400, agora: 1, quando: "Data combinada por e-mail ou WhatsApp depois do pagamento",
      desc: "Uma sessão individual de 1 hora, por videochamada, para destravar uma decisão de carreira ou do seu Negócio." },
    { id: "programa", nome: "Mentoria de posicionamento · programa de 3 meses", preco: 3200, agora: 0.5, saldo: "antes da 5ª sessão", quando: "8 sessões individuais em 3 meses, com datas combinadas por e-mail ou WhatsApp",
      desc: "Para definir com clareza onde você ou o seu Negócio quer chegar e como se posicionar para chegar lá." },
    { id: "aula", nome: "Aula ao vivo · IA segura para o seu Negócio", preco: 97, agora: 1, aula: true, quando: AULA_DATA ? AULA_DATA + ", online" : "",
      desc: "Como usar IA no dia a dia do Negócio sem expor dados de clientes. Online e ao vivo." }
  ];
  var PROPOSTAS = [
    { id: "diagnostico", nome: "Diagnóstico de Cibersegurança e IA", desc: "Onde o seu Negócio pode perder dinheiro com golpe, vazamento de dados ou IA sem regra, e o que resolver primeiro." },
    { id: "antigolpe", nome: "Programa Antigolpe", desc: "Equipe que reconhece golpes, regras que impedem pagamento indevido e cultura em que reportar não gera culpa." },
    { id: "governanca", nome: "Governança de IA, privacidade e LGPD", desc: "IA usada com regras e controles, e dados pessoais tratados com responsabilidade e documentação." },
    { id: "contas", nome: "Segurança das contas e dos perfis", desc: "Proteção das contas do dono e da equipe, sem passar senha." },
    { id: "ia", nome: "Mentoria e consultoria em IA", desc: "Você aprende a fazer com IA, no seu próprio projeto." },
    { id: "conselheira", nome: "Conselheira de Risco", desc: "Acompanhamento mensal da diretoria nas decisões de risco cibernético e de IA." },
    { id: "projetos", nome: "Projetos para grandes organizações", desc: "Tecnologia operacional, infraestrutura crítica e programas de governança em operações reguladas." },
    { id: "palestra", nome: "Palestras e eventos", desc: "Palestra, painel, mediação ou apresentação de palco." }
  ];
  /* Sem data marcada, a aula não é vendida: vira um pedido de aviso da próxima turma. */
  if (!AULA_DATA) PROPOSTAS.push({ id: "aula-aviso", nome: "Aviso da próxima turma da aula ao vivo", aviso: true, desc: "Sem pagamento. Você recebe a data por e-mail quando as inscrições abrirem." });

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
  function vendivel(p) { return !p.aula || !!AULA_DATA; }
  function pagamento(p) { return p.agora === 1 ? "Integral, hoje: " + brl(p.preco) : "Entrada hoje: " + brl(p.preco * p.agora) + "; saldo " + p.saldo; }

  function catalogo() {
    $("grade-itens").innerHTML = ITENS.map(function (p) {
      var on = tem(cart.itens, p.id);
      var botao = vendivel(p)
        ? '<button class="por" type="button" data-item="' + p.id + '" aria-pressed="' + on + '">' + (on ? "No pedido · tirar" : "Pôr no pedido") + "</button>"
        : '<button class="por por-aviso" type="button" data-prop="aula-aviso" aria-pressed="' + tem(cart.prop, "aula-aviso") + '">' + (tem(cart.prop, "aula-aviso") ? "Aviso pedido · tirar" : "Avise-me quando abrir") + "</button>";
      return '<article class="item"><h3>' + p.nome + '</h3><p class="preco num">' + brl(p.preco) + "</p><p>" + p.desc + "</p>" +
        '<dl class="meta"><div><dt>' + (p.aula ? "Data" : "Quando") + "</dt><dd>" + (vendivel(p) ? esc(p.quando) : "Data em breve") + "</dd></div>" +
        '<div><dt>Pagamento</dt><dd>' + pagamento(p) + "</dd></div></dl>" + botao + "</article>";
    }).join("");
    $("lista-propostas").innerHTML = PROPOSTAS.filter(function (a) { return !a.aviso; }).map(function (a) {
      var on = tem(cart.prop, a.id);
      return '<div class="proposta"><div><strong>' + a.nome + "</strong><p>" + a.desc + "</p></div>" +
        '<button class="pedir" type="button" data-prop="' + a.id + '" aria-pressed="' + on + '">' + (on ? "Pedido · tirar" : "Pedir proposta") + "</button></div>";
    }).join("");
  }

  function totais() {
    var hoje = 0, saldo = 0, pagos = [];
    ITENS.forEach(function (p) {
      if (tem(cart.itens, p.id) && vendivel(p)) { hoje += p.preco * p.agora; saldo += p.preco * (1 - p.agora); pagos.push({ id: p.id, nome: p.nome, valor: p.preco * p.agora }); }
    });
    var props = cart.prop.filter(function (id) { return PROPOSTAS.some(function (a) { return a.id === id; }); }).length;
    return { hoje: hoje, saldo: saldo, pagos: pagos, props: props, total: pagos.length + props };
  }

  function linhas(comTirar) {
    var out = [];
    ITENS.forEach(function (p) {
      if (!tem(cart.itens, p.id) || !vendivel(p)) return;
      out.push("<li><span>" + p.nome + '</span><span class="num">' + brl(p.preco * p.agora) + "</span><small>" +
        (p.agora === 1 ? "Pagamento integral" : "Entrada de 50% · saldo de " + brl(p.preco * (1 - p.agora)) + " " + p.saldo) + "</small>" +
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
    if (t.saldo) h += '<div><span>Saldo antes da 5ª sessão</span><span class="num">' + brl(t.saldo) + "</span></div>";
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
        (p.agora < 1 ? ", com entrada de " + brl(p.preco * p.agora) + " hoje e saldo " + p.saldo + "." : ", pago hoje.") + "</li>");
    });
    PROPOSTAS.forEach(function (a) {
      if (!tem(cart.prop, a.id)) return;
      itens.push("<li><strong>" + a.nome + "</strong>: " + (a.aviso ? "pedido de aviso, sem pagamento e sem compromisso." :
        "pedido de proposta, sem valor e sem compromisso. A proposta chega por escrito depois de uma conversa de 30 minutos.") + "</li>");
    });
    return "<h3>O QUE VOCÊ ESTÁ CONTRATANDO</h3><ul>" + itens.join("") + "</ul>" +
      "<h3>CONDIÇÕES</h3><ul>" +
      "<li>As sessões e a aula são online, por videochamada. Você recebe o link por e-mail.</li>" +
      "<li>Para remarcar uma sessão, avise com pelo menos 24 horas de antecedência; sem aviso, a sessão conta como feita.</li>" +
      "<li>O que você contar fica em sigilo e não vira exemplo sem a sua autorização por escrito.</li>" +
      "<li>A consultoria e a mentoria orientam; as decisões e a execução continuam com você. Nenhum serviço garante contratação, vendas ou ausência de incidentes.</li></ul>" +
      '<p class="limite"><strong>Desistência:</strong> antes da primeira sessão ou da aula, pela página Desistir de uma compra, com devolução do valor pago menos 25% do valor total do serviço. Depois de começar, o valor pago cobre as sessões já feitas.</p>';
  }

  function mostrar(v) {
    $("vista-loja").hidden = v !== "loja";
    $("vista-checkout").hidden = v !== "checkout";
    window.scrollTo(0, 0);
  }

  $("continuar").addEventListener("click", function () {
    var t = totais();
    var resumo = resumoContrato(t);
    /* O aceite vale para o pedido que a pessoa leu: se o resumo mudou, o aceite volta a ficar em branco. */
    if (resumo !== resumoAceito) { $("aceite").checked = false; resumoAceito = resumo; }
    $("resumo").innerHTML = resumo;
    $("linhas-2").innerHTML = linhas(false);
    $("totais-2").innerHTML = blocoTotais(t);
    $("pagar").textContent = t.pagos.length ? "Ir para o pagamento de " + brl(t.hoje) : "Enviar pedido";
    $("erro").hidden = true; $("resultado").hidden = true; $("form-checkout").hidden = false;
    mostrar("checkout");
    if (window.jgEvento) window.jgEvento("InitiateCheckout", { value: t.hoje, currency: "BRL" });
  });
  $("voltar").addEventListener("click", function () { mostrar("loja"); });

  function mensagem(t, d) {
    var l = ["Olá! Quero contratar pela loja da Jéssica Gessoli:"];
    t.pagos.forEach(function (p) { l.push("- " + p.nome + " (" + brl(p.valor) + " hoje)"); });
    PROPOSTAS.forEach(function (a) { if (tem(cart.prop, a.id)) l.push("- " + (a.aviso ? "Aviso: " : "Proposta: ") + a.nome); });
    l.push("Nome: " + d.nome, "E-mail: " + d.email, "WhatsApp: " + d.whats);
    l.push("Li e aceito o resumo do contrato em " + window.jgAgora() + ".");
    return l.join("\n");
  }

  function registrar(dados) {
    if (!C.FORM_ENDPOINT) return Promise.resolve(false);
    return fetch(C.FORM_ENDPOINT, { method: "POST", keepalive: true, headers: { "Content-Type": "application/json" }, body: JSON.stringify(dados) })
      .then(function (r) { return r.ok; }).catch(function () { return false; });
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
      var url = LINKS[p.id];
      return url ? '<li><a class="pagar-item" href="' + esc(url) + '" rel="noopener">Pagar ' + esc(p.nome) + " · " + brl(p.valor) + "</a></li>"
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
    if (d.whats.replace(/\D/g, "").length < 10) falta.push("WhatsApp com DDD");
    if (!$("aceite").checked) falta.push("aceite do resumo do contrato");
    if (falta.length) { $("erro").textContent = "Falta preencher: " + falta.join(", ") + "."; $("erro").hidden = false; return; }
    $("erro").hidden = true;
    var texto = mensagem(t, d);
    var pedido = {
      marca: "jessicagessoli", tipo: t.pagos.length ? "compra" : "proposta", cliente: d, novidades: $("novidades").checked,
      itens: t.pagos, propostas: cart.prop.slice(), hoje: t.hoje, saldo: t.saldo,
      aceite: { contrato: true, em: new Date().toISOString() }, pagina: location.pathname
    };

    if (!t.pagos.length) {
      if (window.jgEvento) window.jgEvento("Lead");
      registrar(pedido).then(function (ok) {
        if (ok) { cart = { itens: [], prop: [] }; salvar(); obrigado("proposta"); }
        else manual("Envie o seu pedido", texto, t);
      });
      return;
    }
    if (t.pagos.length === 1) {
      var url = LINKS[t.pagos[0].id];
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
    manual(t.pagos.every(function (p) { return LINKS[p.id]; }) ? "Pague cada item pelo link" : "Pagamento em configuração", texto, t);
  });

  tudo();
})();
