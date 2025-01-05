import { BaseConfig, Config, ConfigLayer, UserConfig } from './types'
import { getElementOrThrow } from './utils'
import {
  DEFAULT_BASE_CONFIG,
  DEFAULT_CONTAINER_ID,
  DEFAULT_DENSITY,
  DEFAULT_GRAVITY,
  DEFAULT_LAYERS,
  DEFAULT_SNOW_COLOR,
  DEFAULT_WAVE,
  DEFAULT_WIND,
  DEFAULT_WIND_GUSTS_IN,
  DEFAULT_WIND_IN_ADDITIONAL_STRENGTH,
  DEFAULT_WIND_IN_DELAY,
  DEFAULT_WIND_IN_DURATION,
  DEFAULT_WIND_GUSTS_OUT,
  DEFAULT_WIND_OUT_DELAY,
  DEFAULT_WIND_OUT_DURATION,
  DEFAULT_SIZE,
  DEFAULT_WIND_GUSTS,
  DEFAULT_LAYER
} from './defaults'
function mergeBaseConfig(config: BaseConfig): BaseConfig {
  const layerConfig = (
    layer: Partial<ConfigLayer>,
    index: number
  ): ConfigLayer => {
    const defaultLayer =
      index < DEFAULT_LAYERS.length ? DEFAULT_LAYERS[index] : DEFAULT_LAYER

    return {
      colour: layer.colour || defaultLayer.colour || DEFAULT_SNOW_COLOR,
      density: layer.density || defaultLayer.density || DEFAULT_DENSITY,
      size: { ...DEFAULT_SIZE, ...defaultLayer.size, ...layer.size },
      wave: { ...DEFAULT_WAVE, ...defaultLayer.wave, ...layer.wave },
      gravity: {
        ...DEFAULT_GRAVITY,
        ...defaultLayer.gravity,
        ...layer.gravity
      },
      wind: {
        ...DEFAULT_WIND,
        ...defaultLayer.wind,
        ...layer.wind,
        gusts: {
          ...DEFAULT_WIND_GUSTS,
          ...defaultLayer.wind?.gusts,
          ...layer.wind?.gusts,
          in: {
            ...DEFAULT_WIND_GUSTS_IN,
            ...defaultLayer.wind?.gusts?.in,
            ...layer.wind?.gusts?.in,
            additionalStrength: {
              ...DEFAULT_WIND_IN_ADDITIONAL_STRENGTH,
              ...defaultLayer.wind?.gusts?.in?.additionalStrength,
              ...layer.wind?.gusts?.in?.additionalStrength
            },
            duration: {
              ...DEFAULT_WIND_IN_DURATION,
              ...defaultLayer.wind?.gusts?.in?.duration,
              ...layer.wind?.gusts?.in?.duration
            },
            delay: {
              ...DEFAULT_WIND_IN_DELAY,
              ...defaultLayer.wind?.gusts?.in?.delay,
              ...layer.wind?.gusts?.in?.delay
            }
          },
          out: {
            ...DEFAULT_WIND_GUSTS_OUT,
            ...defaultLayer.wind?.gusts?.out,
            ...layer.wind?.gusts?.out,
            duration: {
              ...DEFAULT_WIND_OUT_DURATION,
              ...defaultLayer.wind?.gusts?.out?.duration,
              ...layer.wind?.gusts?.out?.duration
            },
            delay: {
              ...DEFAULT_WIND_OUT_DELAY,
              ...defaultLayer.wind?.gusts?.out?.delay,
              ...layer.wind?.gusts?.out?.delay
            }
          }
        }
      }
    }
  }

  const result: BaseConfig = {
    ...DEFAULT_BASE_CONFIG,
    ...config,
    layers: (config.layers ?? []).map((layer, index) =>
      layerConfig(layer, index)
    )
  }

  // // Fill in additional layers if config.layers is shorter than DEFAULT_LAYERS
  // const additionalLayers = DEFAULT_LAYERS.slice(config.layers?.length || 0).map(
  //   (defaultLayer, index) => layerConfig({}, config.layers?.length || 0 + index)
  // )

  // result.layers = [...result.layers, ...additionalLayers]

  return result
}

