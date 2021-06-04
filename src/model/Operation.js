module.exports = class Operation {
    constructor(exchange, market) {
        this.exchange = exchange
        this.market = market
    }

    getExchange() {
        return this.exchange
    }

    getMarket() {
        return this.market
    }

    toString() {
        return JSON.stringify(this)
    }
}