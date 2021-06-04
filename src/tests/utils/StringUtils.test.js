const {equalsIgnoreCase} = require('../../src/utils/StringUtils')

test('Should compare two strings ignoring case', () => {
    expect(equalsIgnoreCase('BTC', 'btc')).toBe(true)
})