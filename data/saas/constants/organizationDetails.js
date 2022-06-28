import { generateRandomNumber, selectRandomDataFromArray } from '../../../utilities/helpers';
import countriesArray from './countries';
import Chance from 'chance';
import OrgTier from './orgTier';
// import currenciesArray from './currencies'; // TODO: Disable until showing symbol issue got fixed in total of comparison table

const chance = new Chance();
const countryItem = selectRandomDataFromArray(countriesArray);
const saudiCountry = {
	country: 'Saudi Arabia',
	code: 'SA',
};
const saudiCurrencyItem = selectRandomDataFromArray([
	{
		symbol: 'SR',
		currency: 'Saudi Riyal',
		code: 'SAR',
	},
]);

const currencyItem = selectRandomDataFromArray([
	{
		symbol: 'EGP',
		currency: 'Egyptian Pound',
		code: 'EGP',
	},
	{
		symbol: 'SR',
		currency: 'Saudi Riyal',
		code: 'SAR',
	},
]);

const locationTypeList = ['OFFICE', 'WAREHOUSE', 'OTHER'];

export const OrganizationDetails = (orgTier, orgCustomer) => {
	const orgCountry = orgTier === OrgTier.Reseller ? saudiCountry.country : countryItem.country;
	const orgCurrency = orgTier === OrgTier.Enterprise ? currencyItem : saudiCurrencyItem;

	return {
		orgName: `AT ${orgCustomer} Org ${generateRandomNumber(1000000, 9999999)}`,
		registrationNumber: generateRandomNumber(1000000000, 9000000000),
		orgTier: orgTier,
		orgCustomer: orgCustomer,
		taxCertificationNumber: `3${generateRandomNumber(1000000000000, 9000000000000)}3`,
		buildingNumber: generateRandomNumber(1000, 9000),
		street: chance.street(),
		state: chance.state({ full: true }),
		district: chance.word(),
		city: chance.city(),
		postalCode: `${generateRandomNumber(10000, 90000)}`,
		additionalNumber: generateRandomNumber(1000, 9000),
		unitNumber: generateRandomNumber(1000, 9000),
		country: orgCountry,
		currency: orgCurrency.currency,
		currencyCode: orgCurrency.code,
		currencySymbol: orgCurrency.symbol,
		googleMapsLink: 'https://goo.gl/maps/GTJc4opoNKF8CWWZ7',
		unit: 'Unit',
		organizationLocation: {
			type: selectRandomDataFromArray(locationTypeList),
			name: chance.city(),
			country: orgCountry,
			state: chance.state({ full: true }),
			city: chance.city(),
			street: chance.street(),
			postalCode: `${generateRandomNumber(10000, 90000)}`,
			googleMapsLink: 'https://goo.gl/maps/GTJc4opoNKF8CWWZ7',
		},
	};
};
