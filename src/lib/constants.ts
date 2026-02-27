/**
 * Design Constants & Golden Ratio
 * φ (phi) ≈ 1.618
 */

export const PHI = 1.618;

/**
 * Base path for GitHub Pages deployment.
 * Resolves to '/Profile-Website' in production, '' locally.
 */
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/Profile-Website" : "";

/**
 * Golden Ratio Spacing Scale
 * Base: 8px × φ progression
 */
export const GOLDEN_RATIO_SPACING = {
  xs: "8px", // 8
  sm: "13px", // 8 * 1.618
  md: "21px", // 13 * 1.618
  lg: "34px", // 21 * 1.618
  xl: "55px", // 34 * 1.618
  "2xl": "89px", // 55 * 1.618
  "3xl": "144px", // 89 * 1.618
  "4xl": "233px", // 144 * 1.618
};

/**
 * Hero Section Layout (% from viewport)
 */
export const HERO_LAYOUT = {
  NAME_TOP_PERCENT: 20, // Top 20% for name
  GEAR_ZONE_START_PERCENT: 20, // Middle 50% for gears
  GEAR_ZONE_END_PERCENT: 70,
  QUOTE_TOP_PERCENT: 70, // Bottom 30% for quote
};

/**
 * Color Palette
 * Semi-liquid metallic aesthetic
 */
export const COLORS = {
  // Backgrounds
  BG_BLACK: "#000000",
  BG_DARK_GRAY: "#0a0a0a",

  // Text
  TEXT_PRIMARY: "#ffffff",
  TEXT_SECONDARY: "#e0e0e0",
  TEXT_TERTIARY: "#a0a0a0",

  // Accents (semi-liquid theme)
  ACCENT_SILVER: "#e8e8e8",
  ACCENT_GOLD: "#d4af37",
  ACCENT_BLUE: "#7dd3fc",

  // Gears Material
  GEAR_BASE: "#c0c0c0", // Metallic silver
};

/**
 * Gear Material Specification
 * MeshPhysicalMaterial settings for semi-liquid effect
 */
export const GEAR_MATERIAL = {
  transmission: 0.85,
  roughness: 0.18,
  metalness: 0.2,
  ior: 1.4, // Index of refraction
  thickness: 1.5,
  clearcoat: 0.4,
  clearcoatRoughness: 0.1,
  attenuationDistance: 2,
  attenuationColor: "#ffffff",
};

/**
 * Environment Lighting Setup
 */
export const LIGHTING = {
  HDRI_PATH: `${BASE_PATH}/hdr/studio-lighting.hdr`,
  // Intensity levels for different lights
  KEY_LIGHT_INTENSITY: 1.2,
  RIM_LIGHT_INTENSITY: 0.7,
  FILL_LIGHT_INTENSITY: 0.4,
};

/**
 * 3D Model Paths
 */
export const MODEL_PATHS = {
  GEAR_CENTRAL: `${BASE_PATH}/models/gear-central.glb`,
  GEAR_EXTERNAL: `${BASE_PATH}/models/gear-external.glb`,
};

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  mobile: "375px",
  tablet: "768px",
  desktop: "1024px",
  "2xl": "1280px",
  "4xl": "1920px",
};

/**
 * Animation Performance Settings
 */
export const PERFORMANCE = {
  TARGET_FPS: 60,
  MOBILE_GEAR_SCALE: 0.7, // Reduce gear size on mobile
  LAZY_LOAD_THRESHOLD: "50px", // When to trigger 3D loading
};

/**
 * Copy Content
 */
export const CONTENT = {
  EMAIL: "prerithm87@gmail.com",
  QUOTE:
    "The best solution isn't always the most complicated one, and often the complicated can be made simple.",
  LINKS: {
    GITHUB: "https://github.com",
    MEDIUM: "https://medium.com",
  },
};
