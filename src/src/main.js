const ExchangeFactory = require('./exchanges/ExchangeFactory')

const exchanges = new ExchangeFactory()
const foxbit = exchanges.getByName('foxbit')