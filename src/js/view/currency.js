class Currency {

	constructor() {
		this.currency = document.getElementById('currency')
		this.dict = {
			USD: '$',
			EUR: '€'
		}
	}

	get currencyValue() {
		return this.currency.value
	}

	get currencySymbol() {
		return this.dict[this.currencyValue]
	}

}


const currency = new Currency()

export default currency