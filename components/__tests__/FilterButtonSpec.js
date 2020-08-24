import FilterButton from '../filterButton/FilterButton'
import renderer from 'react-test-renderer'

describe('Filter Button',() => {
    const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { assign: jest.fn() };
  });

  afterEach(() => {
      jest.clearAllMocks()
  })

  afterAll(() => {
    window.location = location;
  });

    it('should render correctly',() => {
        const filterButtonProps = {
            name: '2006',
            filterType: 'launch_year',
            isSelected: true,
            selectedFilters: {
                "launch_year": '2010'
            }
        }
        const tree = renderer.create(<FilterButton {...filterButtonProps}/>).toJSON()
        expect(tree).toMatchSnapshot()
    }) 

   it('should handle onClick with the filter type when selected filters is empty',() => {
        const filterButtonProps = {
            name: '2006',
            filterType: 'launch_year',
            isSelected: true,
            selectedFilters: {}
        }
        const root = renderer.create(<FilterButton {...filterButtonProps}/>).root
        root.findByType("button").props.onClick()
        expect(window.location.assign).toHaveBeenCalledWith('filters?launch_year=2006')
    }) 

    it('should handle onClick with no filter when selected filter and on click filter is equal',() => {
        const filterButtonProps = {
            name: '2006',
            filterType: 'launch_year',
            isSelected: true,
            selectedFilters: {
                launch_year: '2006'
            }
        }
        const root = renderer.create(<FilterButton {...filterButtonProps}/>).root
        root.findByType("button").props.onClick()
        expect(window.location.assign).toHaveBeenCalledWith('/')
    }) 

    it('should handle onClick with all filters when selected filter and on click filter is not equal',() => {
        const filterButtonProps = {
            name: '2006',
            filterType: 'launch_year',
            isSelected: true,
            selectedFilters: {
                launch_success: 'True',
                land_success: 'True'
            }
        }
        const root = renderer.create(<FilterButton {...filterButtonProps}/>).root
        root.findByType("button").props.onClick()
        expect(window.location.assign).toHaveBeenCalledWith('filters?launch_success=True&land_success=True&launch_year=2006')
    }) 
})