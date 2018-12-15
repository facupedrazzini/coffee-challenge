class DiscountVoucher {
	constructor({ discount }) {
		this.discount = discount;
	}

	totalWithDiscount(order) {
		const total = order.totalWithoutDiscounts();

		return total - total * this.discount;
	}
}

module.exports = DiscountVoucher;
