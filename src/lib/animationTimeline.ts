/**
 * Animation Timeline Constants
 * Master timeline: 0s → 8.5s total
 * Defines all animation sequences and their timings
 */

export const ANIMATION_TIMELINE = {
  // Loading Screen
  LOADING_NAME_FADE_IN: 0.5,
  LOADING_BAR_FILL_START: 0,
  LOADING_BAR_FILL_END: 1.5,
  LOADING_RIPPLE_DELAY: 1.5,
  LOADING_TOTAL_DURATION: 2,

  // Name Expansion
  NAME_EXPANSION_DELAY: 2,
  NAME_EXPANSION_DURATION: 1,

  // Name Transition (move to top)
  NAME_TRANSITION_DELAY: 3,
  NAME_TRANSITION_DURATION: 1,
  NAME_FINAL_TOP_PERCENT: 0.2, // 20% from top (golden ratio)

  // Gear System
  GEAR_ENTRANCE_DELAY: 3.5,
  GEAR_ENTRANCE_CENTER_DURATION: 1.5,
  GEAR_ENTRANCE_SIDE_DURATION: 1.5,
  GEAR_ENTRANCE_SIDE_STAGGER: 0.1,
  GEAR_WOBBLE_DURATION: 0.6,
  GEAR_WOBBLE_DELAY: 1.5, // After gears settle

  // Rotation
  ROTATION_START: 5,
  ROTATION_SPEED: 0.3, // Radians per second (slow)

  // Quote
  QUOTE_APPEARANCE_DELAY: 5.5,
  QUOTE_WORD_DELAY: 0.15, // Seconds between each word
  QUOTE_WORD_FADE_DURATION: 0.3,
  QUOTE_WORD_RISE_DISTANCE: 8, // px

  // Idle State
  IDLE_START: 8.5,

  // Scroll Transitions
  SCROLL_GEAR_SCALE_MULTIPLIER: 1.2,
  SCROLL_BLUR_MAX: 20, // px
  SCROLL_FADE_OUT_DISTANCE: 300, // px scroll distance
};

export const EASING = {
  EASE_OUT_CUBIC: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  EASE_IN_OUT_CUBIC: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  EASE_OUT_QUAD: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
};

/**
 * Get total animation sequence duration
 */
export const getTotalDuration = () => ANIMATION_TIMELINE.IDLE_START;
