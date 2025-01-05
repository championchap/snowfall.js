import {
  DEFAULT_BASE_CONFIG,
  DEFAULT_LAYERS,
  DEFAULT_WIND_IN_ADDITIONAL_STRENGTH_MIN
} from '../index'
import { diff } from '../index'

describe('Config diffing', () => {
  // it('should return an empty object when given a default config', () => {
  //   const result = diff(DEFAULT_BASE_CONFIG)
  //   expect(result).toEqual({})
  // })

  // it('should return an object with an attachTo when the attachTo property is changed', () => {
  //   const conf = { attachTo: 'test' }
  //   const result = diff(conf)
  //   expect(result).toEqual(conf)
  // })

  // it('should return an object with a background when the background property is changed', () => {
  //   const conf = { background: '#ff0000' }
  //   const result = diff(conf)
  //   expect(result).toEqual(conf)
  // })

  // // layers
  // it('should return an object with only the layer colour changed', () => {
  //   const conf = { layers: [{ colour: '#FF0000' }] }
  //   const result = diff(conf)
  //   expect(result).toEqual(conf)
  // })

  // it('should return two layer objects with colours changed', () => {
  //   const conf = { layers: [{ colour: '#FF0000' }, { colour: '#00FF00' }] }
  //   const result = diff(conf)
  //   expect(result).toEqual(conf)
  // })

  // it('should return three layer objects with only the colours changed', () => {
  //   const conf = {
  //     layers: [
  //       { colour: '#FF0000' },
  //       { colour: '#00FF00' },
  //       { colour: '#ff0000' }
  //     ]
  //   }
  //   const result = diff(conf)
  //   expect(result).toEqual(conf)
  // })

  // it('should return three layer objects with only the colours changed', () => {
  //   const conf = { layers: [{}, {}, { colour: '#ff0000' }] }
  //   const result = diff(conf)
  //   expect(result).toEqual(conf)
  // })

  // it('should return three layer objects with only the wind strength changed', () => {
  //   const conf = {
  //     layers: [
  //       {
  //         wind: {
  //           strength: 15
  //         }
  //       }
  //     ]
  //   }
  //   const result = diff(conf)
  //   expect(result).toEqual(conf)
  // })

  // it('should return three layer objects with only the wind gusts in additional strength max has changed', () => {
  //   const conf = {
  //     layers: [
  //       {
  //         wind: {
  //           gusts: {
  //             in: {
  //               additionalStrength: {
  //                 max: 100,
  //                 min: DEFAULT_WIND_IN_ADDITIONAL_STRENGTH_MIN
  //               }
  //             }
  //           }
  //         }
  //       }
  //     ]
  //   }
  //   const result = diff(conf)
  //   expect(result).toEqual({
  //     layers: [
  //       {
  //         wind: {
  //           gusts: {
  //             in: {
  //               additionalStrength: {
  //                 max: 100
  //               }
  //             }
  //           }
  //         }
  //       }
  //     ]
  //   })
  // })

  // it('should return an empty config because nothing really changed', () => {
  //   const conf = {
  //     layers: [
  //       {
  //         wind: {}
  //       }
  //     ]
  //   }
  //   const result = diff(conf)
  //   expect(result).toEqual({})
  // })

  // it('should return only one layer, as only the first layer changed', () => {
  //   const conf = {
  //     layers: [{ colour: '#ff0000' }]
  //   }
  //   const result = diff(conf)
  //   expect(result).toEqual(conf)
  // })

  // it('should allow me to set the colour on the second layer, and keep the empty first object in the first slot', () => {
  //   const result = diff({
  //     layers: [
  //       {},
  //       {
  //         colour: '#feecec'
  //       }
  //     ]
  //   })

  //   console.log('result', result)

  //   expect(result).toEqual({
  //     layers: [
  //       {},
  //       {
  //         colour: '#feecec'
  //       }
  //     ]
  //   })
  // })

  it('should allow me to set fewer layers than the default', () => {
    expect(diff({ layers: [] })).toEqual({
      layers: []
    })
    expect(diff({ layers: [{}] })).toEqual({
      layers: [{}]
    })
    expect(diff({ layers: [{}, {}] })).toEqual({})
    expect(diff({ layers: [{}, {}, {}] })).toEqual({
      layers: [{}, {}, {}]
    })
  })
})
