/* global fetch */
import React from 'react'
import isEmpty from 'lodash/isEmpty'
import Card from '../card/Card'
import CardFilter from '../cardFilter/CardFilter'
import getRequestDetails from '../../helpers/RequestHelper'
import { parse } from '../../helpers/ResultsParser'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filters: props.filters,
      data: props.data,
      isLoading: false,
      isError: false
    }
    this.fetchData = this.fetchData.bind(this)
  }

  componentDidMount () {
    if (!isEmpty(this.props.filters)) {
      this.fetchData(this.props.filters)
    }
  }

  async onFilterChange (selectedFilters) {
    await this.fetchData(selectedFilters)
  }

  async fetchData (selectedFilters) {
    try {
      this.setState({
        isLoading: true
      })
      const res = await fetch(getRequestDetails(selectedFilters).endpoint)
      const result = await res.json()
      const data = parse(result)
      this.setState({
        data,
        filters: selectedFilters,
        isLoading: false
      })
    } catch (error) {
      this.setState({
        isError: true
      })
    }
  }

  render () {
    return (
      <div className='App'>
        <div className='title'>SpaceX Launch Programs</div>
        <div className='mainContainer'>
          <CardFilter filters={this.state.filters} handleClick={this.onFilterChange} />
          {this.state.isLoading && <div className='loader'>Loading...</div>}
          {!isEmpty(this.state.data) && !this.state.isLoading &&
            <div className='cardContainer'>
              {this.state.data.map((item, index) => (
                <Card key={index} cardProps={item} />
              ))}
            </div>}
        </div>
      </div>
    )
  }
}

export default App
