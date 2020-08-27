import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import * as QueryStringHelper from '../../helpers/QueryStringHelper'

const propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isSelected: PropTypes.bool,
  filterType: PropTypes.string,
  selectedFilters: PropTypes.objectOf(PropTypes.string)
}

const defaultProps = {
  isSelected: false
}

export default class FilterButton extends React.Component {
  constructor () {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const selectedFilter = { ...this.props.selectedFilters }
    if (isEmpty(this.props.selectedFilters)) {
      selectedFilter[this.props.filterType] = this.props.name
    } else {
      if (!!(this.props.filterType in this.props.selectedFilters) &&
                this.props.selectedFilters[this.props.filterType] === this.props.name) {
        delete selectedFilter[this.props.filterType]
      } else {
        selectedFilter[this.props.filterType] = this.props.name
      }
    }
    this.props.onHandleClick(selectedFilter)
    if (isEmpty(selectedFilter)) { window.history.pushState({}, '', '/') } else { window.history.pushState({}, '', `filters?${QueryStringHelper.jsonToQueryString(selectedFilter)}`) }
  }

  render () {
    const buttonClassName = this.props.isSelected ? 'button isSelected' : 'button'
    return (
      <div className='buttonDiv'>
        <button className={buttonClassName} onClick={this.handleClick}>{this.props.name}</button>
      </div>
    )
  }
}

FilterButton.propTypes = propTypes
FilterButton.defaultProps = defaultProps
