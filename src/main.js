const express = require('express')
const QuotationService = require('./model/quotation/QuotationService')
const ExchangeFactory = require('./exchanges/ExchangeFactory')

var app = express()
const quotationService = new QuotationService(new ExchangeFactory())

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/fiat/:coinFrom/:coinTo", (request, response) => {
    const coinFrom = request.params.coinFrom
    const coinTo = request.params.coinTo

    quotationService.getQuotation(coinFrom, coinTo)
                    .then(paths => {
                        response.send(
                            paths.sort((a, b) => a.quotation.compare(b.quotation))
                        )
                    })
});