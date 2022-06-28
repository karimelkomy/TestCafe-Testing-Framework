import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';
import { formatedNumber } from '../../../../../utilities/helpers';

export default class AddExpenseAccountSidebar extends GenericElement {
	constructor() {
		super();
		this.budgetNameText = '//h2[@data-test-id="budget-name-text" and text()="%s"]';
		this.selectExpenseAccountDropdown = '//p-dropdown[@data-test-id="select-expense-account-dropdown"]';
		this.expenseAccountDropdownItem = '//p-dropdownitem[.="%s"]/li';
		this.budgetInput = '//p-inputnumber[@data-test-id="budget-input"]//input';
		this.saveAndCloseButton = '//button[@data-test-id="save-and-close-button"]';
	}

	async validateBudgetName({ budgetDetails }) {
		const { budgetName } = budgetDetails;

		await this.validateElementVisibility(sprintf(this.budgetNameText, budgetName));
	}

	async selectExpenseAccount({ budgetDetails }) {
		const { expenseAccount } = budgetDetails;

		await this.click(this.selectExpenseAccountDropdown);
		await this.click(sprintf(this.expenseAccountDropdownItem, expenseAccount));
	}

	async fillBudget({ budgetDetails }) {
		const { budgetAmount } = budgetDetails;

		await this.fill(this.budgetInput, formatedNumber(budgetAmount));
	}

	async clickSaveAndCloseButton() {
		await this.click(this.saveAndCloseButton);
	}

	async submit({ budgetDetails }) {
		// TODO: validate date
		// TODO: add and validate remark
		await this.validateBudgetName({ budgetDetails });
		await this.selectExpenseAccount({ budgetDetails });
		await this.fillBudget({ budgetDetails });
		await this.clickSaveAndCloseButton();
	}
}
