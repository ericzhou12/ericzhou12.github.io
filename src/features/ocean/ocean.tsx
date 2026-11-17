// Pure CSS animation on static text: no client JS, transforms only.

const WAVE = "-._.-~'~".repeat(80);
const RIPPLE = "~   ~~  ~ ~ ".repeat(60);
const SAND = "_,.-._.,".repeat(80);

const art = (...rows: string[]) => rows.join("\n");

// Filled silhouettes: the outline shape matters, not anatomical detail.
const HAMMERHEAD = art(
  "                  .#                             .#",
  "                .###                           .###",
  " ##    ..:######################:..          .####",
  " ##############################################",
  " ##    '':###################:''        ''######",
  "           '####'    '##'                  '####",
  "             '##.                            '##",
);

const TRIPOD_FISH = art(
  "  .:######:.#",
  "    /|      \\",
  "   / |       \\",
  "  /  |        \\",
  " /   |         \\",
  "/    |          \\",
);

const FISH_RIGHT = "#.:#######:.";
const MINNOW_RIGHT = "#.:###:.";
const MINNOW_LEFT = ".:###:.#";

type Swimmer = { art: string; top: string; secs: number; delay: number; left?: boolean };

// Negative delays start each swimmer mid-crossing instead of all at the edge.
const swimmers: Swimmer[] = [
  { art: MINNOW_RIGHT, top: "10%", secs: 42, delay: -5 },
  { art: HAMMERHEAD, top: "36%", secs: 80, delay: -25, left: true },
  { art: FISH_RIGHT, top: "58%", secs: 54, delay: -38 },
  { art: MINNOW_LEFT, top: "76%", secs: 46, delay: -14, left: true },
];

const weeds = [
  { left: "4%", height: 5 },
  { left: "10%", height: 3 },
  { left: "24%", height: 6 },
  { left: "40%", height: 4 },
  { left: "80%", height: 7 },
  { left: "86%", height: 4 },
  { left: "95%", height: 5 },
];

const weedArt = (height: number) =>
  Array.from({ length: height }, (_, i) => (i % 2 ? "(" : " )")).join("\n");

export function Waves() {
  return (
    <div aria-hidden className="ascii overflow-hidden">
      <pre className="wave">{WAVE}</pre>
      <pre className="wave wave-slow opacity-60">{RIPPLE}</pre>
    </div>
  );
}

export function Sealife() {
  return (
    <div aria-hidden className="ascii absolute inset-0">
      {swimmers.map(({ art, top, secs, delay, left }) => (
        <pre
          key={top}
          className={left ? "swim swim-left" : "swim"}
          style={{ top, animationDuration: `${secs}s`, animationDelay: `${delay}s` }}
        >
          {art}
        </pre>
      ))}
    </div>
  );
}

export function Seafloor() {
  return (
    <div aria-hidden className="ascii relative mt-16 h-44 overflow-hidden">
      {weeds.map(({ left, height }, i) => (
        <pre
          key={left}
          className="weed"
          style={{ left, animationDelay: `${-i * 0.7}s` }}
        >
          {weedArt(height)}
        </pre>
      ))}
      <pre className="absolute bottom-[1.05em] left-[55%]">{TRIPOD_FISH}</pre>
      <pre className="absolute bottom-0 left-0">{SAND}</pre>
    </div>
  );
}
