const Foxbit = require('./foxbit/Foxbit')
const BitcoinTrade = require('./bitcointrade/BitcoinTrade')
const Bitstamp = require('./bitstamp/Bitstamp')
const Coinbase = require('./coinbase/Coinbase')
const Kraken = require('./kraken/Kraken')

module.exports = class ExchangeFactory {

    constructor() {
        this.exchangesMap = this._buildExchangeMap()
    }

    getByName(exchangeName) {
        return this.exchangesMap.get(exchangeName)
    }

    getAll() {
        return Array.from(this.exchangesMap.values())
    }

    // Private method
    _buildExchangeMap() {
        const exchanges = [
            //new Foxbit('wss://api.foxbit.com.br'),
            new BitcoinTrade('https://api.bitcointrade.com.br/v3'),
            new Bitstamp('wss://ws.bitstamp.net'),
            new Coinbase('https://api.coinbase.com/v2'),
            new Kraken('https://api.kraken.com/0')
        ]

        const result = exchanges.reduce((map, item) => {
            map[item.getName()] = item
            return map
        }, {})

        return new Map(Object.entries(result))
    }
}