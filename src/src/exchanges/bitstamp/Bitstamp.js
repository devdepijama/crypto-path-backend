const BitstampHttp = require('./BitstampHttp')

module.exports = class Bitstamp {
    constructor(apiUrl) {
        this._httpApi = new BitstampHttp('https://www.bitstamp.net/api/v2')
    }

    getName() {
        return 'bitstamp'
    }

    async getMarkets() {
        return this._httpApi.getMarkets()
    }

    async getTicker(market) {
        return this._httpApi.getTicker(market)
    }
}