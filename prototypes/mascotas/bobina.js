const SIZE = 120;
const THREAD = "#a74b38";

function drawThread(context, pose, amount) {
  context.clearRect(0, 0, SIZE, SIZE);
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = 2.6;
  context.strokeStyle = THREAD;
  context.beginPath();
  context.moveTo(78, 73);
  if (pose === "joy") {
    context.bezierCurveTo(89, 84, 89, 74, 91, 66 - 23 * amount);
    context.bezierCurveTo(72, 56 - 38 * amount, 89, 45 - 29 * amount, 96, 56 - 28 * amount);
    context.bezierCurveTo(110, 44 - 26 * amount, 117, 57 - 20 * amount, 91, 66 - 23 * amount);
  } else if (pose === "wave") {
    context.bezierCurveTo(99, 91, 110, 74 - 25 * amount, 94 + 10 * amount, 57 - 29 * amount);
    context.bezierCurveTo(89 + 8 * amount, 53 - 31 * amount, 94, 48 - 25 * amount, 102, 49 - 24 * amount);
  } else {
    const lift = pose === "curious" ? 27 * amount : 0;
    context.bezierCurveTo(94, 91 - lift, 113, 89 - lift, 108, 74 - lift);
    context.bezierCurveTo(104, 64 - lift, 94, 72 - lift, 100, 77 - lift);
  }
  context.stroke();
}

export const bobina = {
  name: "Bobina de hilo",
  description: "El carrete toma vida. Su hilo saluda como una mano y se convierte en un corazón cuando celebra.",
  architecture: "El cuerpo usa capas de CSS y el hilo se dibuja en Canvas con curvas Bézier. El dibujo se actualiza solo durante el gesto.",
  greeting: "¡Hola! ¿Qué vas a coser?",
  create() {
    const element = document.createElement("div");
    element.className = "character spool";
    element.setAttribute("aria-hidden", "true");
    element.innerHTML = `
      <span class="ground"></span><canvas></canvas>
      <span class="spool-body">
        <span class="spool-thread"></span><span class="spool-cap cap-top"></span><span class="spool-cap cap-bottom"></span>
        <span class="eye eye-left"></span><span class="eye eye-right"></span><span class="spool-smile"></span>
      </span>`;
    const canvas = element.querySelector("canvas");
    const scale = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = canvas.height = SIZE * scale;
    const context = canvas.getContext("2d");
    context.scale(scale, scale);
    let frame;
    drawThread(context, "idle", 0);

    return {
      element,
      play(pose, duration, reduced) {
        cancelAnimationFrame(frame);
        if (reduced) {
          drawThread(context, pose, 1);
          return;
        }
        const start = performance.now();
        const tick = now => {
          const progress = Math.min((now - start) / duration, 1);
          const envelope = Math.sin(Math.PI * progress);
          const wave = .76 + .24 * Math.sin(progress * Math.PI * 7);
          drawThread(context, pose, pose === "wave" ? envelope * wave : envelope);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      stop() {
        cancelAnimationFrame(frame);
        drawThread(context, "idle", 0);
      },
    };
  },
};
