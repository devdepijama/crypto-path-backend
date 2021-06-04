const BitstampHttp = require('../../src/exchanges/bitstamp/BitstampHttp')
const Market = require('../../src/model/Market')

const instance = new BitstampHttp('https://www.bitstamp.net/api/v2')

test('Should return the list of available markets', () => {
    const markets = instance.getMarkets().then(response => {
        expect(response).toBeDefined()
        expect(response.length).not.toBe(0)
    })
})

test('Should get the ticker for btcusd market', () => {
    instance.getTicker(new Market("BTC", "USD")).then(response => {
        expect(response).toBeDefined()
        expect(response > 0).toBe(true)
    })
})