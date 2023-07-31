const mockGet = jest.fn();
const mockPost = jest.fn();
const mockListen = jest.fn();
const mockText = jest.fn(() => ({}));

const express = jest.fn(() => ({
		get: mockGet,
		post: mockPost,
		listen: mockListen,
	})
);
express.text = mockText;

module.exports = express;