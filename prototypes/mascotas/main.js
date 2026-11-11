import { paku } from "./paku.js";
import { bobina } from "./bobina.js";
import { parche } from "./parche.js";

const variants = [paku, bobina, parche];
const poses = {
  wave: { duration: 1120, message: variant => variant.greeting },
  curious: { duration: 1250, message: () => "Te escucho." },
  joy: { duration: 1100, message: () => "¡Qué buena idea!" },
};
const idlePoses = ["curious", "wave", "joy"];
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const stage = document.querySelector("#stage");
const message = document.querySelector("#mascot-message");
const picker = document.querySelector(".proto-picker");
const highlight = picker.querySelector(".proto-picker-highlight");
const items = [...picker.querySelectorAll(".proto-picker-item:not(.proto-picker-replay)")];
const replay = picker.querySelector(".proto-picker-replay");
let current = 0;
let character;
let finishTimer;
let idleTimer;
let nextIdle = 0;

function clearTimers() {
  clearTimeout(finishTimer);
  clearTimeout(idleTimer);
}

function scheduleIdle() {
  clearTimeout(idleTimer);
  if (document.hidden || reducedMotion.matches) return;
  idleTimer = setTimeout(() => {
    const pose = idlePoses[nextIdle];
    nextIdle = (nextIdle + 1) % idlePoses.length;
    play(pose, false);
  }, 4200);
}

function play(pose, announce = true) {
  clearTimers();
  const { element } = character;
  const { duration, message: describe } = poses[pose];
  if (element.dataset.pose === pose) {
    for (const animation of element.getAnimations({ subtree: true })) {
      animation.currentTime = 0;
      animation.play();
    }
  }
  element.dataset.pose = pose;
  character.play?.(pose, duration, reducedMotion.matches);
  if (announce) message.textContent = describe(variants[current]);
  finishTimer = setTimeout(() => {
    element.dataset.pose = "idle";
    character.stop?.();
    if (announce) message.textContent = variants[current].greeting;
    scheduleIdle();
  }, duration);
}

function mount(i) {
  clearTimers();
  character?.stop?.();
  const variant = variants[i];
  character = variant.create();
  stage.replaceChildren(character.element);
  document.querySelector("#variant-name").textContent = variant.name;
  document.querySelector("#variant-description").textContent = variant.description;
  document.querySelector("#variant-architecture").textContent = variant.architecture;
  nextIdle = 0;
  play("wave");
}

function moveHighlight() {
  const el = items[current];
  highlight.style.width = el.offsetWidth + "px";
  highlight.style.transform = `translateX(${el.offsetLeft}px)`;
}

function setActive(i) {
  if (i < 0 || i >= variants.length) return;
  current = i;
  items.forEach((el, j) => {
    el.toggleAttribute("data-active", j === i);
    if (j === i) el.setAttribute("aria-current", "true");
    else el.removeAttribute("aria-current");
  });
  moveHighlight();
  const url = new URL(location);
  url.searchParams.set("v", i + 1);
  history.replaceState(null, "", url);
  mount(i);
}

items.forEach((el, i) => el.addEventListener("click", () => setActive(i)));
replay.addEventListener("click", () => mount(current));
window.addEventListener("resize", moveHighlight);

document.addEventListener("keydown", e => {
  if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const num = parseInt(e.key, 10);
  if (num >= 1 && num <= variants.length) setActive(num - 1);
  else if (e.key === "ArrowRight") setActive((current + 1) % variants.length);
  else if (e.key === "ArrowLeft") setActive((current - 1 + variants.length) % variants.length);
  else if (e.key === "r" || e.key === "R") mount(current);
});

document.querySelectorAll("[data-action]").forEach(button => {
  button.addEventListener("click", () => play(button.dataset.action));
});
stage.addEventListener("click", () => play("wave"));

function resetIdle() {
  clearTimers();
  character.element.dataset.pose = "idle";
  character.stop?.();
  message.textContent = variants[current].greeting;
  scheduleIdle();
}

document.addEventListener("visibilitychange", resetIdle);
reducedMotion.addEventListener("change", resetIdle);
const initial = Number(new URLSearchParams(location.search).get("v"));
setActive(Number.isInteger(initial) && initial >= 1 && initial <= variants.length ? initial - 1 : 0);
requestAnimationFrame(() => requestAnimationFrame(() => picker.setAttribute("data-ready", "")));
