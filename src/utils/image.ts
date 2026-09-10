import type { ImageSource } from "../types/image";
import placeholder from "../assets/images/ui/placeholder.svg";

/**
 * Resuelve un ImageSource a URL utilizable en <img src>.
 * - Si es string => se asume URL/local resuelto por Vite o URL externa
 * - Si es objeto => toma .src (soporta type local/url para futuro)
 * - Si entrada vacía/invalida => fallback a placeholder local
 */
export function resolveImage(image: ImageSource | null | undefined): string {
  if (!image) return placeholder;
  if (typeof image === "string") {
    return image.trim() !== "" ? image : placeholder;
  }
  if (typeof image === "object" && "src" in image && typeof image.src === "string" && image.src.trim() !== "") {
    return image.src;
  }
  return placeholder;
}

/** Resuelve un array de ImageSource a string[] lista para mapear. */
export function resolveImages(images: ImageSource[] | null | undefined): string[] {
  if (!images || images.length === 0) return [placeholder];
  const resolved = images.map(resolveImage).filter(Boolean);
  return resolved.length > 0 ? resolved : [placeholder];
}

/** Handler para onError de <img> => fallback a placeholder local */
export function onImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  const target = e.currentTarget;
  if (target.src !== placeholder) {
    target.src = placeholder;
  }
}

export { placeholder };
