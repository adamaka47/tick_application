import currency from './currency'

class TicketUI {
	constructor(currency) {
		this.container = document.querySelector('.tickets-sections .row')
		this.currency = currency
	}


	renderTickets(tickets) {
		this.clearContainer()

		if (!tickets.length) {

			showEmptyMsg()
			return
		}		

		let fragment = ''

		const curSymbol = this.currency.currencySymbol

		tickets.forEach(ticket => {
			const readyTemplateHTML = TicketUI.ticketTemplate(ticket, curSymbol)
			fragment += readyTemplateHTML
		})

		this.container.insertAdjacentHTML('afterbegin', fragment)

	}

	clearContainer() {
		this.container.innerHTML = ''
	}

	showEmptyMsg() {
		const template = TicketUI.emptyMsgTemplate()
		this.container.insertAdjacentHTML('afterbegin', template)
	}

	static emptyMsgTemplate() {
		`<p>Билеты не найдены!</p>`
	}

	static ticketTemplate(ticket, currency) {
		return `
			<div class="col s12 m6">
			  <div class="card ticket-card">
			    <div class="ticket-airline d-flex align-items-center">
			      <img
			        src="${ticket.airline_logo}"
			        class="ticket-airline-img"
			        alt="airline_company"
			      />
			      <span class="ticket-airline-name"
			        >${ticket.airline_name}</span
			      >
			    </div>
			    <div class="ticket-destination d-flex align-items-center">
			      <div class="d-flex align-items-center mr-auto">
			        <span class="ticket-city">${ticket.name_from} </span>
			        <i class="medium material-icons">flight_takeoff</i>
			      </div>
			      <div class="d-flex align-items-center">
			        <i class="medium material-icons">flight_land</i>
			        <span class="ticket-city">${ticket.name_to}</span>
			      </div>
			    </div>
			    <div class="ticket-time-price d-flex align-items-center">
			      <span class="ticket-time-departure">${ticket.departure_at}</span>
			      <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
			    </div>
			    <div class="ticket-additional-info">
			      <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
			      <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
			    </div>
			  </div>
			</div>
		`
	}

}

const ticketUI = new TicketUI(currency)

export default ticketUI