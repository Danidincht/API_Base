const mockGet = jest.fn();
const mockPost = jest.fn();
const mockListen = jest.fn();

module.exports = jest.fn(() => ({
		get: mockGet,
		post: mockPost,
		listen: mockListen
	})
);