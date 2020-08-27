import getRequestDetails from '../RequestHelper'
import * as QueryStringHelper from '../QueryStringHelper'
// query { launch: '2006', param: [ 'filters' ] }

describe('Request Helper', () => {
  it('should return filters and enpoint based on query params', () => {
    QueryStringHelper.jsonToQueryString = jest.fn().mockImplementation(() => {
      return 'launch_success=true&land_success=true&launch_year=2014'
    })
    const query = {
      launch_success: 'true',
      land_success: 'true',
      param: ['filters']
    }
    const { endpoint, filters } = getRequestDetails(query)
    expect(endpoint).toBe('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=2014')
    expect(filters).toEqual({ land_success: 'true', launch_success: 'true' })
  })
})
