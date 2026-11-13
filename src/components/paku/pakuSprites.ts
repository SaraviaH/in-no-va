import gesturesUrl from "../../assets/images/ui/tela-floral-gestos.png";
import conversationUrl from "../../assets/images/ui/tela-floral-conversacion.png";
import walkingUrl from "../../assets/images/ui/tela-floral-caminar.png";

export const FRAME_WIDTH = 280;
export const FRAME_HEIGHT = 340;
export const HEADROOM = 16;

type Sprite = {
  sheet: number;
  x: number;
  y: number;
  width: number;
  height: number;
};
type Frame = readonly [sprite: Sprite, duration: number, rise?: number];

// Both sheets are registered to the midpoint between the shoes and their baseline.
// Different source sizes compensate for the scale difference between the sheets.
function gesture(column: number, row: number): Sprite {
  return {
    sheet: 0,
    x: 46 + column * 362,
    y: [6, 369, 731][row],
    width: 272,
    height: 330,
  };
}

function conversation(column: number, row: number): Sprite {
  return {
    sheet: 1,
    x: [47, 404.5, 764, 1123][column],
    y: [4, 367, 729][row],
    width: 280,
    height: 340,
  };
}

const rest = gesture(0, 0);
const breathe = gesture(1, 0);
const blink = gesture(2, 0);
const smile = gesture(3, 0);
const lift = gesture(0, 1);
const waveIn = gesture(1, 1);
const waveOut = gesture(2, 1);
const lower = gesture(3, 1);
const pleased = gesture(0, 2);
const cheer = gesture(1, 2);
const hop = gesture(2, 2);
const land = gesture(3, 2);
const listen = [0, 1, 2, 3].map(column => conversation(column, 0));
const think = [0, 1, 2, 3].map(column => conversation(column, 1));
const speak = [0, 1, 2, 3].map(column => conversation(column, 2));
const walk = (row: number, column: number): Sprite => ({
  sheet: 2,
  x: (row === 0 ? 70 : 58) + column * 444,
  y: row === 0 ? 5 : 450,
  width: 336,
  height: 408,
});

export const POSES = {
  rest: [[rest, 0]],
  idle: [[rest, 260], [breathe, 330], [blink, 130], [breathe, 230], [rest, 250]],
  smile: [[rest, 130], [smile, 460], [blink, 130], [smile, 320], [rest, 190]],
  curious: [[rest, 140], [listen[0], 240], [listen[1], 260], [listen[2], 260], [listen[3], 180], [rest, 160]],
  lookLeft: [[listen[1], 600], [listen[0], 180], [rest, 180]],
  lookRight: [[listen[2], 600], [listen[3], 180], [rest, 180]],
  walkLeft: [[walk(0, 0), 170], [walk(0, 1), 170], [walk(0, 2), 170], [walk(0, 3), 170]],
  walkRight: [[walk(1, 0), 170], [walk(1, 1), 170], [walk(1, 2), 170], [walk(1, 3), 170]],
  wave: [[lift, 120], [waveIn, 170], [waveOut, 160], [waveIn, 160], [waveOut, 170], [lower, 130], [rest, 180]],
  happy: [[pleased, 140], [cheer, 160], [hop, 120, 12], [land, 150], [cheer, 180], [land, 200], [smile, 200], [rest, 170]],
  listening: [[listen[0], 420], [listen[1], 360], [listen[2], 360], [listen[3], 420]],
  thinking: [[think[0], 360], [think[1], 320], [think[2], 140], [think[3], 320]],
  speaking: [[speak[0], 180], [speak[1], 200], [speak[2], 180], [speak[3], 220]],
  reply: [[smile, 260], [speak[3], 220], [smile, 240], [rest, 190]],
} as const satisfies Record<string, readonly Frame[]>;

let atlas: Promise<HTMLImageElement[]> | undefined;
let walkingAtlas: Promise<HTMLImageElement> | undefined;

export async function loadPakuAtlas(includeWalking = false) {
  atlas ??= Promise.all([gesturesUrl, conversationUrl].map(async url => {
    const image = new Image();
    image.src = url;
    await image.decode();
    if (image.naturalWidth !== 1448 || image.naturalHeight !== 1086) {
      throw new Error("Dimensiones inesperadas en los sprites de la mascota textil");
    }
    return image;
  })).catch(error => {
    atlas = undefined;
    throw error;
  });

  if (!includeWalking) return atlas;

  walkingAtlas ??= (async () => {
    const image = new Image();
    image.src = walkingUrl;
    await image.decode();
    if (image.naturalWidth !== 1774 || image.naturalHeight !== 887) {
      throw new Error("Dimensiones inesperadas en los sprites de caminar");
    }
    return image;
  })().catch(error => {
    walkingAtlas = undefined;
    throw error;
  });

  const [base, walking] = await Promise.all([atlas, walkingAtlas]);
  return [...base, walking];
}
