const assert = require('chai').assert;
const Coffee = require('../lib/Coffee');

describe('Coffee', () => {
	it('should create a coffee with the given parameters', () => {
		const coffee = new Coffee({
			name: 'fooCoffee',
			price: 5,
			canBeLarge: true
		});

		assert.equal(coffee.name, 'fooCoffee');
		assert.equal(coffee.price, 5);
		assert.equal(coffee.canBeLarge, true);
	});
});
