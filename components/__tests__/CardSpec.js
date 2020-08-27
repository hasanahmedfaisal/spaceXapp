import Card from '../card/Card'
import renderer from 'react-test-renderer'

describe('Card Filter', () => {
  it('should render correctly', () => {
    const cardProps = {
      cardProps: {
        mission_name: 'some mission name',
        flight_number: 'some flight name',
        launch_year: 'some launch year',
        launch_success: true,
        land_success: true,
        mission_patch_small: 'some url',
        mission_id: ['123']
      }
    }
    const tree = renderer.create(<Card {...cardProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
