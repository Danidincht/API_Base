jest.mock('express');

import healthcheck from '../healthcheck';
import * as express from 'express';

describe('/healthcheck route', () => {
	const responseMock = {
			status: jest.fn(() => responseMock),
			send: jest.fn()
		} as unknown as express.Response,
		requestMock = {
			body: 'fakeBody'
		} as unknown as express.Request;
	

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
			const routeFn = (server.get as jest.Mock).mock.calls[0][1];

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
			const routeFn = (server.get as jest.Mock).mock.calls[0][1];

			// When
			routeFn(null, responseMock);

			// Then
			expect(responseMock.send).toBeCalledTimes(1);
			expect(responseMock.send).toBeCalledWith('Server up and running');
		});
	});

	describe('POST /healthcheck endpoint', () => {
		it('gets added to express routing', () => {
			// Given
			const server = express(),
				expectedBodyParser = 'bodyParser';
			(express.text as jest.Mock).mockReturnValue(expectedBodyParser);

			// When
			healthcheck(server);

			// Then
			expect(server.post).toBeCalledTimes(1);
			expect(server.post).toBeCalledWith(
				'/healthcheck',
				expectedBodyParser,
				expect.any(Function)
			);
		});

		it('treats request body as raw text', () => {
			// Given
			const server = express();

			// When
			healthcheck(server);

			// Then
			expect(express.text).toBeCalledTimes(1);
		});

		it('sets response status code as 200', () => {
			// Given 
			const server = express();
			healthcheck(server);
			const routeFn = (server.post as jest.Mock).mock.calls[0][2];

			// When
			routeFn(requestMock, responseMock);

			// Then
			expect(responseMock.status).toBeCalledTimes(1);
			expect(responseMock.status).toBeCalledWith(200);
		});

		it('sets response body successful', () => {
			// Given 
			const server = express();
			healthcheck(server);
			const routeFn = (server.post as jest.Mock).mock.calls[0][2];

			// When
			routeFn(requestMock, responseMock);

			// Then
			expect(responseMock.send).toBeCalledTimes(1);
			expect(responseMock.send).toBeCalledWith('Server up and running, Mr/Ms: ' + requestMock.body);
		});
	});
});