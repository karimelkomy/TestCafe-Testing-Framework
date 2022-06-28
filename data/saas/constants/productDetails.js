import Chance from 'chance';
import { selectRandomDataFromArray, generateRandomNumber } from '../../../utilities/helpers';
import countriesArray from './countries';

const chance = new Chance();
const countryItem = selectRandomDataFromArray(countriesArray);
const contractPriceValue = generateRandomNumber(1001, 10000);

export const productsDetails = Array.from({ length: 2 }, () => ({
	productName: chance.sentence({ words: 2 }),
	sku: chance.sentence({ words: 2 }),
	manufacturerSku: chance.sentence({ words: 2 }),
	categoryName: chance.sentence({ words: 2 }),
	description: chance.sentence({ words: 5 }),
	model: chance.sentence({ words: 2 }),
	brand: chance.sentence({ words: 2 }),
	originCountry: countryItem.country,
	basePrice: generateRandomNumber(1, 10000),
	taxes: 0,
	attribute: chance.word(),
	value: chance.sentence({ words: 2 }),
	uom: chance.sentence({ words: 2 }),
}));

export const productsDetailsWithContract = Array.from({ length: 2 }, () => ({
	productName: chance.sentence({ words: 2 }),
	sku: chance.sentence({ words: 2 }),
	manufacturerSku: chance.sentence({ words: 2 }),
	categoryName: chance.sentence({ words: 2 }),
	description: chance.sentence({ words: 5 }),
	model: chance.sentence({ words: 2 }),
	brand: chance.sentence({ words: 2 }),
	originCountry: countryItem.country,
	basePrice: generateRandomNumber(1, 1000),
	contractPrice: contractPriceValue,
	taxes: 0,
	attribute: chance.word(),
	value: chance.sentence({ words: 2 }),
	uom: chance.sentence({ words: 2 }),
}));

export const manualProductsDetails = Array.from({ length: 2 }, () => ({
	productName: chance.sentence({ words: 2 }),
	sku: '-',
	description: chance.sentence({ words: 5 }),
	brand: chance.sentence({ words: 2 }),
	basePrice: 0,
	taxes: 0,
}));

export const bulkProductsDetails = [
	{
		productName: 'ineiwofu',
		sku: 'paf',
		description: 'huiokp u890',
		model: 'y989p0',
		brand: 'kgio',
		basePrice: 0,
	},
	{
		productName: 'oiuujk',
		sku: 'yguyg',
		description: 'jgkhjhkhg 876tyu',
		model: 'hghggh',
		brand: 'ddssdf',
		basePrice: 0,
	},
];
