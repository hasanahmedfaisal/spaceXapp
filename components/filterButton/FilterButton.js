import React from 'react'
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty'
import * as QueryStringHelper from '../../helpers/QueryStringHelper'

const propTypes = {
    name: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    isSelected: PropTypes.bool,
    filterType: PropTypes.string
}
const defaultProps = {
    isSelected: false
}

export default class FilterButton extends React.PureComponent {

    handleClick = () => {
        let selectedFilter = { ...this.props.selectedFilter }
        if (isEmpty(this.props.selectedFilters)) {
            selectedFilter[this.props.filterType] = this.props.name
        }
        else {
            if (!!(this.props.filterType in this.props.selectedFilters) &&
                this.props.selectedFilters[this.props.filterType] === this.props.name) {
                delete selectedFilter[this.props.filterType]
            }
            else {
                selectedFilter[this.props.filterType] = this.props.name
            }
        }
        if(isEmpty(selectedFilter))
            window.location.assign("/")
        else
            window.location.assign(`filters?${QueryStringHelper.jsonToQueryString(selectedFilter)}`)
    }

    render() {
        const buttonClassName = this.props.isSelected ? "button isSelected" : "button"
        return (
            <div className="buttonDiv">
                <button className={buttonClassName} onClick={this.handleClick}>{this.props.name}</button>
            </div>
        )
    }
}

FilterButton.propTypes = propTypes;
FilterButton.defaultProps = defaultProps;