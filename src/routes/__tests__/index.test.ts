import { routes } from '#routes';
import healthcheck from '../healthcheck';

describe('routes', () => {
	it('includes healthcheck route', () => {
		// Given - When - Then
		expect(routes.includes(healthcheck)).toBe(true);
	});
});