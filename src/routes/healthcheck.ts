import { type Express, text } from 'express';

const HEALTHCHECK_ENDPOINT = '/healthcheck';

export default function healthcheck(express: Express) {
	express.get(HEALTHCHECK_ENDPOINT, (request, response) => {
		response
			.status(200)
			.send('Server up and running');
	});

	express.post(HEALTHCHECK_ENDPOINT, text(), (request, response) => {
		response
			.status(200)
			.send('Server up and running, Mr/Ms: ' + request.body);
	});
}