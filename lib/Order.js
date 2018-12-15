const { gstPercent } = require('./config.json');

class Order {
	constructor() {
		this.items = [];
	}

	addVoucher(voucher) {
		this.voucher = voucher;
	}

	add({ coffee, isLarge = false, hasSoy = false }) {
		if (!coffee.canBeLarge && isLarge)
			throw new Error(`${coffee.name} cannot be large`);

		const coffeeItem = { ...coffee };

		coffeeItem.name = `${isLarge ? 'Large' : 'Regular'} ${
			hasSoy ? 'Soy ' : ''
		}${coffee.name}`;

		coffeeItem.price += (isLarge ? 0.5 : 0) + (hasSoy ? 0.5 : 0);

		this.items.push(coffeeItem);
	}

	total() {
		if (this.items.length && this.voucher)
			return this.voucher.totalWithDiscount(this);

		return this.totalWithoutDiscounts();
	}

	gst() {
		return Math.round(this.total() * gstPercent * 100) / 100;
	}

	totalWithoutDiscounts() {
		return this.items.length
			? this.items.map(it => it.price).reduce((prev, next) => prev + next)
			: 0;
	}
}

module.exports = Order;
