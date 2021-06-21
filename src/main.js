const express = require('express')
const QuotationService = require('./model/quotation/QuotationService')
const ExchangeFactory = require('./exchanges/ExchangeFactory')

const app = express()
const quotationService = new QuotationService(new ExchangeFactory())

const port = 3001
app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});

app.get("/fiat/:coinFrom/:coinTo", (request, response) => {
    const coinFrom = request.params.coinFrom
    const coinTo = request.params.coinTo

    quotationService.getQuotation(coinFrom, coinTo)
                    .then(paths => {
                        response.send(
                            paths.sort((a, b) => a.quotation - b.quotation)
                        )
                    })
});