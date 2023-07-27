jest.mock('express', () => {
	return () => mockExpress;
});

import healthcheck from '../healthcheck';
import * as express from 'express';

const mockExpress = {
	get: jest.fn()
};

describe('/healthcheck route', () => {
	const responseMock = {
		status: jest.fn(() => responseMock),
		send: jest.fn()
	} as unknown as express.Response;

	describe('GET /healthcheck endpoint', () => {
		it('gets added to express routing', () => {
			// Given
			const server = express();

			// When
			healthcheck(server);

			// Then
			expect(server.get).toBeCalledTimes(1);
			expect(server.get).toBeCalledWith(
				'/healthcheck',
				expect.any(Function)
			);
		});

		it('sets response status code as 200', () => {
			// Given 
			const server = express();
			healthcheck(server);
			const routeFn = mockExpress.get.mock.calls[0][1];

			// When
			routeFn(null, responseMock);

			// Then
			expect(responseMock.status).toBeCalledTimes(1);
			expect(responseMock.status).toBeCalledWith(200);
		});

		it('sets response body successful', () => {
			// Given 
			const server = express();
			healthcheck(server);
			const routeFn = mockExpress.get.mock.calls[0][1];

			// When
			routeFn(null, responseMock);

			// Then
			expect(responseMock.send).toBeCalledTimes(1);
			expect(responseMock.send).toBeCalledWith('Server up and running');
		});
	});
});