export function merge(config: UserConfig): Config {
  const { attachTo, ...baseConfig } = config
  const basedConfig = mergeBaseConfig(baseConfig as BaseConfig)

  return {
    ...basedConfig,
    attachTo: config.attachTo
      ? getElementOrThrow(config.attachTo)
      : getElementOrThrow(DEFAULT_CONTAINER_ID)
  }
}

export function merge2(config: UserConfig): UserConfig {
  const { attachTo, ...baseConfig } = config
  const basedConfig = mergeBaseConfig(baseConfig as BaseConfig)

  return {
    ...basedConfig,
    attachTo: config.attachTo ?? DEFAULT_CONTAINER_ID
  }
}

function isPlainObject(obj: any): obj is Record<string, any> {
  return obj !== null && typeof obj === 'object' && obj.constructor === Object
}

function isHTMLElement(obj: any): obj is HTMLElement {
  return obj instanceof HTMLElement
}

// function diffObjects(defaultObj: any, userObj: any, seen = new WeakMap()): any {
//   if (seen.has(userObj)) {
//     return {} // Handle circular references
//   }
//   seen.set(userObj, true)

//   const result: any = {}

//   for (const key in userObj) {
//     try {
//       if (isPlainObject(userObj[key]) && isPlainObject(defaultObj[key])) {
//         const nestedDiff = diffObjects(defaultObj[key], userObj[key], seen)
//         if (Object.keys(nestedDiff).length > 0) {
//           result[key] = nestedDiff
//         }
//       } else if (
//         Array.isArray(userObj[key]) &&
//         Array.isArray(defaultObj[key])
//       ) {
//         // Handle array comparison by diffing each element
//         const arrayDiff = diffArrays(defaultObj[key], userObj[key], seen)
//         if (arrayDiff.length > 0) {
//           result[key] = arrayDiff
//         }
//       } else if (
//         isHTMLElement(userObj[key]) &&
//         isHTMLElement(defaultObj[key])
//       ) {
//         if (userObj[key] !== defaultObj[key]) {
//           result[key] = userObj[key]
//         }
//       } else if (userObj[key] !== defaultObj[key]) {
//         result[key] = userObj[key]
//       }
//     } catch (error) {
//       // Skip keys that cause errors
//       console.error(`Failed to access property ${key}:`, error)
//     }
//   }

//   seen.delete(userObj)
//   return result
// }

// // Compare arrays element by element, with deep checking for object properties
// function diffArrays(
//   defaultArray: any[],
//   userArray: any[],
//   seen: WeakMap<any, boolean>
// ): any[] {
//   const result: any[] = []

//   const maxLength = Math.max(defaultArray.length, userArray.length)

//   for (let i = 0; i < maxLength; i++) {
//     const defaultElem = defaultArray[i]
//     const userElem = userArray[i]

//     if (isPlainObject(defaultElem) && isPlainObject(userElem)) {
//       const nestedDiff = diffObjects(defaultElem, userElem, seen)
//       if (Object.keys(nestedDiff).length > 0) {
//         result.push(nestedDiff)
//       }
//     } else if (Array.isArray(defaultElem) && Array.isArray(userElem)) {
//       const nestedArrayDiff = diffArrays(defaultElem, userElem, seen)
//       if (nestedArrayDiff.length > 0) {
//         result.push(nestedArrayDiff)
//       }
//     } else if (defaultElem !== userElem) {
//       result.push(userElem)
//     }
//   }

//   return result
// }

