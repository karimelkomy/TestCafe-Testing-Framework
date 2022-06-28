import Chance from 'chance';
import { selectRandomDataFromArray, generateRandomAlphabetic, generateRandomNumber } from '../../../utilities/helpers';

const chance = new Chance();
const priority = ['Low', 'Medium', 'High'];

export const requestDetails = {
	requestType: 'Product/Service Request',
	requestTitle: chance.sentence({ words: 2 }),
	requestPriority: selectRandomDataFromArray(priority),
	requestInfoRemark: generateRandomAlphabetic(),
	requestApprovalRemark: generateRandomAlphabetic(),
	qty: generateRandomNumber(1, 20),
};

export const resellerRequestDetails = {
	requestType: 'Product/Service Request',
	requestTitle: chance.sentence({ words: 2 }),
	requestInfoRemark: generateRandomAlphabetic(),
	requestApprovalRemark: generateRandomAlphabetic(),
	qty: generateRandomNumber(1, 20),
};

export const clientRequestDetails = {
	requestType: 'Product/Service Request',
	requestTitle: chance.sentence({ words: 2 }),
	requestApprovalRemark: generateRandomAlphabetic(),
	revisionRemark: generateRandomAlphabetic(),
	// requestInfoRemark: generateRandomAlphabetic(), //BUG: uncomment or use requestDetails when requestor comment shown in reseller client requests
	qty: generateRandomNumber(1, 20),
};

export const bulkRequestDetails = {
	requestType: 'Product/Service Request',
	requestTitle: 'htysti',
	sourcingRemark: generateRandomAlphabetic(),
	qty: 50,
};
