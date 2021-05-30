const BitstampHttp = require('./BitstampHttp')

module.exports = class Bitstamp {
    constructor(apiUrl) {
        this._httpApi = new BitstampHttp('https://www.bitstamp.net/api/v2/trading-pairs-info')
    }

    getName() {
        return 'bitstamp'
    }

    getMarkets() {

    }
}