function diffObjects(defaultObj: any, userObj: any, seen = new WeakMap()): any {
  // Only use the WeakMap if the object is a valid object (not a primitive value like string, number, etc.)
  if (typeof userObj !== 'object' || userObj === null) {
    return {}
  }

  if (seen.has(userObj)) {
    return {} // Handle circular references
  }

  seen.set(userObj, true)

  const result: any = {}

  for (const key in userObj) {
    try {
      if (
        key === 'layers' &&
        Array.isArray(userObj[key]) &&
        Array.isArray(defaultObj[key])
      ) {
        // Handle the layers array separately
        const layerDiff = diffLayers(defaultObj[key], userObj[key], seen)
        if (layerDiff.length > 0) {
          result[key] = layerDiff
        }
      } else if (
        isPlainObject(userObj[key]) &&
        isPlainObject(defaultObj[key])
      ) {
        const nestedDiff = diffObjects(defaultObj[key], userObj[key], seen)
        if (Object.keys(nestedDiff).length > 0) {
          result[key] = nestedDiff
        }
      } else if (
        Array.isArray(userObj[key]) &&
        Array.isArray(defaultObj[key])
      ) {
        const arrayDiff = diffArrays(defaultObj[key], userObj[key], seen)
        if (arrayDiff.length > 0) {
          result[key] = arrayDiff
        }
      } else if (
        isHTMLElement(userObj[key]) &&
        isHTMLElement(defaultObj[key])
      ) {
        if (userObj[key] !== defaultObj[key]) {
          result[key] = userObj[key]
        }
      } else if (userObj[key] !== defaultObj[key]) {
        result[key] = userObj[key]
      }
    } catch (error) {
      // Skip keys that cause errors
      console.error(`Failed to access property ${key}:`, error)
    }
  }

  seen.delete(userObj)
  return result
}

function diffArrays(
  defaultArray: any[],
  userArray: any[],
  seen: WeakMap<any, boolean>
): any[] {
  const result: any[] = []

  const maxLength = Math.max(defaultArray.length, userArray.length)

  for (let i = 0; i < maxLength; i++) {
    const defaultElem = defaultArray[i]
    const userElem = userArray[i]

    if (isPlainObject(defaultElem) && isPlainObject(userElem)) {
      const nestedDiff = diffObjects(defaultElem, userElem, seen)
      if (Object.keys(nestedDiff).length > 0) {
        result.push(nestedDiff)
      }
    } else if (Array.isArray(defaultElem) && Array.isArray(userElem)) {
      const nestedArrayDiff = diffArrays(defaultElem, userElem, seen)
      if (nestedArrayDiff.length > 0) {
        result.push(nestedArrayDiff)
      }
    } else if (defaultElem !== userElem) {
      result.push(userElem)
    }
  }

  return result
}

function diffLayers(
  defaultLayers: ConfigLayer[],
  userLayers: ConfigLayer[],
  seen: WeakMap<any, boolean>
): any[] {
  const result: any[] = []

  console.log({
    defaultLayers: defaultLayers.length,
    userLayers: userLayers.length,
    DEFAULT_LAYERS: DEFAULT_LAYERS.length
  })

  // const maxLength = Math.max(
  //   defaultLayers.length,
  //   userLayers.length,
  //   DEFAULT_LAYERS.length
  // )

  const maxLength =
    userLayers.length !== defaultLayers.length
      ? userLayers.length
      : defaultLayers.length

  for (let i = 0; i < maxLength; i++) {
    const defaultLayer = defaultLayers[i] || DEFAULT_LAYERS[i] || DEFAULT_LAYER
    const userLayer = userLayers[i] || {} // Use an empty object for missing layers in user config

    const layerDiff: any = diffObjects(defaultLayer, userLayer, seen)

    result.push(layerDiff)
  }

  console.log('tidy this up', result)

  return tidyUp(result, defaultLayers)
}

function tidyUp(layers: any[], defaultLayers: any[]) {
  return layers.filter((layer, index) => {
    if (layers.length > defaultLayers.length) {
      return true
    }

    if (!isEmptyObject(layer)) {
      return true
    }

    // Check if there are any layers after this one that are not empty
    if (!layers.slice(index).every(isEmptyObject)) {
      return true
    }

    return false
  })
}

function isEmptyObject(obj: any): boolean {
  return (
    obj !== null && typeof obj === 'object' && Object.keys(obj).length === 0
  )
}

export function diff(config: UserConfig): Partial<UserConfig> {
  console.log('value on the inside', config)
  const defaultConfig = merge2({})
  const userConfig = merge2(config)
  return diffObjects(defaultConfig, userConfig)
}

// machine code
