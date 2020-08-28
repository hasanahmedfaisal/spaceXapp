import React from 'react'
import isEmpty from 'lodash/isEmpty'

export default class Card extends React.Component {
  canUseWebP () {
    var elem = document.createElement('canvas')

    if (elem.getContext && elem.getContext('2d')) {
      // was able or not to get WebP representation
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
    }

    // very old browser like IE 8, canvas not supported
    return false
  }

  fetchImageSrc (missionPatchImage) {
    try {
      if (missionPatchImage == null) {
        return ''
      } else if (this.canUseWebP()) {
        return `/${missionPatchImage.split('/')[5].split('.')[0]}.webp`
      } else {
        return missionPatchImage
      }
    } catch (error) {
      return missionPatchImage
    }
  }

  render () {
    const missionName = this.props.cardProps.mission_name
    const flightNumber = this.props.cardProps.flight_number
    const launchYear = this.props.cardProps.launch_year
    const launchSuccess = this.props.cardProps.launch_success
    const landSuccess = this.props.cardProps.land_success
    const missionPatchImage = this.props.cardProps.mission_patch_small
    const missionId = this.props.cardProps.mission_id
    const isMissionIdPresent = !isEmpty(missionId)
    const imageSrc = this.fetchImageSrc(missionPatchImage)
    return (
      <div className='mainCard'>
        <img alt='Image Unavailable' src={imageSrc} />
        <div className='text missionName'>{missionName} #{flightNumber}</div>
        <div className='text missionId'>Mission Ids:
          <div className='missionIds'>{isMissionIdPresent ? missionId.join() : 'Unavailable'}</div>
        </div>
        <div className='text launchYr'>Launch Year: {launchYear}</div>
        <div className='text launchStatus'>Successful Launch: {launchSuccess ? 'True' : 'False'}</div>
        <div className='text landingStatus'>Successful Landing: {landSuccess ? 'True' : 'False'}</div>
      </div>
    )
  }
}
