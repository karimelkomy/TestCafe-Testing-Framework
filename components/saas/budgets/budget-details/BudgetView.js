import GenericElement from '../../../shared/core/GenericElement';
import { removeStringStartingFromChar, removeCommaSeperatorFromNumber } from '../../../../utilities/helpers';

export default class BudgetView extends GenericElement {
	constructor() {
		super();
		this.actionsDropdown = '//div[contains(@class, "display-none")]//button/span[text()="Actions"]';
		this.viewBudgetDetailsButton = '//div[contains(@class, "display-none")]//button[.="View Budget Details"]';
		this.expenseAccountsTab = '//li[.="Expense Accounts"]';
		this.totalBudgetText = '//div[@data-test-id="total-budget-value"]';
		this.totalBudgetRemainingText = '//div[@data-test-id="total-budget-remaining-value"]';
		this.budgetName = '//h1[@data-test-id="budget-text"]';
		this.totalBookedText = '//div[@data-test-id="total-booked-value"]';
		this.totalSpentText = '//div[@data-test-id="total-spent-value"]';
	}

	async hoverActionsDropdown() {
		await this.hover(this.actionsDropdown);
	}

	async clickViewBudgetDetailsButton() {
		await this.click(this.viewBudgetDetailsButton);
	}

	async openBudgetView() {
		await this.hoverActionsDropdown();
		await this.clickViewBudgetDetailsButton();
	}

	async clickExpenseAccountsTab() {
		await this.click(this.expenseAccountsTab);
	}

	async getBudgetName() {
		const budgetNameHeader = await this.getText(this.budgetName);

		return budgetNameHeader.substring(8);
	}

	async getBooked() {
		const bookedText = removeStringStartingFromChar(await this.getText(this.totalBookedText), '(');

		return parseFloat(removeCommaSeperatorFromNumber(bookedText));
	}

	async getSpent() {
		const spentText = removeStringStartingFromChar(await this.getText(this.totalSpentText), '(');

		return parseFloat(removeCommaSeperatorFromNumber(spentText));
	}

	async getTotalBudget() {
		const totalBudgetText = removeStringStartingFromChar(await this.getText(this.totalBudgetText), '(');

		return parseFloat(removeCommaSeperatorFromNumber(totalBudgetText));
	}

	async getTotalBudgetRemaining() {
		const totalBudgetRemainingText = removeStringStartingFromChar(await this.getText(this.totalBudgetRemainingText), '(');

		return parseFloat(removeCommaSeperatorFromNumber(totalBudgetRemainingText));
	}

	async getBudget({ budget }) {
		const { budgetDetails } = budget;

		await this.openBudgetView();
		await this.clickExpenseAccountsTab();

		budgetDetails.budgetName = await this.getBudgetName();
		budgetDetails.budgetAmount = await this.getTotalBudget();
		budgetDetails.balanceAmount = await this.getTotalBudgetRemaining();
		budgetDetails.bookedAmount = await this.getBooked();
		budgetDetails.spentAmount = await this.getSpent();

		return budgetDetails;
	}
}
