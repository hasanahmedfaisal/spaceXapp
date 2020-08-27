/* eslint-env jest */
import Constants from '../index'

describe('config', () => {
  it('should return base url', () => {
    expect(Constants.ENDPOINTS.baseUrl).toBe('https://api.spaceXdata.com/v3/launches?limit=100')
  })
})
