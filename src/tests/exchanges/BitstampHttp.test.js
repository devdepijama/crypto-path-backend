const BitstampHttp = require('../../src/exchanges/bitstamp/BitstampHttp')

const instance = new BitstampHttp('https://www.bitstamp.net/api/v2/trading-pairs-info')


test('Should return the list of available markets', () => {
    const markets = instance.getMarkets()
    expect(markets).toBeDefined()
    expect(markets.length).not.toBe(0)
})