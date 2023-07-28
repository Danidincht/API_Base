jest.mock('express');

import { startServer } from '../index';
import { routes } from '#routes';
import * as express from 'express';

describe('startServer', () => {
	it('starts the server', () => {
		// Given - When
		startServer();

		// Then
		expect(express).toBeCalledTimes(1);
	});

	it('creates / (root) endpoint', () => {
		// Given - When
		startServer();

		// Then
		expect(express().get).toHaveBeenNthCalledWith(1,
			'/',
			expect.any(Function)
		);
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
		expect(express().get).toBeCalledTimes(routes.length + 1);
	});
});