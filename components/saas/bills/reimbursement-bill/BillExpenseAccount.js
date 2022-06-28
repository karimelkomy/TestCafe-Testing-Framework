import { sprintf } from 'sprintf-js';
import GenericElement from '../../../shared/core/GenericElement';
import { formatedNumber } from '../../../../utilities/helpers';

export default class BillExpenseAccount extends GenericElement {
	constructor() {
		super();
		this.element = '//p-table//tr[.//span[@data-test-id="name-text" and text()="%s"]]';
		this.selectTotalExpenseAccountDropDown = `${this.element}//p-dropdown[@data-test-id="select-expense-account-dropdown"]`;
		this.selectExpenseAccountDropdownItem = `${this.element}//p-dropdownitem/li[contains(@aria-label, "%s")]`;
		this.expenseAccountBalanceText = `${this.element}//span[@data-test-id="balance-%s-text" and contains(., "%s")]`;
	}

	async validateExpenseAccountBalance({ reimbursementDetails, budgetDetails, organizationDetails }) {
		const { currencyCode } = organizationDetails;
		const { expenseItems } = reimbursementDetails;
		const { balanceAmount } = budgetDetails;

		for (let expenseItem of expenseItems) {
			const { expenseTitle } = expenseItem;

			await this.validateElementVisibility(sprintf(this.expenseAccountBalanceText, expenseTitle, 'currency', currencyCode));
			await this.validateElementVisibility(sprintf(this.expenseAccountBalanceText, expenseTitle, 'price', formatedNumber(balanceAmount)));
		}
	}

	async selectExpenseAccounts({ reimbursementDetails, budgetDetails }) {
		const { expenseAccount } = budgetDetails;
		const { expenseItems } = reimbursementDetails;

		for (let expenseItem of expenseItems) {
			const { expenseTitle } = expenseItem;

			await this.click(sprintf(this.selectTotalExpenseAccountDropDown, expenseTitle));
			await this.click(sprintf(this.selectExpenseAccountDropdownItem, expenseTitle, expenseAccount));
		}
	}

	async submit({ reimbursementDetails, budgetDetails, organizationDetails }) {
		await this.selectExpenseAccounts({ reimbursementDetails, budgetDetails });
		await this.validateExpenseAccountBalance({ reimbursementDetails, budgetDetails, organizationDetails });
	}

	async calculateNewBudgetDetails({ budgetDetails, reimbursementDetails }) {
		const totalExpenseAmount = reimbursementDetails.expenseItems
			.map((expenseItem) => expenseItem.expenseAmount)
			.reduce((prev, next) => parseFloat(prev) + parseFloat(next));

		budgetDetails.balanceAmount = budgetDetails.balanceAmount - totalExpenseAmount;

		return budgetDetails;
	}
}
