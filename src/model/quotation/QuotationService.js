const Market = require('../Market')
const Operation = require('../Operation')
const CryptoPath = require('../CryptoPath')

module.exports = class QuotationService {

    constructor(exchangeFactory) {
        this.exchangeFactory = exchangeFactory
        this._fetchExchangeInfo(this.exchangeFactory.getAll())
            .then(result => {
                this.exchangesByCoin = result.exchangesByCoin
                this.marketsByExchange = result.marketsByExchange
            })
    }

    async getQuotation(coinOrigin, coinTarget) {
        return Promise.all(
            this._buildPaths(coinOrigin, coinTarget)
                   .map(cryptoPath => this._getQuotationFromPath(cryptoPath)
                                          .then(quotation => {
                                             console.log(`${JSON.stringify(cryptoPath)} -> ${quotation}`)
                                             return {
                                                 "path" : cryptoPath,
                                                 "quotation" : quotation
                                             }
                                          })
                    )
        )
    }

    _buildPaths(coinOrigin, coinTarget) {
        const exchangesWithOrigin = this.exchangesByCoin.get(coinOrigin)
        const exchangesWithTarget = this.exchangesByCoin.get(coinTarget)

        var results = []
        for(let exchangeOrigin of exchangesWithOrigin) {
            for(let exchangeTarget of exchangesWithTarget) {
                const marketsOrigin = this._getMarketsWithCoin(exchangeOrigin, coinOrigin)
                const marketsTarget = this._getMarketsWithCoin(exchangeTarget, coinTarget)

                const pathCoinsOrigin = marketsOrigin.map(market => market.getOther(coinOrigin))
                const pathCoinsTarget = marketsTarget.map(market => market.getOther(coinTarget))

                const intersection = this._getCommonItems(pathCoinsOrigin, pathCoinsTarget)
                results = [...results, ...this._getCryptoPaths(exchangeOrigin, coinOrigin, exchangeTarget, coinTarget, intersection)]
            }
        }

        return results
    }

    async _getQuotationFromPath(path) {
        const [originTicker, targetTicker] = await Promise.all(
            path.getOperations()
                .map(operation => this._getTickerQuotation(operation))
        )

        return targetTicker / originTicker
    }

    _getTickerQuotation(operation) {
        const exchange = this.exchangeFactory.getByName(operation.getExchange())
        return exchange.getTicker(operation.getMarket())
    }

    _getCryptoPaths(exchangeOrigin, coinOrigin, exchangeTarget, coinTarget, commonCoins) {
        return commonCoins.map(transportCoin => new CryptoPath(
            [
                new Operation(exchangeOrigin, this._getUnflippedMarket(exchangeOrigin, new Market(coinOrigin, transportCoin))),
                new Operation(exchangeTarget, this._getUnflippedMarket(exchangeTarget, new Market(coinTarget, transportCoin)))
            ]
        ))
    }

    _getUnflippedMarket(exchange, market) {
        return this.marketsByExchange.get(exchange)
                                     .find(entry => market.isEqual(entry))
    }

    _getCommonItems(listA, listB) {
        return listA.filter(entry => (listB.indexOf(entry) != -1))
    }

    _getMarketsWithCoin(exchangeName, coin) {
        return this.marketsByExchange.get(exchangeName)
                                     .filter(market => market.contains(coin))
    }

    async _fetchExchangeInfo(exchanges) {
        const exchangesByCoin = new Map()
        const marketsByExchange = new Map()

        for(let exchange of exchanges) {
            const markets = await exchange.getMarkets()
            marketsByExchange.set(exchange.getName(), markets)
            for(let market of markets) {
                const coins = [market.getLeft(), market.getRight()]
                for(let coin of coins) {
                    const values = exchangesByCoin.has(coin) ? exchangesByCoin.get(coin) : new Set()
                    values.add(exchange.getName())
                    exchangesByCoin.set(coin, values)
                }
            }
        }

        return {
            "exchangesByCoin": exchangesByCoin,
            "marketsByExchange": marketsByExchange
        }
    }
}