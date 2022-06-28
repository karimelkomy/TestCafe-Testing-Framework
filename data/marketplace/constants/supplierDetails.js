import { selectRandomDataFromArray } from '../../../utilities/helpers';

const countryItem = selectRandomDataFromArray([
	{
		country: 'Saudi Arabia',
		code: 'SA',
	},
]);

export const supplierDetails = {
	organizationName: 'rfq-test-supplier',
	marketplaceStoreName: 'RFQ Test Supplier',
	companyRegistrationNumber: '3102381234032',
	vatRegistrationNumber: '312345666312323',
	classification: 'General',
	email: 'rfq-test-supplier@mailinator.com',
	password: 'Demo2022',
	addressDetails: {
		buildingNumber: '1234',
		street: 'Test Street',
		district: 'Test District',
		city: 'Test City',
		zipCode: '31911',
		additionalNumber: '3424',
		unitNumber: '2341',
		state: 'Test Region',
		country: countryItem.country,
	},
};
