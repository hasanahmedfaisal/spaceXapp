import { jsonToQueryString } from '../QueryStringHelper'

describe('Query String Helper', () => {
    it('should return query based on given json',() => {
        const contract = {
            'first_key': '1',
            'second_key': '2',
            'third_key': '3',
        }
        expect(jsonToQueryString(contract)).toBe("first_key=1&second_key=2&third_key=3")
    }) 
})