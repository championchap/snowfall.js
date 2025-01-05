/**
 * @module snowfall
 */

import { UserConfig, UserSchedule, Simulation } from './types'
import * as Sim from './simulation'
import { withinSchedule } from './utils'

let simulation: Simulation

/**
 * Starts the Snowfall simulation.
 *
 * @param {UserConfig} [config] - A config, possibly from the [Visual Config Editor](https://erikwatson.github.io/snowfall-editor/).
 */
export function start(config: UserConfig = {}) {
  simulation = Sim.create()

  try {
    simulation.start(config)
  } catch (error) {
    console.error(error)
  }
}

export function restart(config: UserConfig = {}) {
  if (simulation) {
    simulation.restart(config)
  }
}

/**
 * Starts the Snowfall simulation when today's date falls within the date range in the schedule.
 *
 * @param {UserSchedule} userSchedule - A schedule config, defining when the simulation should run from, and when the simulation should run to.
 * @param {UserConfig} [config] - A config, possibly from the [Visual Config Editor](https://erikwatson.github.io/snowfall-editor/).
 */
export function schedule(userSchedule: UserSchedule, config: UserConfig = {}) {
  if (withinSchedule(userSchedule)) {
    start(config)
  }
}

/**
 * Set the colour of the Snowflakes
 * @param {string} colour - The colour to set
 * @param {number} layer - The layer to set the colour for
 */
export function setColour(colour: string, layer: number) {
  simulation.setColour(colour, layer)
}

/**
 * Set the density of the Snowflakes. This is the number of snowflakes on screen
 * at a resolution of 1280 x 1080, but this number is scaled up and down at
 * higher and lower resolutions respectively to give a consistent look when
 * resizing.
 *
 * Setting this restarts the simulation.
 *
 * @param {number} density - A number representing the density of snowflakes.
 * @param {number} layer - The layer to set the density for
 */
export function setDensity(density: number, layer: number) {
  simulation.setDensity(density, layer)
}

/**
 * Set the Amplitude of the Wave motion of the Snowflakes
 *
 * @param {number} amplitude - The Amplitude to set
 * @param {number} layer - The layer to set the amplitude for
 */
export function setAmplitude(amplitude: number, layer: number) {
  simulation.setAmplitude(amplitude, layer)
}

/**
 * Set the Frequency of the Wave motion of the Snowflakes.
 *
 * @param {number} frequency - The frequency to set
 * @param {number} layer - The layer to set the frequency for
 */
export function setFrequency(frequency: number, layer: number) {
  simulation.setFrequency(frequency, layer)
}

/**
 * Set this to true to prevent the update.
 * Set it to true to continue from where we left off.
 *
 * @param {boolean} pause - If the simulation should be halted or not
 * @param {number} layer - The layer to set the paused state for
 */
export function setPaused(pause: boolean, layer: number) {
  simulation.setPaused(pause, layer)
}

/**
 * Pause/unpause the snowfall update loop
 */
export function togglePaused(layer: number) {
  simulation.togglePaused(layer)
}

/**
 * Set the angle and strength of the wind in the simulation.
 *
 * @param {number} angle - The angle of the wind, in degrees
 * @param {number} strength - The strength of the wind
 * @param {number} layer - The layer to set the wind for
 */
export function setWind(angle: number, strength: number, layer: number) {
  simulation.setWind(angle, strength, layer)
}

/**
 * Set the angle of the wind in the simulation.
 *
 * @param {number} angle - The angle of the wind, in degrees
 * @param {number} layer - The layer to set the wind angle for
 */
export function setWindAngle(angle: number, layer: number) {
  simulation.setWindAngle(angle, layer)
}

/**
 * Set the strength of the wind in the simulation.
 *
 * @param {number} strength - The strength of the wind
 */
export function setWindStrength(strength: number, layer: number) {
  simulation.setWindStrength(strength, layer)
}

/**
 * Set the wind gusts in the simulation.
 * This restarts the simulation.
 *
 * @param {boolean} gusts - Should there be gusts in the wind?
 * @param {number} layer - The layer to set the gusts for
 */
export function setGusts(gusts: boolean, layer: number) {
  simulation.setGusts(gusts, layer)
}

/**
 * Set the angle and strength of gravity in the simulation.
 *
 * @param {number} angle - The angle of gravity, in degrees
 * @param {number} strength - The strength of the gravity
 * @param {number} layer - The layer to set the gravity for
 */
export function setGravity(angle: number, strength: number, layer: number) {
  simulation.setGravity(angle, strength, layer)
}

/**
 * Set the angle of gravity in the simulation.
 *
 * @param {number} angle - The angle of gravity, in degrees
 * @param {number} layer - The layer to set the gravity angle for
 */
export function setGravityAngle(angle: number, layer: number) {
  simulation.setGravityAngle(angle, layer)
}

