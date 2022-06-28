import { selectRandomDataFromArray, generateRandomNumber } from '../../../utilities/helpers';
import expenseAccounts from './expenseAccounts';

const budgetAmount = generateRandomNumber(10000000000, 99999999999);
const bookedAmount = 0;

const InitialBudgetDetails = {
	budgetName: `Budget ${generateRandomNumber(1, 99999999)}`,
	expenseAccount: selectRandomDataFromArray(expenseAccounts),
	budgetAmount: budgetAmount,
	bookedAmount: bookedAmount,
	balanceAmount: budgetAmount - bookedAmount,
	spentAmount: 0,
};

export default InitialBudgetDetails;
