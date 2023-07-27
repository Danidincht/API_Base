import * as express from 'express';
import { routes } from '#routes';

export function startServer() : void {
	const server = express();
	const port = process.env.PORT;

	server.get('/', (request, response) => {
		response.send('Hello world');
	});
	
	routes.forEach(route => {
		route(server);
	});

	server.listen(port, () => {
		console.log(`Example app listenning on port ${port}`);
	});
}