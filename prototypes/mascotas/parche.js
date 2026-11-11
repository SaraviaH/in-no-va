const poses = ["idle", "wave", "curious", "joy"];

export const parche = {
  name: "Parche bordado",
  description: "Un parche de tela con cara de caricatura. Cambia de expresión en poses cortas, como un personaje de stop motion.",
  architecture: "Cuatro poses dibujadas con capas de CSS que se intercambian como fotogramas. Cada expresión se puede afinar por separado o exportar después como sprite.",
  greeting: "¡Hola! Aquí estoy.",
  create() {
    const element = document.createElement("div");
    element.className = "character patch";
    element.setAttribute("aria-hidden", "true");
    element.innerHTML = `<span class="ground"></span>${poses.map(pose => `
      <span class="patch-frame patch-${pose}">
        <span class="patch-hand"></span>
        <span class="patch-fabric">
          <span class="patch-border"></span>
          <span class="eye eye-left"></span><span class="eye eye-right"></span><span class="patch-mouth"></span>
          <span class="blush blush-left"></span><span class="blush blush-right"></span>
        </span>
        <span class="patch-spark"></span>
      </span>`).join("")}`;
    return { element };
  },
};
