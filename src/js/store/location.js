import api from '../service/apiService'
import * as Instances from '../libs/materialize'
import { formatDate } from '../helpers/datehelper'

class Location {
	constructor(api, helpers) {

		this.api = api
		this.helpersDate = helpers.formatDate

		this.countries = null
		this.cities = null
		this.shortList = null
		this.airlines = null

	}

	async init() {

		const [countries, cities, airlines] = await Promise.all([
			this.api.countries(), 
			this.api.cities(), 
			this.api.airlines()
		])

		this.countries = this.serializeCountries(countries)
		this.cities = this.serializeCities(cities)

		this.shortList = this.createShortList(this.cities)
		this.airlines = this.serializeAirlines(airlines)

	}

	createShortList(cities) {
		return Object.entries(cities).reduce((acc, [cityCountry, val]) => {

			acc[val.full_name] = null
			return acc

		}, {})
	}

	serializeAirlines(airlines) {

		return airlines.reduce((acc, item) => {

			item.logo = `http://pics.avs.io/200/200/${item.code}.png`,
			item.name =  item.name || item.name_translations.en
			acc[item.code] = item

			return acc

		}, {})

	}

	getAirlinePropByCode(code, prop) {
		return this.airlines[code] ? this.airlines[code][prop] : ''
	}

	getCityNameByCode(code) {
		return this.cities[code].name
	}

	serializeCountries(countries) {

		// { 'CountryCode': {...} }
		return countries.reduce((acc, country) => {

			acc[country.code] = country
			return acc

		}, {})

	}

	getCodeByCityName(name) {
		const city = Object.values(this.cities).find(city => city.full_name === name)
		return city?.code
	}


	serializeCities(cities) {
		return cities.reduce((acc, city) => {

			const countryName = this.getCountryByCode(city.country_code)
			const full_name = `${city.name || city.name_translations.en},${countryName}`

			acc[city.code] = {
				...city,
				countryName,
				full_name
			}

			return acc

		}, {})
	}


	getCountryByCode(code) {
		return this.countries[code].name
	}




	async fetchTickets(params) {
		const response = await this.api.prices(params)
		
		const data = this.serializeTickets(response.data)

		this.searchTickets = data

	}

	serializeTickets(tickets) {
		return Object.values(tickets).map(ticket => {
			return {
				...ticket,
				name_from: this.getCityNameByCode(ticket.origin),
				name_to: this.getCityNameByCode(ticket.destination),
				airline_logo: this.getAirlinePropByCode(ticket.airline, 'logo'),
				airline_name: this.getAirlinePropByCode(ticket.airline, 'name'),
				departure_at: this.helpersDate(ticket.departure_at, 'dd MMM yyyy hh:mm'),
				return_at: this.helpersDate(ticket.return_at, 'dd MMM yyyy hh:mm'),

			}
		})
	}

}



const location = new Location(api, { formatDate })

export default location