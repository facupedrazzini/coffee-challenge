const { expect } = require('chai');
const Order = require('../lib/Order');
const Coffee = require('../lib/Coffee');
const coffees = require('../data/coffees.json');
const config = require('../lib/config.json');

describe('Order', () => {
	it('should create an order with an empty list of items', () => {
		const order = new Order();

		expect(order.items.length).to.be.equal(0);
	});

	describe('Add', () => {
		let order;
		beforeEach(() => {
			order = new Order();
		});

		it('should add a coffee', () => {
			const coffee = new Coffee({
				name: 'foo',
				price: 3,
				canBeLarge: true
			});

			order.add(coffee);

			expect(order.items[0].name.includes('Regular')).to.be.true;
			expect(order.items.length).to.be.equal(1);
		});

		it('should callculate the price of a large coffee', () => {
			const coffee = new Coffee({
				name: 'foo',
				price: 3,
				canBeLarge: true
			});

			order.add(coffee, true);

			expect(order.items[0].name.includes('Large')).to.be.true;
			expect(order.items[0].price).to.be.equal(3 + config.largePrice);
		});

		it('should fail when you select large in a coffee that cannot be large', () => {
			const coffee = new Coffee({
				name: 'foo',
				price: 3,
				canBeLarge: false
			});

			expect(() => order.add(coffee, true)).to.throw(
				`${coffee.name} cannot be large`
			);
		});

		it('should callculate the price of a coffee with soy', () => {
			const coffee = new Coffee({
				name: 'foo',
				price: 3,
				canBeLarge: true
			});

			order.add(coffee, false, true);

			expect(order.items[0].name.includes('Soy')).to.be.true;
			expect(order.items[0].price).to.be.equal(3 + config.soyPrice);
		});

		it('should callculate the price of a large coffee with soy', () => {
			const coffee = new Coffee({
				name: 'foo',
				price: 3,
				canBeLarge: true
			});

			order.add(coffee, true, true);

			expect(order.items[0].name.includes('Soy')).to.be.true;
			expect(order.items[0].name.includes('Large')).to.be.true;
			expect(order.items[0].price).to.be.equal(
				3 + config.soyPrice + config.largePrice
			);
		});
	});
});
