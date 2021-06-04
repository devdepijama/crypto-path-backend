const axios = require('axios')

module.exports = class BitcointradeHttp {
    constructor(apiUrl) {
        this.apiUrl = apiUrl        
    }

    async getTicker(market) {
        const pair = market.getLeft().toUpperCase() + market.getRight().toUpperCase()
        const url = `${this.apiUrl}/public/${pair}/ticker`
        console.log("Requesting", url)
        return axios.get(url)
                    .then(response => response.data.data.last)
    }
}