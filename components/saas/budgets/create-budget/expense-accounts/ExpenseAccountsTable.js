import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';
import { formatedNumber } from '../../../../../utilities/helpers';

export default class ExpenseAccountsTable extends GenericElement {
	constructor() {
		super();
		this.expenseAccountText = '//p-table//td[position()=1 and contains(text(), "%s")]';
		this.budgetText = '//p-table//td[position()=2 and contains(text(), "%s")]';
		this.bookedText = '//p-table//td[position()=3 and contains(text(), "%s")]';
		this.spentText = '//p-table//td[position()=4 and contains(text(), "%s")]';
		this.balanceText = '//p-table//td[position()=5 and contains(text(), "%s")]';
		this.totalBudgetText = '//span[@data-test-id="total-budget-%s-text" and contains(., "%s")]';
	}

	async validateExpenseAccount({ budgetDetails }) {
		const { expenseAccount } = budgetDetails;

		await this.validateElementVisibility(sprintf(this.expenseAccountText, expenseAccount));
	}

	async validateBudget({ organizationDetails, budgetDetails }) {
		const { budgetAmount } = budgetDetails;
		const { currencyCode } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.budgetText, currencyCode));
		await this.validateElementVisibility(sprintf(this.budgetText, formatedNumber(budgetAmount)));
	}

	async validateBooked({ organizationDetails, budgetDetails }) {
		const { bookedAmount } = budgetDetails;
		const { currencyCode } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.bookedText, currencyCode));
		await this.validateElementVisibility(sprintf(this.bookedText, formatedNumber(bookedAmount)));
	}

	async validateSpent({ organizationDetails, budgetDetails }) {
		const { spentAmount } = budgetDetails;
		const { currencyCode } = organizationDetails;

		await this.validateElementVisibility(sprintf(this.spentText, currencyCode));
		await this.validateElementVisibility(sprintf(this.spentText, formatedNumber(spentAmount)));
	}

	async validateBalance({ organizationDetails, budgetDetails }) {
		const { budgetAmount, spentAmount } = budgetDetails;
		const { currencyCode } = organizationDetails;
		const balanceAmount = budgetAmount - spentAmount;

		await this.validateElementVisibility(sprintf(this.balanceText, currencyCode));
		await this.validateElementVisibility(sprintf(this.balanceText, formatedNumber(balanceAmount)));
	}

	async validateTotalBudget({ organizationDetails, budgetDetails }) {
		const { budgetAmount } = budgetDetails;

		await this.validatePrice(this.totalBudgetText, budgetAmount, organizationDetails);
	}

	async submit({ budgetDetails, organizationDetails }) {
		await this.validateExpenseAccount({ budgetDetails });
		await this.validateBudget({ organizationDetails, budgetDetails });
		await this.validateBooked({ organizationDetails, budgetDetails });
		await this.validateSpent({ organizationDetails, budgetDetails });
		await this.validateBalance({ organizationDetails, budgetDetails });
		await this.validateTotalBudget({ organizationDetails, budgetDetails });
	}
}
