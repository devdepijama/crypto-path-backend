const axios = require('axios')

module.exports = class KrakenHttp {
    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    async getTicker(market) {
        const marketString = this._marketToString(market)
        const url = `${this.apiUrl}/public/Ticker?pair=${marketString}`
        console.log("Requesting", url)
        return axios.get(url)
                    .then(response => {
                        const data = response.data.result
                        const firstField = Object.keys(data)[0]
                        const lastTickerValue = data[firstField].c[0]
                        
                        return parseFloat(lastTickerValue)
                    })
    }

    _marketToString(market) {
        return market.getLeft().toUpperCase() + market.getRight().toUpperCase()
    }
}