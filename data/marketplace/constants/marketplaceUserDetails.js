import { generateRandomEmail, generateRandomNumber, selectRandomDataFromArray } from '../../../utilities/helpers';
import saudiCitiesArray from './cities';
import Chance from 'chance';

const chance = new Chance();

const countryItem = selectRandomDataFromArray([
	{
		country: 'Saudi Arabia',
		code: 'SA',
	},
]);

const currencyItem = selectRandomDataFromArray([
	{
		symbol: 'SR',
		currency: 'Saudi Riyal',
		code: 'SAR',
	},
]);

export const marketplaceBuyerDetails = {
	firstName: 'First=Name',
	lastName: 'Last=Name',
	email: 'entityrmarketplace222@mailinator.com',
	password: 'Demo2020',
	mobileNumber: '5084410581085041565',
	entityName: 'AT Buyer #7182161',
	crNumber: '7111111112',
	city: 'Dammam 1',
	country: 'Saudi Arabia',
	currency: 'Saudi Riyal',
	mapLocation: '',
	currencyCode: 'SAR',
};
