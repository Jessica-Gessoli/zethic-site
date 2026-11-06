/* Zethic — loja de pedido de proposta (/loja). Decisão da Jéssica em 03/11/2026, 22h07: sem preço no site.
   O cliente escolhe os serviços por departamento (e o nível, quando o serviço tem níveis), conta sobre a empresa
   e envia o pedido. Com FORM_ENDPOINT preenchido em zethic-loja-config.js, o pedido é registrado e a pessoa vai para
   /loja-obrigado; sem ele, ou se o envio falhar, a loja mostra a mensagem pronta para o WhatsApp e o e-mail.
   Catálogo e níveis: material "Zethic — planos e valores" e Ficha oficial v1.12 (03/11/2026). A capacitação em IA
   para empresas, o treinamento técnico (06/11/2026) e a blindagem de contas são da Jéssica Gessoli e não entram aqui. */
(function () {
  var C = window.ZETHIC_LOJA || {};
  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  var NIVEIS_SITE = [
    { id: "essencial", nome: "Essencial", itens: ["Site de uma página: apresentação e serviços", "Botão de WhatsApp, formulário e mapa", "Cadastro no Google"] },
    { id: "completo", nome: "Completo", itens: ["Até 5 páginas", "Perfil da empresa no Google", "Política de privacidade e aviso de cookies", "Medição de visitas"] },
    { id: "avancado", nome: "Avançado", itens: ["Até 10 páginas", "Página de captação para campanha", "Ligação com o WhatsApp ou o CRM"] }
  ];
  var NIVEIS_BOT = [
    { id: "essencial", nome: "Essencial", itens: ["1 número de WhatsApp", "Até 3 fluxos: boas-vindas, perguntas frequentes e passagem para um atendente"] },
    { id: "completo", nome: "Completo", itens: ["Até 6 fluxos", "Agendamento ou pedido de orçamento", "CRM: a lista dos seus clientes e de cada conversa, até a compra"] },
    { id: "avancado", nome: "Avançado", itens: ["Até 10 fluxos", "Respostas com IA a partir do conteúdo da sua empresa", "Ligação com 1 sistema que você já usa"] }
  ];
  var NIVEIS_PROJETOS = [
    { id: "essencial", nome: "Essencial", itens: ["1 projeto ou a rotina de atendimento de TI", "Reunião a cada 15 dias", "Relatório mensal"] },
    { id: "completo", nome: "Completo", itens: ["Até 3 projetos", "Reunião semanal", "Painel de acompanhamento"] },
    { id: "avancado", nome: "Avançado", itens: ["Todos os projetos e o catálogo de serviços de TI", "Reunião semanal", "Relatório para a diretoria"] }
  ];
  var INCLUI_SEG = ["Alguém de olho nos computadores e sistemas em horário comercial", "Cópia de segurança testada", "Atualizações em dia", "Relatório mensal"];
  var NIVEIS_SEG = [
    { id: "ate-10", nome: "Até 10 usuários", itens: INCLUI_SEG },
    { id: "11-25", nome: "De 11 a 25 usuários", itens: INCLUI_SEG },
    { id: "26-50", nome: "De 26 a 50 usuários", itens: INCLUI_SEG },
    { id: "mais-50", nome: "Mais de 50 usuários", itens: INCLUI_SEG }
  ];
  var NIVEIS_FIN = [
    { id: "essencial", nome: "Essencial", itens: ["Até 100 lançamentos por mês", "Contas a pagar e a receber", "Conciliação bancária e fluxo de caixa"] },
    { id: "padrao", nome: "Padrão", itens: ["Até 300 lançamentos por mês", "Tudo do Essencial", "Cobrança e relatório gerencial mensal"] },
    { id: "completo", nome: "Completo", itens: ["Mais de 300 lançamentos por mês", "Projeção de caixa de 30, 60 e 90 dias", "Reunião mensal"] }
  ];

  var DEPTOS = [
    { id: "tecnologia", nome: "Tecnologia", pilar: "p-tec", frase: "O que o seu Negócio usa para vender, atender e trabalhar.", servicos: [
      { id: "site", nome: "Site e presença no Google", tipo: "Projeto", link: "/crescer#site", niveis: NIVEIS_SITE,
        desc: "O seu Negócio encontrado no Google, com o WhatsApp a um toque.", fora: "Domínio e hospedagem ficam no nome da sua empresa." },
      { id: "app", nome: "App: descoberta e protótipo", tipo: "Projeto", link: "/crescer#site",
        desc: "A ideia do app testada num protótipo antes do desenvolvimento. O desenvolvimento sai na proposta." },
      { id: "bot", nome: "Bot de WhatsApp e CRM", tipo: "Projeto e mensalidade", link: "/crescer#whatsapp", niveis: NIVEIS_BOT,
        desc: "O cliente é respondido na hora, mesmo quando você está ocupado.", fora: "A cobrança da Meta e a plataforma ficam no nome da sua empresa." },
      { id: "painel", nome: "Painel de dados", tipo: "Mensalidade", link: "/crescer#dados",
        desc: "Vendas, atendimento e redes num painel só." },
      { id: "automacao", nome: "Automação de processos", tipo: "Projeto", link: "/organizar#automacao",
        desc: "O sistema faz sozinho o que hoje é feito à mão." },
      { id: "ia", nome: "Agentes de IA e IA privada", tipo: "Projeto", link: "/organizar#automacao",
        desc: "IA trabalhando com os dados da sua empresa, com controle de acesso." },
      { id: "processos", nome: "Processos e rotina operacional", tipo: "Projeto", link: "/organizar#processos",
        desc: "Menos erro e retrabalho no dia a dia." },
      { id: "projetos", nome: "Escritório de projetos e gestão de serviços de TI", tipo: "Mensalidade", link: "/organizar#projetos", niveis: NIVEIS_PROJETOS,
        desc: "Projetos com dono, prazo e relatório, sem você correr atrás." },
      { id: "infraestrutura", nome: "Infraestrutura, redes e conectividade", tipo: "Projeto", link: "/organizar#infraestrutura",
        desc: "Teste de estresse, desempenho da rede e enlace via rádio." },
      { id: "nuvem", nome: "Nuvem e identidade digital", tipo: "Projeto", link: "/organizar#nuvem",
        desc: "E-mail e contas da equipe na nuvem, com custo e acesso sob controle." }
    ] },
    { id: "seguranca", nome: "Segurança da informação", pilar: "p-seg", frase: "Os computadores, os sistemas e os dados protegidos por quem cuida disso todo dia.", servicos: [
      { id: "seguranca-gerenciada", nome: "Segurança Gerenciada", tipo: "Mensalidade", link: "/proteger#seguranca-gerenciada", niveis: NIVEIS_SEG,
        desc: "Os seus dados com cópia testada. O sequestro dos dados não para o caixa.", fora: "As licenças das ferramentas ficam no nome da sua empresa." },
      { id: "soc", nome: "SOC: o departamento de segurança da informação", tipo: "Mensalidade", link: "/proteger",
        desc: "Implantação e gestão do departamento inteiro, fora da sua empresa e gerido pela Zethic, como um escritório de contabilidade ou de advocacia." },
      { id: "continuidade", nome: "Continuidade e recuperação", tipo: "Projeto", link: "/proteger#continuidade",
        desc: "O plano para o Negócio voltar a funcionar depois de uma pane ou de um ataque." },
      { id: "conscientizacao", nome: "Plataforma de conscientização", tipo: "Implantação e mensalidade", link: "/proteger#conscientizacao",
        desc: "Plataforma de segurança, LGPD e IA implantada e operada para a sua equipe." },
      { id: "lgpd", nome: "Implantação da LGPD e de normas", tipo: "Projeto", link: "/proteger#lgpd",
        desc: "Controles, registros e evidências no dia a dia." },
      { id: "it-ot", nome: "Segurança de redes industriais (TI e TO)", tipo: "Projeto", link: "/proteger#it-ot",
        desc: "Redes da produção, do campo e do escritório separadas e monitoradas, com visita técnica." },
      { id: "infraestrutura-conectada", nome: "Infraestrutura conectada", tipo: "Projeto", link: "/proteger#infraestrutura-conectada",
        desc: "Inversores, carregadores, medidores e roteadores protegidos." }
    ] },
    { id: "financeiro", nome: "Financeiro", pilar: "p-tec", frase: "Contas em dia, caixa previsto e dinheiro que estava escapando de volta.", servicos: [
      { id: "gestao-financeira", nome: "Gestão financeira terceirizada", tipo: "Mensalidade", link: "/organizar#financas", niveis: NIVEIS_FIN,
        desc: "O dia a dia do dinheiro, junto com o seu contador.", fora: "Escrituração, impostos e obrigações continuam com o contador da sua empresa." },
      { id: "auditoria", nome: "Auditoria de contas e contratos", tipo: "Sobre o valor recuperado", link: "/organizar#financas",
        desc: "O dinheiro cobrado a mais em contas e contratos, de volta. Você paga sobre o que for recuperado." },
      { id: "reforma", nome: "Adaptação à Reforma Tributária", tipo: "Projeto", link: "/organizar#reforma-tributaria",
        desc: "Sistemas, notas e preços prontos para as regras novas, junto com o seu contador." }
    ] },
    { id: "conectar", nome: "Energia, redes e cidades", pilar: "p-tec", frase: "A Zethic integra e opera a tecnologia, com parceiros.", servicos: [
      { id: "energia", nome: "Tecnologia para energia", tipo: "Projeto", link: "/conectar#energia",
        desc: "Rede, monitoramento e dados para recarga de carro elétrico, solar, eólica e hídrica. A Zethic não vende energia." },
      { id: "redes-privadas", nome: "Redes privadas", tipo: "Projeto", link: "/conectar#redes-privadas",
        desc: "Wi-Fi, LoRaWAN e 5G privado para agro, mineração e portos. A Zethic não vende acesso à internet." },
      { id: "cidades", nome: "Cidades inteligentes", tipo: "Projeto piloto", link: "/conectar#cidades",
        desc: "Pilotos de sensores, iluminação e dados para o município testar antes de contratar em grande escala." },
      { id: "rastreabilidade", nome: "Rastreabilidade para exportar", tipo: "Projeto", link: "/conectar#rastreabilidade",
        desc: "Origem, carbono e conformidade registrados em dados." },
      { id: "parceiros", nome: "Parceira local de empresas de fora", tipo: "Projeto", link: "/conectar#parceiros",
        desc: "Implantação, homologação e suporte em português para empresas de tecnologia de outros países." }
    ] }
  ];

  var SERVICOS = {};
  DEPTOS.forEach(function (d) { d.servicos.forEach(function (s) { s.depto = d.nome; SERVICOS[s.id] = s; }); });

  /* O pedido fica só nesta aba (sessionStorage) até ser enviado. */
  var CHAVE = "zethic-pedido-v1";
  var pedido = [];
  try {
    var salvo = JSON.parse(sessionStorage.getItem(CHAVE) || "null");
    if (Array.isArray(salvo)) pedido = salvo.filter(function (p) { return p && SERVICOS[p.id]; });
  } catch (e) {}
  function salvar() { try { sessionStorage.setItem(CHAVE, JSON.stringify(pedido)); } catch (e) {} }

  var escolha = {}; /* nível marcado em cada cartão, mesmo antes de entrar no pedido */
  function noPedido(id) { for (var i = 0; i < pedido.length; i++) if (pedido[i].id === id) return pedido[i]; return null; }
  function nivelDe(s) {
    if (!s.niveis) return null;
    var p = noPedido(s.id), id = (p && p.nivel) || escolha[s.id] || s.niveis[0].id;
    for (var i = 0; i < s.niveis.length; i++) if (s.niveis[i].id === id) return s.niveis[i];
    return s.niveis[0];
  }
  function rotulo(p) { var s = SERVICOS[p.id], n = nivelDe(s); return s.nome + (n ? " · " + n.nome : ""); }

  function cartao(s) {
    var on = !!noPedido(s.id), n = nivelDe(s), h = '<article class="loja-item" id="s-' + s.id + '"><div class="loja-item-cab"><h3>' + esc(s.nome) +
      '</h3><span class="loja-tipo">' + esc(s.tipo) + "</span></div><p>" + esc(s.desc) + "</p>";
    if (s.niveis) {
      h += '<fieldset class="niveis"><legend>Nível</legend><div class="niveis-opcoes">' + s.niveis.map(function (v) {
        var idr = "n-" + s.id + "-" + v.id;
        return '<input type="radio" id="' + idr + '" name="n-' + s.id + '" value="' + v.id + '" data-nivel="' + s.id + '"' + (v.id === n.id ? " checked" : "") +
          '><label for="' + idr + '">' + esc(v.nome) + "</label>";
      }).join("") + '</div><ul class="inclui">' + n.itens.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></fieldset>";
    }
    if (s.fora) h += '<p class="loja-fora">' + esc(s.fora) + "</p>";
    h += '<div class="loja-acoes"><button class="por" type="button" data-servico="' + s.id + '" aria-pressed="' + on + '">' +
      (on ? "No pedido · tirar" : "Pôr no pedido") + '</button><a class="detalhe" href="' + s.link + '">Ver detalhes<span class="sr"> de ' + esc(s.nome) + "</span></a></div></article>";
    return h;
  }

  function catalogo() {
    $("catalogo").innerHTML = DEPTOS.map(function (d) {
      return '<section class="loja-depto ' + d.pilar + '" id="d-' + d.id + '" aria-labelledby="t-' + d.id + '"><div class="loja-depto-cab"><p class="rotulo-pilar">Departamento</p><h2 id="t-' + d.id + '">' +
        esc(d.nome) + "</h2><p>" + esc(d.frase) + '</p></div><div class="loja-grade">' + d.servicos.map(cartao).join("") + "</div></section>";
    }).join("");
  }

  function linhas(comTirar) {
    return pedido.map(function (p) {
      return '<li><span>' + esc(rotulo(p)) + '</span><small>' + esc(SERVICOS[p.id].depto) + "</small>" +
        (comTirar ? '<button class="tirar" type="button" data-tirar="' + p.id + '">Tirar<span class="sr"> ' + esc(SERVICOS[p.id].nome) + "</span></button>" : "") + "</li>";
    }).join("");
  }

  function resumo() {
    $("contador").textContent = pedido.length;
    $("linhas").innerHTML = linhas(true);
    $("vazio").hidden = pedido.length > 0;
    $("continuar").disabled = pedido.length === 0;
    $("ir-pedido").hidden = pedido.length === 0;
    salvar();
  }

  function tudo() {
    var foco = document.activeElement && document.activeElement.id;
    catalogo(); resumo();
    if (foco && $(foco)) $(foco).focus();
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-servico],[data-tirar]");
    if (!b) return;
    var id = b.getAttribute("data-servico") || b.getAttribute("data-tirar");
    var s = SERVICOS[id]; if (!s) return;
    var p = noPedido(id);
    if (p) pedido.splice(pedido.indexOf(p), 1);
    else if (b.hasAttribute("data-servico")) pedido.push({ id: id, nivel: s.niveis ? nivelDe(s).id : null });
    if (b.hasAttribute("data-tirar") && !$("vista-pedido").hidden) { $("linhas-2").innerHTML = linhas(false); if (!pedido.length) mostrar("loja"); }
    tudo();
    var alvo = document.querySelector('[data-servico="' + id + '"]');
    if (alvo && b.hasAttribute("data-servico")) alvo.focus();
  });

  document.addEventListener("change", function (e) {
    var r = e.target;
    if (!r.getAttribute || !r.hasAttribute("data-nivel")) return;
    var id = r.getAttribute("data-nivel");
    escolha[id] = r.value;
    var p = noPedido(id); if (p) p.nivel = r.value;
    tudo();
    if ($(r.id)) $(r.id).focus();
  });

  function mostrar(v) {
    $("vista-loja").hidden = v !== "loja";
    $("vista-pedido").hidden = v !== "pedido";
    window.scrollTo(0, 0);
  }

  $("ir-pedido").addEventListener("click", function () {
    mostrar("loja");
    var reduz = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    $("resumo-pedido").scrollIntoView({ behavior: reduz ? "auto" : "smooth", block: "start" });
  });
  $("continuar").addEventListener("click", function () {
    if (!pedido.length) return;
    $("linhas-2").innerHTML = linhas(false);
    $("erro").hidden = true; $("resultado").hidden = true; $("form-pedido").hidden = false;
    mostrar("pedido");
    $("empresa").focus();
  });
  $("voltar").addEventListener("click", function () { mostrar("loja"); });

  function dados() {
    return {
      empresa: $("empresa").value.trim(), nome: $("nome").value.trim(), cargo: $("cargo").value.trim(),
      email: $("email").value.trim(), whats: $("whats").value.trim(), cidade: $("cidade").value.trim(),
      pessoas: $("pessoas").value, mensagem: $("mensagem").value.trim()
    };
  }

  function mensagem(d) {
    var l = ["Olá! Quero uma proposta da Zethic para:"];
    pedido.forEach(function (p) { l.push("- " + rotulo(p)); });
    l.push("", "Empresa: " + d.empresa, "Nome: " + d.nome + (d.cargo ? " (" + d.cargo + ")" : ""), "E-mail: " + d.email, "WhatsApp: " + d.whats);
    if (d.cidade) l.push("Cidade: " + d.cidade);
    l.push("Pessoas na empresa: " + d.pessoas);
    if (d.mensagem) l.push("", d.mensagem);
    return l.join("\n");
  }

  function registrar(corpo) {
    if (!C.FORM_ENDPOINT || !window.fetch) return Promise.resolve(false);
    return fetch(C.FORM_ENDPOINT, { method: "POST", keepalive: true, headers: { "Content-Type": "application/json" }, body: JSON.stringify(corpo) })
      .then(function (r) { return r.ok; }).catch(function () { return false; });
  }

  function manual(texto) {
    $("resultado-texto").value = texto;
    $("resultado-whats").href = "https://wa.me/" + (C.WHATSAPP || "5519981800221") + "?text=" + encodeURIComponent(texto);
    $("resultado-email").href = "mailto:" + (C.EMAIL || "contato@zethic.net") + "?subject=" + encodeURIComponent("Pedido de proposta pela loja da Zethic") + "&body=" + encodeURIComponent(texto);
    $("resultado").hidden = false; $("form-pedido").hidden = true;
    $("resultado-titulo").focus();
  }

  $("form-pedido").addEventListener("submit", function (e) {
    e.preventDefault();
    var d = dados(), falta = [];
    if (!d.empresa) falta.push("empresa");
    if (!d.nome) falta.push("seu nome");
    if (!/^\S+@\S+\.\S+$/.test(d.email)) falta.push("e-mail válido");
    if (d.whats.replace(/\D/g, "").length < 10) falta.push("WhatsApp com DDD");
    if (!d.pessoas) falta.push("número de pessoas na empresa");
    if (!$("consentimento").checked) falta.push("autorização para usar os dados");
    if (!pedido.length) falta.push("ao menos um serviço no pedido");
    if (falta.length) { $("erro").textContent = "Falta preencher: " + falta.join(", ") + "."; $("erro").hidden = false; $("erro").focus(); return; }
    $("erro").hidden = true;
    var texto = mensagem(d);
    var corpo = {
      marca: "zethic", tipo: "pedido-de-proposta", cliente: d,
      servicos: pedido.map(function (p) { return { id: p.id, nivel: p.nivel, nome: rotulo(p), departamento: SERVICOS[p.id].depto }; }),
      consentimento: { finalidade: "preparar a conversa e a proposta", em: new Date().toISOString() }, pagina: location.pathname
    };
    $("enviar").disabled = true;
    registrar(corpo).then(function (ok) {
      $("enviar").disabled = false;
      if (ok) { pedido = []; salvar(); location.href = $("link-obrigado").getAttribute("href"); }
      else manual(texto);
    });
  });

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-copiar]");
    if (!b) return;
    var campo = $(b.getAttribute("data-copiar"));
    var feito = function () { var t = b.textContent; b.textContent = "Copiado"; setTimeout(function () { b.textContent = t; }, 2000); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(campo.value).then(feito, function () { campo.select(); });
    else { campo.select(); try { document.execCommand("copy"); feito(); } catch (err) {} }
  });

  tudo();
})();
