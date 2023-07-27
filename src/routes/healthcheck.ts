import type { Express } from 'express';

export default function healthcheck(express: Express) {
	express.get('/healthcheck', (request, response) => {
		response
			.status(200)
			.send('Server up and running');
	});
}