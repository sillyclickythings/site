function loadInto(id, url) {
  const el = document.getElementById(id);
  if (!el) return;
  fetch(url)
    .then(r => r.text())
    .then(html => { el.innerHTML = html; })
    .catch(err => console.error(`Include failed: ${url}`, err));
}

loadInto("site-header", "/includes/header.html");
loadInto("site-footer", "/includes/footer.html");
