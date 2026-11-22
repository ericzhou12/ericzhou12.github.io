"use client";

import { useEffect, useRef, useState } from "react";

// Isometric unit box: floor corners A (back), B (right), C (front), D (left),
// projected with a 30 degree tilt. Primed points are the same corners at wall height.
const W = 77.9;
const H = 45;
const WALL = 44;
const pt = (x: number, y: number) => `${x},${y}`;
const A = pt(0, 0);
const B = pt(W, H);
const C = pt(0, 2 * H);
const D = pt(-W, H);
const A2 = pt(0, -WALL);
const B2 = pt(W, H - WALL);
const C2 = pt(0, 2 * H - WALL);
const D2 = pt(-W, H - WALL);

// Feet positions: the middle of the floor, then well clear of the box.
const START = [0, H];
const AWAY = [160, 137];
const WALK_MS = 3400;
// Share of the walk at which the figure reaches the front-right wall.
const WALL_AT = 0.25;

export function BoxFigure() {
  const [left, setLeft] = useState(false);
  const [walking, setWalking] = useState(false);
  // Draw order: the figure sits behind the front walls until it passes through one.
  const [outside, setOutside] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function walk() {
    if (left) return;
    setLeft(true);
    setWalking(true);
    timers.current = [
      setTimeout(() => setOutside(true), WALK_MS * WALL_AT),
      setTimeout(() => setWalking(false), WALK_MS),
    ];
  }

  const [x, y] = left ? AWAY : START;

  const frontWalls = (
    <>
      <polygon points={`${D} ${C} ${C2} ${D2}`} className="box-wall" />
      <polygon points={`${B} ${C} ${C2} ${B2}`} className={outside ? "box-wall box-wall-open" : "box-wall"} />
    </>
  );

  return (
    <svg viewBox="-190 -60 380 215" role="img" aria-label="A figure standing inside an open box" className="box-scene">
      <polygon points={`${A} ${D} ${D2} ${A2}`} className="box-wall" />
      <polygon points={`${A} ${B} ${B2} ${A2}`} className="box-wall" />
      <polygon points={`${A} ${B} ${C} ${D}`} className="box-floor" />

      {outside ? frontWalls : null}

      <g
        role={left ? undefined : "button"}
        tabIndex={left ? undefined : 0}
        aria-label={left ? undefined : "Walk through the wall"}
        onClick={walk}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            walk();
          }
        }}
        className={`box-figure${walking ? " box-figure-walking" : ""}${left ? " box-figure-gone" : ""}`}
        style={{ transform: `translate(${x}px, ${y}px)`, transitionDuration: `${WALK_MS}ms` }}
      >
        <rect x="-13" y="-44" width="26" height="48" fill="transparent" stroke="none" />
        <circle cx="0" cy="-34" r="5" />
        <line x1="0" y1="-29" x2="0" y2="-14" />
        <line x1="0" y1="-26" x2="-6" y2="-16" className="box-limb box-limb-b" />
        <line x1="0" y1="-26" x2="6" y2="-16" className="box-limb box-limb-a" />
        <line x1="0" y1="-14" x2="-4" y2="0" className="box-limb box-limb-a" />
        <line x1="0" y1="-14" x2="4" y2="0" className="box-limb box-limb-b" />
      </g>

      {outside ? null : frontWalls}
    </svg>
  );
}
