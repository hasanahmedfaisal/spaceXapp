import { jsonToQueryString } from './QueryStringHelper'

const baseUrl = "https://api.spaceXdata.com/v3/launches?limit=100"

export default function getRequestDetails(query){
    // query { launch: '2006', param: [ 'filters' ] }
    let filters = {}
    Object.keys(query).forEach((item) =>{
        if(item !== "param"){
            filters[item] = query[item]
        }
    })

    const endpoint = `${baseUrl}&${jsonToQueryString(filters)}`

    return {
        endpoint,
        filters
    }
}