import { jsonToQueryString } from './QueryStringHelper'
import Constants from '../constants'

export default function getRequestDetails (query) {
  const filters = {}
  Object.keys(query).forEach((item) => {
    if (item !== 'param') {
      filters[item] = query[item]
    }
  })

  const endpoint = `${Constants.ENDPOINTS.baseUrl}&${jsonToQueryString(filters)}`

  return {
    endpoint,
    filters
  }
}
