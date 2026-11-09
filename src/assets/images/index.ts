/**
 * Configuración central de imágenes locales.
 * No escribir rutas en componentes: todo consumo vía este módulo
 * o vía datos (product.imagenes, category.imagen) que ya apuntan aquí.
 *
 * Estructura:
 *   src/assets/images/
 *     logo/         (Monogramas vectoriales de urdimbre y trama)
 *     hero/         (Fotografía editorial principal + fallback técnico)
 *     categories/   (Fotografías macro editoriales de las 6 familias de fibras)
 *     products/     (Muestrarios técnicos de color, ligamento y gramaje 4:5;
 *                    listas para sustituirse por fotografía de lote real de taller)
 *     nosotros/     (Fotografías de estudio, rollos y macro de trama)
 *     contacto/     (Mesa de corte de showroom y plano arquitectónico de Gamarra)
 *     ui/           (Símbolos de asistente y estados de respaldo)
 */

// Logo
import logo from "./logo/logo.svg";
import logoIcon from "./logo/logo-icon.svg";
import kottonMark from "./logo/kotton-mark.svg";

// Hero (Fotografía editorial de estudio + respaldo vectorial)
import heroMain from "./hero/hero-main.jpg";
import heroFallback from "./hero/hero-fallback.svg";

// Categorías (Fotografías macro de texturas por fibra)
import catAlgodon from "./categories/algodon.jpg";
import catLino from "./categories/lino.jpg";
import catMezclas from "./categories/mezclas.jpg";
import catSeda from "./categories/seda.jpg";
import catDenim from "./categories/denim.jpg";
import catPunto from "./categories/punto.jpg";

// Productos (Cartas técnicas de color y ligamento 4:5 — no inventan fotos ficticias de lote)
import prodAlgodonPremium01 from "./products/algodon-premium/01.svg";
import prodAlgodonPremium02 from "./products/algodon-premium/02.svg";
import prodAlgodonPremium03 from "./products/algodon-premium/03.svg";
import prodLinoNatural01 from "./products/lino-natural/01.svg";
import prodMezclaSoft01 from "./products/mezcla-soft/01.svg";
import prodMezclaSoft02 from "./products/mezcla-soft/02.svg";
import prodDenim01 from "./products/denim-organico/01.svg";
import prodDenim02 from "./products/denim-organico/02.svg";
import prodSeda01 from "./products/seda-charmeuse/01.svg";
import prodPunto01 from "./products/punto-canale/01.svg";
import prodPunto02 from "./products/punto-canale/02.svg";
import prodPunto03 from "./products/punto-canale/03.svg";
import prodAlgodonCrudo01 from "./products/algodon-crudo/01.svg";
import prodLinoTerracota01 from "./products/lino-terracota/01.svg";
import prodLinoTerracota02 from "./products/lino-terracota/02.svg";

// Nosotros (Fotografías editoriales de atelier y macro de tejido)
import nosotrosTelas from "./nosotros/telas.jpg";
import nosotrosTextura from "./nosotros/textura.jpg";
import nosotrosAvatarEquipo from "./nosotros/avatar-equipo.svg";

// Contacto (Showroom y plano de Gamarra)
import contactoTienda from "./contacto/tienda.jpg";
import contactoUbicacion from "./contacto/ubicacion.svg";

// UI / placeholders / avatares / IA
import placeholder from "./ui/placeholder.svg";
import avatar01 from "./ui/avatar-01.svg";
import avatar02 from "./ui/avatar-02.svg";
import avatar03 from "./ui/avatar-03.svg";
import aiAvatar from "./ui/ai-avatar.svg";

export const images = {
  logo: {
    main: logo,
    icon: logoIcon,
    mark: kottonMark,
  },
  hero: {
    main: heroMain,
    fallback: heroFallback,
  },
  categories: {
    algodon: catAlgodon,
    lino: catLino,
    mezclas: catMezclas,
    seda: catSeda,
    denim: catDenim,
    punto: catPunto,
  },
  products: {
    "algodon-premium": [prodAlgodonPremium01, prodAlgodonPremium02, prodAlgodonPremium03],
    "lino-natural": [prodLinoNatural01],
    "mezcla-soft": [prodMezclaSoft01, prodMezclaSoft02],
    "denim-organico": [prodDenim01, prodDenim02],
    "seda-charmeuse": [prodSeda01],
    "punto-canale": [prodPunto01, prodPunto02, prodPunto03],
    "algodon-crudo": [prodAlgodonCrudo01],
    "lino-terracota": [prodLinoTerracota01, prodLinoTerracota02],
  } as Record<string, string[]>,
  nosotros: {
    telas: nosotrosTelas,
    textura: nosotrosTextura,
    avatarEquipo: nosotrosAvatarEquipo,
  },
  contacto: {
    tienda: contactoTienda,
    ubicacion: contactoUbicacion,
  },
  ui: {
    placeholder,
    avatars: [avatar01, avatar02, avatar03],
    aiAvatar,
  },
} as const;

export type ImagesCatalog = typeof images;
