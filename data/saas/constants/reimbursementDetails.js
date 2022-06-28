import Chance from 'chance';
import { generateRandomDecimalNumber, selectRandomDataFromArray } from '../../../utilities/helpers';

const chance = new Chance();
const priority = ['Low', 'Medium', 'High'];

export const reimbursementDetails = {
	requestType: 'EXPENSE REQUEST',
	requestTitle: chance.sentence({ words: 2 }),
	requestPriority: selectRandomDataFromArray(priority),
	expenseItems: Array.from({ length: 3 }, () => ({
		expenseTitle: chance.sentence({ words: 2 }),
		merchantName: chance.sentence({ words: 2 }),
		expenseAmount: generateRandomDecimalNumber(100, 1000),
		expenseComment: chance.sentence({ words: 10 }),
	})),
};
