import { useEffect, useRef } from "react";
import { FRAME_HEIGHT, FRAME_WIDTH, HEADROOM, loadPakuAtlas, POSES } from "./pakuSprites";

export type PakuActivity = Exclude<keyof typeof POSES, "rest">;
export type PakuReaction = {
  pose: "wave" | "happy" | "lookLeft" | "lookRight";
  createdAt: number;
};
type Pose = keyof typeof POSES;

const AMBIENT_GESTURES = [
  { pose: "idle", delay: 3000 },
  { pose: "curious", delay: 4700 },
  { pose: "smile", delay: 5800 },
  { pose: "wave", delay: 5300 },
] as const;

const BROWSING_GESTURES = [
  { pose: "curious", delay: 1900 },
  { pose: "idle", delay: 4300 },
  { pose: "wave", delay: 5800 },
  { pose: "happy", delay: 6200 },
] as const;

interface PakuSpriteProps {
  activity?: PakuActivity;
  ambient?: boolean;
  browsing?: boolean;
  reaction?: PakuReaction | null;
  className?: string;
  replay?: number;
}

export function PakuSprite({
  activity = "idle",
  ambient = false,
  browsing = false,
  reaction = null,
  className = "",
  replay = 0,
}: PakuSpriteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const greeted = useRef(false);
  const nextGesture = useRef(0);
  const lastReaction = useRef<PakuReaction | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let sprites: HTMLImageElement[] | undefined;
    let timer: number | undefined;
    let disposed = false;

    function draw(pose: Pose, index = 0) {
      if (!sprites || !canvas || !context) return;
      const [frame, , rise = 0] = POSES[pose][index];
      context.clearRect(0, 0, FRAME_WIDTH, canvas.height);
      context.drawImage(
        sprites[frame.sheet],
        frame.x, frame.y, frame.width, frame.height,
        0, HEADROOM - rise, FRAME_WIDTH, FRAME_HEIGHT
      );
      canvas.dataset.pose = pose;
      canvas.dataset.frame = String(index);
    }

    function play(pose: Pose, onEnd: () => void) {
      let index = 0;
      const frames = POSES[pose];

      function step() {
        draw(pose, index);
        const duration = frames[index][1];
        index += 1;
        timer = window.setTimeout(index === frames.length ? onEnd : step, duration);
      }

      step();
    }

    function scheduleAmbient() {
      const gestures = browsing ? BROWSING_GESTURES : AMBIENT_GESTURES;
      const next = gestures[nextGesture.current];
      timer = window.setTimeout(() => {
        nextGesture.current = (nextGesture.current + 1) % gestures.length;
        play(next.pose, scheduleAmbient);
      }, next.delay);
    }

    function finishReaction() {
      draw("rest");
      if (ambient) scheduleAmbient();
    }

    function refresh() {
      window.clearTimeout(timer);
      if (!sprites) return;
      draw("rest");

      if (document.hidden || reducedMotion.matches) return;
      if (
        activity === "listening" || activity === "thinking" || activity === "speaking" ||
        activity === "walkLeft" || activity === "walkRight"
      ) {
        const repeat = () => play(activity, repeat);
        repeat();
      } else if (
        reaction &&
        lastReaction.current !== reaction &&
        performance.now() - reaction.createdAt < 1800
      ) {
        lastReaction.current = reaction;
        greeted.current = true;
        play(reaction.pose, finishReaction);
      } else if (activity !== "idle" || replay > 0) {
        play(activity, finishReaction);
      } else if (ambient && !greeted.current) {
        timer = window.setTimeout(() => {
          greeted.current = true;
          play("wave", scheduleAmbient);
        }, 650);
      } else if (ambient) {
        scheduleAmbient();
      }
    }

    void loadPakuAtlas(activity === "walkLeft" || activity === "walkRight").then(images => {
      if (disposed) return;
      sprites = images;
      refresh();
    }).catch(() => {
      if (!disposed) canvas.dataset.pose = "unavailable";
    });

    document.addEventListener("visibilitychange", refresh);
    reducedMotion.addEventListener("change", refresh);

    return () => {
      disposed = true;
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", refresh);
      reducedMotion.removeEventListener("change", refresh);
    };
  }, [activity, ambient, browsing, reaction, replay]);

  return (
    <canvas
      ref={canvasRef}
      width={FRAME_WIDTH}
      height={FRAME_HEIGHT + HEADROOM}
      className={className}
      aria-hidden="true"
    />
  );
}
