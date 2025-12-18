// /js/include-head.js
(async function () {
  try {
    // Avoid double-injecting if script runs twice for any reason
    if (document.documentElement.dataset.sctHeadInjected === "1") return;

    const res = await fetch("/partials/head-shared.html", { cache: "no-cache" });
    if (!res.ok) throw new Error(`Failed to load shared head: ${res.status}`);

    const html = await res.text();

    // Create a container and parse the HTML
    const temp = document.createElement("div");
    temp.innerHTML = html;

    // Append each node into <head>
    const nodes = Array.from(temp.childNodes).filter(n => {
      // Ignore empty text nodes
      return !(n.nodeType === Node.TEXT_NODE && !n.textContent.trim());
    });

    for (const node of nodes) {
      // Prevent duplicates (by outerHTML match)
      const outer = node.outerHTML;
      if (outer && document.head.innerHTML.includes(outer)) continue;

      document.head.appendChild(node);
    }

    document.documentElement.dataset.sctHeadInjected = "1";
  } catch (err) {
    console.warn("[SCT] Shared head injection failed:", err);
  }
})();
