import { startServer } from '../index';
import { routes } from '#routes';

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
		expect(mockGet).toHaveBeenNthCalledWith(1,
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
		expect(mockListen).toBeCalledTimes(1);
		expect(mockListen).toBeCalledWith(
			expectedPort,
			expect.any(Function)
		);
	});

	it('adds all routes to server', () => {
		// Given - When
		startServer();

		// Then
		expect(mockGet).toBeCalledTimes(routes.length + 1);
	});
});