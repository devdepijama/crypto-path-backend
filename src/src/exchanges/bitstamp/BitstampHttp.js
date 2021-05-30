const Market = require('../../model/Market')

module.exports = class BitstampHttp {
    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    getMarkets() {
        return [
            new Market('BTC', 'EUR'),
            new Market('BTC', 'USD')
        ]
    }

    // Private
    _get(path, headers) {

    }
}