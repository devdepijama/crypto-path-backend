const Market = require('../../model/Market')
const BitcointradeHttp = require('./BitcoinTradeHttp')

module.exports = class BitcoinTrade {
    constructor(apiUrl) {
        this._httpApi = new BitcointradeHttp(apiUrl)
    }

    getName() {
        return 'bitcointrade'
    }

    async getMarkets() {
        return [
            new Market('BRL', 'BTC'),
            new Market('BRL', 'ETH'),
            new Market('BRL', 'LTC'),
            new Market('BRL', 'BCH'),
            new Market('BRL', 'XRP'),
            new Market('BRL', 'EOS'),
            new Market('BRL', 'DAI'),
        ]
    }

    async getTicker(market) {
        return this._httpApi.getTicker(market)
    }
}