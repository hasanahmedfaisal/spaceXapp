import FilterButton from '../filterButton/FilterButton'
import renderer from 'react-test-renderer'

describe('Filter Button',() => {
    const { history } = window;

  beforeAll(() => {
    delete window.history;
    window.history = { pushState: jest.fn() };
  });

  beforeEach(() => {
      jest.clearAllMocks()
  })

  afterAll(() => {
    window.history = history;
  });

    it('should render correctly',() => {
        const filterButtonProps = {
            handleClick: jest.fn(),
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
            handleClick: jest.fn(),
            name: '2006',
            filterType: 'launch_year',
            isSelected: true,
            selectedFilters: {}
        }
        const root = renderer.create(<FilterButton {...filterButtonProps}/>).root
        root.findByType("button").props.onClick()
        expect(filterButtonProps.handleClick).toHaveBeenCalledWith({"launch_year": "2006"})
        expect(window.history.pushState).toHaveBeenCalledWith({}, "", "filters?launch_year=2006")
    }) 

    it('should handle onClick with no filter when selected filter and on click filter is equal',() => {
        const filterButtonProps = {
            handleClick: jest.fn(),
            name: '2006',
            filterType: 'launch_year',
            isSelected: true,
            selectedFilters: {
                launch_year: '2006'
            }
        }
        const root = renderer.create(<FilterButton {...filterButtonProps}/>).root
        root.findByType("button").props.onClick()
        expect(window.history.pushState).toHaveBeenCalledWith({}, "", "/")
    }) 

    it('should handle onClick with all filters when selected filter and on click filter is not equal',() => {
        const filterButtonProps = {
            handleClick: jest.fn(),
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
        expect(window.history.pushState).toHaveBeenCalledWith({}, "", "filters?launch_success=True&land_success=True&launch_year=2006")
    }) 
})