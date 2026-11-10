import atlasUrl from "../../assets/images/ui/paku-sprites.png";

export const FRAME_WIDTH = 238;
export const FRAME_HEIGHT = 350;
export const HEADROOM = 28;

type Cell = readonly [x: number, y: number];
type Frame = readonly [cell: Cell, duration: number, rise?: number];

const rest = [82, 2] as const;
const breathe = [425, 2] as const;
const blink = [771, 2] as const;
const earLeft = [425, 364] as const;
const earRight = [771, 364] as const;
const lift = [425, 726] as const;
const waveIn = [771, 726] as const;
const waveOut = [1118, 726] as const;

// Crop coordinates are registered to the seated body and the line of the hooves.
export const POSES = {
  rest: [[rest, 0]],
  idle: [[rest, 240], [breathe, 360], [blink, 130], [breathe, 240], [rest, 250]],
  ears: [[rest, 150], [earLeft, 260], [earRight, 260], [earLeft, 180], [rest, 220]],
  wave: [[rest, 120], [lift, 130], [waveIn, 210], [waveOut, 180], [waveIn, 180], [waveOut, 180], [lift, 150], [rest, 180]],
  happy: [[blink, 100], [waveIn, 80, 8], [waveOut, 110, 24], [waveIn, 85, 12], [blink, 100], [waveIn, 80, 13], [waveOut, 105, 21], [blink, 165], [rest, 160]],
  listening: [[earLeft, 640], [rest, 160], [earRight, 480], [rest, 260]],
  thinking: [[earRight, 340], [blink, 160], [earRight, 340], [rest, 260]],
  speaking: [[rest, 320], [earLeft, 260], [rest, 240], [breathe, 320]],
  reply: [[rest, 90], [earLeft, 220], [blink, 130], [rest, 190]],
} as const satisfies Record<string, readonly Frame[]>;

let atlas: Promise<HTMLImageElement> | undefined;

export function loadPakuAtlas() {
  atlas ??= new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.src = atlasUrl;
    image.decode().then(() => resolve(image), reject);
  }).catch(error => {
    atlas = undefined;
    throw error;
  });

  return atlas;
}
