module.exports = class Coinbase {
    constructor(apiUrl) {
        this._setup(apiUrl)
    }

    getName() {
        return 'coinbase'
    }

    async getMarkets() {
        return []
    }

    // Private method
    _setup(apiUrl) {

    }
}