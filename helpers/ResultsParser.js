import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

const getLandingSuccess = (item) => {
  const cores = get(item, 'rocket.first_stage.cores')
  if (!isEmpty(cores)) {
    return cores.some(core => core.land_success)
  }
  return false
}

const parse = (res) => {
  return res.map(item => ({
    flight_number: item.flight_number,
    mission_name: item.mission_name,
    mission_id: item.mission_id,
    launch_year: item.launch_year,
    launch_success: item.launch_success,
    land_success: getLandingSuccess(item),
    mission_patch_small: item.links.mission_patch_small
  }))
}

export {
  parse
}
