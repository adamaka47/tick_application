import { getAutocompleteInstance, getDatepickerInstance } from '../libs/materialize'


class FormUI {
	constructor(autoinstance, pickerinstance) {

		this._form = document.forms['card-form']

		this.autofrom = document.getElementById('autocomplete-from')
		this.autoto = document.getElementById('autocomplete-to')

		this.datefrom = document.getElementById('datepick-from')
		this.dateto = document.getElementById('datepick-to')

		this.autofromInstance = autoinstance(this.autofrom)
		this.autotoInstance = autoinstance(this.autoto)

		this.datefromInstance = pickerinstance(this.datefrom)
		this.datetoInstance = pickerinstance(this.dateto)

	}

	get form() {
		return this._form
	}	

	setAutoCompleteData(data) {
		this.autofromInstance.updateData(data)
		this.autotoInstance.updateData(data)
	}

	get fromValue() {
		return this.autofrom.value
	}

	get toValue() {
		return this.autoto.value
	}

	get fromdateValue() {
		return this.datefromInstance.toString()
	}

	get todateValue() {
		return this.datetoInstance.toString()
	}


}


const formUi = new FormUI(getAutocompleteInstance, getDatepickerInstance)

export default formUi