// sound.js — minimal, safe, KISS

const KEY = "sct-sound";

function isOn() {
  return localStorage.getItem(KEY) !== "off";
}

function updateButton() {
  const btn = document.getElementById("sound-toggle");
  if (!btn) return;

  btn.textContent = isOn() ? "🔊" : "🔇";
}

document.addEventListener("click", (e) => {
  if (!e.target.closest("#sound-toggle")) return;

  const nowOn = !isOn();
  localStorage.setItem(KEY, nowOn ? "on" : "off");
  updateButton();
});

document.addEventListener("DOMContentLoaded", updateButton);
