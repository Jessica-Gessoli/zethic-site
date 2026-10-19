// Botão "Enviar para um colega": usa o compartilhamento do aparelho quando existe;
// senão segue o link do WhatsApp (wa.me) que já está no href. Nada é guardado nem enviado pelo site.
(function () {
  document.addEventListener("click", function (ev) {
    var a = ev.target.closest ? ev.target.closest("a[data-compartilhar]") : null;
    if (!a || typeof navigator.share !== "function") return;
    ev.preventDefault();
    navigator.share({ title: a.getAttribute("data-titulo") || document.title, text: a.getAttribute("data-texto") || "", url: a.getAttribute("data-url") || location.href })
      .catch(function (err) {
        if (err && err.name === "AbortError") return;
        window.open(a.href, "_blank", "noopener");
      });
  });
})();
