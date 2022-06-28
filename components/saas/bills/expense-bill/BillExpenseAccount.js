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

	async validateExpenseAccountBalance({ billDetails, budgetDetails, organizationDetails }) {
		const { balanceAmount } = budgetDetails;
		const { currencyCode } = organizationDetails;
		const { expenseItems } = billDetails;

		for (let expenseItem of expenseItems) {
			await this.validateElementVisibility(sprintf(this.expenseAccountBalanceText, expenseItem.expenseTitle, 'currency', currencyCode));
			await this.validateElementVisibility(
				sprintf(this.expenseAccountBalanceText, expenseItem.expenseTitle, 'price', formatedNumber(balanceAmount))
			);
		}
	}

	async selectExpenseAccounts({ billDetails, budgetDetails }) {
		const { expenseAccount } = budgetDetails;
		const { expenseItems } = billDetails;

		for (let expenseItem of expenseItems) {
			await this.click(sprintf(this.selectTotalExpenseAccountDropDown, expenseItem.expenseTitle));
			await this.click(sprintf(this.selectExpenseAccountDropdownItem, expenseItem.expenseTitle, expenseAccount));
		}
	}

	async submit({ bill }) {
		const { billDetails, budgetDetails, organizationDetails } = bill;

		await this.selectExpenseAccounts({ billDetails, budgetDetails });
		await this.validateExpenseAccountBalance({ billDetails, budgetDetails, organizationDetails });
	}

	async calculateNewBudgetDetails({ bill }) {
		const { billDetails, budgetDetails } = bill;
		const { expenseItems } = billDetails;

		const totalExpenseAmount = expenseItems
			.map((expenseItem) => expenseItem.expenseAmount)
			.reduce((prev, next) => parseFloat(prev) + parseFloat(next));

		budgetDetails.balanceAmount = budgetDetails.balanceAmount - totalExpenseAmount;

		return budgetDetails;
	}
}
