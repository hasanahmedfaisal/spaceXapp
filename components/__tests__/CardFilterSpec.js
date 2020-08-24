import CardFilter from '../cardFilter/CardFilter'
import renderer from 'react-test-renderer'

describe('Card Filter',() => {
    it('should render correctly',() => {
        const cardFilterProps = {
            filters: {
                "launch_year": '2010'
            }
        }
        const tree = renderer.create(<CardFilter {...cardFilterProps}/>).toJSON()
        expect(tree).toMatchSnapshot()
    }) 
})