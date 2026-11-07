/* Zethic — compra online dos pacotes de entrada (/comprar). Protótipo de 06/11/2026.
   Decisão da Jéssica em 06/11/2026: preço no site só nos pacotes de entrada (suporte de TI Essencial e Padrão,
   proteção por pessoa e site estático Essencial); o resto segue por pedido de proposta em /loja.
   Valores: material privado "Zethic — planos e valores" (06/11/2026). Regras: telas 4a, 4b, 5, 2 e 9 do mesmo material.
   O pedido fica só nesta aba (sessionStorage). Sem link do Asaas, a página monta a mensagem para o WhatsApp e o e-mail. */
(function () {
  var C = window.ZETHIC_COMPRA || {};
  var LINKS = C.ASAAS_LINKS || {};
  var FUND = C.FUNDADOR || {};
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function reais(v) { return "R$ " + v.toLocaleString("pt-BR", { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 }); }

  var SUPORTE = [
    { id: "suporte_essencial", nome: "Suporte de TI Essencial", fundador: 145, depois: 190,
      para: "o profissional que trabalha sozinho",
      itens: ["Até 2 computadores e 2 celulares", "1 hora de suporte por mês", "Atualizações e proteção em dia"] },
    { id: "suporte_padrao", nome: "Suporte de TI Padrão", fundador: 225, depois: 290,
      para: "a equipe de até 4 pessoas; é a base das campanhas de TI por nicho",
      itens: ["Até 4 computadores e 4 celulares", "2 horas de suporte por mês", "Inventário dos equipamentos"] }
  ];
  var PROTECAO = { id: "protecao", nome: "Proteção por pessoa", fundador: 19, depois: 25, max: 10,
    itens: ["Antivírus gerenciado", "Verificação em duas etapas nas contas", "Backup em nuvem com teste de restauração a cada 3 meses", "Relatório de segurança no mês"] };
  var SITE = { id: "site_essencial", nome: "Site estático Essencial", fundador: 3000, depois: 3900,
    para: "ter um endereço na internet e receber contatos",
    itens: ["Site de uma página: apresentação e serviços", "Botão de WhatsApp, formulário e mapa", "Cadastro no Google"] };

  var CHAVE = "zethic-compra";
  var estado = { suporte: "", pessoas: 0, site: false, fundador: false };
  try { var s = JSON.parse(sessionStorage.getItem(CHAVE) || "null"); if (s) estado = s; } catch (e) {}
  function salvar() { try { sessionStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) {} }

  /* Jornada (06/11/2026, 23h22): /comprar?pacote=consultorio chega da página Consultório e da campanha
     TI do consultório com o Suporte Padrão e a proteção de 3 pessoas já escolhidos. */
  var PACOTES = {
    // equipe_pequena: pacote de entrada das campanhas por nicho (07/11/2026). consultorio fica para os links antigos.
    equipe_pequena: { suporte: "suporte_padrao", pessoas: 3, site: false },
    consultorio: { suporte: "suporte_padrao", pessoas: 3, site: false },
    suporte_essencial: { suporte: "suporte_essencial", pessoas: 0, site: false },
    suporte_padrao: { suporte: "suporte_padrao", pessoas: 0, site: false },
    site: { suporte: "", pessoas: 0, site: true }
  };
  (function () {
    var q = /[?&]pacote=([a-z_]+)/.exec(location.search), p = q && PACOTES[q[1]];
    if (!p) return;
    estado.suporte = p.suporte || estado.suporte;
    estado.pessoas = p.suporte ? p.pessoas : estado.pessoas;
    estado.site = estado.site || p.site;
  })();

  function preco(item) { return estado.fundador && FUND[item.id] ? item.fundador : item.depois; }
  function suporteAtual() { for (var i = 0; i < SUPORTE.length; i++) if (SUPORTE[i].id === estado.suporte) return SUPORTE[i]; return null; }

  function contas() {
    var sup = suporteAtual();
    var mensal = (sup ? preco(sup) : 0) + (sup ? estado.pessoas * preco(PROTECAO) : 0);
    var site = estado.site ? preco(SITE) : 0;
    return { sup: sup, mensal: mensal, implantacao: mensal, site: site, entradaSite: Math.round(site * 0.4 * 100) / 100,
      hoje: mensal * 2 + Math.round(site * 0.4 * 100) / 100 };
  }

  function cartaoPreco(item, unidade) {
    var vaga = FUND[item.id];
    return '<p class="preco-zethic"><span class="valor">' + reais(vaga ? item.fundador : item.depois) + "</span>" + unidade + "</p>" +
      (vaga ? '<p class="preco-depois">Preço de fundador, 3 vagas; depois, ' + reais(item.depois) + unidade + "</p>" : "");
  }
  function lista(itens) { return '<ul class="inclui">' + itens.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>"; }

  function montarCatalogo() {
    $("grade-suporte").innerHTML = SUPORTE.map(function (p) {
      return '<article class="loja-item p-tec"><div class="loja-item-cab"><span class="loja-tipo">Mensal</span><h3>' + esc(p.nome) + "</h3></div>" +
        cartaoPreco(p, " por mês") + lista(p.itens) + '<p><b>Para quem:</b> ' + esc(p.para) + ".</p>" +
        (p.id === "suporte_padrao" ? '<p class="loja-fora"><a href="/para-o-seu-negocio#tamanho">Qual plano para o tamanho da equipe</a> · <a href="/tecnologia#suporte">Ver o suporte em detalhe</a></p>' : '<p class="loja-fora"><a href="/tecnologia#suporte">Ver o suporte em detalhe</a></p>') +
        '<div class="loja-acoes"><button class="por" type="button" data-suporte="' + p.id + '" aria-pressed="false">Escolher este plano</button></div></article>';
    }).join("");
    $("grade-protecao").innerHTML = '<article class="loja-item p-seg"><div class="loja-item-cab"><span class="loja-tipo">Mensal, por pessoa</span><h3>' + PROTECAO.nome + "</h3></div>" +
      cartaoPreco(PROTECAO, " por pessoa, por mês") + lista(PROTECAO.itens) +
      '<label class="campo" for="pessoas">Quantas pessoas<select id="pessoas"></select></label>' +
      '<p class="dica" id="protecao-dica">Escolha antes um plano de suporte.</p><p class="loja-fora"><a href="/seguranca#protecao">Ver a proteção em detalhe</a></p></article>';
    var opts = '<option value="0">Nenhuma</option>';
    for (var n = 1; n <= PROTECAO.max; n++) opts += '<option value="' + n + '">' + n + (n === 1 ? " pessoa" : " pessoas") + "</option>";
    $("pessoas").innerHTML = opts;
    $("grade-site").innerHTML = '<article class="loja-item p-tec"><div class="loja-item-cab"><span class="loja-tipo">Projeto</span><h3>' + SITE.nome + "</h3></div>" +
      cartaoPreco(SITE, "") + lista(SITE.itens) + '<p><b>Para quem:</b> ' + esc(SITE.para) + ".</p>" +
      '<p class="loja-fora">Fica de fora: domínio e hospedagem, no nome da sua empresa; textos e fotos, que você envia. <a href="/atendimento#site">Ver o site em detalhe</a></p>' +
      '<div class="loja-acoes"><button class="por" type="button" id="btn-site" aria-pressed="false">Pôr no pedido</button></div></article>';

    Array.prototype.forEach.call(document.querySelectorAll("[data-suporte]"), function (b) {
      b.addEventListener("click", function () {
        estado.suporte = estado.suporte === b.getAttribute("data-suporte") ? "" : b.getAttribute("data-suporte");
        if (!estado.suporte) estado.pessoas = 0;
        atualizar();
      });
    });
    $("pessoas").addEventListener("change", function () { estado.pessoas = parseInt($("pessoas").value, 10) || 0; atualizar(); });
    $("btn-site").addEventListener("click", function () { estado.site = !estado.site; atualizar(); });
    $("fundador-pedido").addEventListener("change", function () { estado.fundador = $("fundador-pedido").checked; atualizar(); });
  }

  function linhasHtml(c) {
    var h = [];
    if (c.sup) h.push("<li>" + esc(c.sup.nome) + "<small>" + reais(preco(c.sup)) + " por mês</small></li>");
    if (c.sup && estado.pessoas) h.push("<li>Proteção por pessoa · " + estado.pessoas + "<small>" + reais(estado.pessoas * preco(PROTECAO)) + " por mês</small></li>");
    if (estado.site) h.push("<li>" + SITE.nome + "<small>" + reais(c.site) + ", em 3 etapas</small></li>");
    return h.join("");
  }
  function totaisHtml(c) {
    var t = [];
    if (c.mensal) {
      t.push("<p><span>Mensalidade</span><b>" + reais(c.mensal) + "</b></p>");
      t.push("<p><span>Implantação (1 mensalidade, paga com a primeira)</span><b>" + reais(c.implantacao) + "</b></p>");
    }
    if (c.site) t.push("<p><span>Entrada do site (40%)</span><b>" + reais(c.entradaSite) + "</b></p>");
    t.push('<p class="total"><span>A pagar agora</span><b>' + reais(c.hoje) + "</b></p>");
    return t.join("");
  }

  function atualizar() {
    var c = contas();
    Array.prototype.forEach.call(document.querySelectorAll("[data-suporte]"), function (b) {
      var on = b.getAttribute("data-suporte") === estado.suporte;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.textContent = on ? "Escolhido · tirar" : "Escolher este plano";
    });
    $("pessoas").disabled = !estado.suporte;
    $("pessoas").value = String(estado.pessoas);
    $("protecao-dica").hidden = !!estado.suporte;
    $("btn-site").setAttribute("aria-pressed", estado.site ? "true" : "false");
    $("btn-site").textContent = estado.site ? "No pedido · tirar" : "Pôr no pedido";
    $("fundador-pedido").checked = !!estado.fundador;

    var vazio = !c.sup && !estado.site;
    $("linhas").innerHTML = linhasHtml(c);
    $("vazio").hidden = !vazio;
    $("totais").hidden = vazio;
    $("totais").innerHTML = vazio ? "" : totaisHtml(c);
    $("continuar").disabled = vazio;
    $("linhas-2").innerHTML = linhasHtml(c);
    $("totais-2").innerHTML = vazio ? "" : totaisHtml(c);
    $("resumo").innerHTML = resumoHtml(c);
    salvar();
  }

  function resumoHtml(c) {
    var r = [];
    if (c.sup) {
      r.push("<li><b>Planos mensais:</b> pagos antes do mês, mínimo de 3 meses e aviso de 30 dias para sair. Saída antes dos 3 meses: multa de no máximo 1 mensalidade. A implantação (levantamento, inventário e instalação das ferramentas) vale 1 mensalidade, paga com a primeira.</li>");
      r.push("<li><b>Atendimento:</b> segunda a sexta, das 8h às 18h, pelo WhatsApp e pelo e-mail da Zethic. Parada total respondida em até 2 horas úteis; os outros pedidos, em até 1 dia útil. As horas do plano não acumulam.</li>");
      r.push("<li><b>Fica de fora:</b> conserto de peça, disco quebrado, aparelho pessoal, programa sem licença. Licenças ficam no nome do cliente, e a Zethic não revende equipamento.</li>");
    }
    if (estado.site) r.push("<li><b>Site:</b> 40% na compra, 30% na aprovação da versão de teste e 30% quando entra em uso. Cada etapa é aprovada em até 5 dias úteis; sem resposta, conta como aprovada.</li>");
    r.push("<li><b>Desistência:</b> até 7 dias depois da compra, com devolução integral, enquanto o trabalho não começou. Depois, o que foi pago cobre o trabalho feito.</li>");
    r.push("<li><b>Atraso:</b> multa de 2% e juros de 1% ao mês.</li>");
    r.push("<li><b>Sigilo e LGPD:</b> acesso remoto só com autorização e registro. No fim do contrato, contas, dados e acessos voltam para o cliente.</li>");
    if (estado.fundador) r.push("<li><b>Preço de fundador:</b> em troca de um depoimento com as suas palavras e da autorização para contar o caso.</li>");
    return "<ul>" + r.join("") + "</ul>";
  }

  function mensagem(c, dados) {
    var l = ["Compra pela loja da Zethic (pacotes de entrada)", ""];
    if (c.sup) l.push("- " + c.sup.nome + ": " + reais(preco(c.sup)) + " por mês");
    if (c.sup && estado.pessoas) l.push("- Proteção por pessoa, " + estado.pessoas + ": " + reais(estado.pessoas * preco(PROTECAO)) + " por mês");
    if (estado.site) l.push("- " + SITE.nome + ": " + reais(c.site) + " (40% agora: " + reais(c.entradaSite) + ")");
    if (c.mensal) l.push("Implantação: " + reais(c.implantacao) + ", com a primeira mensalidade");
    l.push("A pagar agora: " + reais(c.hoje));
    l.push("Preço de fundador: " + (estado.fundador ? "sim, com depoimento" : "não"));
    // Venda casada (07/11/2026): o valor de um checkup feito nos últimos 30 dias abate a implantação. A loja da Zethic
    // não cita a fundadora nem as outras marcas (regra de 28/10); quem explica o crédito é a página do checkup.
    if (c.sup && $("credito-checkup") && $("credito-checkup").checked) l.push("Crédito de checkup (últimos 30 dias): abater da implantação");
    var origem = window.zethicOrigem ? window.zethicOrigem() : "";
    if (origem) l.push("Origem: " + origem);
    l.push("Forma: " + dados.forma, "");
    l.push("Empresa: " + dados.empresa, "Documento: " + dados.documento, "Nome: " + dados.nome, "E-mail: " + dados.email, "WhatsApp: " + dados.whats, "Cidade: " + dados.cidade);
    l.push("", "Li e aceitei o resumo do contrato e a política de cancelamento e devolução.");
    return l.join("\n");
  }

  function enviar(ev) {
    ev.preventDefault();
    var campos = ["empresa", "documento", "nome", "email", "whats", "cidade"], dados = {}, falta = [];
    campos.forEach(function (k) { dados[k] = $(k).value.trim(); if (!dados[k]) falta.push($(k).closest("label").firstChild.textContent.trim()); });
    if (dados.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(dados.email)) falta.push("E-mail válido");
    if (!$("aceite").checked) falta.push("Aceite do resumo do contrato");
    var forma = document.querySelector('input[name="forma"]:checked');
    dados.forma = forma ? forma.value : "Pix";
    if (falta.length) { $("erro").textContent = "Falta preencher: " + falta.join(", ") + "."; $("erro").hidden = false; return; }
    $("erro").hidden = true;

    var c = contas(), itens = [];
    if (c.sup) itens.push(c.sup.id);
    if (estado.site) itens.push(SITE.id);
    var prontos = itens.filter(function (id) { return LINKS[id]; });
    var texto = mensagem(c, dados);
    $("resultado-texto").value = texto;
    $("resultado-whats").href = "https://wa.me/" + (C.WHATSAPP || "5519981800221") + "?text=" + encodeURIComponent(texto);
    $("resultado-email").href = "mailto:" + (C.EMAIL || "contato@zethic.net") + "?subject=" + encodeURIComponent("Compra pela loja da Zethic") + "&body=" + encodeURIComponent(texto);
    if (prontos.length && prontos.length === itens.length && !estado.pessoas && !estado.fundador) {
      $("resultado-titulo").textContent = "Pague pelo Asaas";
      $("resultado-instrucao").textContent = "Abra o link de cada item e pague por Pix ou boleto. Envie também a mensagem abaixo, para a Zethic ligar o pagamento ao seu pedido.";
      $("resultado-links").innerHTML = prontos.map(function (id) { return '<li><a href="' + esc(LINKS[id]) + '" rel="noopener">Pagar: ' + esc(id === SITE.id ? SITE.nome : suporteAtual().nome) + "</a></li>"; }).join("");
      $("resultado-links").hidden = false;
    }
    if (window.zethicEvento) window.zethicEvento("pedido_enviado", { loja: "comprar", valor: c.hoje, currency: "BRL", origem: window.zethicOrigem ? window.zethicOrigem() : "" });
    $("form-compra").hidden = true;
    $("resultado").hidden = false;
    $("resultado").scrollIntoView({ block: "start" });
  }

  function ver(checkout) {
    $("vista-loja").hidden = checkout;
    $("vista-checkout").hidden = !checkout;
    window.scrollTo(0, 0);
  }

  document.addEventListener("DOMContentLoaded", function () {
    montarCatalogo();
    atualizar();
    $("continuar").addEventListener("click", function () { ver(true); });
    $("voltar").addEventListener("click", function () { $("form-compra").hidden = false; $("resultado").hidden = true; ver(false); });
    $("form-compra").addEventListener("submit", enviar);
  });
})();
