import Chance from 'chance';
import { generateRandomDecimalNumber } from '../../../utilities/helpers';

const chance = new Chance();

export const expenseBillDetails = {
	expenseItems: Array.from({ length: 3 }, () => ({
		expenseTitle: chance.sentence({ words: 2 }),
		expenseAmount: generateRandomDecimalNumber(100, 1000),
		expenseComment: chance.sentence({ words: 10 }),
	})),
};
