export const paku = {
  name: "Paku de papel",
  description: "Una alpaca pequeña, de formas redondas y mejillas suaves. Sus orejas y su pata se mueven como piezas de un títere.",
  architecture: "Piezas de CSS con puntos de giro propios. El cuerpo, las orejas y la pata se pueden mover a la vez y cambiar de gesto al instante.",
  greeting: "¡Hola! Soy Paku.",
  create() {
    const element = document.createElement("div");
    element.className = "character paper";
    element.setAttribute("aria-hidden", "true");
    element.innerHTML = `
      <span class="ground"></span>
      <span class="paper-puppet">
        <span class="paper-foot foot-left"></span><span class="paper-foot foot-right"></span>
        <span class="paper-body"></span><span class="paper-paw"></span>
        <span class="paper-head">
          <span class="paper-ear ear-left"></span><span class="paper-ear ear-right"></span>
          <span class="paper-face">
            <span class="paper-wool"></span>
            <span class="eye eye-left"></span><span class="eye eye-right"></span>
            <span class="muzzle"></span><span class="nose"></span>
            <span class="blush blush-left"></span><span class="blush blush-right"></span>
          </span>
        </span>
        <span class="paper-scarf"></span>
      </span>`;
    return { element };
  },
};
