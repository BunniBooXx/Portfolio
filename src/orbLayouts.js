// orbLayouts.js
// Per-page "safe zone" orb placements for OrbField.jsx — sparse (3-6
// orb) compositions positioned in the outer margins/negative space of
// each page's actual layout so they never sit behind text, form inputs,
// project-card copy, or the resume document. `top`/`left` are percentages
// of the viewport (OrbField is position:fixed), `size` is a clamp() so
// orbs shrink automatically on narrow screens, and array order is
// priority order — OrbField hides the lowest-priority (last) entries
// first as the viewport narrows.
//
// The clamp() minimums are deliberately small (28-56px): on narrow phone
// viewports the vw-based preferred value falls below that minimum, so the
// minimum is what actually renders there — it has to stay clear of the
// page heading on its own, not just look right on desktop. Corner orbs
// sit close to 0%/100% so most of each circle clips off the edge of the
// screen instead of resting on top of content.
//
// depth: "small" | "medium" | "large" — controls float amplitude and
// cursor-parallax strength (see DEPTH_CONFIG in OrbField.jsx).
// colorIndex: index into ORB_PALETTE (orbTheme.js); 5 is the rare cyan
// accent, used once per page at most, same as Home.

// Projects — margins around the 3+2 project-card grid.
export const PROJECTS_ORBS = [
  { top: "10%", left: "1%",  size: "clamp(30px,6vw,84px)",  depth: "small",  colorIndex: 1, delay: 0 },
  { top: "22%", left: "99%", size: "clamp(36px,7vw,110px)", depth: "medium", colorIndex: 5, delay: 2 },
  { top: "52%", left: "0%",  size: "clamp(28px,5vw,70px)",  depth: "small",  colorIndex: 3, delay: 4 },
  { top: "56%", left: "100%",size: "clamp(32px,6vw,94px)",  depth: "medium", colorIndex: 2, delay: 1 },
  { top: "84%", left: "2%",  size: "clamp(30px,5vw,76px)",  depth: "small",  colorIndex: 4, delay: 3 },
  { top: "86%", left: "98%", size: "clamp(40px,7vw,130px)", depth: "large",  colorIndex: 0, delay: 5 },
];

// About — the large exterior margins around the About card.
export const ABOUT_ORBS = [
  { top: "10%", left: "2%",  size: "clamp(32px,6vw,90px)",  depth: "small",  colorIndex: 1, delay: 0 },
  { top: "22%", left: "98%", size: "clamp(38px,7vw,110px)", depth: "medium", colorIndex: 5, delay: 2 },
  { top: "56%", left: "0%",  size: "clamp(28px,5vw,72px)",  depth: "small",  colorIndex: 2, delay: 4 },
  { top: "60%", left: "100%",size: "clamp(34px,6vw,96px)",  depth: "medium", colorIndex: 0, delay: 1 },
  { top: "86%", left: "3%",  size: "clamp(30px,5vw,80px)",  depth: "small",  colorIndex: 3, delay: 3 },
  { top: "88%", left: "97%", size: "clamp(42px,7vw,130px)", depth: "large",  colorIndex: 4, delay: 5 },
];

// Resume — dark margins surrounding the white resume pages, never behind
// the document itself.
export const RESUME_ORBS = [
  { top: "10%", left: "1%",  size: "clamp(30px,5vw,80px)",  depth: "small",  colorIndex: 1, delay: 0 },
  { top: "22%", left: "99%", size: "clamp(36px,6vw,100px)", depth: "medium", colorIndex: 5, delay: 2 },
  { top: "50%", left: "0%",  size: "clamp(28px,4vw,64px)",  depth: "small",  colorIndex: 3, delay: 4 },
  { top: "55%", left: "100%",size: "clamp(32px,5vw,90px)",  depth: "medium", colorIndex: 2, delay: 1 },
  { top: "88%", left: "2%",  size: "clamp(38px,6vw,100px)", depth: "large",  colorIndex: 0, delay: 3 },
  { top: "90%", left: "98%", size: "clamp(30px,5vw,78px)",  depth: "small",  colorIndex: 4, delay: 5 },
];

// Contact — empty exterior space around the centered form.
export const CONTACT_ORBS = [
  { top: "10%", left: "3%",  size: "clamp(32px,6vw,84px)",  depth: "small",  colorIndex: 1, delay: 0 },
  { top: "22%", left: "97%", size: "clamp(38px,7vw,104px)", depth: "medium", colorIndex: 5, delay: 2 },
  { top: "56%", left: "1%",  size: "clamp(28px,5vw,72px)",  depth: "small",  colorIndex: 3, delay: 4 },
  { top: "60%", left: "99%", size: "clamp(34px,6vw,96px)",  depth: "medium", colorIndex: 2, delay: 1 },
  { top: "86%", left: "4%",  size: "clamp(32px,5vw,86px)",  depth: "small",  colorIndex: 4, delay: 3 },
  { top: "88%", left: "96%", size: "clamp(40px,6vw,120px)", depth: "large",  colorIndex: 0, delay: 5 },
];
