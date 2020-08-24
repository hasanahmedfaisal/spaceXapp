import App from '../app/App'
import renderer from 'react-test-renderer'

describe('App',() => {
    it('should render correctly',() => {
        const appProps = {
            data:[{
             mission_name:'some mission name',
             flight_number: 'some flight name', 
             launch_year: 'some launch year', 
             launch_success: true, 
             land_success: true, 
             mission_patch_small: 'some url', 
             mission_id: ['123']
            }],
            filters: {
                "launch_year": '2010'
            }
        }
        const tree = renderer.create(<App {...appProps}/>).toJSON()
        expect(tree).toMatchSnapshot()
    }) 
})