import { useState } from "react";
import { createRoot } from "react-dom/client";
import { PakuSprite, type PakuActivity } from "../../src/components/paku/PakuSprite";
import "./preview.css";
import heroImage from "../../src/assets/images/hero/hero-main.jpg";

const controls: { label: string; activity: PakuActivity }[] = [
  { label: "En reposo", activity: "idle" },
  { label: "Saludar", activity: "wave" },
  { label: "Mover orejas", activity: "ears" },
  { label: "Celebrar", activity: "happy" },
  { label: "Escuchar", activity: "listening" },
  { label: "Pensar", activity: "thinking" },
  { label: "Responder", activity: "speaking" },
];

function Preview() {
  const [selection, setSelection] = useState({ activity: "idle" as PakuActivity, replay: 0 });
  const select = (activity: PakuActivity) =>
    setSelection(current => ({ activity, replay: activity === "idle" ? 0 : current.replay + 1 }));

  return (
    <main className="preview">
      <section>
        <h1>Paku</h1>
        <p>Prueba un gesto o déjalo unos segundos en reposo.</p>
        <div className="controls" aria-label="Gestos de Paku">
          {controls.map(control => (
            <button
              key={control.activity}
              type="button"
              onClick={() => select(control.activity)}
              aria-pressed={selection.activity === control.activity}
            >
              {control.label}
            </button>
          ))}
        </div>
      </section>
      <section
        aria-label="Vista previa de la tienda"
        className="store"
      >
        <header>KOTTON</header>
        <img src={heroImage} alt="Rollos de tela en el atelier de Kotton" />
        <h2>Muestrario textil</h2>
        <button
          type="button"
          onClick={() => select("wave")}
          aria-label="Saludar a Paku"
          className="mascot"
        >
          <span>Soy Paku</span>
          <PakuSprite
            activity={selection.activity}
            ambient={selection.activity === "idle"}
            replay={selection.replay}
          />
        </button>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<Preview />);
