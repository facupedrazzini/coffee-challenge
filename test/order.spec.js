const assert = require('chai').assert;
const Order = require('../lib/Order');

describe('Order', () => {
	it('should create an order with an empty list of items', () => {
		const order = new Order();

		assert.equal(order.items.length, 0);
	});
});
