const WebSocket = require('ws');

module.exports = class Foxbit {
    constructor(apiUrl) {
        this.state = {
            markets: {}
        }
        this._setup(apiUrl);
    }

    getName() {
        return 'foxbit'
    }

    getMarkets() {
        return this.state.markets
    }

    getProducts() {
        this._sendRequest("GetProducts", {OMSId: 1}, 1)
    }

    getInstruments() {
        this._sendRequest("GetInstruments", {OMSId: 1}, 1)
    }

    // Private stuff
    _sendRequest(endpoint, payload) {
        this._send(endpoint, payload, 0, 1)
    }

    _sendReply(endpoint, payload) {
        this._send(endpoint, payload, 1, 1)
    }

    _send(endpoint, payload, type, sequenceNumber) {
        this.ws.send(
            JSON.stringify({
                m: type,
                i: sequenceNumber,
                n: endpoint,
                o: JSON.stringify(payload)
            })
        )
    }

    _setup(apiUrl) {
        const ws = new WebSocket(apiUrl)

        console.log("Setting up websocket connection to Foxbit Exchange")
        ws.on('close', () => console.log("Just disconnected from", apiUrl))
        ws.on('error', (error) => console.log("Just received an error from Foxbit:", JSON.stringify(error)))
        ws.on('message', (data) => {
            console.log("Just received the following from Foxbit:", data)
        })
        ws.on('open', () => {
            this.getInstruments()
            console.log("Just connected to", apiUrl)
        })

        this.ws = ws
    }
}