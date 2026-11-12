// Pode Curtir: fotos que passam no topo (12/11/2026, Jéssica).
// Só a foto troca; título, texto e botões ficam parados. Troca a cada 6 s, com botão Pausar e pontos para escolher.
// Para sozinha quando a pessoa passa o mouse, foca um controle, sai da aba ou rola o topo para fora da tela.
// Com "reduzir movimento" ligado no aparelho, não troca sozinha; os pontos continuam funcionando.
// Sem JavaScript, fica o quadro 1 parado.
(function () {
  var TEMPO = 6000;
  var v = document.querySelector(".vitrine");
  if (!v) return;
  var quadros = Array.prototype.slice.call(v.querySelectorAll(".quadro"));
  if (quadros.length < 2) return;
  var ctrl = v.querySelector(".vitrine-ctrl");
  var caixa = v.querySelector(".vitrine-pontos");
  var pausa = v.querySelector(".vitrine-pausa");
  var calmo = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var atual = 0, timer = null;
  var pausadaPelaPessoa = calmo, mouse = false, foco = false, fora = false;

  var pontos = quadros.map(function (q, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", "Foto " + (i + 1) + " de " + quadros.length);
    b.addEventListener("click", function () { mostrar(i); reiniciar(); });
    caixa.appendChild(b);
    return b;
  });

  function mostrar(i) {
    quadros[atual].classList.remove("ativo");
    quadros[atual].setAttribute("aria-hidden", "true");
    atual = (i + quadros.length) % quadros.length;
    var q = quadros[atual];
    var img = q.querySelector("img");
    if (img && img.loading === "lazy") img.loading = "eager";
    q.classList.add("ativo");
    q.removeAttribute("aria-hidden");
    pontos.forEach(function (p, k) { p.setAttribute("aria-current", k === atual ? "true" : "false"); });
  }

  function rodando() { return !pausadaPelaPessoa && !mouse && !foco && !fora && !document.hidden; }

  function reiniciar() {
    clearTimeout(timer);
    v.classList.toggle("parada", !rodando());
    if (rodando()) timer = setTimeout(function () { mostrar(atual + 1); reiniciar(); }, TEMPO);
  }

  function rotuloPausa() {
    pausa.textContent = pausadaPelaPessoa ? "Continuar" : "Pausar";
    pausa.setAttribute("aria-pressed", pausadaPelaPessoa ? "true" : "false");
  }

  pausa.addEventListener("click", function () { pausadaPelaPessoa = !pausadaPelaPessoa; rotuloPausa(); reiniciar(); });
  v.addEventListener("mouseenter", function () { mouse = true; reiniciar(); });
  v.addEventListener("mouseleave", function () { mouse = false; reiniciar(); });
  v.addEventListener("focusin", function () { foco = true; reiniciar(); });
  v.addEventListener("focusout", function () { foco = false; reiniciar(); });
  document.addEventListener("visibilitychange", reiniciar);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { fora = !e[0].isIntersecting; reiniciar(); }, { threshold: 0.25 }).observe(v);
  }

  quadros.forEach(function (q, i) { if (i) q.setAttribute("aria-hidden", "true"); });
  pontos[0].setAttribute("aria-current", "true");
  rotuloPausa();
  ctrl.hidden = false;
  v.classList.add("js-vitrine");
  // Só começa a trocar depois que a página terminou de carregar, para não disputar com a foto principal.
  if (document.readyState === "complete") reiniciar();
  else window.addEventListener("load", reiniciar);
})();
