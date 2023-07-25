const mockExpress = jest.fn();
const mockGet = jest.fn();
const mockListen = jest.fn();
jest.mock('express', () => {
	return () => {
		mockExpress();
		return {
			get: mockGet,
			listen: mockListen
		};
	};
});

import { startServer } from '../index';

describe('startServer', () => {
	it('starts the server', () => {
		// Given - When
		startServer();

		// Then
		expect(mockExpress).toBeCalledTimes(1);
	});

	it('creates / (root) endpoint', () => {
		// Given - When
		startServer();

		// Then
		expect(mockGet).toBeCalledTimes(1);
		expect(mockGet).toBeCalledWith(
			'/',
			expect.any(Function)
		);
	});

	it('listens to the 3000 port', () => {
		// Given - When
		startServer();

		// Then
		expect(mockListen).toBeCalledTimes(1);
		expect(mockListen).toBeCalledWith(
			3000,
			expect.any(Function)
		);
	});
});