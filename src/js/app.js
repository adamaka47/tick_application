import '../css/style.css'
import './libs'
import location from './store/location'
import formUI from './view/form'
import currency from './view/currency'
import ticketUI from './view/ticket'


document.addEventListener('DOMContentLoaded', () => {

	initApp()


	const form = formUI.form

	form.addEventListener('submit', e => {
		e.preventDefault()

		onFormSubmit()

	})

	async function initApp() {

		await location.init()
		formUI.setAutoCompleteData(location.shortList)

	}


	async function onFormSubmit() {


		const origin = formUI.fromValue

		const destination = formUI.toValue

		const depart_date = formUI.fromdateValue
		const return_date = formUI.todateValue


		if (origin.trim() && destination.trim() && depart_date.trim() && return_date.trim()) {

			await location.fetchTickets({
				origin: location.getCodeByCityName(origin),
				destination: location.getCodeByCityName(destination),
				depart_date,
				return_date,
				currency: currency.currencyValue
			})

			ticketUI.renderTickets(location.searchTickets)


		}

	}

})