const Market = require('../../model/Market')

module.exports = class BitcoinTrade {
    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    getName() {
        return 'bitcointrade'
    }

    getMarkets() {
        return [
            new Market('BTC', 'BRL'),
            new Market('ETH', 'BRL'),
            new Market('LTC', 'BRL'),
            new Market('BCH', 'BRL'),
            new Market('XRP', 'BRL'),
            new Market('EOS', 'BRL'),
            new Market('DAI', 'BRL'),
        ]
    }
}