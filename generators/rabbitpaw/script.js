const messages = [
  "You gained +3 luck!",
  "A cosmic rabbit approves of you.",
  "Today will be unexpectedly delightful.",
  "You found +1 invisible carrot.",
  "Luck has been applied to your aura.",
  "A tiny rabbit spirit cheers for you!",
  "Your whimsy score increased.",
  "The universe winks in your direction.",
  "A bunny guardian watches approvingly.",
  "You earned +5 rabbit points."
];

const container = document.getElementById("container");
const paw = document.getElementById("paw");
const message = document.getElementById("message");
const chimeSound = new Audio("sounds/chime.mp3");
chimeSound.volume = 0.7;   // adjust loudness 0 to 1

let rabbitEl = null;

function showGifSparkle() {
  const sparkle = document.createElement("img");
  sparkle.src = "images/sparkle.webp";
  sparkle.classList.add("sparkle-gif");

  // where is the paw on screen?
  const pawRect = paw.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const pawCenterX = pawRect.left + pawRect.width / 2;
  const pawCenterY = pawRect.top + pawRect.height / 2;

  // convert to container-relative coords
  const baseX = pawCenterX - containerRect.left;
  const baseY = pawCenterY - containerRect.top;

  // random angle + distance around the paw
  const angle = Math.random() * Math.PI * 2;
  const distance = 20 + Math.random() * 50; // how far from paw

  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance;

  sparkle.style.left = `${baseX + dx}px`;
  sparkle.style.top = `${baseY + dy}px`;

  container.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 1500);
}


function ensureRabbitPosition() {
  if (!rabbitEl) {
    rabbitEl = document.createElement("span");
    rabbitEl.textContent = "🐇";
    rabbitEl.classList.add("rabbit-icon");
    container.appendChild(rabbitEl);
  }

  // position beside message text
  const msgRect = message.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const x = (msgRect.right - containerRect.left) + 8; // 8px to the right
  const y = msgRect.top - containerRect.top + msgRect.height / 2 - 30;

  rabbitEl.style.left = `${x}px`;
  rabbitEl.style.top = `${y}px`;
}

function bounceRabbit() {
  ensureRabbitPosition();

  // restart the animation by removing/re-adding the class
  rabbitEl.classList.remove("rabbit-bounce");

  // force reflow so the browser sees it as a new animation
  void rabbitEl.offsetWidth;

  rabbitEl.classList.add("rabbit-bounce");
}


paw.addEventListener("pointerdown", () => {
  const random = Math.floor(Math.random() * messages.length);

  chimeSound.currentTime = 0;  // rewind so it can play rapidly
  chimeSound.play();

  message.textContent = messages[random];

  // message animation
  message.classList.remove("show");
  setTimeout(() => message.classList.add("show"), 10);


  // Show 5–10 sparkles
  const count = 5 + Math.floor(Math.random() * 5);
  for (let i = 0; i < count; i++) {
    showGifSparkle();

    // tiny rabbit hop!
  bounceRabbit();
  }



});


