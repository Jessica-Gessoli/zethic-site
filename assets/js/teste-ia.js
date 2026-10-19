// Teste "Sua IA está vazando dados do seu Negócio?". Roda só no navegador:
// nenhuma resposta é salva, enviada ou medida. Não há cookies, armazenamento local nem chamadas de rede.
(function () {
  var form = document.getElementById("teste"), out = document.getElementById("resultado");
  if (!form || !out) return;
  var perguntas = Array.prototype.slice.call(form.querySelectorAll("fieldset[data-risco]"));
  var msg = document.getElementById("teste-msg");

  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var riscos = [], faltam = 0, primeiraFaltando = null;
    perguntas.forEach(function (fs, i) {
      var r = fs.querySelector("input:checked");
      if (!r) { faltam++; if (!primeiraFaltando) primeiraFaltando = fs.querySelector("input"); return; }
      if (r.value === fs.getAttribute("data-risco")) riscos.push(i);
    });
    if (faltam) {
      msg.textContent = faltam === 1 ? "Falta 1 pergunta." : "Faltam " + faltam + " perguntas.";
      msg.className = "erro";
      if (primeiraFaltando) primeiraFaltando.focus();
      return;
    }
    msg.textContent = ""; msg.className = "";
    var n = riscos.length;
    var nivel = n <= 2 ? ["n-baixo", "Bom caminho. Mantenha as regras e revise a cada trimestre."]
      : n <= 5 ? ["n-medio", "Atenção. Há brechas que se resolvem com regras simples."]
      : ["n-alto", "Risco alto. Os dados do seu Negócio podem estar saindo pela IA."];

    out.textContent = "";
    out.className = "resultado " + nivel[0];
    out.appendChild(el("h2", { id: "t-resultado" }, "Seu resultado"));
    out.appendChild(el("p", { "class": "placar" }, n + (n === 1 ? " resposta de risco" : " respostas de risco")));
    out.appendChild(el("p", { "class": "nivel" }, nivel[1]));
    if (n) {
      out.appendChild(el("p", {}, "O que fazer em cada ponto:"));
      var ul = el("ul", { "class": "dicas" });
      riscos.forEach(function (i) {
        var fs = perguntas[i], li = el("li");
        li.appendChild(el("strong", {}, "Pergunta " + (i + 1) + ": " + fs.getAttribute("data-curta")));
        li.appendChild(document.createTextNode(fs.getAttribute("data-dica")));
        ul.appendChild(li);
      });
      out.appendChild(ul);
    } else {
      out.appendChild(el("p", {}, "Nenhuma resposta de risco. Deixe as regras por escrito para que quem entrar na equipe também siga."));
    }
    var acoes = el("div", { "class": "acoes" });
    acoes.appendChild(el("a", { "class": "btn", href: "/prompt-joia" }, "Baixar o caderno grátis"));
    acoes.appendChild(el("a", { "class": "btn-linha", href: "/diagnostico" }, "Quero um Diagnóstico de Cibersegurança e IA"));
    acoes.appendChild(el("a", { "class": "btn-linha", href: "https://wa.me/5519981800221?text=Ol%C3%A1%2C%20J%C3%A9ssica!%20Fiz%20o%20teste%20de%20IA%20segura%20e%20quero%20conversar.", rel: "noopener" }, "Conversar no WhatsApp"));
    acoes.appendChild(el("a", {
      "class": "btn-linha", href: "https://wa.me/?text=Fa%C3%A7a%20este%20teste%20de%202%20minutos%3A%20https%3A%2F%2Fzethic.net%2Fteste-ia.html", rel: "noopener",
      "data-compartilhar": "", "data-titulo": "Sua IA está segura?", "data-texto": "Faça este teste de 2 minutos:", "data-url": "https://zethic.net/teste-ia.html"
    }, "Enviar o teste para um colega"));
    out.appendChild(acoes);
    out.appendChild(el("p", { "class": "nota" }, "O WhatsApp abre com a mensagem pronta. Ela só chega se você apertar enviar. Teste indicativo: não substitui um diagnóstico."));
    out.hidden = false;
    out.focus();
  });
})();
