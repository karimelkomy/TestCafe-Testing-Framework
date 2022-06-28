import Chance from 'chance';
import { generateRandomNumber, selectRandomDataFromArray, generateRandomEmail } from '../../../utilities/helpers';
import countriesArray from './countries';
import catalogueDetails from './catalogueDetails';
import { RfqDetails, RfqDetailsWithContract } from './rfqDetails';

const chance = new Chance();
const shippingTermsList = ['FCA', 'CPT', 'CIP', 'DPU', 'DAP', 'DDP', 'FAS', 'FOB', 'CFR', 'CIF'];
const vendorClassificationList = ['General', 'E-Commerce', 'Main Distributor', 'Authorized Distributor'];
const countryItem = selectRandomDataFromArray(countriesArray);

export const VendorsDetails = () => {
	return Array.from({ length: 3 }, () => ({
		vendorName: `Vendor ${generateRandomNumber(1000000, 9999999)}`,
		firstName: chance.first(),
		lastName: chance.last(),
		registrationNumber: generateRandomNumber(1000000000, 9000000000),
		taxCertificationNumber: `3${generateRandomNumber(1000000000000, 9000000000000)}3`,
		email: `${generateRandomEmail('vendor')}`,
		phone: chance.phone({ formatted: false }),
		vendorClassification: selectRandomDataFromArray(vendorClassificationList),
		state: chance.state({ full: true }),
		street: chance.street(),
		city: chance.city(),
		postalCode: `${generateRandomNumber(10000, 90000)}`,
		country: countryItem.country,
		paymentTerm: generateRandomNumber(2, 99),
		shippingTerm: selectRandomDataFromArray(shippingTermsList),
		approvalPreferences: 'REQUIRED',
		rfqDetails: RfqDetails(),
	}));
};

export const VendorsDetailsWithContract = (productsDetailsWithContract) => {
	return [
		{
			vendorName: `Vendor ${generateRandomNumber(1, 9999)}`,
			firstName: chance.first(),
			lastName: chance.last(),
			registrationNumber: generateRandomNumber(1000000000, 9000000000),
			taxCertificationNumber: `3${generateRandomNumber(1000000000000, 9000000000000)}3`,
			email: `${generateRandomEmail('vendor')}`,
			phone: chance.phone({ formatted: false }),
			vendorClassification: selectRandomDataFromArray(vendorClassificationList),
			state: chance.state({ full: true }),
			street: chance.street(),
			city: chance.city(),
			postalCode: `${generateRandomNumber(10000, 90000)}`,
			country: countryItem.country,
			paymentTerm: generateRandomNumber(2, 99),
			shippingTerm: selectRandomDataFromArray(shippingTermsList),
			approvalPreferences: 'REQUIRED',
			contractDetails: {
				referenceContractNumber: generateRandomNumber(1000000, 9000000),
				contractName: `Contract ${generateRandomNumber(1, 9999)}`,
				description: chance.sentence({ words: 5 }),
				paymentTerm: generateRandomNumber(2, 99),
				paymentTermUnit: 'Days',
				productsDetails: productsDetailsWithContract,
				catalogueDetails: catalogueDetails,
				qty: generateRandomNumber(2000, 10000),
				rfqType: 'RFQ',
			},
			rfqDetails: RfqDetailsWithContract(productsDetailsWithContract),
		},
	];
};
