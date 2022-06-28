import { generateRandomDecimalNumber, generateRandomAlphabetic } from '../../../utilities/helpers';

const advanceBillDetails = {
	totalAdvanceAmount: generateRandomDecimalNumber(1, 1000),
	orderId: '-',
	remark: generateRandomAlphabetic(),
};

export default advanceBillDetails;