/**
 * Set the strength of gravity in the simulation.
 *
 * @param {number} strength - The strength of the gravity
 * @param {number} layer - The layer to set the gravity strength for
 */
export function setGravityStrength(strength: number, layer: number) {
  simulation.setGravityStrength(strength, layer)
}

/**
 * Set the minimum additional strength of the wind when it's coming in.
 *
 * @param {number} min - The minimum additional strength of the wind when it's coming in.
 * @param {number} layer - The layer to set the wind in additional strength min for
 * @returns {void}
 */
export function setWindInAdditionalStrengthMin(min: number, layer: number) {
  simulation.setWindInAdditionalStrengthMin(min, layer)
}

/**
 * Set the maximum additional strength of the wind when it's coming in.
 *
 * @param {number} max - The maximum additional strength of the wind when it's coming in.
 * @param {number} layer - The layer to set the wind in additional strength max for
 * @returns {void}
 */
export function setWindInAdditionalStrengthMax(max: number, layer: number) {
  simulation.setWindInAdditionalStrengthMax(max, layer)
}

/**
 * Set the minimum duration of the wind when it's coming in.
 *
 * @param {number} min - The minimum duration of the wind when it's coming in.
 * @param {number} layer - The layer to set the wind in duration min for
 * @returns {void}
 */
export function setWindInDurationMin(min: number, layer: number) {
  simulation.setWindInDurationMin(min, layer)
}

/**
 * Set the maximum duration of the wind when it's coming in.
 *
 * @param {number} max - The maximum duration of the wind when it's coming in.
 * @param {number} layer - The layer to set the wind in duration max for
 * @returns {void}
 */
export function setWindInDurationMax(max: number, layer: number) {
  simulation.setWindInDurationMax(max, layer)
}

/**
 * Set the minimum delay of the wind when it's coming in.
 *
 * @param {number} min - The minimum delay of the wind when it's coming in.
 * @param {number} layer - The layer to set the wind in delay min for
 * @returns {void}
 */
export function setWindInDelayMin(min: number, layer: number) {
  simulation.setWindInDelayMin(min, layer)
}

/**
 * Set the maximum delay of the wind when it's coming in.
 *
 * @param {number} max - The maximum delay of the wind when it's coming in.
 * @param {number} layer - The layer to set the wind in delay max for
 * @returns {void}
 */
export function setWindInDelayMax(max: number, layer: number) {
  simulation.setWindInDelayMax(max, layer)
}

/**
 * Set the minimum duration of the wind when it's going out.
 *
 * @param {number} min - The minimum duration of the wind when it's going out.
 * @param {number} layer - The layer to set the wind out duration min for
 * @returns {void}
 */
export function setWindOutDurationMin(min: number, layer: number) {
  simulation.setWindOutDurationMin(min, layer)
}

/**
 * Set the maximum duration of the wind when it's going out.
 *
 * @param {number} max - The maximum duration of the wind when it's going out.
 * @param {number} layer - The layer to set the wind out duration max for
 * @returns {void}
 */
export function setWindOutDurationMax(max: number, layer: number) {
  simulation.setWindOutDurationMax(max, layer)
}

/**
 * Set the minimum delay of the wind when it's going out.
 *
 * @param {number} min - The minimum delay of the wind when it's going out.
 * @param {number} layer - The layer to set the wind out delay min for
 * @returns {void}
 */
export function setWindOutDelayMin(min: number, layer: number) {
  simulation.setWindOutDelayMin(min, layer)
}

/**
 * Set the maximum delay of the wind when it's going out.
 *
 * @param {number} max - The maximum delay of the wind when it's going out.
 * @param {number} layer - The layer to set the wind out delay max for
 * @returns {void}
 */
export function setWindOutDelayMax(max: number, layer: number) {
  simulation.setWindOutDelayMax(max, layer)
}

/**
 * Set the chance of the wind changing direction after a gust.
 *
 * @param {number} chance - The chance of the wind changing direction after a gust.
 * @param {number} layer - The layer to set the wind out change chance for
 * @returns {void}
 */
export function setWindOutChangeChance(chance: number, layer: number) {
  simulation.setWindOutChangeChance(chance, layer)
}

/**
 * Set the minimum size of the snowflakes.
 *
 * @param {number} min - The minimum size of the snowflakes.
 * @param {number} layer - The layer to set the size min for
 */
export function setSizeMin(min: number, layer: number) {
  simulation.setSizeMin(min, layer)
}

/**
 * Set the maximum size of the snowflakes.
 *
 * @param {number} max - The maximum size of the snowflakes.
 * @param {number} layer - The layer to set the size max for
 */
export function setSizeMax(max: number, layer: number) {
  simulation.setSizeMax(max, layer)
}

// Exporting types for TypeDoc
// export type { UserConfig, UserSchedule } from './types'

// exporting the diff function for the editor
export { diff } from './config'
export * from './defaults'
export { clone } from './utils'
