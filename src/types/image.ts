/**
 * Sistema de imágenes local-first con compatibilidad futura URL.
 *
 * Inicialmente todas las imágenes son locales (imports Vite => string URL).
 * La estructura soporta migracion a backend sin cambiar componentes:
 *
 * - Simple: images: [localImage, localImage2]  (string)
 * - Extendido: images: [{type: 'local', src: localImage}, {type: 'url', src: 'https://...'}]
 *
 * resolveImage() abstrae el acceso, de modo que los componentes nunca
 * consultan directamente si es local o remota.
 */

export type ImageSource =
  | string
  | {
      type: "local" | "url";
      src: string;
      alt?: string;
    };

export type ResolvedImage = string;
