import { useEffect, useRef, useState, type RefObject } from "react";
import type { PakuActivity, PakuReaction } from "./PakuSprite";
import { loadPakuAtlas } from "./pakuSprites";

export function usePakuRoaming(
  rootRef: RefObject<HTMLDivElement | null>,
  enabled: boolean,
  reaction: PakuReaction | null
) {
  const [activity, setActivity] = useState<PakuActivity>("idle");
  const [attention, setAttention] = useState<PakuReaction | null>(null);
  const position = useRef(0);
  const towardLeft = useRef(true);
  const stopRef = useRef<() => void>(() => {});

  useEffect(() => {
    const element = rootRef.current;
    if (!enabled || !element) {
      setActivity("idle");
      return;
    }
    const root: HTMLDivElement = element;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;
    let animation: Animation | undefined;
    let ready = false;
    let disposed = false;
    let pointerNear = false;
    let lastPointerAt = 0;
    let lastAttentionAt = performance.now();
    let lastInputAt = 0;

    const maxTravel = () => Math.max(0, Math.min(
      window.innerWidth < 640 ? 72 : window.innerWidth * 0.55,
      window.innerWidth - root.offsetWidth - 48
    ));

    function schedule(delay = 8500) {
      window.clearTimeout(timer);
      if (!ready || disposed || document.hidden || reduced.matches) return;
      timer = window.setTimeout(stroll, delay);
    }

    function stop() {
      window.clearTimeout(timer);
      if (animation) {
        const transform = getComputedStyle(root).transform;
        position.current = transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41;
        animation.cancel();
        animation = undefined;
      }
      root.style.transform = `translateX(${position.current}px)`;
      root.dataset.roaming = "rest";
      setActivity("idle");
      schedule();
    }

    function stroll() {
      if (disposed || pointerNear || root.querySelector(":focus-visible")) return;
      const extent = maxTravel();
      if (extent < 20) return;
      const destination = towardLeft.current ? -extent : 0;
      const distance = Math.abs(destination - position.current);
      if (distance < 16) {
        towardLeft.current = !towardLeft.current;
        schedule();
        return;
      }

      setActivity(towardLeft.current ? "walkLeft" : "walkRight");
      root.dataset.roaming = towardLeft.current ? "left" : "right";
      animation = root.animate([
        { transform: `translateX(${position.current}px)` },
        { transform: `translateX(${destination}px)` },
      ], {
        duration: Math.max(1600, distance / 75 * 1000),
        easing: "linear",
        fill: "forwards",
      });
      animation.onfinish = () => {
        position.current = destination;
        root.style.transform = `translateX(${destination}px)`;
        animation?.cancel();
        animation = undefined;
        towardLeft.current = !towardLeft.current;
        root.dataset.roaming = "rest";
        setActivity("idle");
        schedule();
      };
    }

    function lookAt(x: number) {
      const now = performance.now();
      if (reduced.matches || now - lastAttentionAt < 5500) return;
      const bounds = root.getBoundingClientRect();
      lastAttentionAt = now;
      setAttention({
        pose: x < bounds.x + bounds.width / 2 ? "lookLeft" : "lookRight",
        createdAt: now,
      });
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse" || document.hidden) return;
      const now = performance.now();
      if (now - lastPointerAt < 100) return;
      lastPointerAt = now;
      const bounds = root.getBoundingClientRect();
      const near = event.clientX >= bounds.left - 80 && event.clientX <= bounds.right + 80 &&
        event.clientY >= bounds.top - 65 && event.clientY <= bounds.bottom + 40;
      if (near && !pointerNear) stop();
      if (!near && pointerNear) schedule();
      pointerNear = near;
      if (!animation && !near) lookAt(event.clientX);
    }

    function onFocus(event: FocusEvent | Event) {
      if (root.contains(event.target as Node)) {
        stop();
        return;
      }
      const target = event.target;
      if (!(target instanceof HTMLElement) || !target.matches("input, textarea, select, [contenteditable=true]")) return;
      const now = performance.now();
      if (now - lastInputAt < 1200) return;
      lastInputAt = now;
      stop();
      const bounds = target.getBoundingClientRect();
      lookAt(bounds.x + bounds.width / 2);
    }

    function refresh() {
      stop();
      position.current = reduced.matches ? 0 : Math.max(-maxTravel(), Math.min(0, position.current));
      root.style.transform = `translateX(${position.current}px)`;
    }

    stopRef.current = stop;
    refresh();
    void loadPakuAtlas(true).then(() => {
      if (disposed) return;
      ready = true;
      schedule(7000);
    }).catch(() => {
      // Keep the already loaded idle and conversational sprites usable.
    });

    root.addEventListener("pointerenter", stop);
    root.addEventListener("pointerdown", stop);
    root.addEventListener("pointerleave", stop);
    root.addEventListener("focusout", stop);
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("focusin", onFocus);
    document.addEventListener("input", onFocus);
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("resize", refresh);
    reduced.addEventListener("change", refresh);

    return () => {
      disposed = true;
      window.clearTimeout(timer);
      if (animation) {
        const transform = getComputedStyle(root).transform;
        position.current = transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41;
        animation.cancel();
      }
      stopRef.current = () => {};
      root.removeEventListener("pointerenter", stop);
      root.removeEventListener("pointerdown", stop);
      root.removeEventListener("pointerleave", stop);
      root.removeEventListener("focusout", stop);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("input", onFocus);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("resize", refresh);
      reduced.removeEventListener("change", refresh);
    };
  }, [enabled, rootRef]);

  useEffect(() => {
    if (reaction && performance.now() - reaction.createdAt < 1800) {
      stopRef.current();
    }
  }, [reaction]);

  return { activity, attention };
}
