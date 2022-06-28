import { sprintf } from 'sprintf-js';
import GenericElement from '../../../../shared/core/GenericElement';
import AddExpenseAccountSidebar from './AddExpenseAccountSidebar';
import ExpenseAccountsTable from './ExpenseAccountsTable';

export default class ExpenseAccounts extends GenericElement {
	constructor() {
		super();
		this.addExpenseAccountSidebar = new AddExpenseAccountSidebar();
		this.expenseAccountsTable = new ExpenseAccountsTable();
		this.addExpenseAccountButton = '//button[@data-test-id="add-expense-account-button"]';
		this.noExpenseAccountAddedText = '//div[@data-test-id="no-expense-accounts-added-label"]';
		this.saveAndContinueButton = '//button[@data-test-id="save-and-continue-button"]';
	}

	async validateNoExpenseAccountAddedVisibility() {
		await this.validateElementVisibility(this.noExpenseAccountAddedText);
	}

	async clickAddExpenseAccountButton() {
		await this.click(this.addExpenseAccountButton);
	}

	async clickSaveAndContinueButton() {
		await this.click(this.saveAndContinueButton);
	}

	async submit({ budgetDetails, organizationDetails }) {
		await this.validateNoExpenseAccountAddedVisibility();
		await this.clickAddExpenseAccountButton();
		await this.addExpenseAccountSidebar.submit({ budgetDetails });
		await this.expenseAccountsTable.submit({ budgetDetails, organizationDetails });
		await this.clickSaveAndContinueButton();
	}
}
