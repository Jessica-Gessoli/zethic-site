// Jéssica Gessoli: fotos do topo trocando sozinhas, como a vitrine de zethic.net (10/11/2026).
// Sem JavaScript ou com "reduzir movimento", fica só a primeira foto. Para ao passar o mouse, ao focar e no botão de pausa.
(function () {
  var calmo = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function iniciar() {
    var f = document.querySelector(".retratos");
    if (!f) return;
    var fotos = Array.prototype.slice.call(f.querySelectorAll(".retrato"));
    var barras = Array.prototype.slice.call(f.querySelectorAll(".retratos-barras i"));
    var pausa = f.querySelector(".retratos-pausa");
    if (fotos.length < 2 || calmo) return;
    document.documentElement.classList.add("retratos-js");
    var en = document.documentElement.lang.indexOf("en") === 0;
    var atual = 0, timer = null, pausado = false, tempo = 6000;
    function mostrar(i) {
      atual = (i + fotos.length) % fotos.length;
      fotos.forEach(function (p, k) { p.classList.toggle("ativo", k === atual); });
      barras.forEach(function (b, k) {
        b.classList.remove("ativo");
        if (k === atual) { void b.offsetWidth; b.classList.add("ativo"); }
      });
    }
    function tocar() { parar(); if (pausado) return; f.classList.remove("pausado"); timer = setInterval(function () { mostrar(atual + 1); }, tempo); }
    function parar() { if (timer) clearInterval(timer); timer = null; f.classList.add("pausado"); }
    function rotulo() {
      if (!pausa) return;
      pausa.textContent = pausado ? "▶" : "II";
      pausa.setAttribute("aria-label", pausado ? (en ? "Resume the photo rotation" : "Retomar a troca das fotos") : (en ? "Pause the photo rotation" : "Pausar a troca das fotos"));
    }
    if (pausa) {
      pausa.parentNode.removeAttribute("aria-hidden");
      pausa.addEventListener("click", function () { pausado = !pausado; rotulo(); tocar(); });
    }
    f.addEventListener("mouseenter", parar);
    f.addEventListener("mouseleave", tocar);
    document.addEventListener("visibilitychange", function () { if (document.hidden) parar(); else tocar(); });
    mostrar(0); rotulo(); tocar();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
