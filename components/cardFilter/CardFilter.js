import React from 'react'
import FilterButton from '../filterButton/FilterButton'
import range from 'lodash/range'
import isEmpty from 'lodash/isEmpty'

export default class CardFilter extends React.Component {
    render() {
        return (
            <div className="mainCardContainer">
                    <div className="filters">Filters</div>
                    <div className="launchYear">Launch Year</div>
                    <div className="buttonContainer">
                        {range(2006,2021).map((val,index) => (
                            <FilterButton name={val.toString()} 
                                filterType="launch_year"
                                key={index}
                                handleClick={this.props.handleClick}
                                selectedFilters={this.props.filters}
                                isSelected={!isEmpty(this.props.filters) && !!this.props.filters.launch_year && 
                                    this.props.filters.launch_year === val.toString()} />
                        ))}
                    </div>
                    <div className="launchYear">Successful Launch</div>
                    <div className="buttonContainer">
                        {["True", "False"].map((val,index) => (
                            <FilterButton name={val}
                                key={index}
                                handleClick={this.props.handleClick} 
                                filterType="launch_success"
                                selectedFilters={this.props.filters}
                                isSelected={!isEmpty(this.props.filters) && !!this.props.filters.launch_success && 
                                    this.props.filters.launch_success === val} />
                        ))}
                    </div>
                    <div className="launchYear">Successful Landing</div>
                    <div className="buttonContainer">
                    {["True", "False"].map((val,index) => (
                            <FilterButton name={val}
                                key={index}
                                handleClick={this.props.handleClick} 
                                filterType="land_success"
                                selectedFilters={this.props.filters}
                                isSelected={!isEmpty(this.props.filters) && !!this.props.filters.land_success && 
                                    this.props.filters.land_success === val} />
                        ))}
                    </div>
                </div>
        )
    }
}