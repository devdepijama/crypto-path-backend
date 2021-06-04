const Market = require('../../src/model/Market')

test('Should check that a coin belongs to a market', () => {
    const market = new Market('BTC', 'BRL')
    expect(market.contains('BTC')).toBe(true)
    expect(market.contains('btc')).toBe(true)
    expect(market.contains('BRL')).toBe(true)
    expect(market.contains('brl')).toBe(true)
})