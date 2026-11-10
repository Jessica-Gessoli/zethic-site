// Jéssica Gessoli: vitrine do topo, como a de zethic.net (10/11/2026).
// Troca a cada 7 s; para com o mouse, com o foco do teclado dentro e no botão de pausa.
// Slides .vj-matrix ("A filha de Morpheus") ganham a chuva digital verde, só enquanto estão na tela; o botão de pausa também para a chuva.
// Com "reduzir movimento", nada troca nem se mexe sozinho; sem JavaScript, os slides ficam um embaixo do outro.
(function () {
  var calmo = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("vj-js");

  function chuva(canvas) {
    var ctx = canvas.getContext && canvas.getContext("2d");
    if (!ctx) return { ligar: function () {}, desligar: function () {} };
    var letras = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789JG".split("");
    var tam = 16, colunas = [], quadro = null, ultimo = 0;
    function medir() {
      var r = canvas.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(r.width * d)); canvas.height = Math.max(1, Math.round(r.height * d));
      ctx.setTransform(d, 0, 0, d, 0, 0);
      var n = Math.ceil(r.width / tam);
      colunas = []; for (var i = 0; i < n; i++) colunas.push(Math.random() * -r.height / tam);
      ctx.fillStyle = "#000"; ctx.fillRect(0, 0, r.width, r.height);
    }
    function passo(t) {
      quadro = requestAnimationFrame(passo);
      if (t - ultimo < 55) return; ultimo = t;
      var w = canvas.width, h = canvas.height, d = Math.min(window.devicePixelRatio || 1, 2);
      ctx.fillStyle = "rgba(0,0,0,.09)"; ctx.fillRect(0, 0, w / d, h / d);
      ctx.font = tam + "px ui-monospace, Menlo, Consolas, monospace";
      for (var i = 0; i < colunas.length; i++) {
        var y = colunas[i] * tam;
        ctx.fillStyle = Math.random() > .96 ? "#E8FFF0" : "#3DFF8B";
        ctx.fillText(letras[(Math.random() * letras.length) | 0], i * tam, y);
        colunas[i] = y > h / d && Math.random() > .975 ? 0 : colunas[i] + 1;
      }
    }
    return {
      ligar: function () { if (quadro || calmo) return; medir(); quadro = requestAnimationFrame(passo); },
      desligar: function () { if (quadro) cancelAnimationFrame(quadro); quadro = null; }
    };
  }

  function iniciar() {
    var v = document.querySelector(".vj");
    if (!v) return;
    var slides = Array.prototype.slice.call(v.querySelectorAll(".vj-slide"));
    var pontos = Array.prototype.slice.call(v.querySelectorAll(".vj-ponto"));
    var pausa = v.querySelector(".vj-pausa");
    var en = document.documentElement.lang.indexOf("en") === 0;
    var chuvas = slides.map(function (s) { var c = s.querySelector(".vj-chuva"); return c ? chuva(c) : null; });
    var atual = 0, timer = null, pausadoPeloUsuario = calmo, tempo = 7000;

    function mostrar(i) {
      atual = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        var ativo = k === atual;
        s.classList.toggle("ativo", ativo);
        s.setAttribute("aria-hidden", ativo ? "false" : "true");
        if ("inert" in s) s.inert = !ativo;
        if (chuvas[k]) { if (ativo && !pausadoPeloUsuario) chuvas[k].ligar(); else chuvas[k].desligar(); }
      });
      pontos.forEach(function (p, k) {
        p.classList.toggle("ativo", k === atual);
        p.setAttribute("aria-current", k === atual ? "true" : "false");
      });
      var barra = pontos[atual] && pontos[atual].querySelector(".vj-barra");
      if (barra) { barra.style.animation = "none"; void barra.offsetWidth; barra.style.animation = ""; }
    }
    function dentro() { return v.contains(document.activeElement) || v.matches(":hover"); }
    function parar() { if (timer) clearInterval(timer); timer = null; v.classList.add("pausado"); }
    function tocar() {
      parar();
      if (pausadoPeloUsuario || dentro() || document.hidden) return;
      v.classList.remove("pausado");
      mostrar(atual);
      timer = setInterval(function () { mostrar(atual + 1); }, tempo);
    }
    function rotulo() {
      if (!pausa) return;
      pausa.textContent = pausadoPeloUsuario ? (en ? "Play" : "Reproduzir") : (en ? "Pause" : "Pausar");
      pausa.setAttribute("aria-label", pausadoPeloUsuario ? (en ? "Resume the automatic rotation" : "Retomar a troca automática dos destaques") : (en ? "Pause the automatic rotation" : "Pausar a troca automática dos destaques"));
    }
    pontos.forEach(function (p, k) { p.addEventListener("click", function () { mostrar(k); parar(); }); });
    if (pausa) pausa.addEventListener("click", function () { pausadoPeloUsuario = !pausadoPeloUsuario; rotulo(); if (pausadoPeloUsuario) { parar(); if (chuvas[atual]) chuvas[atual].desligar(); } else { if (chuvas[atual]) chuvas[atual].ligar(); pausa.blur(); tocar(); } });
    v.addEventListener("mouseenter", parar);
    v.addEventListener("mouseleave", function () { setTimeout(tocar, 0); });
    v.addEventListener("focusin", parar);
    v.addEventListener("focusout", function (e) { if (!v.contains(e.relatedTarget)) setTimeout(tocar, 0); });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { parar(); chuvas.forEach(function (c) { if (c) c.desligar(); }); }
      else { if (chuvas[atual] && !pausadoPeloUsuario) chuvas[atual].ligar(); tocar(); }
    });
    mostrar(0); rotulo(); tocar();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
