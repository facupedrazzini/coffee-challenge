const Coffee = require('../lib/Coffee');
const DiscountVoucher = require('../lib/vouchers/DiscountVoucher');
const OneFreeVoucher = require('../lib/vouchers/OneFreeVoucher');
const coffees = require('../data/coffees.json');

module.exports = {
	coffees: {
		espresso: new Coffee(coffees.ESPRESSO),
		cappuccino: new Coffee(coffees.CAPPUCCINO),
		latte: new Coffee(coffees.LATTE),
		flatWhite: new Coffee(coffees.FLAT_WHITE)
	},
	vouchers: {
		discountVoucher: new DiscountVoucher({ discount: 0.1 }),
		oneFreeVoucher: new OneFreeVoucher()
	}
};
