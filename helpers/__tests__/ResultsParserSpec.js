/* eslint-env jest */
import { parse } from '../ResultsParser'
import testData from './testData.json'

describe('Results Parser', () => {
  it('should parse results from given data', () => {
    const expectedResult = [
      { flight_number: 14, land_success: true, launch_success: true, launch_year: '2014', mission_id: ['EE86F74'], mission_name: 'CRS-3', mission_patch_small: 'https://images2.imgbox.com/a0/cb/s1h2RuR0_o.png' },
      { flight_number: 15, land_success: true, launch_success: true, launch_year: '2014', mission_id: ['CE91D46'], mission_name: 'OG-2 Mission 1', mission_patch_small: 'https://images2.imgbox.com/a7/b4/bcMrHMey_o.png' }
    ]
    const response = parse(testData)
    expect(response).toEqual(expectedResult)
  })
})
