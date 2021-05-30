const Foxbit = require('./foxbit/Foxbit')
const BitcoinTrade = require('./bitcointrade/BitcoinTrade')
const Bitstamp = require('./bitstamp/Bitstamp')
const Coinbase = require('./coinbase/Coinbase')

module.exports = class ExchangeFactory {

    constructor() {
        this.exchangesMap = this._buildExchangeMap()
    }

    getByName(exchangeName) {
        console.log("Exchange map: ", JSON.stringify(this.exchangesMap))
        return this.exchangesMap[exchangeName]
    }

    // Private method
    _buildExchangeMap() {
        const exchanges = [
            new Foxbit('wss://api.foxbit.com.br'),
            new BitcoinTrade('https://api.bitcointrade.com.br/v3'),
            new Bitstamp('wss://ws.bitstamp.net'),
            new Coinbase('https://api.coinbase.com/v2')
        ]

        return exchanges.reduce((map, item) => {
            map[item.getName()] = item
            return map
        }, {})
    }
}