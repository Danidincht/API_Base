import * as express from 'express';

export function startServer() : void {
	const server = express();
	const port = 3000;

	server.get('/', (request, response) => {
		response.send('Hello world');
	});

	server.listen(port, () => {
		console.log(`Example app listenning on port ${port}`);
	});
}