const {equalsIgnoreCase} = require('../utils/StringUtils')

module.exports = class Market {
    constructor(coinLeft, coinRight) {
        this.left = coinLeft
        this.right = coinRight
    }

    contains(coin) {
        return (this._coinEquals(coin, this.left) || this._coinEquals(coin, this.right))
    }

    getLeft() {
        return this.left
    }

    getRight() {
        return this.right
    }

    getOther(coin) {
        if (this._coinEquals(coin, this.left)) {
            return this.right
        } else if (this._coinEquals(coin, this.right)) {
            return this.left
        }

        throw Error(`Coin ${coin} does not belong to pair: ${this.toString()}`)
    }

    isEqual(market) {
        return ((market.getLeft() === this.getLeft()) && (market.getRight() === this.getRight())) || 
               ((market.getLeft() === this.getRight()) && (market.getRight() === this.getLeft()))
    }

    _coinEquals(coinA, coinB) {
        return equalsIgnoreCase(coinA, coinB)
    }

    toString() {
        return `${this.left}/${this.right}`
    }
}