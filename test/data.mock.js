const Coffee = require('../lib/Coffee');
const coffees = require('../data/coffees.json');

module.exports = {
	coffees: {
		espresso: new Coffee(coffees.ESPRESSO),
		cappuccino: new Coffee(coffees.CAPPUCCINO),
		latte: new Coffee(coffees.LATTE),
		flatWhite: new Coffee(coffees.FLAT_WHITE)
	}
};
