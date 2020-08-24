import React from 'react'
import isEmpty from 'lodash/isEmpty'

export default class Card extends React.Component {
    render() {
        const { 
             mission_name,
             flight_number, 
             launch_year, 
             launch_success, 
             land_success, 
             mission_patch_small, 
             mission_id 
            } = this.props.cardProps
            const isMissionIdPresent = !isEmpty(mission_id)
        return (
            <div className="mainCard">
                <img src={mission_patch_small} />
            <div className="text missionName">{mission_name} #{flight_number}</div>
            <div className="text missionId">Mission Ids: 
                <div className="missionIds">{isMissionIdPresent?mission_id.join():"Unavailable"}</div>
            </div>
            <div className="text launchYr">Launch Year {launch_year}</div>
            <div className="text launchStatus">Successful Launch: {launch_success? "True" : "False"}</div>
            <div className="text landingStatus">Successful Landing: {land_success? "True" : "False"}</div>
            </div>
        )
    }
}