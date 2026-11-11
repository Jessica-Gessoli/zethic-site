/* Jéssica Gessoli — medição de visitas com o Google Analytics 4 (11/11/2026).
   Nada é carregado sem aceite. A escolha fica na mesma chave do aviso da loja (jessicagessoli-consentimento-v1),
   então quem aceitou ou recusou numa página não vê o aviso de novo em outra.
   Acesso interno: abrir qualquer página com ?interno=1 desliga a medição neste navegador; ?interno=0 religa.
   Se o Pixel da Meta for ligado (PIXEL_ID em jessicagessoli-config.js), juntar os dois avisos num só. */
(function () {
  var GA4_ID = "G-883BVBTM0E";
  var CHAVE = "jessicagessoli-consentimento-v1";
  var INTERNO = "jessicagessoli-acesso-interno";
  var en = /^en/i.test(document.documentElement.lang || "");

  function ler(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function gravar(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var interno = false;
  try {
    var qi = new URLSearchParams(location.search).get("interno");
    if (qi === "1") gravar(INTERNO, "1");
    if (qi === "0") localStorage.removeItem(INTERNO);
    interno = ler(INTERNO) === "1";
  } catch (e) {}

  var ativo = false;
  function evento(nome, params) { if (ativo && typeof window.gtag === "function") window.gtag("event", nome, params || {}); }
  window.jgMedir = evento;
  // Páginas que vieram da Zethic (teste de golpe, diagnóstico, campanha) chamam window.zethicEvento: os eventos delas
  // passam a cair na medição da Jéssica Gessoli.
  if (!window.zethicEvento) window.zethicEvento = evento;

  function carregar() {
    if (ativo || interno) return;
    ativo = true;
    var s = document.createElement("script");
    s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA4_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", GA4_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
  }

  function banner() {
    if (interno || document.getElementById("jg-medicao")) return;
    var b = document.createElement("div");
    b.id = "jg-medicao"; b.setAttribute("role", "region"); b.setAttribute("aria-label", en ? "Visit measurement" : "Medição de visitas");
    b.style.cssText = "position:fixed;left:1rem;right:1rem;bottom:1rem;z-index:60;max-width:34rem;margin:0 auto;background:#12352B;color:#F3F5F2;border:1px solid rgba(217,183,110,.45);border-radius:6px;padding:1rem 1.1rem;font:15px/1.5 'IBM Plex Sans',system-ui,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.35)";
    var p = document.createElement("p");
    p.style.margin = "0 0 .8rem";
    p.appendChild(document.createTextNode(en
      ? "May I measure your visit with Google Analytics to improve this site? It sets cookies. Nothing is used for ads. "
      : "Posso medir a sua visita com o Google Analytics para melhorar o site? Isso grava cookies. Nada é usado para anúncios. "));
    var a = document.createElement("a");
    a.href = "/privacidade/#cookies"; a.textContent = en ? "Privacy (in Portuguese)" : "Saiba mais"; a.style.color = "#D9B76E";
    if (en) a.hreflang = "pt-BR";
    p.appendChild(a);
    b.appendChild(p);
    function botao(txt, principal, valor) {
      var x = document.createElement("button"); x.type = "button"; x.textContent = txt;
      x.style.cssText = "font:600 15px 'IBM Plex Sans',system-ui,sans-serif;padding:.6rem 1rem;border-radius:4px;margin-right:.6rem;cursor:pointer;" +
        (principal ? "border:0;background:#D9B76E;color:#12352B" : "border:1px solid #D9B76E;background:transparent;color:#F3F5F2");
      x.addEventListener("click", function () { gravar(CHAVE, valor); if (valor === "aceito") carregar(); b.remove(); });
      return x;
    }
    b.appendChild(botao(en ? "Accept" : "Aceitar", true, "aceito"));
    b.appendChild(botao(en ? "Decline" : "Recusar", false, "recusado"));
    document.body.appendChild(b);
  }

  function iniciar() {
    var v = ler(CHAVE);
    if (v === "aceito") carregar(); else if (v !== "recusado") banner();
    var pref = document.querySelectorAll("[data-preferencias-cookies]");
    for (var i = 0; i < pref.length; i++) {
      pref[i].hidden = false;
      pref[i].addEventListener("click", function (e) {
        e.preventDefault();
        var antes = ler(CHAVE); gravar(CHAVE, "");
        if (antes === "aceito") { location.reload(); return; }
        banner();
      });
    }
    // Caminho de venda: WhatsApp conta como contato; links de pagamento do Asaas, como início de compra.
    document.addEventListener("click", function (e) {
      var l = e.target.closest && e.target.closest("a[href]");
      if (!l) return;
      var h = l.getAttribute("href");
      if (/wa\.me\//.test(h)) evento("generate_lead", { canal: "whatsapp", pagina: location.pathname });
      else if (/asaas\.com\//.test(h)) evento("begin_checkout", { pagina: location.pathname });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar); else iniciar();
})();
