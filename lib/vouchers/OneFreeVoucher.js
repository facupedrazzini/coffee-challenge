class OneFreeVoucher {
	constructor() {}

	totalWithDiscount(order) {
		const items = [...order.items];

		const cheaperItem = {
			...items.reduce(function(prev, curr) {
				return prev.price < curr.price ? prev : curr;
			})
		};

		items.splice(items.indexOf(cheaperItem), 1);

		return items.map(it => it.price).reduce((prev, next) => prev + next);
	}
}

module.exports = OneFreeVoucher;
