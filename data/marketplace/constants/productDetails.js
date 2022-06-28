import { selectRandomDataFromArray } from '../../../utilities/helpers';

//  TODO: remove if not need it.
const countryItem = selectRandomDataFromArray([
	{
		country: 'Saudi Arabia',
		code: 'SA',
	},
]);

export const productDetails = {
	productInfo: {
		productName: 'ARMATURE,ASM 230V',
		sku: 'RIDGID38838',
		categoryName: 'Power Tool Replacement Parts',
	},
	productDetails: {
		description: 'RIDGID® ARMATURE, ASM 230V.',
		brand: 'Ridgid®',
		originCountry: 'USA',
	},
	productPricing: {
		basePrice: '591.00',
		taxes: '0.0',
		moqRfq: 7,
		moqOrder: 1,
	},
};
