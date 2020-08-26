import App from '../app/App'
import renderer from 'react-test-renderer'
import * as ResultsParser from '../../helpers/ResultsParser'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve('api returned value'),
  })
);

describe('App',() => {
    let appProps
    const filters = {
        "launch_year": '2020'
    }
    beforeEach(() => {
        appProps = {
            data:[{
             mission_name:'some mission name',
             flight_number: 'some flight name', 
             launch_year: 'some launch year', 
             launch_success: true, 
             land_success: true, 
             mission_patch_small: 'some url', 
             mission_id: ['123']
            }],
            filters: {}
        }
        fetch.mockClear();
      });

    it('should render correctly when no filters are present',() => { 
        const tree = renderer.create(<App {...appProps}/>).toJSON()
        expect(tree).toMatchSnapshot()
    }) 

    it('should render correctly when filters are present',() => {
        appProps.filters ={
            "launch_year": '2010'
        }
        const tree = renderer.create(<App {...appProps}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
    
    it('should set data fetched in the state',async ()=> {
        const data = [{ 'some key': 'some val' }]
        ResultsParser.parse = jest.fn(() => data)
          const tree = renderer.create(<App {...appProps}/>).root
          await tree.instance.fetchData(filters)
          expect(ResultsParser.parse).toHaveBeenCalledWith('api returned value')
          expect(tree.instance.state.isLoading).toBeFalsy()
          expect(tree.instance.state.filters).toEqual(filters)
          expect(tree.instance.state.data).toEqual(data)
    })

    it('should call fetch data when onFilterChange is called',() => {
        const tree = renderer.create(<App {...appProps}/>).root
        tree.instance.fetchData = jest.fn()
        tree.instance.onFilterChange(filters)
        expect(tree.instance.fetchData).toHaveBeenCalledWith(filterssta)
    })
})