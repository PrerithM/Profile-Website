/* ==========================================================================
   Glass Mechanical Watch — SVG Gear Generator + Real Mesh Logic
   - Procedurally generates solid gears (no hollow centers)
   - Places them in the face and calculates rotation based on mesh ratios
   - Minute and hour hands follow real clock time
   - Interactive Pause/Play
   ========================================================================== */

const SVG_NS = "http://www.w3.org/2000/svg";
const gearContainer = document.getElementById("gears");
const minuteGroup = document.getElementById("minute");
const hourGroup = document.getElementById("hour");
const toggleBtn = document.getElementById("toggle-spin");

let running = true;
toggleBtn.addEventListener("click", () => {
  running = !running;
  toggleBtn.textContent = running ? "Pause" : "Play";
});

/* -------------------------
   Utility: create an SVG element
   ------------------------- */
function $svg(tag, attrs = {}) {
  const el = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

/* -------------------------
   Procedural gear path
   - teeth: integer number of teeth
   - r: base radius (inner)
   - toothDepth: how far tooth extends (outer radius = r + toothDepth)
   - centerSolid: boolean => produce a filled center (we keep it solid)
   Returns a <path> element (gear centered at 0,0)
   ------------------------- */
function makeGearPath(teeth = 18, r = 40, toothDepth = 10, centerRadius = 10, opts = {}) {
  // We'll alternate points to make stylized yet functional teeth.
  const outer = r + toothDepth;
  const inner = r;
  const steps = teeth * 4; // more points for smoother tooth shape
  let d = [];
  for (let i = 0; i < steps; i++) {
    const theta = (i / steps) * Math.PI * 2;
    // define a tooth shape by mapping i to one of four radial values
    // 0: flank outer, 1: tip outer, 2: flank outer, 3: root inner
    const mod = i % 4;
    let radius;
    if (mod === 0) radius = inner + toothDepth * 0.45;
    else if (mod === 1) radius = outer;
    else if (mod === 2) radius = inner + toothDepth * 0.45;
    else radius = inner * 0.68; // root
    const x = (radius) * Math.cos(theta);
    const y = (radius) * Math.sin(theta);
    d.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  // path string
  const pathD = `M ${d[0]} L ${d.slice(1).join(" L ")} Z`;
  const path = $svg("path", { d: pathD, class: "gear-path" });
  // add a solid center disk for the 'no hollow' requirement
  const center = $svg("circle", { cx: 0, cy: 0, r: centerRadius, fill: "rgba(255,255,255,0.02)" });
  const group = $svg("g");
  group.appendChild(path);
  group.appendChild(center);
  return { group, path, teeth, r, outer, center };
}

/* -------------------------
   Build a compact gear train that actually meshes
   - We'll pick three visible gears + an internal pinion connected to center.
   - Everything is centered near the middle of the watch face.
   ------------------------- */
function buildGears() {
  gearContainer.innerHTML = "";

  // Configuration of gears (teeth counts chosen intentionally for clean ratios)
  const config = [
    { id: "g1", teeth: 44, r: 64, toothDepth: 9, cx: -28, cy: 30 }, // left large
    { id: "g2", teeth: 22, r: 34, toothDepth: 7, cx: 64, cy: 20 },  // right medium
    { id: "g3", teeth: 14, r: 24, toothDepth: 6, cx: 38, cy: -82 }  // upper small
  ];

  // Create each gear element
  const gearObjs = config.map(c => {
    const g = makeGearPath(c.teeth, c.r, c.toothDepth, Math.max(8, Math.round(c.r * 0.28)));
    g.group.setAttribute("id", c.id);
    g.group.setAttribute("transform", `translate(${c.cx}, ${c.cy})`);
    // subtle rotation anchor
    g.group.style.transformOrigin = `${c.cx}px ${c.cy}px`;
    gearContainer.appendChild(g.group);
    // store placement
    g.cx = c.cx; g.cy = c.cy;
    return g;
  });

  // Add small hidden center pinion (meshes with gears and is tied to minute movement)
  // This pinion will rotate following minute hand; it's visually tiny but mechanically key.
  const pinion = makeGearPath(10, 8, 4, 5);
  pinion.group.setAttribute("id", "pinion");
  pinion.cx = 0; pinion.cy = 0;
  pinion.group.setAttribute("transform", `translate(0,0)`);
  gearContainer.appendChild(pinion.group);

  // Return gears array and pinion for animation logic
  return { gears: gearObjs, pinion };
}

/* -------------------------
   Use time to set hand angles exactly
   ------------------------- */
function getClockAngles(date = new Date()) {
  const s = date.getSeconds();
  const m = date.getMinutes();
  const h = date.getHours() % 12;
  // more precise angles (smooth)
  const secondAngle = (s + (date.getMilliseconds()/1000)) * 6; // 360/60
  const minuteAngle = (m + s/60 + date.getMilliseconds()/60000) * 6; // 360/60
  const hourAngle = (h + m/60 + s/3600) * 30; // 360/12
  return { secondAngle, minuteAngle, hourAngle };
}

/* -------------------------
   Animation state
   ------------------------- */
const state = {
  gearsObj: null,
  lastT: null,
  easing: 0.08
};

function start() {
  state.gearsObj = buildGears();
  state.lastT = performance.now();
  requestAnimationFrame(loop);
}

/* -------------------------
   Main loop
   - Compute hand angles from current time
   - Use minute hand as driving reference (pinion ties to minute)
   - Compute gear rotations from mesh ratios:
       angle_gear = - angle_pinion * (teeth_pinion / teeth_gear)
     (negative sign because meshing reverses rotation)
   ------------------------- */
function loop(t) {
  const now = new Date();
  const angles = getClockAngles(now);
  // set hands
  minuteGroup.setAttribute("transform", `rotate(${angles.minuteAngle})`);
  hourGroup.setAttribute("transform", `rotate(${angles.hourAngle})`);

  if (running) {
    // driving angle from minute (we'll use minuteAngle as base driver)
    // convert degrees to radians for smooth interpolation? we keep degrees.
    const driverDeg = angles.minuteAngle;

    // pinion (driver) rotation track
    const pinion = state.gearsObj.pinion;
    // we will rotate pinion proportionally: choose pinion teeth = 10
    const pinionTeeth = pinion.teeth || 10;
    // placed at center (0,0) already
    const pinionTurn = driverDeg; // simple mapping, visually synced with minute

    // Apply rotation to pinion
    pinion.group.setAttribute("transform", `translate(${pinion.cx}, ${pinion.cy}) rotate(${pinionTurn})`);

    // For each visible gear compute rotation so they mesh with the pinion (approximate)
    state.gearsObj.gears.forEach(g => {
      // rotation = -pinionTurn * (pinionTeeth / gearTeeth)
      const target = -pinionTurn * (pinionTeeth / g.teeth);
      // smooth interpolation
      const currentTransform = g.group.getAttribute("data-rot") || 0;
      const cur = parseFloat(currentTransform) || 0;
      const next = cur + (target - cur) * 0.14;
      g.group.setAttribute("transform", `translate(${g.cx}, ${g.cy}) rotate(${next})`);
      g.group.setAttribute("data-rot", next);
    });
  }

  requestAnimationFrame(loop);
}

/* Kick off */
start();

/* Expose some fancy interactions:
   - Drag to rotate (subtle) /* small, optional enhancement */
(function addDrag(controlSelector="#case") {
  const el = document.querySelector(controlSelector);
  if(!el) return;
  let dragging = false, startY=0, rot=0;
  el.addEventListener("pointerdown", (e) => { dragging = true; startY = e.clientY; el.setPointerCapture(e.pointerId); });
  window.addEventListener("pointerup", (e)=> { dragging = false; });
  window.addEventListener("pointermove", (e)=> {
    if(!dragging) return;
    const dy = e.clientY - startY;
    startY = e.clientY;
    rot += dy*0.15;
    // apply subtle tilt transform to whole svg (not interfering with internal transforms)
    const svg = document.getElementById("watch-svg");
    svg.style.transform = `rotateX(${Math.max(-12, Math.min(12, rot/6))}deg) rotateY(${Math.max(-12, Math.min(12, rot/4))}deg)`;
  });
})();