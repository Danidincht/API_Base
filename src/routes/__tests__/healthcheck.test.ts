const mockGet = jest.fn();
jest.mock('express', () => {
	return () => ({
		get: mockGet
	});
});

import healthcheck from '../healthcheck';
import * as express from 'express';

describe('healthcheck route', () => {
	const responseMock = {
		status: jest.fn(() => responseMock),
		send: jest.fn()
	} as unknown as express.Response;

	it('sets response status code as 200', () => {
		// Given 
		const server = express();
		healthcheck(server);
		const routeFn = mockGet.mock.calls[0][1];

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
		const routeFn = mockGet.mock.calls[0][1];

		// When
		routeFn(null, responseMock);

		// Then
		expect(responseMock.send).toBeCalledTimes(1);
		expect(responseMock.send).toBeCalledWith('Server up and running');
	});
});