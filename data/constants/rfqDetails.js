import { generateRandomNumber, selectRandomDataFromArray, generateRandomAlphabetic } from '../../../utilities/helpers';

const shippingTermsList = ['FCA', 'CPT', 'CIP', 'DPU'];
const revisedShippingTermsList = ['DAP', 'DDP', 'FAS', 'FOB', 'CFR'];
const paymentTermList = ['7', '14', '30', '60'];

export const RfqDetails = () => {
	return {
		shippingFee: generateRandomNumber(1001, 2000),
		shippingTerm: selectRandomDataFromArray(shippingTermsList),
		paymentTerm: generateRandomNumber(101, 200),
		paymentTermUnit: 'Days',
		ETA: generateRandomNumber(101, 200),
		ETAUnit: 'Days',
		pricePerUnit: generateRandomNumber(101, 200),
		tax: 15,
		taxType: '%',
		remark: generateRandomAlphabetic(),
		rfqApprovalRemark: generateRandomAlphabetic(),
		rfqType: 'RFQ',
	};
};

export const OrderRfqDetails = () => {
	return {
		shippingFee: generateRandomNumber(1001, 2000),
		shippingTerm: selectRandomDataFromArray(shippingTermsList),
		paymentTerm: generateRandomNumber(101, 200),
		paymentTermUnit: 'Days',
		ETA: generateRandomNumber(101, 200),
		ETAUnit: 'Days',
		pricePerUnit: generateRandomNumber(101, 200),
		tax: 15,
		taxType: '%',
		rfqApprovalRemark: generateRandomAlphabetic(),
		rfqType: 'RFQ',
	};
};

export const OfferOfflineRfqDetails = () => {
	return {
		shippingFee: generateRandomNumber(1001, 2000),
		shippingTerm: selectRandomDataFromArray(shippingTermsList),
		paymentTerm: generateRandomNumber(101, 200),
		paymentTermUnit: 'Days',
		ETA: generateRandomNumber(101, 200),
		ETAUnit: 'Days',
		pricePerUnit: generateRandomNumber(101, 200),
		tax: 15,
		taxType: '%',
		offerOfflineRemark: generateRandomAlphabetic(),
		rfqApprovalRemark: generateRandomAlphabetic(),
		rfqType: 'RFQ',
	};
};

export const RfqDetailsWithFixedPaymentTerm = () => {
	return {
		shippingFee: generateRandomNumber(1001, 2000),
		shippingTerm: selectRandomDataFromArray(shippingTermsList),
		paymentTerm: selectRandomDataFromArray(paymentTermList),
		paymentTermUnit: 'Days',
		ETA: generateRandomNumber(101, 200),
		ETAUnit: 'Days',
		pricePerUnit: generateRandomNumber(101, 200),
		tax: 15,
		taxType: '%',
		remark: generateRandomAlphabetic(),
		rfqApprovalRemark: generateRandomAlphabetic(),
		rfqType: 'RFQ',
	};
};

export const RevisedRfqDetails = () => {
	return {
		shippingFee: generateRandomNumber(1, 1000),
		shippingTerm: selectRandomDataFromArray(revisedShippingTermsList),
		paymentTerm: generateRandomNumber(2, 100),
		paymentTermUnit: 'Days',
		ETA: generateRandomNumber(2, 100),
		ETAUnit: 'Days',
		pricePerUnit: generateRandomNumber(1, 100),
		tax: 15,
		taxType: '%',
		remark: generateRandomAlphabetic(),
		rfqApprovalRemark: generateRandomAlphabetic(),
		rfqType: 'Revision Request',
	};
};

export const RfqDetailsWithContract = (productsDetailsWithContract) => {
	return {
		shippingFee: generateRandomNumber(1001, 2000),
		shippingTerm: selectRandomDataFromArray(shippingTermsList),
		paymentTerm: generateRandomNumber(101, 200),
		paymentTermUnit: 'Days',
		ETA: generateRandomNumber(101, 200),
		ETAUnit: 'Days',
		pricePerUnit: productsDetailsWithContract[0].contractPrice,
		tax: 15,
		taxType: '%',
		remark: generateRandomAlphabetic(),
		rfqApprovalRemark: generateRandomAlphabetic(),
		rfqType: 'RFQ',
	};
};
