const { expect } = require('chai');
const Order = require('../lib/Order');
const Coffee = require('../lib/Coffee');
const data = require('./data.mock');
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

			order.add({ coffee });

			expect(order.items[0].name.includes('Regular')).to.be.true;
			expect(order.items.length).to.be.equal(1);
		});

		it('should callculate the price of a large coffee', () => {
			const coffee = new Coffee({
				name: 'foo',
				price: 3,
				canBeLarge: true
			});

			order.add({ coffee, isLarge: true });

			expect(order.items[0].name.includes('Large')).to.be.true;
			expect(order.items[0].price).to.be.equal(3 + config.largePrice);
		});

		it('should fail when you select large in a coffee that cannot be large', () => {
			const coffee = new Coffee({
				name: 'foo',
				price: 3,
				canBeLarge: false
			});

			expect(() => order.add({ coffee, isLarge: true })).to.throw(
				`${coffee.name} cannot be large`
			);
		});

		it('should callculate the price of a coffee with soy', () => {
			const coffee = new Coffee({
				name: 'foo',
				price: 3,
				canBeLarge: true
			});

			order.add({ coffee, isLarge: false, hasSoy: true });

			expect(order.items[0].name.includes('Soy')).to.be.true;
			expect(order.items[0].price).to.be.equal(3 + config.soyPrice);
		});

		it('should callculate the price of a large coffee with soy', () => {
			const coffee = new Coffee({
				name: 'foo',
				price: 3,
				canBeLarge: true
			});

			order.add({ coffee, isLarge: true, hasSoy: true });

			expect(order.items[0].name.includes('Soy')).to.be.true;
			expect(order.items[0].name.includes('Large')).to.be.true;
			expect(order.items[0].price).to.be.equal(
				3 + config.soyPrice + config.largePrice
			);
		});
	});

	describe('Total and GST', () => {
		let order;
		beforeEach(() => {
			order = new Order();
		});

		it('should return 0 without items', () => {
			expect(order.total()).to.equal(0);
			expect(order.gst()).to.equal(0);
		});

		it('should calculate total and gst for example 1', () => {
			order.add({ coffee: data.coffees.espresso });
			order.add({ coffee: data.coffees.cappuccino, isLarge: true });
			order.add({
				coffee: data.coffees.flatWhite,
				isLarge: false,
				hasSoy: true
			});
			order.add({ coffee: data.coffees.cappuccino });

			expect(order.total()).to.equal(14.5);
			expect(order.gst()).to.equal(1.45);
		});
	});

	describe('Vouchers', () => {
		let order;
		beforeEach(() => {
			order = new Order();
		});

		it('should calculate total and gst for example 2', () => {
			order.add({ coffee: data.coffees.cappuccino, isLarge: true });
			order.add({ coffee: data.coffees.flatWhite, hasSoy: true });

			order.addVoucher(data.vouchers.discountVoucher);

			expect(order.total()).to.equal(7.2);
			expect(order.gst()).to.equal(0.72);
		});

		it('should calculate total and gst for example 3', () => {
			order.add({ coffee: data.coffees.cappuccino, isLarge: true });
			order.add({ coffee: data.coffees.flatWhite });

			order.addVoucher(data.vouchers.oneFreeVoucher);

			expect(order.total()).to.equal(4);
			expect(order.gst()).to.equal(0.4);
		});
	});
});
