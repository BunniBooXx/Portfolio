// orbTheme.js
// Shared color language for the "dimensional glowing orb" visual system
// that originated on the Home route (see HomeOrbBackground.jsx) and is
// now reused, at a lower density, by OrbField.jsx on every other page.
//
// Mostly white/silver "smoked glass" spheres, with one icy-blue accent
// slot kept intentionally rare — a restrained micro-accent rather than a
// general color, matching the "Black + White Light" design system.
export const ORB_PALETTE = [
  "rgba(255,255,255,1)", /* --color-glow-white */
  "rgba(200,205,214,1)", /* --color-glow-silver */
  "rgba(200,205,214,1)", /* --color-glow-silver */
  "rgba(170,177,189,1)", /* cool smoky gray-silver */
  "rgba(170,177,189,1)", /* cool smoky gray-silver */
  "rgba(125,211,252,1)", /* --color-ice — rare accent */
];
