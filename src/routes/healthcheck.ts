import { type Express, text } from 'express';

const HEALTHCHECK_ROUTE = '/healthcheck';

export default function healthcheck(express: Express) {
	express.get(HEALTHCHECK_ROUTE, (request, response) => {
		response
			.status(200)
			.send('Server up and running');
	});

	express.post(HEALTHCHECK_ROUTE, text(), (request, response) => {
		response
			.status(200)
			.send('Server up and running, Mr/Ms: ' + request.body);
	});
}