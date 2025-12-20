const container = document.getElementById("container");
const robot = document.getElementById("robot");
const message = document.getElementById("message");
const badge = document.getElementById("badge");

const chimeSound = new Audio("sounds/chime.mp3");
chimeSound.volume = 0.7;

const STORAGE_KEY = "mildly-encouraging-robot-clicks";
const SLEEP_DELAY = 10000; // 10 seconds
const SMILE_DURATION = 350; // ms – long enough to notice

// image paths
const ROBOT_NEUTRAL = "images/eye-roll-robot.png";
const ROBOT_SMILE = "images/happy-robot.png";
const ROBOT_SLEEP = "images/sleeping-robot.png";

let messages = window.messages || [];
let userClicks = Number(localStorage.getItem(STORAGE_KEY)) || 0;
let sleepTimer = null;

// --------------------
// helpers
// --------------------

function updateBadge() {
  if (badge) badge.textContent = `Luck: ${userClicks}`;
}

function setRobot(src) {
  if (robot.src.endsWith(src)) return;
  robot.src = src;
}

function resetSleepTimer() {
  clearTimeout(sleepTimer);
  sleepTimer = setTimeout(() => {
    setRobot(ROBOT_SLEEP);
  }, SLEEP_DELAY);
}

// --------------------
// init
// --------------------

setRobot(ROBOT_NEUTRAL);
updateBadge();
resetSleepTimer();

// --------------------
// interaction
// --------------------

robot.addEventListener("pointerdown", () => {
  // wake if sleeping
  setRobot(ROBOT_SMILE);

  // sound + haptic
  chimeSound.currentTime = 0;
  chimeSound.play();
  if (navigator.vibrate) navigator.vibrate(20);

  // clicks
  userClicks++;
  localStorage.setItem(STORAGE_KEY, userClicks);
  updateBadge();

  // message (only here)
  if (messages.length) {
    const random = Math.floor(Math.random() * messages.length);
    message.textContent = messages[random];
    message.classList.remove("show");
    requestAnimationFrame(() => message.classList.add("show"));
  }

  // revert to neutral after brief smile
  setTimeout(() => {
    setRobot(ROBOT_NEUTRAL);
  }, SMILE_DURATION);

  // reset sleep timer
  resetSleepTimer();
});
