/**
 * Configuración central de imágenes locales.
 * No escribir rutas en componentes: todo consumo via este módulo
 * o via datos (product.images, category.imagen) que ya apuntan aquí.
 *
 * Estructura solicitada:
 *   src/assets/images/
 *     logo/
 *     hero/
 *     categories/
 *     products/{slug}/
 *     nosotros/
 *     contacto/
 *     ui/
 *
 * Cada importación es tratada por Vite como URL; es intercambiable
 * por URL externa en el futuro sin tocar componentes visuales.
 */

// Logo
import logo from "./logo/logo.svg";
import logoIcon from "./logo/logo-icon.svg";
import kottonMark from "./logo/kotton-mark.svg";

// Hero (1 imagen principal)
import heroMain from "./hero/hero-main.svg";
import heroFallback from "./hero/hero-fallback.svg";

// Categorías (exactamente 1 por categoría)
import catAlgodon from "./categories/algodon.svg";
import catLino from "./categories/lino.svg";
import catMezclas from "./categories/mezclas.svg";
import catSeda from "./categories/seda.svg";
import catDenim from "./categories/denim.svg";
import catPunto from "./categories/punto.svg";

// Productos (arrays 1..n por producto)
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

// Nosotros
import nosotrosTelas from "./nosotros/telas.svg";
import nosotrosTextura from "./nosotros/textura.svg";
import nosotrosAvatarEquipo from "./nosotros/avatar-equipo.svg";

// Contacto
import contactoTienda from "./contacto/tienda.svg";
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
    aiAvatar,
    avatars: [avatar01, avatar02, avatar03] as string[],
  },
} as const;

// Helpers tipados por id de producto/categoria para uso futuro
export type ProductImageKey = keyof typeof images.products;
export type CategoryImageKey = keyof typeof images.categories;
