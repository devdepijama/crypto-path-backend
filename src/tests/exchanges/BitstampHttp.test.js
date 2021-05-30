const BitstampHttp = require('../../src/exchanges/bitstamp/BitstampHttp')

const instance = new BitstampHttp('https://www.bitstamp.net/api/v2')


test('Should return the list of available markets', () => {
    const markets = instance.getMarkets().then(response => {
        expect(response).toBeDefined()
        expect(response.length).not.toBe(0)
    })
})