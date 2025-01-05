import { BaseConfig, CompleteUserConfig, Config, ConfigLayer } from './types'
import { getElementOrThrow } from './utils'

// Basic
export const DEFAULT_CONTAINER_ID = 'snowfall'
// export const DEFAULT_BACKGROUND = '#0d0014'
// export const DEFAULT_SNOW_COLOR = '#8d90b7'
export const DEFAULT_SNOW_COLOR = '#ffffff'
export const DEFAULT_DENSITY = 200
export const DEFAULT_SIZE_MIN = 1
export const DEFAULT_SIZE_MAX = 3

// Size
export const DEFAULT_SIZE = {
  min: DEFAULT_SIZE_MIN,
  max: DEFAULT_SIZE_MAX
}

// Wave
export const DEFAULT_AMPLITUDE = 1.0
export const DEFAULT_FREQUENCY = 0.02
export const DEFAULT_WAVE = {
  frequency: DEFAULT_FREQUENCY,
  amplitude: DEFAULT_AMPLITUDE
}

// Gravity
export const DEFAULT_GRAVITY_ANGLE = 90
export const DEFAULT_GRAVITY_STRENGTH = 0.7
export const DEFAULT_GRAVITY = {
  angle: DEFAULT_GRAVITY_ANGLE,
  strength: DEFAULT_GRAVITY_STRENGTH
}

// Wind
export const DEFAULT_WIND_ANGLE = 0
export const DEFAULT_WIND_STRENGTH = 0
export const DEFAULT_WIND_IN_ADDITIONAL_STRENGTH_MIN = 1
export const DEFAULT_WIND_IN_ADDITIONAL_STRENGTH_MAX = 3
export const DEFAULT_WIND_IN_ADDITIONAL_STRENGTH = {
  min: DEFAULT_WIND_IN_ADDITIONAL_STRENGTH_MIN,
  max: DEFAULT_WIND_IN_ADDITIONAL_STRENGTH_MAX
}
export const DEFAULT_WIND_IN_DURATION_MIN = 1000
export const DEFAULT_WIND_IN_DURATION_MAX = 3000
export const DEFAULT_WIND_IN_DURATION = {
  min: DEFAULT_WIND_IN_DURATION_MIN,
  max: DEFAULT_WIND_IN_DURATION_MAX
}
export const DEFAULT_WIND_IN_DELAY_MIN = 1000
export const DEFAULT_WIND_IN_DELAY_MAX = 10000
export const DEFAULT_WIND_IN_DELAY = {
  min: DEFAULT_WIND_IN_DELAY_MIN,
  max: DEFAULT_WIND_IN_DELAY_MAX
}
export const DEFAULT_WIND_OUT_DELAY_MIN = 5000
export const DEFAULT_WIND_OUT_DELAY_MAX = 10000
export const DEFAULT_WIND_OUT_DELAY = {
  min: DEFAULT_WIND_OUT_DELAY_MIN,
  max: DEFAULT_WIND_OUT_DELAY_MAX
}
export const DEFAULT_WIND_OUT_DURATION_MAX = 10000
export const DEFAULT_WIND_OUT_DURATION_MIN = 1000
export const DEFAULT_WIND_OUT_DURATION = {
  min: DEFAULT_WIND_OUT_DURATION_MIN,
  max: DEFAULT_WIND_OUT_DURATION_MAX
}
export const DEFAULT_WIND_GUSTS_CHANGE_CHANCE = 0.25

export const DEFAULT_WIND_GUSTS_ACTIVE = true
export const DEFAULT_WIND_GUSTS_OUT = {
  duration: DEFAULT_WIND_OUT_DURATION,
  delay: DEFAULT_WIND_OUT_DELAY
}
export const DEFAULT_WIND_GUSTS_IN = {
  additionalStrength: DEFAULT_WIND_IN_ADDITIONAL_STRENGTH,
  duration: DEFAULT_WIND_IN_DURATION,
  delay: DEFAULT_WIND_IN_DELAY
}

export const DEFAULT_WIND_GUSTS = {
  active: DEFAULT_WIND_GUSTS_ACTIVE,
  changeChance: DEFAULT_WIND_GUSTS_CHANGE_CHANCE,
  in: DEFAULT_WIND_GUSTS_IN,
  out: DEFAULT_WIND_GUSTS_OUT
}

export const DEFAULT_WIND = {
  angle: DEFAULT_WIND_ANGLE,
  strength: DEFAULT_WIND_STRENGTH,
  gusts: DEFAULT_WIND_GUSTS
}

export const DEFAULT_LAYER: ConfigLayer = {
  colour: DEFAULT_SNOW_COLOR,
  density: DEFAULT_DENSITY,
  size: DEFAULT_SIZE,
  wave: DEFAULT_WAVE,
  gravity: DEFAULT_GRAVITY,
  wind: DEFAULT_WIND
}

export const DEFAULT_LAYERS: ConfigLayer[] = [
  // { ...DEFAULT_LAYER, colour: DEFAULT_PRIMARY_COLOR },
  // { ...DEFAULT_LAYER, colour: DEFAULT_SECONDARY_COLOR }
]

export const DEFAULT_BASE_CONFIG: BaseConfig = {
  // background: DEFAULT_BACKGROUND,
  layers: DEFAULT_LAYERS
}

export function getDefaultConfig(): Config {
  return {
    ...DEFAULT_BASE_CONFIG,
    attachTo: getElementOrThrow(DEFAULT_CONTAINER_ID)
  }
}

export const DEFAULT_USER_CONFIG: CompleteUserConfig = {
  ...DEFAULT_BASE_CONFIG,
  attachTo: DEFAULT_CONTAINER_ID
}
