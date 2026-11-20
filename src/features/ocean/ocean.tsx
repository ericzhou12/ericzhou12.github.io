// CSS animation on static text, transforms only; the one bit of JS is the clock sync.

import { SeaClock } from "@/features/ocean/sea-clock";

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

type Swimmer = { art: string; top: string; secs: number; delay: number; left?: boolean };

// Negative delays start each swimmer mid-crossing instead of all at the edge.
const swimmers: Swimmer[] = [
  { art: MINNOW_RIGHT, top: "10%", secs: 42, delay: -5 },
  { art: HAMMERHEAD, top: "36%", secs: 80, delay: -25, left: true },
  { art: FISH_RIGHT, top: "58%", secs: 54, delay: -38 },
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

function Sealife() {
  return (
    <div aria-hidden className="ascii absolute inset-0">
      <SeaClock />
      {swimmers.map(({ art, top, secs, delay, left }) => (
        <pre
          key={top}
          className={left ? "swim swim-left" : "swim"}
          style={{ top, animationDuration: `${secs}s`, ["--delay" as string]: `${delay}s` }}
        >
          {art}
        </pre>
      ))}
    </div>
  );
}

// Top-down water for the projects page: sparse ripple rows sliding past each other.
const ripples = [
  { row: "  ~~        ~      ~~~   ", top: "6%", secs: 34 },
  { row: "~       ~~~       ~     ", top: "18%", secs: 46, reverse: true },
  { row: "     ~~      ~         ~", top: "31%", secs: 38 },
  { row: " ~         ~~~     ~~   ", top: "44%", secs: 52, reverse: true },
  { row: "   ~~~   ~          ~   ", top: "57%", secs: 40 },
  { row: "~        ~~      ~      ", top: "70%", secs: 48, reverse: true },
  { row: "    ~      ~~~        ~~", top: "83%", secs: 36 },
  { row: " ~~      ~       ~~     ", top: "94%", secs: 50, reverse: true },
];

export function Underwater({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <Sealife />
      <div className="relative flex flex-1 flex-col">{children}</div>
      <Seafloor />
    </div>
  );
}

export function Surface({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div aria-hidden className="ascii absolute inset-0">
        {ripples.map(({ row, top, secs, reverse }) => (
          <pre
            key={top}
            className="wave absolute left-0"
            style={{
              top,
              ["--shift" as string]: "-24ch",
              animationDuration: `${secs}s`,
              animationDirection: reverse ? "reverse" : undefined,
            }}
          >
            {row.repeat(30)}
          </pre>
        ))}
      </div>
      <div className="relative flex flex-1 flex-col">{children}</div>
    </div>
  );
}

function Seafloor() {
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
