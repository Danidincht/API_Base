jest.mock('express');
jest.mock('#routes', () => ({
		routes: [
			() => { mockRoutes(); }
		]
	})
);

import { startServer } from '../index';
import * as express from 'express';

const mockRoutes = jest.fn();

describe('startServer', () => {
	it('starts the server', () => {
		// Given - When
		startServer();

		// Then
		expect(express).toBeCalledTimes(1);
	});

	it('listens to the 3000 port', () => {
		// Given
		const expectedPort = '3000';
		process.env.PORT = expectedPort;
		
		// When
		startServer();

		// Then
		expect(express().listen).toBeCalledTimes(1);
		expect(express().listen).toBeCalledWith(
			expectedPort,
			expect.any(Function)
		);
	});

	it('adds all routes to server', () => {
		// Given - When
		startServer();

		// Then
		expect(mockRoutes).toBeCalledTimes(1);
	});
});