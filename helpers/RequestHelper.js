import { jsonToQueryString } from './QueryStringHelper'
import Constants from '../config/Constants'

export default function getRequestDetails(query){
    let filters = {}
    Object.keys(query).forEach((item) =>{
        if(item !== "param"){
            filters[item] = query[item]
        }
    })

    const endpoint = `${Constants.ENDPOINTS.baseUrl}&${jsonToQueryString(filters)}`

    return {
        endpoint,
        filters
    }
}