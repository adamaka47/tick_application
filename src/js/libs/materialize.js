import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

const elems = document.querySelectorAll('select');
M.FormSelect.init(elems);

export function getSelectInstance($el) { 
	return M.FormSelect.getInstance($el)
}


// autocomplete init

const autoelems = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autoelems, {
	data: {
		"Apple": null,
        "Microsoft": null,
        "Google": 'https://placehold.it/250x250'
	}
});

export function getAutocompleteInstance($el) { 
	return M.Autocomplete.getInstance($el);
}


// datepicker init

const dateelems = document.querySelectorAll('.datepicker');
M.Datepicker.init(dateelems, {

	showClearBtn: true,
	format: 'yyyy-mm'

});


export function getDatepickerInstance($el) { 
	return M.Datepicker.getInstance($el);
}