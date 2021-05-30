const Market = require('../../model/Market')
const axios = require('axios')

module.exports = class BitstampHttp {
    constructor(apiUrl) {
        this.apiUrl = apiUrl
    }

    async getMarkets() {
        function _parseResponse(response) {
            if (response.data === undefined) {
                throw new Error("Response does not contain any relevant data")
            }

            return response.data.map(entries => {
                const coins = entries.name.split("/")
                return new Market(coins[0], coins[1])
            })
        }

        return axios.get(this.apiUrl + '/trading-pairs-info')
                    .then(response => _parseResponse(response))
    }
}