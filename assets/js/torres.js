// Zethic: menu das marcas, banners da home e entrada suave das seções.
// Carregado no <head> (sem defer) só para marcar a página como "com JavaScript" antes de desenhar;
// o resto espera o documento carregar. Sem JavaScript, o menu abre ao passar o mouse e os banners aparecem empilhados.
(function () {
  document.documentElement.classList.add("js");
  var calmo = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function menu() {
    var cab = document.querySelector("header");
    if (!cab) return;
    var botaoMenu = cab.querySelector(".menu-btn");
    var torres = Array.prototype.slice.call(cab.querySelectorAll(".torre"));

    function fecharTorres(exceto) {
      torres.forEach(function (t) {
        if (t === exceto) return;
        t.classList.remove("aberta");
        var b = t.querySelector(".torre-btn");
        if (b) b.setAttribute("aria-expanded", "false");
      });
    }

    torres.forEach(function (t) {
      var b = t.querySelector(".torre-btn");
      if (!b) return;
      b.addEventListener("click", function () {
        var abrir = !t.classList.contains("aberta");
        fecharTorres(t);
        t.classList.toggle("aberta", abrir);
        b.setAttribute("aria-expanded", abrir ? "true" : "false");
      });
      // No computador, passar o mouse abre o painel; o atributo acompanha para leitores de tela.
      t.addEventListener("mouseenter", function () { if (!estreito()) b.setAttribute("aria-expanded", "true"); });
      t.addEventListener("mouseleave", function () {
        if (!estreito() && !t.classList.contains("aberta")) b.setAttribute("aria-expanded", "false");
      });
    });

    if (botaoMenu) {
      botaoMenu.addEventListener("click", function () {
        var abrir = !cab.classList.contains("menu-aberto");
        cab.classList.toggle("menu-aberto", abrir);
        botaoMenu.setAttribute("aria-expanded", abrir ? "true" : "false");
        if (!abrir) fecharTorres(null);
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var aberta = cab.querySelector(".torre.aberta .torre-btn");
      fecharTorres(null);
      if (aberta) aberta.focus();
    });
    document.addEventListener("click", function (e) {
      if (!cab.contains(e.target)) fecharTorres(null);
    });

    function estreito() { return window.matchMedia("(max-width:70rem)").matches; }
  }

  function vitrine() {
    var v = document.querySelector(".vitrine");
    if (!v) return;
    var slides = Array.prototype.slice.call(v.querySelectorAll(".slide"));
    var pontos = Array.prototype.slice.call(v.querySelectorAll(".ponto"));
    var pausa = v.querySelector(".pausa");
    if (slides.length < 2) return;
    var atual = 0, timer = null, pausadoPeloUsuario = calmo, tempo = 7000;

    function mostrar(i) {
      atual = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        var ativo = k === atual;
        s.classList.toggle("ativo", ativo);
        s.setAttribute("aria-hidden", ativo ? "false" : "true");
      });
      pontos.forEach(function (p, k) {
        p.classList.toggle("ativo", k === atual);
        p.setAttribute("aria-current", k === atual ? "true" : "false");
      });
      reiniciarBarra();
    }
    // Reinicia a barrinha de progresso do destaque atual, para acompanhar o tempo da troca.
    function reiniciarBarra() {
      var barra = pontos[atual] && pontos[atual].querySelector(".barra");
      if (barra) { barra.style.animation = "none"; void barra.offsetWidth; barra.style.animation = ""; }
    }
    function tocar() {
      parar();
      if (pausadoPeloUsuario) return;
      v.classList.remove("pausado");
      reiniciarBarra();
      timer = setInterval(function () { mostrar(atual + 1); }, tempo);
    }
    function parar() { if (timer) clearInterval(timer); timer = null; v.classList.add("pausado"); }
    function rotuloPausa() {
      if (!pausa) return;
      pausa.textContent = pausadoPeloUsuario ? "Reproduzir" : "Pausar";
      pausa.setAttribute("aria-label", pausadoPeloUsuario ? "Retomar a troca automática dos destaques" : "Pausar a troca automática dos destaques");
    }

    pontos.forEach(function (p, k) {
      p.addEventListener("click", function () { mostrar(k); tocar(); });
    });
    if (pausa) pausa.addEventListener("click", function () {
      pausadoPeloUsuario = !pausadoPeloUsuario; rotuloPausa(); tocar();
    });
    v.addEventListener("mouseenter", parar);
    v.addEventListener("mouseleave", tocar);
    v.addEventListener("focusin", parar);
    v.addEventListener("focusout", function (e) { if (!v.contains(e.relatedTarget)) tocar(); });
    document.addEventListener("visibilitychange", function () { if (document.hidden) parar(); else tocar(); });

    mostrar(0); rotuloPausa(); tocar();
  }

  function revelar() {
    var itens = Array.prototype.slice.call(document.querySelectorAll(".revela"));
    if (!itens.length) return;
    if (calmo || !("IntersectionObserver" in window)) { itens.forEach(function (i) { i.classList.add("visivel"); }); return; }
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visivel"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    itens.forEach(function (i) { io.observe(i); });
  }

  function iniciar() { menu(); vitrine(); revelar(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
