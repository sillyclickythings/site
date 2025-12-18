// Google Analytics
(function loadGA(id) {
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", id);
})("G-PDL5F7M3PP");

// counter.dev
(function loadCounter() {
  const s = document.createElement("script");
  s.src = "https://cdn.counter.dev/script.js";
  s.setAttribute("data-id", "0738f13f-0c45-4dc5-8912-f18d6766a843");
  s.setAttribute("data-utcoffset", "0");
  document.head.appendChild(s);
})();
