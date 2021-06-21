const KrakenHttp = require('./KrakenHttp')
const Market = require('../../model/Market')

module.exports = class Kraken {
    constructor(apiUrl) {
        this.implementation = new KrakenHttp(apiUrl)
    }

    getName() {
        return 'Kraken'
    }

    async getMarkets() {
        return [
            new Market('BTC', 'EUR'),
            new Market('ETH', 'EUR'),
            new Market('LTC', 'EUR'),
            new Market('BCH', 'EUR'),
            new Market('XRP', 'EUR'),
            new Market('EOS', 'EUR'),
            new Market('DAI', 'EUR'),
            
            new Market('BTC', 'USD'),
            new Market('ETH', 'USD'),
            new Market('LTC', 'USD'),
            new Market('BCH', 'USD'),
            new Market('XRP', 'USD'),
            new Market('EOS', 'USD'),
            new Market('DAI', 'USD'),
        ]
    }

    async getTicker(market) {
        return this.implementation.getTicker(market)
    }

}