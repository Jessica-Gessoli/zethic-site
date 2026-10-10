/* Medição de visitas da Zethic: Google Analytics 4.
   Nada é carregado sem consentimento. Com os IDs vazios, nada aparece e nada é carregado.
   Para ativar: preencha GA4_ID (G-XXXXXXXXXX) e atualize /privacidade. */
(function () {
  var CONFIG = { GA4_ID: "", CHAVE: "zethic-consentimento-v1" };
  if (!/^G-[A-Z0-9]{4,20}$/.test(CONFIG.GA4_ID)) return;

  function ler() { try { return localStorage.getItem(CONFIG.CHAVE); } catch (e) { return null; } }
  function gravar(v) { try { localStorage.setItem(CONFIG.CHAVE, v); } catch (e) {} }

  var ativo = false;
  function evento(nome, params) { if (ativo && typeof window.gtag === "function") window.gtag("event", nome, params || {}); }
  window.zethicEvento = evento;

  function carregar() {
    if (ativo) return; ativo = true;
    if (/^G-[A-Z0-9]{4,20}$/.test(CONFIG.GA4_ID)) {
      var s = document.createElement("script");
      s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + CONFIG.GA4_ID;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted" });
      window.gtag("js", new Date());
      window.gtag("config", CONFIG.GA4_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
    }
  }

  function banner() {
    if (document.getElementById("zethic-consent")) return;
    var b = document.createElement("div");
    b.id = "zethic-consent"; b.setAttribute("role", "dialog"); b.setAttribute("aria-label", "Medição de visitas");
    b.style.cssText = "position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:50;max-width:34rem;margin:0 auto;background:#0E1640;color:#fff;border:1px solid rgba(140,170,255,.3);border-radius:6px;padding:1rem 1.1rem;font:15px/1.5 system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.5)";
    var p = document.createElement("p");
    p.style.margin = "0 0 .8rem";
    p.appendChild(document.createTextNode("Posso medir sua visita com o Google Analytics para melhorar o site? Isso grava cookies. Nada é usado para anúncios. "));
    var a = document.createElement("a"); a.href = "/privacidade#cookies"; a.textContent = "Saiba mais"; a.style.color = "#00E5FF";
    p.appendChild(a);
    b.appendChild(p);
    function botao(txt, principal, acao) {
      var x = document.createElement("button"); x.type = "button"; x.textContent = txt;
      x.style.cssText = "font:600 15px system-ui,sans-serif;padding:.6rem 1rem;border-radius:4px;margin-right:.6rem;cursor:pointer;" + (principal ? "border:0;background:linear-gradient(90deg,#00E5FF,#1F63FF);color:#02041A" : "border:1px solid #00E5FF;background:transparent;color:#fff");
      x.addEventListener("click", function () { acao(); b.remove(); });
      return x;
    }
    b.appendChild(botao("Aceitar", true, function () { gravar("aceito"); carregar(); }));
    b.appendChild(botao("Recusar", false, function () { gravar("recusado"); }));
    document.body.appendChild(b);
  }

  window.zethicPreferencias = function () {
    var antes = ler(); gravar("");
    if (antes === "aceito") { location.reload(); return; }
    banner();
  };

  function iniciar() {
    var v = ler();
    if (v === "aceito") carregar(); else if (v !== "recusado") banner();
    var pref = document.querySelectorAll("[data-preferencias-cookies]");
    for (var i = 0; i < pref.length; i++) { pref[i].hidden = false; pref[i].addEventListener("click", function (e) { e.preventDefault(); window.zethicPreferencias(); }); }
    document.addEventListener("click", function (e) {
      var l = e.target.closest && e.target.closest('a[href^="/fale"]');
      if (l) evento("generate_lead", { canal: "whatsapp", pagina: location.pathname, link: l.getAttribute("href") });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
