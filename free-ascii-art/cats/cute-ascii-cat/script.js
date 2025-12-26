import { CATS } from "./data/cats.js";

const container = document.getElementById("cat-tiles");

async function copy(text) {
  await navigator.clipboard.writeText(text);
}

CATS.forEach((cat) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "sct-ascii-tile";

  const art = document.createElement("pre");
  art.className = "sct-ascii-art";
  art.textContent = cat.art.trim();

  btn.appendChild(art);

btn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(cat.art.trim());

  const soundOn = localStorage.getItem("sct-sound") !== "off";
  if (soundOn) {
    const audio = new Audio(cat.sound);
    audio.volume = 0.8;
    audio.play().catch(() => {});
  }

  btn.classList.add("copied");
  setTimeout(() => btn.classList.remove("copied"), 600);
});

  container.appendChild(btn);
});
