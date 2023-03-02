const SERVER_HOST = 'https://server.dev.nordlys.space'
// const SERVER_HOST = 'http://127.0.0.1:8000'
const API_VERSION = 'v1'
const API_URL = `/api/${API_VERSION}`
const API_URI = SERVER_HOST + API_URL

const URLS = {
	contacts: {
		api_uri: `${API_URI}/contacts/api/v1`
	},
	request_call: {
		api_uri: `${API_URI}/request-calls/api/v1`
	}
}

const SITE_TYPE_DB_ID = 1


function setPopovers() {
	const popoverTriggerList = document.querySelectorAll(
		'[data-bs-toggle="popover"]'
	);
	return [...popoverTriggerList].map(
		(popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
	);
}


async function getSiteTypes() {
	const url = `${API_URI}/price-calculation/rows/${SITE_TYPE_DB_ID}/`;
	return await fetch(url);
}